/**
 * The "Copy prompt" chip carries the prompt in `data-copy-prompt`: on click it
 * goes to the clipboard and the chip's tooltip says so. Delegated and guarded,
 * so it is safe to import from more than one component and survives
 * client-side navigation.
 */
const FLAG = "__copyPromptBound";
const win = window as unknown as Record<string, boolean>;

if (!win[FLAG]) {
  win[FLAG] = true;

  document.addEventListener("click", async (event) => {
    const link = (event.target as Element).closest<HTMLElement>("[data-copy-prompt]");
    if (!link) return;

    const prompt = link.dataset.copyPrompt ?? "";
    const status = document.querySelector<HTMLElement>("[data-ai-status]");
    const tip = link.querySelector<HTMLElement>("[data-tip]");

    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      window.prompt("Copy this prompt, then paste it into the chat", prompt);
      return;
    }

    if (tip) {
      tip.style.opacity = "1";
      tip.textContent = "Copied";
    }
    if (status) status.textContent = "Prompt copied.";
    setTimeout(() => {
      if (tip) {
        tip.style.opacity = "";
        tip.textContent = tip.dataset.idle ?? "";
      }
      if (status) status.textContent = "";
    }, 2000);
  });
}
