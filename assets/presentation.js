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

  if (
    !main ||
    !header ||
    !content ||
    !deck ||
    !controls ||
    !previousButton ||
    !nextButton ||
    !counter
  ) {
    return;
  }

  const normalizeHeading = (heading) =>
    heading.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase();
  const pptSlides = new Map();

  for (const entry of slideMap?.children ?? []) {
    const heading = entry.dataset.slideHeading?.trim();
    const image = entry.dataset.slideImage?.trim();

    if (!heading || !image) {
      console.error("Each ppt_slides entry needs a heading and image path.");
      return;
    }

    const key = normalizeHeading(heading);
    if (pptSlides.has(key)) {
      console.error(`Duplicate PowerPoint slide heading: "${heading}".`);
      return;
    }

    pptSlides.set(key, { heading, image });
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
    previousButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  const titleSlide = document.createElement("section");
  titleSlide.className = "presentation-slide";
  titleSlide.setAttribute("aria-label", "Title slide");
  titleSlide.append(header);
  deck.append(titleSlide);

  const matchedPptSlides = new Set();
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

    if (pptSlide) {
      matchedPptSlides.add(normalizeHeading(heading));
      slide.classList.add("is-ppt-slide");

      const image = document.createElement("img");
      image.className = "presentation-ppt-slide-image";
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
    } else {
      const slideContent = document.createElement("article");
      slideContent.className = content.className;
      slideContent.append(...nodes);
      slide.append(slideContent);
    }
    deck.append(slide);

    return slide;
  });

  const additionalPptSlides = Array.from(pptSlides.entries())
    .filter(([heading]) => !matchedPptSlides.has(heading))
    .map(([, pptSlide]) => {
      const slide = document.createElement("section");
      slide.className = "presentation-slide is-ppt-slide";
      slide.setAttribute(
        "aria-label",
        `PowerPoint slide: ${pptSlide.heading}`,
      );
      slide.hidden = true;

      const image = document.createElement("img");
      image.className = "presentation-ppt-slide-image";
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
      deck.append(slide);
      return slide;
    });

  const slides = [titleSlide, ...contentSlides, ...additionalPptSlides];
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

    counter.textContent = `Slide ${currentIndex + 1} of ${slides.length}`;
    previousButton.disabled = slides.length === 1;
    nextButton.disabled = slides.length === 1;
  }

  counter.textContent = `Slide 1 of ${slides.length}`;
  previousButton.disabled = slides.length === 1;
  nextButton.disabled = slides.length === 1;

  previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  document.addEventListener("keydown", (event) => {
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
