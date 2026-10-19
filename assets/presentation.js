(() => {
  const main = document.querySelector(".presentation");
  const header = main?.querySelector(".presentation-header");
  const content = main?.querySelector(".presentation-content");
  const deck = main?.querySelector(".presentation-deck");
  const slideMap = main?.querySelector("[data-presentation-slide-map]");
  const controls = main?.querySelector(".presentation-controls");
  const previousButton = controls?.querySelector("[data-presentation-previous]");
  const nextButton = controls?.querySelector("[data-presentation-next]");
  const counter = controls?.querySelector(".presentation-counter");
  const jumpForm = controls?.querySelector("[data-presentation-jump-form]");
  const jumpInput = controls?.querySelector("[data-presentation-jump]");
  const jumpButton = jumpForm?.querySelector("button[type='submit']");
  const pageIndicator = main?.querySelector(".presentation-page-indicator");
  const imageViewer = document.querySelector(".presentation-image-viewer");
  const imageViewerImage = imageViewer?.querySelector(
    ".presentation-image-viewer-image",
  );
  const imageViewerClose = imageViewer?.querySelector(
    ".presentation-image-viewer-close",
  );
  const imageViewerZoom = imageViewer?.querySelector(
    ".presentation-image-viewer-zoom",
  );
  const slideOrder = main?.dataset.slideOrder || "auto";

  if (
    !main ||
    !header ||
    !content ||
    !deck ||
    !controls ||
    !previousButton ||
    !nextButton ||
    !counter ||
    !(jumpForm instanceof HTMLFormElement) ||
    !(jumpInput instanceof HTMLInputElement) ||
    !(jumpButton instanceof HTMLButtonElement) ||
    !pageIndicator
  ) {
    return;
  }

  if (
    !(imageViewer instanceof HTMLDialogElement) ||
    !imageViewerImage ||
    !imageViewerClose ||
    !imageViewerZoom
  ) {
    console.error("Presentation image viewer markup is missing or unsupported.");
    return;
  }

  if (!["auto", "content_first", "images_first"].includes(slideOrder)) {
    console.error(
      `Invalid slide_order "${slideOrder}". Use auto, content_first, or images_first.`,
    );
    return;
  }

  const normalizeHeading = (heading) =>
    heading.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase();
  const imageAlignments = ["left", "middle", "center", "right"];
  const imageSizes = ["default", "very-small", "small", "medium", "large"];
  const pptSlides = new Map();

  for (const entry of slideMap?.children ?? []) {
    const heading = entry.dataset.slideHeading?.trim();
    const image = entry.dataset.slideImage?.trim();

    if (!heading || !image) {
      console.error("Each ppt_slides entry needs a heading and image path.");
      return;
    }

    const align = entry.dataset.imageAlign || "center";
    const size = entry.dataset.imageSize || "default";
    if (
      !imageAlignments.includes(align) ||
      !imageSizes.includes(size)
    ) {
      console.error(
        `Invalid image options for PowerPoint slide "${heading}". ` +
          `Use align=${imageAlignments.join("|")} and size=${imageSizes.join("|")}.`,
      );
      return;
    }

    const key = normalizeHeading(heading);
    if (pptSlides.has(key)) {
      console.error(`Duplicate PowerPoint slide heading: "${heading}".`);
      return;
    }

    pptSlides.set(key, { heading, image, align, size });
  }

  const groups = [[]];
  const hasContent = (nodes) =>
    nodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE || Boolean(node.textContent.trim()),
    );

  for (const node of Array.from(content.childNodes)) {
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "HR") {
      if (hasContent(groups[groups.length - 1])) {
        groups.push([]);
      }
      continue;
    }

    if (
      node.nodeType === Node.ELEMENT_NODE &&
      /^H[1-2]$/.test(node.nodeName) &&
      hasContent(groups[groups.length - 1])
    ) {
      groups.push([]);
    }

    groups[groups.length - 1].push(node);
  }

  const slidesContent = groups.filter(hasContent);

  if (slidesContent.length === 0) {
    content.remove();
    deck.append(header);
    controls.hidden = false;
    counter.textContent = "Slide 1 of 1";
    jumpInput.value = "1";
    jumpInput.max = "1";
    jumpInput.disabled = true;
    jumpButton.disabled = true;
    pageIndicator.textContent = "01 / 01";
    pageIndicator.setAttribute("aria-label", "Slide 1 of 1");
    pageIndicator.hidden = false;
    previousButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  const titleSlide = document.createElement("section");
  titleSlide.className = "presentation-slide";
  titleSlide.setAttribute("aria-label", "Title slide");
  titleSlide.append(header);

  const contentSlides = slidesContent.map((nodes, index) => {
    const slide = document.createElement("section");
    slide.className = "presentation-slide";
    slide.setAttribute("aria-label", `Slide ${index + 1} of ${slidesContent.length}`);
    slide.hidden = true;

    const sectionHeading = nodes.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        /^H[1-6]$/.test(node.nodeName),
    );
    const heading =
      sectionHeading?.textContent.trim() ||
      undefined;
    const pptSlide = heading
      ? pptSlides.get(normalizeHeading(heading))
      : undefined;

    const slideContent = document.createElement("article");
    slideContent.className = content.className;
    slideContent.append(...nodes);
    slide.append(slideContent);

    return { slide, pptSlide };
  });

  const createPptSlide = (pptSlide) => {
    const slide = document.createElement("section");
    slide.className = "presentation-slide is-ppt-slide";
    slide.setAttribute("aria-label", `PowerPoint slide: ${pptSlide.heading}`);
    slide.hidden = true;

    const image = document.createElement("img");
    image.className = "presentation-ppt-slide-image";
    image.classList.add(
      `presentation-image--${pptSlide.align}`,
      `presentation-image--${pptSlide.size}`,
    );
    image.src = pptSlide.image;
    image.alt = pptSlide.heading;
    image.addEventListener(
      "error",
      () => {
        console.error(`Could not load PowerPoint slide image: ${pptSlide.image}`);
      },
      { once: true },
    );
    slide.append(image);
    return slide;
  };

  const pptSlideEntries = Array.from(pptSlides.entries());
  let orderedSlides;

  if (slideOrder === "content_first") {
    orderedSlides = [
      ...contentSlides.map(({ slide }) => slide),
      ...pptSlideEntries.map(([, pptSlide]) => createPptSlide(pptSlide)),
    ];
  } else if (slideOrder === "images_first") {
    orderedSlides = [
      ...pptSlideEntries.map(([, pptSlide]) => createPptSlide(pptSlide)),
      ...contentSlides.map(({ slide }) => slide),
    ];
  } else {
    const matchedPptSlides = new Set();
    orderedSlides = contentSlides.map(({ slide, pptSlide }) => {
      if (!pptSlide) {
        return slide;
      }

      matchedPptSlides.add(normalizeHeading(pptSlide.heading));
      return createPptSlide(pptSlide);
    });
    orderedSlides.push(
      ...pptSlideEntries
        .filter(([heading]) => !matchedPptSlides.has(heading))
        .map(([, pptSlide]) => createPptSlide(pptSlide)),
    );
  }

  const slides = [titleSlide, ...orderedSlides];
  deck.append(...slides);
  deck.querySelectorAll("img").forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute(
      "aria-label",
      `Open image${image.alt ? `: ${image.alt}` : ""}`,
    );
  });
  slides.forEach((slide, index) => {
    slide.setAttribute(
      "aria-label",
      slide === titleSlide
        ? "Title slide"
        : `Slide ${index + 1} of ${slides.length}`,
    );
  });

  content.remove();
  controls.hidden = false;
  jumpInput.min = "1";
  jumpInput.max = String(slides.length);
  jumpInput.value = "1";
  jumpInput.disabled = slides.length === 1;
  jumpButton.disabled = slides.length === 1;
  pageIndicator.hidden = false;

  let imageViewerOpener = null;

  function openImageViewer(image) {
    imageViewerImage.src = image.currentSrc || image.src;
    imageViewerImage.alt = image.alt;
    imageViewer.classList.remove("is-actual-size");
    imageViewerZoom.textContent = "Actual size";
    imageViewerZoom.setAttribute("aria-label", "View image at actual size");
    imageViewer.scrollTo({ top: 0, left: 0, behavior: "instant" });
    imageViewerOpener = image;
    imageViewer.showModal();
    imageViewerClose.focus();
  }

  function closeImageViewer() {
    if (imageViewer.open) {
      imageViewer.close();
    }
  }

  deck.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLImageElement) {
      openImageViewer(target);
      return;
    }

    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest("a[href^='#']");
    const anchorTarget = link?.hash
      ? document.getElementById(decodeURIComponent(link.hash.slice(1)))
      : null;
    const destinationSlide = anchorTarget?.closest(".presentation-slide");
    const destinationIndex = destinationSlide
      ? slides.indexOf(destinationSlide)
      : -1;

    if (destinationIndex !== -1 && destinationIndex !== currentIndex) {
      event.preventDefault();
      showSlide(destinationIndex);
      window.history.pushState(null, "", link.href);
      anchorTarget.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  deck.addEventListener("keydown", (event) => {
    const target = event.target;
    if (
      target instanceof HTMLImageElement &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openImageViewer(target);
    }
  });

  imageViewerClose.addEventListener("click", closeImageViewer);
  imageViewerZoom.addEventListener("click", () => {
    const isActualSize = imageViewer.classList.toggle("is-actual-size");
    imageViewerZoom.textContent = isActualSize ? "Fit to screen" : "Actual size";
    imageViewerZoom.setAttribute(
      "aria-label",
      isActualSize ? "Fit image to screen" : "View image at actual size",
    );
    imageViewer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  imageViewer.addEventListener("click", (event) => {
    if (event.target === imageViewer) {
      closeImageViewer();
    }
  });
  imageViewer.addEventListener("close", () => {
    imageViewerImage.removeAttribute("src");
    imageViewer.classList.remove("is-actual-size");
    if (imageViewerOpener?.isConnected) {
      imageViewerOpener.focus();
    }
    imageViewerOpener = null;
  });

  let currentIndex = 0;
  titleSlide.hidden = false;
  titleSlide.classList.add("is-active");

  function showSlide(nextIndex) {
    const wrappedIndex = (nextIndex + slides.length) % slides.length;
    if (wrappedIndex === currentIndex) {
      return;
    }

    const direction =
      nextIndex < 0
        ? "backward"
        : nextIndex >= slides.length
          ? "forward"
          : wrappedIndex > currentIndex
            ? "forward"
            : "backward";
    slides[currentIndex].hidden = true;
    slides[currentIndex].classList.remove("is-active");
    currentIndex = wrappedIndex;
    slides[currentIndex].dataset.direction = direction;
    slides[currentIndex].hidden = false;
    slides[currentIndex].classList.add("is-active");
    slides[currentIndex].scrollIntoView({
      behavior: "instant",
      block: "start",
    });

    counter.textContent = `Slide ${currentIndex + 1} of ${slides.length}`;
    jumpInput.value = String(currentIndex + 1);
    pageIndicator.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ` +
      String(slides.length).padStart(2, "0");
    pageIndicator.setAttribute(
      "aria-label",
      `Slide ${currentIndex + 1} of ${slides.length}`,
    );
    previousButton.disabled = slides.length === 1;
    nextButton.disabled = slides.length === 1;
  }

  counter.textContent = `Slide 1 of ${slides.length}`;
  pageIndicator.textContent =
    `01 / ${String(slides.length).padStart(2, "0")}`;
  pageIndicator.setAttribute("aria-label", `Slide 1 of ${slides.length}`);
  previousButton.disabled = slides.length === 1;
  nextButton.disabled = slides.length === 1;

  previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));
  jumpInput.addEventListener("input", () => jumpInput.setCustomValidity(""));
  jumpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const requestedSlide = Number(jumpInput.value);
    if (
      !Number.isInteger(requestedSlide) ||
      requestedSlide < 1 ||
      requestedSlide > slides.length
    ) {
      jumpInput.setCustomValidity(
        `Enter a slide number from 1 to ${slides.length}.`,
      );
      jumpInput.reportValidity();
      return;
    }

    jumpInput.setCustomValidity("");
    showSlide(requestedSlide - 1);
  });

  document.addEventListener("keydown", (event) => {
    if (imageViewer.open) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeImageViewer();
      }
      return;
    }

    if (event.target instanceof HTMLImageElement) {
      return;
    }

    const target = event.target;
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
    ) {
      return;
    }

    if (event.key === "Escape") {
      window.location.assign(main.dataset.homeUrl);
      return;
    }

    if (
      event.key === " " &&
      target instanceof HTMLElement &&
      target.closest("a, button")
    ) {
      return;
    }

    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      showSlide(currentIndex + 1);
    } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      showSlide(currentIndex - 1);
    } else if (event.key === "Home") {
      showSlide(0);
    } else if (event.key === "End") {
      showSlide(slides.length - 1);
    }
  });
})();
