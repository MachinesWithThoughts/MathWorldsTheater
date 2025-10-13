(function (global) {
  const {
    setupApp,
    createControlsSection,
    createButton,
    createSlider,
    createTextarea,
    createSelect,
    createStatusPill,
    observeElementSize,
  } = global.MathWorldsUI;
  const { createRenderController } = global.MathWorldsRendering;

  const presetCatalog = [
    {
      id: "koch-snowflake",
      name: "Koch Snowflake",
      description: "Classic triadic snowflake with 60° turns.",
      axiom: "F++F++F",
      rules: "F=F-F++F-F",
      angle: 60,
      iterations: 4,
      length: 5,
      initialAngle: 0,
    },
    {
      id: "dragon-curve",
      name: "Dragon Curve",
      description: "Heighway dragon folded strip pattern.",
      axiom: "FX",
      rules: "X=X+YF+\nY=-FX-Y",
      angle: 90,
      iterations: 10,
      length: 6,
      initialAngle: -45,
    },
    {
      id: "sierpinski-triangle",
      name: "Sierpinski Triangle",
      description: "Recursive triangular void fractal.",
      axiom: "F-G-G",
      rules: "F=F-G+F+G-F\nG=GG",
      angle: 120,
      iterations: 6,
      length: 6,
      initialAngle: 0,
    },
    {
      id: "gosper-island",
      name: "Gosper Island",
      description: "Also known as the flowsnake (Gosper curve).",
      axiom: "XF",
      rules: "X=X+YF++YF-FX--FXFX-YF+\nY=-FX+YFYF++YF+FX--FX-Y",
      angle: 60,
      iterations: 4,
      length: 7,
      initialAngle: 0,
    },
    {
      id: "levy-curve",
      name: "Levy C Curve",
      description: "Right-angle folding curve with 45° turns.",
      axiom: "F",
      rules: "F=+F--F+",
      angle: 45,
      iterations: 11,
      length: 4,
      initialAngle: -45,
    },
    {
      id: "fractal-plant",
      name: "Fractal Plant",
      description: "Bracketed L-system inspired by Prusinkiewicz.",
      axiom: "X",
      rules: "X=F+[[X]-X]-F[-FX]+X\nF=FF",
      angle: 25,
      iterations: 5,
      length: 7,
      initialAngle: -90,
    },
  ];

  const presetMap = Object.fromEntries(presetCatalog.map((preset) => [preset.id, preset]));
  const defaultPresetId = presetCatalog[0].id;
  const initialPreset = presetMap[defaultPresetId];

  const state = {
    axiom: initialPreset.axiom,
    rulesText: initialPreset.rules,
    angle: initialPreset.angle,
    iterations: initialPreset.iterations,
    segmentLength: initialPreset.length,
    initialAngle: initialPreset.initialAngle,
    path: [],
    renderMode: "euclidean",
    wrapMode: "none",
    activePresetId: defaultPresetId,
  };

  const { controlStack, stageInner } = setupApp({
    title: "Lindenmayer System Explorer",
    description: "Edit the grammar and parameters to visualize different L-systems.",
  });

  const canvas = document.createElement("canvas");
  canvas.className = "render-surface";
  stageInner.appendChild(canvas);

  const renderController = createRenderController(canvas, {
    background: "rgba(2, 6, 23, 0.94)",
  });
  renderController.setWrapMode(state.wrapMode);

  const offscreenCanvas = document.createElement("canvas");
  const ctx = offscreenCanvas.getContext("2d");

  function parseRules(text) {
    const lines = text
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    const rules = new Map();
    lines.forEach((line) => {
      const [lhs, rhs] = line.split("=");
      if (lhs && rhs) {
        rules.set(lhs.trim(), rhs.trim());
      }
    });
    return rules;
  }

  function generateSequence() {
    let sequence = state.axiom;
    const rules = parseRules(state.rulesText);
    for (let i = 0; i < state.iterations; i += 1) {
      let next = "";
      for (const char of sequence) {
        next += rules.get(char) ?? char;
      }
      sequence = next;
    }
    return sequence;
  }

  function renderPath() {
    const instructions = generateSequence();
    const pos = { x: 0, y: 0 };
    const stack = [];
    const vertices = [];
    const segmentLength = state.segmentLength;
    const angleStep = (state.angle * Math.PI) / 180;
    let angle = (state.initialAngle ?? -90) * (Math.PI / 180);
    vertices.push({ x: pos.x, y: pos.y });

    for (const token of instructions) {
      switch (token) {
        case "F":
        case "G": {
          pos.x += Math.cos(angle) * segmentLength;
          pos.y += Math.sin(angle) * segmentLength;
          vertices.push({ x: pos.x, y: pos.y });
          break;
        }
        case "+": {
          angle += angleStep;
          break;
        }
        case "-": {
          angle -= angleStep;
          break;
        }
        case "[": {
          stack.push({ x: pos.x, y: pos.y, angle });
          break;
        }
        case "]": {
          const saved = stack.pop();
          if (saved) {
            pos.x = saved.x;
            pos.y = saved.y;
            angle = saved.angle;
            vertices.push({ move: true, x: pos.x, y: pos.y });
          }
          break;
        }
        default:
          break;
      }
    }

    state.path = vertices;
  }

  function drawScene(targetCtx, { width, height }) {
    const pixelWidth = Math.max(1, Math.round(width));
    const pixelHeight = Math.max(1, Math.round(height));

    if (offscreenCanvas.width !== pixelWidth || offscreenCanvas.height !== pixelHeight) {
      offscreenCanvas.width = pixelWidth;
      offscreenCanvas.height = pixelHeight;
    }

    const ctx2d = ctx;
    ctx2d.setTransform(1, 0, 0, 1, 0, 0);
    ctx2d.fillStyle = "rgba(2, 6, 23, 0.94)";
    ctx2d.fillRect(0, 0, pixelWidth, pixelHeight);

    if (!state.path.length) {
      renderPath();
    }

    if (!state.path.length) {
      targetCtx.drawImage(offscreenCanvas, 0, 0, width, height);
      return;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    state.path.forEach((point) => {
      if (point.move) return;
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    });

    const padding = 32;
    const pathWidth = maxX - minX || 1;
    const pathHeight = maxY - minY || 1;

    const scale = Math.min(
      (pixelWidth - padding * 2) / pathWidth,
      (pixelHeight - padding * 2) / pathHeight,
    );

    const offsetX = (pixelWidth - pathWidth * scale) / 2 - minX * scale;
    const offsetY = (pixelHeight - pathHeight * scale) / 2 - minY * scale;

    ctx2d.strokeStyle = "rgba(56, 189, 248, 0.85)";
    ctx2d.lineWidth = 2;
    ctx2d.lineJoin = "round";
    ctx2d.lineCap = "round";

    ctx2d.beginPath();
    let first = true;
    state.path.forEach((point) => {
      if (point.move) {
        ctx2d.moveTo(point.x * scale + offsetX, point.y * scale + offsetY);
        first = true;
      } else {
        const x = point.x * scale + offsetX;
        const y = point.y * scale + offsetY;
        if (first) {
          ctx2d.moveTo(x, y);
          first = false;
        } else {
          ctx2d.lineTo(x, y);
        }
      }
    });
    ctx2d.stroke();

    targetCtx.drawImage(
      offscreenCanvas,
      0,
      0,
      pixelWidth,
      pixelHeight,
      0,
      0,
      width,
      height,
    );
  }

  function draw() {
    renderController.render((targetCtx, dimensions) => {
      drawScene(targetCtx, dimensions);
    });
  }

  function updatePath() {
    state.path = [];
    renderPath();
    draw();
  }

  const grammarSectionWrapper = createControlsSection("Grammar", "Edit the axiom and production rules.");
  const grammarSection = grammarSectionWrapper.element;
  const axiomInput = createTextarea({
    label: "Axiom",
    value: state.axiom,
    onChange: (value) => {
      state.axiom = value.trim();
      updatePath();
      reconcilePresetSelection();
    },
  });
  const rulesInput = createTextarea({
    label: "Rules (A=AB per line)",
    value: state.rulesText,
    onChange: (value) => {
      state.rulesText = value;
      updatePath();
      reconcilePresetSelection();
    },
  });
  grammarSectionWrapper.appendChild(axiomInput.wrapper);
  grammarSectionWrapper.appendChild(rulesInput.wrapper);
  controlStack.appendChild(grammarSection);

  const parametersSection = createControlsSection("Parameters", "Adjust angle, iterations, and segment length.");
  const parameters = parametersSection.element;
  const angleSlider = createSlider({
    label: "Angle",
    min: 0,
    max: 180,
    value: state.angle,
    onChange: (value) => {
      state.angle = Number(value);
      updatePath();
      reconcilePresetSelection();
    },
  });
  const iterationsSlider = createSlider({
    label: "Iterations",
    min: 0,
    max: 10,
    value: state.iterations,
    onChange: (value) => {
      state.iterations = Number(value);
      updatePath();
      reconcilePresetSelection();
    },
  });
  const lengthSlider = createSlider({
    label: "Segment Length",
    min: 1,
    max: 20,
    value: state.segmentLength,
    onChange: (value) => {
      state.segmentLength = Number(value);
      updatePath();
      reconcilePresetSelection();
    },
  });
  const initialAngleSlider = createSlider({
    label: "Initial Heading",
    min: -180,
    max: 180,
    value: state.initialAngle ?? -90,
    onChange: (value) => {
      state.initialAngle = Number(value);
      updatePath();
      reconcilePresetSelection();
    },
  });
  parametersSection.appendChild(angleSlider.wrapper);
  parametersSection.appendChild(iterationsSlider.wrapper);
  parametersSection.appendChild(lengthSlider.wrapper);
  parametersSection.appendChild(initialAngleSlider.wrapper);
  controlStack.appendChild(parameters);

  const presetsSectionWrapper = createControlsSection(
    "Presets",
    "Load curated grammars or continue with a custom configuration.",
  );
  const presetsSection = presetsSectionWrapper.element;

  const presetStatus = createStatusPill("");
  presetStatus.classList.add("preset-status-pill");

  const presetDescription = document.createElement("p");
  presetDescription.className = "note";

  const presetSelectControl = createSelect({
    label: "Preset",
    options: [
      ...presetCatalog.map((preset) => ({ value: preset.id, label: preset.name })),
      { value: "custom", label: "Custom (edited)" },
    ],
    value: state.activePresetId,
    onChange: (value) => {
      if (value === "custom") {
        state.activePresetId = "custom";
        syncPresetStatus();
      } else {
        applyPreset(value);
      }
    },
  });

  presetsSectionWrapper.appendChild(presetSelectControl.wrapper);
  presetsSectionWrapper.appendChild(presetStatus);
  presetsSectionWrapper.appendChild(presetDescription);
  controlStack.appendChild(presetsSection);

  const renderingSectionWrapper = createControlsSection(
    "Rendering",
    "Switch between Euclidean and spherical projections. Right-drag in spherical mode to rotate.",
  );
  const renderingSection = renderingSectionWrapper.element;
  const modeSelect = createSelect({
    label: "Mode",
    options: [
      { value: "euclidean", label: "Euclidean" },
      { value: "spherical", label: "Spherical" },
    ],
    value: state.renderMode,
    onChange: (value) => {
      state.renderMode = value;
      renderController.setMode(value);
      if (value === "spherical") {
        renderController.setWrapMode("full");
      } else {
        renderController.setWrapMode(state.wrapMode);
      }
      syncRenderingControls();
      draw();
    },
  });
  const wrapSelect = createSelect({
    label: "Euclidean Wrap",
    options: [
      { value: "none", label: "None" },
      { value: "horizontal", label: "Left-Right" },
      { value: "vertical", label: "Up-Down" },
      { value: "full", label: "Full" },
    ],
    value: state.wrapMode,
    onChange: (value) => {
      state.wrapMode = value;
      renderController.setWrapMode(value);
      draw();
    },
  });
  const resetRotationButton = createButton("Reset Rotation", () => {
    renderController.resetRotation();
    draw();
  });
  renderingSectionWrapper.appendChild(modeSelect.wrapper);
  renderingSectionWrapper.appendChild(wrapSelect.wrapper);
  renderingSectionWrapper.appendChild(resetRotationButton);
  controlStack.appendChild(renderingSection);

  function syncRenderingControls() {
    modeSelect.select.value = state.renderMode;
    wrapSelect.select.value = state.wrapMode;
    const disabled = state.renderMode === "spherical";
    wrapSelect.select.disabled = disabled;
    wrapSelect.wrapper.style.opacity = disabled ? "0.6" : "";
  }

  function applyPreset(presetId) {
    const preset = presetMap[presetId];
    if (!preset) {
      return;
    }

    state.axiom = preset.axiom;
    state.rulesText = preset.rules;
    state.angle = preset.angle;
    state.iterations = preset.iterations;
    state.segmentLength = preset.length;
    state.initialAngle = preset.initialAngle;
    state.activePresetId = presetId;

    axiomInput.textarea.value = state.axiom;
    rulesInput.textarea.value = state.rulesText;
    angleSlider.slider.value = String(state.angle);
    angleSlider.valueLabel.textContent = String(state.angle);
    iterationsSlider.slider.value = String(state.iterations);
    iterationsSlider.valueLabel.textContent = String(state.iterations);
    lengthSlider.slider.value = String(state.segmentLength);
    lengthSlider.valueLabel.textContent = String(state.segmentLength);
    initialAngleSlider.slider.value = String(state.initialAngle ?? -90);
    initialAngleSlider.valueLabel.textContent = String(state.initialAngle ?? -90);

    updatePath();
    syncPresetStatus();
  }

  function isUsingPreset(preset) {
    if (!preset) return false;
    return (
      state.axiom === preset.axiom &&
      state.rulesText === preset.rules &&
      state.angle === preset.angle &&
      state.iterations === preset.iterations &&
      state.segmentLength === preset.length &&
      (state.initialAngle ?? -90) === (preset.initialAngle ?? -90)
    );
  }

  function reconcilePresetSelection() {
    const matchedPreset = presetCatalog.find((preset) => isUsingPreset(preset));
    if (matchedPreset) {
      state.activePresetId = matchedPreset.id;
    } else {
      state.activePresetId = "custom";
    }

    syncPresetStatus();
  }

  function syncPresetStatus() {
    const preset = presetMap[state.activePresetId];
    if (presetSelectControl) {
      presetSelectControl.select.value = preset ? state.activePresetId : "custom";
    }

    if (preset) {
      presetStatus.textContent = preset.name;
      presetStatus.dataset.variant = "accent";
      presetDescription.textContent = preset.description;
    } else {
      presetStatus.textContent = "Custom configuration";
      presetStatus.dataset.variant = "neutral";
      presetDescription.textContent =
        "Current settings differ from curated presets. Continue editing or select a preset to restore a known grammar.";
    }
  }

  syncRenderingControls();
  syncPresetStatus();

  observeElementSize(stageInner, ({ width, height }) => {
    renderController.resize(width, height);
    draw();
  });

  renderPath();
  draw();

  renderController.onChange(draw);
})(window);
