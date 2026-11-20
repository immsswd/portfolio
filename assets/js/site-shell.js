document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector(".site-shell");
  const workspace = document.querySelector(".site-workspace");
  const sidebar = document.getElementById("site-sidebar");
  const resizeHandle = sidebar?.querySelector(".sidebar-resize");
  const resetSidebarWidthButton = sidebar?.querySelector(
    "[data-sidebar-width-reset]",
  );
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
    const widthPreferenceKey = "portfolio-sidebar-width";
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
    const getSavedSidebarWidth = () => {
      const savedWidth = Number(
        window.localStorage.getItem(widthPreferenceKey),
      );
      return Number.isFinite(savedWidth) && savedWidth >= minimumWidth
        ? savedWidth
        : null;
    };
    const saveSidebarWidth = () => {
      window.localStorage.setItem(
        widthPreferenceKey,
        String(getSidebarWidth()),
      );
    };

    if (!mobileBreakpoint.matches) {
      setSidebarWidth(getSavedSidebarWidth() ?? getSidebarWidth());
    }

    resetSidebarWidthButton?.addEventListener("click", () => {
      window.localStorage.removeItem(widthPreferenceKey);
      document.documentElement.style.removeProperty("--shell-sidebar-width");
      resizeHandle.setAttribute(
        "aria-valuemax",
        String(maximumWidth()),
      );
      resizeHandle.setAttribute(
        "aria-valuenow",
        String(Math.round(getSidebarWidth())),
      );
    });
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
        saveSidebarWidth();
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
      saveSidebarWidth();
    });
    window.addEventListener("resize", () => {
      if (
        !mobileBreakpoint.matches &&
        !shell?.classList.contains("is-sidebar-hidden")
      ) {
        setSidebarWidth(getSavedSidebarWidth() ?? getSidebarWidth());
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

  const articleLinks = document.querySelectorAll(".explorer__post");

  if (articleLinks.length > 0) {
    const tooltip = document.createElement("div");
    tooltip.id = "sidebar-article-tooltip";
    tooltip.className = "sidebar-article-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.hidden = true;
    document.body.append(tooltip);

    let activeArticleLink = null;
    const positionTooltip = () => {
      if (!activeArticleLink) return;

      const linkRect = activeArticleLink.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const gap = 8;
      const edge = 12;
      let left = linkRect.right + gap;

      if (left + tooltipRect.width > window.innerWidth - edge) {
        left = linkRect.left - tooltipRect.width - gap;
      }

      left = Math.max(
        edge,
        Math.min(left, window.innerWidth - tooltipRect.width - edge),
      );
      const top = Math.max(
        edge,
        Math.min(
          linkRect.top + (linkRect.height - tooltipRect.height) / 2,
          window.innerHeight - tooltipRect.height - edge,
        ),
      );

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    };
    const showTooltip = (link) => {
      const label = link.querySelector(".explorer__label");
      if (!label) return;

      if (activeArticleLink && activeArticleLink !== link) {
        activeArticleLink.removeAttribute("aria-describedby");
      }
      activeArticleLink = link;
      tooltip.textContent = label.textContent.trim();
      tooltip.hidden = false;
      link.setAttribute("aria-describedby", tooltip.id);
      positionTooltip();
      requestAnimationFrame(() => tooltip.classList.add("is-visible"));
    };
    const hideTooltip = (link) => {
      if (activeArticleLink !== link) return;
      if (link.matches(":hover") || link === document.activeElement) return;

      tooltip.classList.remove("is-visible");
      tooltip.hidden = true;
      link.removeAttribute("aria-describedby");
      activeArticleLink = null;
    };

    articleLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => showTooltip(link));
      link.addEventListener("mouseleave", () => hideTooltip(link));
      link.addEventListener("focus", () => showTooltip(link));
      link.addEventListener("blur", () => hideTooltip(link));
    });
    window.addEventListener("scroll", positionTooltip, true);
    window.addEventListener("resize", positionTooltip);
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
