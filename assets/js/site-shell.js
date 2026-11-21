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
    const sidebarVisibilityKey = "portfolio-sidebar-hidden";
    const mobileBreakpoint = window.matchMedia("(max-width: 720px)");
    const getSavedSidebarHidden = () =>
      !mobileBreakpoint.matches &&
      window.localStorage.getItem(sidebarVisibilityKey) === "true";
    const setSidebarHidden = (isHidden) => {
      shell.classList.toggle("is-sidebar-hidden", isHidden);
      sidebarToggleButtons.forEach((button) => {
        const isShowButton = button.dataset.sidebarToggle === "show";
        button.hidden = isHidden ? !isShowButton : isShowButton;
        button.setAttribute("aria-expanded", String(!isHidden));
      });
      if (!mobileBreakpoint.matches) {
        window.localStorage.setItem(
          sidebarVisibilityKey,
          String(isHidden),
        );
      }
    };

    sidebarToggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setSidebarHidden(button.dataset.sidebarToggle === "hide");
      });
    });

    setSidebarHidden(getSavedSidebarHidden());

    const syncSidebarVisibility = () => {
      if (mobileBreakpoint.matches) {
        shell.classList.remove("is-sidebar-hidden");
        sidebarToggleButtons.forEach((button) => {
          const isShowButton = button.dataset.sidebarToggle === "show";
          button.hidden = isShowButton;
          button.setAttribute("aria-expanded", "true");
        });
      } else {
        setSidebarHidden(getSavedSidebarHidden());
      }
    };

    if (mobileBreakpoint.addEventListener) {
      mobileBreakpoint.addEventListener("change", syncSidebarVisibility);
    } else {
      mobileBreakpoint.addListener(syncSidebarVisibility);
    }
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

  const explorerCollapseButton = document.querySelector(
    "[data-explorer-collapse-all]",
  );

  if (explorerCollapseButton) {
    const folderDetails = Array.from(
      document.querySelectorAll(".explorer__category, .explorer__year"),
    );
    const updateCollapseButton = () => {
      const openFolders = folderDetails.filter((details) => details.open);
      const allCollapsed = openFolders.length === 0;

      explorerCollapseButton.setAttribute(
        "aria-label",
        allCollapsed ? "Expand all folders" : "Collapse all folders",
      );
      explorerCollapseButton.title = allCollapsed
        ? "Expand all folders"
        : "Collapse all folders";
      explorerCollapseButton.innerHTML = allCollapsed
        ? '<svg class="explorer__collapse-all-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12v9H4zM4 6l1.5-2h9L16 6M7.5 10.5h5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg class="explorer__collapse-all-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 5.5h13M6.5 10h7M8.5 14.5h3" fill="none" stroke="currentColor" stroke-linecap="round"/></svg>';
    };

    explorerCollapseButton.addEventListener("click", () => {
      const shouldCollapse = folderDetails.some((details) => details.open);
      folderDetails.forEach((details) => {
        details.open = !shouldCollapse;
      });
      updateCollapseButton();
    });

    folderDetails.forEach((details) => {
      details.addEventListener("toggle", updateCollapseButton);
    });
    updateCollapseButton();
  }

  const searchInput = document.querySelector(".explorer__search-input");
  const searchClear = document.querySelector(".explorer__search-clear");
  const searchResults = document.querySelector(".explorer__search-results");
  const searchToggle = document.querySelector("[data-explorer-search-toggle]");
  const searchPanel = document.querySelector(".explorer__search-panel");

  if (
    searchInput &&
    searchClear &&
    searchResults &&
    searchToggle &&
    searchPanel
  ) {
    const closeSearchPanel = () => {
      searchResults.hidden = true;
      searchPanel.hidden = true;
      searchToggle.setAttribute("aria-expanded", "false");
      searchInput.setAttribute("aria-expanded", "false");
      searchInput.blur();
    };

    searchToggle.addEventListener("click", () => {
      const willOpen = searchPanel.hidden;
      searchPanel.hidden = !willOpen;
      searchToggle.setAttribute("aria-expanded", String(willOpen));

      if (willOpen) {
        searchInput.focus();
      } else {
        closeSearchPanel();
      }
    });
    const postLinks = Array.from(document.querySelectorAll(".explorer__post"));
    const posts = postLinks.map((link) => {
      const category = link.closest(".explorer__category")?.querySelector(
        ":scope > .explorer__summary .explorer__label",
      )?.textContent.trim() || "";
      const year = link.closest(".explorer__year")?.querySelector(
        ":scope > .explorer__summary .explorer__label",
      )?.textContent.trim() || "";

      return {
        title: link.querySelector(".explorer__label")?.textContent.trim() || "",
        href: link.getAttribute("href") || "",
        category,
        year,
      };
    });
    let highlightedIndex = -1;

    const closeSearch = () => {
      searchResults.hidden = true;
      searchInput.setAttribute("aria-expanded", "false");
      highlightedIndex = -1;
    };

    const highlightResult = (index) => {
      const results = Array.from(
        searchResults.querySelectorAll(".explorer__search-result"),
      );
      highlightedIndex = results.length === 0
        ? -1
        : (index + results.length) % results.length;

      results.forEach((result, resultIndex) => {
        result.classList.toggle(
          "is-highlighted",
          resultIndex === highlightedIndex,
        );
      });
    };

    const renderSearch = () => {
      const query = searchInput.value.trim().toLowerCase();
      searchClear.hidden = query.length === 0;
      highlightedIndex = -1;

      if (!query) {
        closeSearch();
        return;
      }

      const matches = posts
        .map((post) => {
          const title = post.title.toLowerCase();
          const category = post.category.toLowerCase();
          const year = post.year.toLowerCase();
          let score = 0;

          if (title === query) score += 100;
          if (title.startsWith(query)) score += 40;
          if (title.includes(query)) score += 20;
          if (category.includes(query)) score += 12;
          if (year.includes(query)) score += 8;

          return { post, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) =>
          b.score - a.score ||
          b.post.year.localeCompare(a.post.year) ||
          a.post.title.localeCompare(b.post.title)
        )
        .slice(0, 8);

      searchResults.replaceChildren();

      if (matches.length === 0) {
        const empty = document.createElement("div");
        empty.className = "explorer__search-empty";
        empty.textContent = "No matching posts";
        searchResults.append(empty);
      } else {
        matches.forEach(({ post }) => {
          const result = document.createElement("a");
          result.className = "explorer__search-result";
          result.href = post.href;
          result.setAttribute("role", "option");
          result.title = post.title;
          result.setAttribute("aria-label", post.title);

          const title = document.createElement("span");
          title.className = "explorer__search-result-title";
          title.textContent = post.title;

          const meta = document.createElement("span");
          meta.className = "explorer__search-result-meta";
          meta.textContent = [post.category, post.year].filter(Boolean).join(" · ");

          result.append(title, meta);
          searchResults.append(result);
        });
      }

      searchResults.hidden = false;
      searchInput.setAttribute("aria-expanded", "true");
    };

    searchInput.addEventListener("input", renderSearch);
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        searchInput.value = "";
        searchClear.hidden = true;
        closeSearchPanel();
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (searchResults.hidden) renderSearch();
        highlightResult(
          event.key === "ArrowDown" ? highlightedIndex + 1 : highlightedIndex - 1,
        );
      } else if (event.key === "Enter" && highlightedIndex >= 0) {
        event.preventDefault();
        searchResults
          .querySelectorAll(".explorer__search-result")
          [highlightedIndex]?.click();
      }
    });

    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      searchClear.hidden = true;
      closeSearch();
      searchInput.focus();
    });

    document.addEventListener("pointerdown", (event) => {
      if (
        !event.target.closest(".explorer__search") &&
        !event.target.closest("[data-explorer-search-toggle]")
      ) {
        closeSearchPanel();
      }
    });
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
