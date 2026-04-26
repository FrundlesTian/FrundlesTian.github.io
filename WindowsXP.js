function getRequiredElement(id) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing required element: #${id}`);
  }

  return element;
}

const clock = getRequiredElement("clock-time");
const folderIcon = "res/icon/23.ico";
const textFileIcon = "res/icon/6.ico";
const cvIcon = "res/icon/270.ico";
const browserIcon = "res/icon/1481.ico";
const welcomeWindow = getRequiredElement("welcome-window");
const welcomeClose = getRequiredElement("welcome-close");
const welcomeExit = getRequiredElement("welcome-exit");
const explorerWindow = getRequiredElement("explorer-window");
const explorerTitle = getRequiredElement("explorer-title");
const explorerPath = getRequiredElement("explorer-path");
const explorerContent = getRequiredElement("explorer-content");
const explorerCount = getRequiredElement("explorer-count");
const explorerStatus = getRequiredElement("explorer-status");
const explorerBack = getRequiredElement("explorer-back");
const desktopIcons = getRequiredElement("desktop-icons");
const browserWindow = getRequiredElement("browser-window");
const browserTitle = getRequiredElement("browser-title");
const browserForm = getRequiredElement("browser-form");
const browserAddress = getRequiredElement("browser-address");
const browserFrame = getRequiredElement("browser-frame");
const browserStatus = getRequiredElement("browser-status");
const browserBack = getRequiredElement("browser-back");
const browserRefresh = getRequiredElement("browser-refresh");
const browserStop = getRequiredElement("browser-stop");
const browserHome = getRequiredElement("browser-home");

const fileSystem = {
  name: "folder",
  path: "folder",
  type: "folder",
  children: [
    {
      name: "Q&A",
      path: "folder/Q&A",
      type: "folder",
      children: [
        {
          name: "About.txt",
          path: "folder/Q&A/About.txt",
          type: "file",
        },
      ],
    },
    {
      name: "cv.pdf",
      path: "folder/cv.pdf",
      type: "file",
    },
  ],
};

const nodeByPath = new Map();
let currentNode = fileSystem;
let highestWindowZ = 1;

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

updateClock();
window.setInterval(updateClock, 30000);

function getIcon(node) {
  if (node.type === "app" && node.app === "browser") {
    return browserIcon;
  }

  if (node.type === "file" && node.name === "cv.pdf") {
    return cvIcon;
  }

  return node.type === "folder" ? folderIcon : textFileIcon;
}

function indexNodes(node, parent = null) {
  node.parent = parent;
  nodeByPath.set(node.path, node);
  getChildren(node).forEach((child) => indexNodes(child, node));
}

function getChildren(node) {
  return Array.isArray(node.children) ? node.children : [];
}

function itemCountText(count) {
  return `${count} ${count === 1 ? "item" : "items"}`;
}

function createIcon(node, className) {
  const icon = document.createElement("a");
  const image = document.createElement("img");
  const label = document.createElement("span");

  icon.className = className;
  icon.href = node.path;
  icon.dataset.path = node.path;
  image.src = getIcon(node);
  image.alt = "";
  label.textContent = node.name;
  icon.append(image, label);

  icon.addEventListener("click", (event) => {
    if (icon.dataset.dragged === "true") {
      event.preventDefault();
      icon.dataset.dragged = "false";
      return;
    }

    if (node.type === "folder") {
      event.preventDefault();
      openNode(node);
    } else if (node.type === "app" && node.app === "browser") {
      event.preventDefault();
      openBrowser();
    }
  });

  return icon;
}

function renderDesktop() {
  const desktopNodes = [
    ...getChildren(fileSystem),
    {
      name: "Internet exploer",
      path: "internet/home.html",
      type: "app",
      app: "browser",
    },
  ];
  const icons = desktopNodes.map((node, index) => {
    const icon = createIcon(node, "desktop-icon");
    icon.style.left = `${Math.floor(index / 6) * 94}px`;
    icon.style.top = `${(index % 6) * 106}px`;
    return icon;
  });

  desktopIcons.replaceChildren(...icons);
  icons.forEach((icon) => setupDraggableIcon(icon, desktopIcons));
}

function renderFolder(node) {
  currentNode = node;
  const children = getChildren(node);

  explorerTitle.textContent = node.name;
  explorerPath.textContent = node.path;
  explorerBack.disabled = !node.parent;
  explorerCount.textContent = itemCountText(children.length);
  explorerStatus.textContent = node.type === "folder" ? "Folder" : "File";

  const grid = document.createElement("div");
  grid.className = "file-grid";

  if (children.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "This folder is empty.";
    grid.append(emptyMessage);
  } else {
    children.forEach((child) => {
      const icon = createIcon(child, "file-item");
      grid.append(icon);
      setupDraggableIcon(icon, grid);
    });
  }

  explorerContent.replaceChildren(grid);
}

function renderFile(node) {
  currentNode = node;
  explorerTitle.textContent = node.name;
  explorerPath.textContent = node.path;
  explorerBack.disabled = !node.parent;
  explorerCount.textContent = "1 item";
  explorerStatus.textContent = "File preview";

  const preview = document.createElement("div");
  preview.className = "file-preview";

  const iframe = document.createElement("iframe");
  iframe.src = node.path;
  iframe.title = node.name;
  preview.append(iframe);
  explorerContent.replaceChildren(preview);
}

function showExplorer() {
  showWindow(explorerWindow);
}

function openNode(node) {
  if (node.type === "folder") {
    renderFolder(node);
    showExplorer();
  } else {
    window.location.href = node.path;
  }
}

function showWindow(windowElement) {
  const taskbarButton = document.querySelector(
    `[data-window-target="${windowElement.id}"]`,
  );

  windowElement.classList.remove("is-minimized", "is-closed");
  windowElement.style.zIndex = String(++highestWindowZ);
  taskbarButton?.classList.remove("is-hidden");
  taskbarButton?.classList.add("is-active");
}

function openBrowser() {
  showWindow(browserWindow);
  browserAddress.focus();
  browserAddress.select();
}

function getInternetCandidates(value) {
  const compact = value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\.html?$/i, "")
    .replace(/[^a-z0-9_-]+/g, "");

  const words = value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\.html?/gi, "")
    .split(/[^a-z0-9_-]+/)
    .filter(Boolean)
    .filter((word) => !["com", "net", "org", "html", "www"].includes(word));

  return [...new Set([...words, compact].filter(Boolean))];
}

function setBrowserPage(slug) {
  const page = slug || "home";
  const pagePath = `internet/${page}.html`;

  browserTitle.textContent = `Internet exploer - ${page}`;
  browserAddress.value = page === "home" ? "about:home" : `https://${page}/`;
  browserFrame.src = pagePath;
  browserStatus.textContent = "Done";
}

async function openInternetAddress(value) {
  const candidates = getInternetCandidates(value);
  const fallbackSlug = candidates[0] || "";

  if (!fallbackSlug) {
    setBrowserPage("home");
    return;
  }

  browserStatus.textContent = `Looking for ${candidates.join(", ")}...`;

  for (const slug of candidates) {
    const pagePath = `internet/${slug}.html`;

    try {
      const response = await fetch(pagePath, { method: "HEAD" });

      if (response.ok) {
        setBrowserPage(slug);
        return;
      }
    } catch (_error) {
      // Keep trying other trigger words; the final fallback shows not found.
    }
  }

  browserTitle.textContent = "Cannot find server";
  browserAddress.value = `https://${fallbackSlug}/`;
  browserFrame.src = `internet/not-found.html?missing=${encodeURIComponent(
    fallbackSlug,
  )}`;
  browserStatus.textContent = "Done";
}

browserForm.addEventListener("submit", (event) => {
  event.preventDefault();
  openInternetAddress(browserAddress.value);
});

browserBack.addEventListener("click", () => {
  browserFrame.contentWindow?.history.back();
});

browserRefresh.addEventListener("click", () => {
  browserFrame.contentWindow?.location.reload();
});

browserStop.addEventListener("click", () => {
  browserFrame.contentWindow?.stop();
  browserStatus.textContent = "Stopped";
});

browserHome.addEventListener("click", () => {
  setBrowserPage("home");
});

welcomeClose.addEventListener("click", () => {
  const taskbarButton = document.querySelector(
    '[data-window-target="welcome-window"]',
  );

  welcomeWindow.classList.add("is-closed");
  welcomeWindow.classList.remove("is-minimized");
  taskbarButton?.classList.add("is-hidden");
});

welcomeExit.addEventListener("click", () => {
  window.close();

  if (!window.closed) {
    window.location.href = "about:blank";
  }
});

function setupDraggableIcon(icon, boundaryElement) {
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;
  let hasMoved = false;

  function getCurrentPosition() {
    if (icon.classList.contains("desktop-icon")) {
      return {
        x: Number.parseFloat(icon.style.left) || 0,
        y: Number.parseFloat(icon.style.top) || 0,
      };
    }

    return {
      x: Number.parseFloat(icon.dataset.offsetX) || 0,
      y: Number.parseFloat(icon.dataset.offsetY) || 0,
    };
  }

  function setCurrentPosition(x, y) {
    if (icon.classList.contains("desktop-icon")) {
      icon.style.left = `${x}px`;
      icon.style.top = `${y}px`;
    } else {
      icon.dataset.offsetX = String(x);
      icon.dataset.offsetY = String(y);
      icon.style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  icon.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    const position = getCurrentPosition();
    startX = event.clientX;
    startY = event.clientY;
    originX = position.x;
    originY = position.y;
    hasMoved = false;
    icon.classList.add("is-icon-dragging");
    icon.setPointerCapture(event.pointerId);
  });

  icon.addEventListener("pointermove", (event) => {
    if (!icon.hasPointerCapture(event.pointerId)) {
      return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
      hasMoved = true;
    }

    const maxX = Math.max(0, boundaryElement.clientWidth - icon.offsetWidth);
    const maxY = Math.max(0, boundaryElement.clientHeight - icon.offsetHeight);
    const nextX = Math.min(Math.max(0, originX + deltaX), maxX);
    const nextY = Math.min(Math.max(0, originY + deltaY), maxY);
    setCurrentPosition(nextX, nextY);
  });

  function finishDrag(event) {
    if (icon.hasPointerCapture(event.pointerId)) {
      icon.releasePointerCapture(event.pointerId);
    }

    icon.classList.remove("is-icon-dragging");

    if (hasMoved) {
      icon.dataset.dragged = "true";
    }
  }

  icon.addEventListener("pointerup", finishDrag);
  icon.addEventListener("pointercancel", finishDrag);
}

explorerBack.addEventListener("click", () => {
  if (currentNode.parent) {
    openNode(currentNode.parent);
  }
});

function setupWindowControls(windowElement) {
  const titleBar = windowElement.querySelector(".title-bar");
  const minimizeButton = windowElement.querySelector('[aria-label="Minimize"]');
  const maximizeButton = windowElement.querySelector('[aria-label="Maximize"]');
  const closeButton = windowElement.querySelector('[aria-label="Close"]');
  const taskbarButton = document.querySelector(
    `[data-window-target="${windowElement.id}"]`,
  );
  let previousBounds = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  function keepInsideDesktop(left, top) {
    const maxLeft =
      document.documentElement.clientWidth - windowElement.offsetWidth;
    const maxTop =
      document.documentElement.clientHeight - windowElement.offsetHeight - 32;

    return {
      left: Math.min(Math.max(0, left), Math.max(0, maxLeft)),
      top: Math.min(Math.max(0, top), Math.max(0, maxTop)),
    };
  }

  titleBar.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".title-bar-controls")) {
      return;
    }

    if (windowElement.classList.contains("is-maximized")) {
      return;
    }

    const rect = windowElement.getBoundingClientRect();
    windowElement.style.zIndex = String(++highestWindowZ);
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;

    windowElement.classList.add("is-dragging");
    windowElement.style.left = `${rect.left}px`;
    windowElement.style.top = `${rect.top}px`;
    windowElement.style.right = "auto";
    windowElement.style.transform = "none";
    windowElement.style.position = "absolute";
    titleBar.setPointerCapture(event.pointerId);
  });

  titleBar.addEventListener("pointermove", (event) => {
    if (!titleBar.hasPointerCapture(event.pointerId)) {
      return;
    }

    const position = keepInsideDesktop(
      event.clientX - dragOffsetX,
      event.clientY - dragOffsetY,
    );
    windowElement.style.left = `${position.left}px`;
    windowElement.style.top = `${position.top}px`;
  });

  titleBar.addEventListener("pointerup", (event) => {
    if (titleBar.hasPointerCapture(event.pointerId)) {
      titleBar.releasePointerCapture(event.pointerId);
    }

    windowElement.classList.remove("is-dragging");
  });

  titleBar.addEventListener("pointercancel", (event) => {
    if (titleBar.hasPointerCapture(event.pointerId)) {
      titleBar.releasePointerCapture(event.pointerId);
    }

    windowElement.classList.remove("is-dragging");
  });

  function restoreWindow() {
    showWindow(windowElement);
  }

  function maximizeWindow() {
    const rect = windowElement.getBoundingClientRect();
    previousBounds = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      right: windowElement.style.right,
    };

    windowElement.classList.add("is-maximized");
    windowElement.style.left = "0px";
    windowElement.style.top = "0px";
    windowElement.style.right = "auto";
    windowElement.style.width = "100vw";
    maximizeButton?.setAttribute("aria-label", "Restore");
  }

  function restoreFromMaximize() {
    windowElement.classList.remove("is-maximized");

    if (previousBounds) {
      windowElement.style.left = `${previousBounds.left}px`;
      windowElement.style.top = `${previousBounds.top}px`;
      windowElement.style.right = previousBounds.right || "auto";
      windowElement.style.width = `${previousBounds.width}px`;
    }

    maximizeButton?.setAttribute("aria-label", "Maximize");
  }

  minimizeButton?.addEventListener("click", () => {
    windowElement.classList.add("is-minimized");
    taskbarButton?.classList.remove("is-active");
  });

  maximizeButton?.addEventListener("click", () => {
    if (windowElement.classList.contains("is-maximized")) {
      restoreFromMaximize();
    } else {
      maximizeWindow();
    }
  });

  closeButton?.addEventListener("click", () => {
    windowElement.classList.add("is-closed");
    windowElement.classList.remove("is-minimized");
    taskbarButton?.classList.add("is-hidden");
  });

  taskbarButton?.addEventListener("click", () => {
    restoreWindow();
  });

  titleBar.addEventListener("dblclick", (event) => {
    if (event.target.closest(".title-bar-controls")) {
      return;
    }

    if (windowElement.classList.contains("is-maximized")) {
      restoreFromMaximize();
    } else {
      maximizeWindow();
    }
  });
}

indexNodes(fileSystem);
renderDesktop();
renderFolder(fileSystem);
document.querySelectorAll(".window").forEach(setupWindowControls);
