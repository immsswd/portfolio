document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector(".site-shell");
  const workspace = document.querySelector(".site-workspace");
  const sidebar = document.getElementById("site-sidebar");
  const resizeHandle = sidebar?.querySelector(".sidebar-resize");
  const sidebarToggleButtons = document.querySelectorAll(
    "[data-sidebar-toggle]",
  );

  if (shell && sidebar && sidebarToggleButtons.length > 0) {
    const setSidebarHidden = (isHidden) => {
      shell.classList.toggle("is-sidebar-hidden", isHidden);
      sidebarToggleButtons.forEach((button) => {
        const isShowButton = button.dataset.sidebarToggle === "show";
        button.hidden = isHidden ? !isShowButton : isShowButton;
        button.setAttribute("aria-expanded", String(!isHidden));
      });
    };

    sidebarToggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setSidebarHidden(button.dataset.sidebarToggle === "hide");
      });
    });

    setSidebarHidden(false);
  }

  if (workspace && resizeHandle) {
    const minimumWidth = 220;
    const mobileBreakpoint = window.matchMedia("(max-width: 720px)");
    const maximumWidth = () =>
      Math.max(minimumWidth, Math.floor(Math.min(460, workspace.clientWidth / 2)));
    const getSidebarWidth = () =>
      parseFloat(
        window
          .getComputedStyle(sidebar)
          .width,
      ) || 290;
    const setSidebarWidth = (requestedWidth) => {
      const maxWidth = maximumWidth();
      const width = Math.min(maxWidth, Math.max(minimumWidth, requestedWidth));
      document.documentElement.style.setProperty(
        "--shell-sidebar-width",
        `${width}px`,
      );
      resizeHandle.setAttribute("aria-valuemax", String(maxWidth));
      resizeHandle.setAttribute("aria-valuenow", String(width));
    };

    if (!mobileBreakpoint.matches) {
      setSidebarWidth(getSidebarWidth());
    }
    resizeHandle.addEventListener("pointerdown", (event) => {
      if (mobileBreakpoint.matches) return;

      event.preventDefault();
      resizeHandle.setPointerCapture(event.pointerId);
      document.body.classList.add("is-resizing-sidebar");
      setSidebarWidth(
        event.clientX - workspace.getBoundingClientRect().left,
      );
    });
    resizeHandle.addEventListener("pointermove", (event) => {
      if (!resizeHandle.hasPointerCapture(event.pointerId)) return;

      setSidebarWidth(
        event.clientX - workspace.getBoundingClientRect().left,
      );
    });

    const finishResize = (event) => {
      if (resizeHandle.hasPointerCapture(event.pointerId)) {
        resizeHandle.releasePointerCapture(event.pointerId);
      }
      document.body.classList.remove("is-resizing-sidebar");
    };

    resizeHandle.addEventListener("pointerup", finishResize);
    resizeHandle.addEventListener("pointercancel", finishResize);
    resizeHandle.addEventListener("keydown", (event) => {
      const currentWidth = getSidebarWidth();
      let requestedWidth;

      if (event.key === "ArrowLeft") {
        requestedWidth = currentWidth - 16;
      } else if (event.key === "ArrowRight") {
        requestedWidth = currentWidth + 16;
      } else if (event.key === "Home") {
        requestedWidth = minimumWidth;
      } else if (event.key === "End") {
        requestedWidth = maximumWidth();
      } else {
        return;
      }

      event.preventDefault();
      setSidebarWidth(requestedWidth);
    });
    window.addEventListener("resize", () => {
      if (
        !mobileBreakpoint.matches &&
        !shell?.classList.contains("is-sidebar-hidden")
      ) {
        setSidebarWidth(getSidebarWidth());
      }
    });
  }

  const mobileExplorer = document.querySelector(".mobile-explorer");

  if (mobileExplorer) {
    const mobileBreakpoint = window.matchMedia("(max-width: 720px)");
    const updateExplorer = () => {
      const isMobile = mobileBreakpoint.matches;
      mobileExplorer.open = !isMobile;

      document.querySelectorAll(".explorer__category").forEach((category) => {
        category.open = !isMobile || category.dataset.active === "true";
      });
    };

    updateExplorer();
    if (mobileBreakpoint.addEventListener) {
      mobileBreakpoint.addEventListener("change", updateExplorer);
    } else {
      mobileBreakpoint.addListener(updateExplorer);
    }
  }

  const scrollUpButton = document.getElementById("scrollUpBtn");

  if (scrollUpButton) {
    const updateScrollButton = () => {
      scrollUpButton.hidden = window.scrollY <= 240;
    };

    window.addEventListener("scroll", updateScrollButton, { passive: true });
    scrollUpButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    updateScrollButton();
  }

});
