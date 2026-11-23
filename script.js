// ===== Lumière Hair Studio — script.js =====
document.addEventListener("DOMContentLoaded", () => {
  // Header background on scroll
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 90}ms`;
    observer.observe(el);
  });

  // Booking form
  const form = document.getElementById("bookingForm");
  const errorBox = document.getElementById("formError");
  const success = document.getElementById("successBox");
  const successTitle = document.getElementById("successTitle");
  const dateInput = document.getElementById("dateInput");
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = ["name", "phone", "service", "date"];
    let firstInvalid = null;
    fields.forEach((f) => {
      const el = form.elements[f];
      const bad = !el.value.trim();
      el.classList.toggle("invalid", bad);
      if (bad && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      errorBox.textContent = "Please fill in your name, phone, service and date.";
      firstInvalid.focus();
      return;
    }
    const phone = form.elements.phone.value.trim();
    if (!/^[0-9+\s-]{8,15}$/.test(phone)) {
      errorBox.textContent = "Please enter a valid phone number.";
      form.elements.phone.classList.add("invalid");
      form.elements.phone.focus();
      return;
    }
    errorBox.textContent = "";
    const firstName = form.elements.name.value.trim().split(" ")[0];
    successTitle.textContent = `Thank you, ${firstName}.`;
    form.reset();
    form.hidden = true;
    success.hidden = false;
  });

  document.getElementById("bookAgain").addEventListener("click", () => {
    success.hidden = true;
    form.hidden = false;
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
});
