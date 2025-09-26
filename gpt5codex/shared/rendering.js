(function (global) {
  "use strict";

  if (global.MathWorldsRendering) {
    return;
  }

  const ROTATION_SENSITIVITY = 0.008;
  const MAX_PITCH = Math.PI / 2 - 0.05;

  function clampPitch(value) {
    return Math.max(-MAX_PITCH, Math.min(MAX_PITCH, value));
  }

  function wrapUnit(value) {
    return ((value % 1) + 1) % 1;
  }

  function renderBufferToSphere(displayCtx, bufferCanvas, state) {
    const bufferCtx = bufferCanvas.getContext("2d", { willReadFrequently: true });
    if (!bufferCtx) {
      return;
    }

    const bufferWidth = bufferCanvas.width;
    const bufferHeight = bufferCanvas.height;
    if (bufferWidth === 0 || bufferHeight === 0) {
      return;
    }

    const width = displayCtx.canvas.width;
    const height = displayCtx.canvas.height;
    if (width === 0 || height === 0) {
      return;
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.48;
    const invRadius = 1 / radius;

    const sourceData = bufferCtx.getImageData(0, 0, bufferWidth, bufferHeight);
    const sourcePixels = sourceData.data;

    const output = displayCtx.createImageData(width, height);
    const outputPixels = output.data;

    const cosYaw = Math.cos(state.rotation.yaw);
    const sinYaw = Math.sin(state.rotation.yaw);
    const cosPitch = Math.cos(state.rotation.pitch);
    const sinPitch = Math.sin(state.rotation.pitch);

    for (let y = 0; y < height; y += 1) {
      const dy = (y - centerY) * invRadius;
      for (let x = 0; x < width; x += 1) {
        const dx = (x - centerX) * invRadius;
        const destIndex = (y * width + x) * 4;
        const distSq = dx * dx + dy * dy;

        if (distSq > 1 || radius <= 0) {
          outputPixels[destIndex + 3] = 0;
          continue;
        }

        const dz = Math.sqrt(1 - distSq);

        const vx = dx;
        const vy = dy;
        const vz = dz;

        const vy1 = vy * cosPitch + vz * sinPitch;
        const vz1 = -vy * sinPitch + vz * cosPitch;
        const vx1 = vx;

        const vx2 = vx1 * cosYaw - vz1 * sinYaw;
        const vz2 = vx1 * sinYaw + vz1 * cosYaw;
        const vy2 = vy1;

        const clampedVy = Math.max(-1, Math.min(1, vy2));
        let u = Math.atan2(vx2, vz2) / (2 * Math.PI) + 0.5;
        let v = 0.5 - Math.asin(clampedVy) / Math.PI;
        u = wrapUnit(u);
        v = Math.max(0, Math.min(1, v));

        const srcX = Math.min(bufferWidth - 1, Math.floor(u * bufferWidth));
        const srcY = Math.min(bufferHeight - 1, Math.floor(v * bufferHeight));
        const srcIndex = (srcY * bufferWidth + srcX) * 4;

        const light = 0.55 + 0.45 * dz;

        outputPixels[destIndex] = Math.min(255, Math.round(sourcePixels[srcIndex] * light));
        outputPixels[destIndex + 1] = Math.min(255, Math.round(sourcePixels[srcIndex + 1] * light));
        outputPixels[destIndex + 2] = Math.min(255, Math.round(sourcePixels[srcIndex + 2] * light));
        outputPixels[destIndex + 3] = sourcePixels[srcIndex + 3];
      }
    }

    displayCtx.putImageData(output, 0, 0);

    displayCtx.save();
    displayCtx.setTransform(1, 0, 0, 1, 0, 0);
    displayCtx.strokeStyle = "rgba(15, 23, 42, 0.65)";
    displayCtx.lineWidth = Math.max(1, radius * 0.03);
    displayCtx.beginPath();
    displayCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    displayCtx.stroke();
    displayCtx.restore();
  }

  function createChangeNotifier() {
    const listeners = new Set();
    return {
      add(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      emit(payload) {
        listeners.forEach((listener) => listener(payload));
      },
    };
  }

  function createRenderController(canvas, options = {}) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("createRenderController expects an HTMLCanvasElement");
    }

    const displayCtx = canvas.getContext("2d");
    if (!displayCtx) {
      throw new Error("Failed to acquire 2D context for renderer");
    }

    const bufferCanvas = document.createElement("canvas");
    const bufferCtx = bufferCanvas.getContext("2d");
    if (!bufferCtx) {
      throw new Error("Failed to acquire buffer 2D context");
    }

    bufferCtx.imageSmoothingEnabled = false;

    const background = options.background ?? "rgba(2, 6, 23, 0.94)";

    const changeNotifier = createChangeNotifier();

    const state = {
      mode: "euclidean",
      wrapMode: "none",
      rotation: { yaw: 0, pitch: 0 },
      cssWidth: 0,
      cssHeight: 0,
      devicePixelRatio: global.devicePixelRatio || 1,
    };

    let rotating = false;
    let lastPointerPosition = { x: 0, y: 0 };

    function updateCursor() {
      if (state.mode === "spherical") {
        canvas.style.cursor = rotating ? "grabbing" : "grab";
      } else {
        canvas.style.cursor = "";
      }
    }

    function notify() {
      changeNotifier.emit({
        mode: state.mode,
        wrapMode: state.wrapMode,
        rotation: { ...state.rotation },
        cssWidth: state.cssWidth,
        cssHeight: state.cssHeight,
        devicePixelRatio: state.devicePixelRatio,
      });
    }

    function resize(width, height, devicePixelRatio = global.devicePixelRatio || 1) {
      state.cssWidth = width;
      state.cssHeight = height;
      state.devicePixelRatio = devicePixelRatio;

      const scaledWidth = Math.max(1, Math.floor(width * devicePixelRatio));
      const scaledHeight = Math.max(1, Math.floor(height * devicePixelRatio));

      if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
      }

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (bufferCanvas.width !== scaledWidth || bufferCanvas.height !== scaledHeight) {
        bufferCanvas.width = scaledWidth;
        bufferCanvas.height = scaledHeight;
      }

      notify();
    }

    function setMode(mode) {
      if (mode !== "euclidean" && mode !== "spherical") {
        return;
      }
      if (state.mode !== mode) {
        state.mode = mode;
        updateCursor();
        notify();
      }
    }

    function setWrapMode(wrapMode) {
      if (!wrapMode) return;
      if (state.wrapMode !== wrapMode) {
        state.wrapMode = wrapMode;
        notify();
      }
    }

    function resetRotation() {
      state.rotation.yaw = 0;
      state.rotation.pitch = 0;
      notify();
    }

    function render(drawScene) {
      bufferCtx.setTransform(1, 0, 0, 1, 0, 0);
      bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
      bufferCtx.fillStyle = background;
      bufferCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);
      bufferCtx.setTransform(state.devicePixelRatio, 0, 0, state.devicePixelRatio, 0, 0);

      drawScene(bufferCtx, {
        width: state.cssWidth,
        height: state.cssHeight,
        devicePixelRatio: state.devicePixelRatio,
        mode: state.mode,
        wrapMode: state.wrapMode,
      });

      bufferCtx.setTransform(1, 0, 0, 1, 0, 0);

      displayCtx.setTransform(1, 0, 0, 1, 0, 0);
      displayCtx.clearRect(0, 0, canvas.width, canvas.height);
      displayCtx.fillStyle = background;
      displayCtx.fillRect(0, 0, canvas.width, canvas.height);

      if (state.mode === "euclidean") {
        displayCtx.drawImage(bufferCanvas, 0, 0);
      } else {
        renderBufferToSphere(displayCtx, bufferCanvas, state);
      }
    }

    function mapCssPointToScene(cssX, cssY) {
      if (state.mode !== "spherical") {
        return { x: cssX, y: cssY };
      }

      const radius = Math.min(state.cssWidth, state.cssHeight) / 2;
      if (radius <= 0) {
        return null;
      }

      const centerX = state.cssWidth / 2;
      const centerY = state.cssHeight / 2;
      const dx = (cssX - centerX) / radius;
      const dy = (cssY - centerY) / radius;
      const distSq = dx * dx + dy * dy;

      if (distSq > 1) {
        return null;
      }

      const dz = Math.sqrt(1 - distSq);

      const vx = dx;
      const vy = dy;
      const vz = dz;

      const cosPitch = Math.cos(state.rotation.pitch);
      const sinPitch = Math.sin(state.rotation.pitch);
      const vy1 = vy * cosPitch + vz * sinPitch;
      const vz1 = -vy * sinPitch + vz * cosPitch;
      const vx1 = vx;

      const cosYaw = Math.cos(state.rotation.yaw);
      const sinYaw = Math.sin(state.rotation.yaw);
      const vx2 = vx1 * cosYaw - vz1 * sinYaw;
      const vz2 = vx1 * sinYaw + vz1 * cosYaw;
      const vy2 = vy1;

      let u = Math.atan2(vx2, vz2) / (2 * Math.PI) + 0.5;
      let v = 0.5 - Math.asin(Math.max(-1, Math.min(1, vy2))) / Math.PI;
      u = wrapUnit(u);
      v = Math.max(0, Math.min(1, v));

      return {
        x: u * state.cssWidth,
        y: v * state.cssHeight,
      };
    }

    function mapEventToScene(event) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return null;
      }

      const cssX = ((event.clientX - rect.left) / rect.width) * state.cssWidth;
      const cssY = ((event.clientY - rect.top) / rect.height) * state.cssHeight;
      return mapCssPointToScene(cssX, cssY);
    }

    canvas.addEventListener("contextmenu", (event) => {
      if (state.mode === "spherical") {
        event.preventDefault();
      }
    });

    canvas.addEventListener("pointerdown", (event) => {
      if (state.mode !== "spherical") {
        return;
      }
      if (event.button !== 2) {
        return;
      }
      event.preventDefault();
      rotating = true;
      lastPointerPosition = { x: event.clientX, y: event.clientY };
      updateCursor();
      canvas.setPointerCapture(event.pointerId);
    });

    const endRotation = (event) => {
      if (!rotating) return;
      rotating = false;
      updateCursor();
      if (event && canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    canvas.addEventListener("pointermove", (event) => {
      if (!rotating) {
        return;
      }
      const dx = event.clientX - lastPointerPosition.x;
      const dy = event.clientY - lastPointerPosition.y;
      lastPointerPosition = { x: event.clientX, y: event.clientY };

      state.rotation.yaw += dx * ROTATION_SENSITIVITY;
      state.rotation.pitch = clampPitch(state.rotation.pitch + dy * ROTATION_SENSITIVITY);
      notify();
    });

    canvas.addEventListener("pointerup", endRotation);
    canvas.addEventListener("pointercancel", endRotation);
    canvas.addEventListener("pointerleave", endRotation);

    updateCursor();

    return {
      resize,
      render,
      setMode,
      setWrapMode,
      resetRotation,
      onChange: changeNotifier.add,
      getState: () => ({
        mode: state.mode,
        wrapMode: state.wrapMode,
        rotation: { ...state.rotation },
        cssWidth: state.cssWidth,
        cssHeight: state.cssHeight,
        devicePixelRatio: state.devicePixelRatio,
      }),
      mapEventToScene,
      mapCssPointToScene,
    };
  }

  global.MathWorldsRendering = {
    createRenderController,
  };
})(typeof window !== "undefined" ? window : self);

