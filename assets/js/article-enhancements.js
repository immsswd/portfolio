document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre > code").forEach((code) => {
    const button = document.createElement("button");
    button.className = "code-copy-button";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code");
    button.title = "Copy code";

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

        button.textContent = "Copied";
        button.classList.add("is-copied");
      } catch (error) {
        console.error("Unable to copy code block.", error);
        button.textContent = "Copy failed";
        button.classList.add("is-error");
      }

      window.setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("is-copied", "is-error");
      }, 2000);
    });

    const container = code.closest(".highlight") || code.parentElement;
    container.appendChild(button);
  });
});
