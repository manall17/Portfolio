// ===== 1. Dark / Light theme button =====
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  const page = document.documentElement; // the <html> tag
  const currentTheme = page.getAttribute("data-bs-theme");

  if (currentTheme === "light") {
    page.setAttribute("data-bs-theme", "dark");
    themeBtn.textContent = "Light mode";
  } else {
    page.setAttribute("data-bs-theme", "light");
    themeBtn.textContent = "Dark mode";
  }
});


// ===== 2. Projects with filter =====
const projects = [
  {
    title: "Scanning using OWASP ZAP",
    category: "Cybersecurity",
    description: "Used OWASP ZAP to scan web applications and study the security issues it reported."
  },
  {
    title: "Information Gathering Tool",
    category: "Cybersecurity",
    description: "Project on information gathering, which is the first step of security testing."
  },
  {
    title: "System Hacking",
    category: "Cybersecurity",
    description: "Learnt how systems are attacked so that they can be protected better."
  },
  {
    title: "Personal Portfolio",
    category: "Web",
    description: "This website, made with HTML5, CSS3, Bootstrap and JavaScript."
  }
];

const projectList = document.getElementById("projectList");
const projectCount = document.getElementById("projectCount");
const filterButtons = document.querySelectorAll(".filter-btn");

// shows only the projects of the selected category
const showProjects = (category) => {
  let cards = "";
  let count = 0;

  for (const project of projects) {
    if (category === "All" || project.category === category) {
      cards += `
        <div class="col-md-6 col-lg-4">
          <div class="card project-card h-100">
            <div class="card-body">
              <span class="chip mb-2">${project.category}</span>
              <h3 class="card-title h5">${project.title}</h3>
              <p class="card-text mb-0">${project.description}</p>
            </div>
          </div>
        </div>`;
      count++;
    }
  }

  projectList.innerHTML = cards;
  projectCount.textContent = `Showing ${count} of ${projects.length} projects`;
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // make every button outlined, then fill the clicked one
    filterButtons.forEach((btn) => btn.classList.replace("btn-blue", "btn-outline-blue"));
    button.classList.replace("btn-outline-blue", "btn-blue");

    showProjects(button.dataset.category);
  });
});

showProjects("All");


// ===== 4. Contact form validation =====
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formResult = document.getElementById("formResult");

// shows the error under an input, or marks it valid if the message is empty
const setError = (input, message) => {
  const errorText = input.nextElementSibling;

  if (message === "") {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    errorText.textContent = message;
  }
};

contactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  if (name.length < 3) {
    setError(nameInput, "Please enter your name (minimum 3 characters).");
    isValid = false;
  } else {
    setError(nameInput, "");
  }

  if (!emailPattern.test(email)) {
    setError(emailInput, "Please enter a valid email address.");
    isValid = false;
  } else {
    setError(emailInput, "");
  }

  if (message.length < 10) {
    setError(messageInput, "Message should be at least 10 characters.");
    isValid = false;
  } else {
    setError(messageInput, "");
  }

  if (isValid) {
    formResult.className = "alert alert-success";
    formResult.textContent = `Thank you, ${name}! Your message has been submitted.`;
    contactForm.reset();
    [nameInput, emailInput, messageInput].forEach((input) => input.classList.remove("is-valid"));
  } else {
    formResult.className = "alert alert-danger";
    formResult.textContent = "Please correct the errors and try again.";
  }
});


// ===== 5. Small extras =====

// close the mobile menu after a link is clicked
const navMenu = document.getElementById("navMenu");
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

// current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();
