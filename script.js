// Mobile navigation menu
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

function setMenu(open) {
    navLinks.classList.toggle("show", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("show")));

// Close the menu when clicking outside it, on a link, or pressing Escape
document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false);
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
});

// Auto-open the chatbot on larger screens only (on phones it would cover the whole page).
// Guarded so a slow or blocked Botpress script doesn't throw an error.
window.addEventListener("load", () => {
    if (window.innerWidth < 900) return;
    setTimeout(() => {
        if (window.botpress && typeof window.botpress.open === "function") {
            try {
                window.botpress.open();
            } catch (err) {
                /* chatbot not ready yet; ignore */
            }
        }
    }, 2000);
});
