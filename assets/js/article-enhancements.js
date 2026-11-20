document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre > code").forEach((code, index) => {
    const button = document.createElement("button");
    button.className = "code-copy-button";
    button.type = "button";
    button.setAttribute("aria-label", "Copy code");
    button.setAttribute("aria-live", "polite");
    button.title = "Copy code";
    button.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="8" y="8" width="12" height="13" rx="2"></rect>
        <path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2"></path>
      </svg>
      <span class="code-copy-status"></span>
    `;
    const icon = button.querySelector("svg");
    const status = button.querySelector(".code-copy-status");

    button.addEventListener("click", async () => {
      try {
        const text = code.innerText;
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          const copied = document.execCommand("copy");
          textarea.remove();
          if (!copied) throw new Error("Copy command was rejected");
        }

        icon.innerHTML = '<path d="m5 12 4 4L19 6"></path>';
        status.textContent = "Copied to clipboard";
        button.setAttribute("aria-label", "Copied to clipboard");
        button.title = "Copied to clipboard";
        button.classList.add("is-copied");
      } catch (error) {
        console.error("Unable to copy code block.", error);
        icon.innerHTML =
          '<path d="M12 8v4"></path><path d="M12 16h.01"></path><circle cx="12" cy="12" r="10"></circle>';
        status.textContent = "Copy failed";
        button.setAttribute("aria-label", "Copy failed");
        button.title = "Copy failed";
        button.classList.add("is-error");
      }

      window.setTimeout(() => {
        icon.innerHTML =
          '<rect x="8" y="8" width="12" height="13" rx="2"></rect><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2"></path>';
        status.textContent = "";
        button.setAttribute("aria-label", "Copy code");
        button.title = "Copy code";
        button.classList.remove("is-copied", "is-error");
      }, 2000);
    });

    let container = code.closest(".highlight");
    if (!container) {
      const pre = code.parentElement;
      container = document.createElement("div");
      container.className = "code-block";
      pre.parentNode.insertBefore(container, pre);
      container.appendChild(pre);
    }

    const pre = code.parentElement;
    if (!pre.id) {
      let codeBlockId = `code-block-${index + 1}`;
      while (document.getElementById(codeBlockId)) {
        codeBlockId = `${codeBlockId}-next`;
      }
      pre.id = codeBlockId;
    }

    const actions = document.createElement("div");
    actions.className = "code-block__actions";
    actions.append(button);

    container.classList.add("has-code-controls");
    container.appendChild(actions);
  });
});
