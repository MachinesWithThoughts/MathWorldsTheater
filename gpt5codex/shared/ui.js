(function (global) {
  "use strict";

  if (global.MathWorldsUI) {
    return;
  }

  function setupApp({ title, description }) {
    const root = document.getElementById("app");
    if (!root) {
      throw new Error("Expected #app root element to exist");
    }

    root.classList.add("app-shell");

    const controlsPanel = document.createElement("aside");
    controlsPanel.className = "controls-panel";

    const heading = document.createElement("h1");
    heading.textContent = title;

    controlsPanel.appendChild(heading);

    if (description) {
      const desc = document.createElement("p");
      desc.className = "description";
      desc.textContent = description;
      controlsPanel.appendChild(desc);
    }

    const controlStack = document.createElement("div");
    controlStack.className = "controls-grid";
    controlsPanel.appendChild(controlStack);

    const stage = document.createElement("section");
    stage.className = "canvas-stage";

    const stageInner = document.createElement("div");
    stageInner.className = "stage-inner";
    stage.appendChild(stageInner);

    root.appendChild(controlsPanel);
    root.appendChild(stage);

    return { root, controlsPanel, controlStack, stage, stageInner };
  }

  function createControlsSection(title, description, options = {}) {
    const section = document.createElement("section");
    section.className = "controls-section";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "section-toggle";
    toggle.setAttribute("aria-expanded", "true");

    const heading = document.createElement("h2");
    heading.className = "section-title";
    heading.textContent = title;

    const icon = document.createElement("span");
    icon.className = "section-toggle-icon";
    icon.textContent = "▾";

    toggle.appendChild(heading);
    toggle.appendChild(icon);
    section.appendChild(toggle);

    const content = document.createElement("div");
    content.className = "section-content";

    if (description) {
      const note = document.createElement("p");
      note.className = "note";
      note.textContent = description;
      content.appendChild(note);
    }

    section.appendChild(content);

    const defaultCollapsed = Boolean(options.collapsed);
    let collapsed = defaultCollapsed;

    function ensureContentHeight() {
      if (!collapsed) {
        const scrollHeight = content.scrollHeight;
        content.style.maxHeight = `${scrollHeight}px`;
      }
    }

    function applyCollapsedState(value) {
      collapsed = value;
      section.classList.toggle("collapsed", collapsed);
      toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
      icon.textContent = collapsed ? "▸" : "▾";
      if (collapsed) {
        content.style.maxHeight = "0";
      } else {
        ensureContentHeight();
      }
    }

    requestAnimationFrame(() => {
      if (!collapsed) {
        applyCollapsedState(false);
      }
    });

    toggle.addEventListener("click", () => {
      applyCollapsedState(!collapsed);
      if (options.onToggle) {
        options.onToggle(!collapsed ? "expanded" : "collapsed");
      }
    });

    return {
      element: section,
      content,
      appendChild(child) {
        content.appendChild(child);
        ensureContentHeight();
        return child;
      },
      setCollapsed(value) {
        applyCollapsedState(Boolean(value));
      },
      isCollapsed() {
        return collapsed;
      },
    };
  }

  function createButton(label, onClick, { variant } = {}) {
    const button = document.createElement("button");
    button.className = "control-button";
    button.type = "button";
    button.textContent = label;

    if (variant) {
      button.dataset.variant = variant;
    }

    button.addEventListener("click", onClick);
    return button;
  }

  function createSlider({ label, min = 0, max = 100, step = 1, value = 0, onChange }) {
    const wrapper = document.createElement("label");
    wrapper.className = "slider";

    const title = document.createElement("span");
    title.textContent = label;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(min);
    slider.max = String(max);
    slider.step = String(step);
    slider.value = String(value);

    const valueLabel = document.createElement("span");
    valueLabel.className = "value";
    valueLabel.textContent = String(value);

    slider.addEventListener("input", (event) => {
      const newValue = Number(event.target.value);
      valueLabel.textContent = String(newValue);
      if (onChange) {
        onChange(newValue);
      }
    });

    wrapper.appendChild(title);
    wrapper.appendChild(slider);
    wrapper.appendChild(valueLabel);

    return { wrapper, slider, valueLabel };
  }

  function createTextarea({ label, value = "", onChange, monospace = true }) {
    const wrapper = document.createElement("label");
    wrapper.className = "slider";

    const title = document.createElement("span");
    title.textContent = label;

    const textarea = document.createElement("textarea");
    textarea.className = "control-textarea";
    textarea.value = value;

    if (!monospace) {
      textarea.style.fontFamily = "inherit";
    }

    textarea.addEventListener("input", (event) => {
      if (onChange) {
        onChange(event.target.value);
      }
    });

    wrapper.appendChild(title);
    wrapper.appendChild(textarea);

    return { wrapper, textarea };
  }

  function createSelect({ label, options = [], value, onChange }) {
    const wrapper = document.createElement("label");
    wrapper.className = "select-control";

    const title = document.createElement("span");
    title.textContent = label;

    const select = document.createElement("select");
    select.className = "control-select";

    options.forEach((option) => {
      const optionElement = document.createElement("option");
      if (typeof option === "string") {
        optionElement.value = option;
        optionElement.textContent = option;
      } else {
        optionElement.value = option.value;
        optionElement.textContent = option.label ?? option.value;
        if (option.disabled) {
          optionElement.disabled = true;
        }
      }

      select.appendChild(optionElement);
    });

    if (value !== undefined) {
      select.value = value;
    }

    select.addEventListener("change", (event) => {
      if (onChange) {
        onChange(event.target.value);
      }
    });

    wrapper.appendChild(title);
    wrapper.appendChild(select);

    return { wrapper, select };
  }

  function createStatusPill(label) {
    const pill = document.createElement("span");
    pill.className = "status-pill";
    pill.textContent = label;
    return pill;
  }

  function createHotKeys(keys) {
    const container = document.createElement("div");
    container.className = "hot-keys";
    keys.forEach((key) => {
      const span = document.createElement("span");
      span.textContent = key;
      container.appendChild(span);
    });
    return container;
  }

  function observeElementSize(element, callback) {
    const notify = ({ width, height }) => {
      if (width === 0 && height === 0) {
        return;
      }
      callback({ width, height });
    };

    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const { width, height } = entry.contentRect;
            notify({ width, height });
          });
        })
      : null;

    if (observer) {
      observer.observe(element);
    } else {
      global.addEventListener("resize", () => {
        const rect = element.getBoundingClientRect();
        notify({ width: rect.width, height: rect.height });
      });
    }

    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      notify({ width: rect.width, height: rect.height });
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }

  global.MathWorldsUI = {
    setupApp,
    createControlsSection,
    createButton,
    createSlider,
    createTextarea,
    createSelect,
    createStatusPill,
    createHotKeys,
    observeElementSize,
  };
})(typeof window !== "undefined" ? window : self);

