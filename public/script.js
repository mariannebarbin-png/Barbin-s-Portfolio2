// public/script.js

window.myFunction = function() {
  const body = document.body;
  const btn = document.getElementById("toggleBtn");
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
    btn.textContent = "☀️";
  } else {
    localStorage.setItem("dark-mode", "disabled");
    btn.textContent = "🌙";
  }
};

window.toggleEdit = function() {
  const sections = document.querySelectorAll(
    "section p, section h3, .chips li, #contact address"
  );
  const btn = document.getElementById("editBtn");
  const isEditing = sections[0].isContentEditable;

  if (!isEditing) {
    sections.forEach(sec => {
      sec.contentEditable = "true";
      sec.style.outline = "1px dashed red";
    });
    btn.textContent = "💾 Save";
  } else {
    const edits = {};
    sections.forEach((sec, i) => {
      sec.contentEditable = "false";
      sec.style.outline = "none";
      edits["edit-" + i] = sec.innerHTML;
    });
    localStorage.setItem("page-edits", JSON.stringify(edits));
    btn.textContent = "✏️ Edit";
  }
};

// Optional: run DOMContentLoaded logic globally
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const btn = document.getElementById("toggleBtn");

  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    if (btn) btn.textContent = "☀️";
  } else if (btn) {
    btn.textContent = "🌙";
  }

  // Restore saved edits
  const savedEdits = JSON.parse(localStorage.getItem("page-edits") || "{}");
  const sections = document.querySelectorAll(
    "section p, section h3, .chips li, #contact address"
  );
  sections.forEach((sec, i) => {
    if (savedEdits["edit-" + i]) sec.innerHTML = savedEdits["edit-" + i];
  });
});
