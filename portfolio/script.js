document.querySelectorAll(".footer-year").forEach((node) => {
  node.textContent = ` ${new Date().getFullYear()}`;
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete all fields before submitting the form.";
      formStatus.style.color = "#c2410c";
      return;
    }

    formStatus.textContent = `Thanks, ${name}. Your message has been captured in this portfolio demo.`;
    formStatus.style.color = "#0b5a54";
    contactForm.reset();
  });
}
