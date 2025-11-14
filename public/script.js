// ========== Dark Mode ==========
document.addEventListener("DOMContentLoaded", () => {
  let body = document.body;
  let btn = document.getElementById("toggleBtn");

  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    if (btn) btn.textContent = "☀️";
  } else {
    if (btn) btn.textContent = "🌙";
  }

  // Restore saved edits if any
  const savedEdits = JSON.parse(localStorage.getItem("page-edits") || "{}");
  const sections = document.querySelectorAll(
    "section p, section h3, .chips li, #contact address"
  );
  sections.forEach((sec, i) => {
    if (savedEdits["edit-" + i]) {
      sec.innerHTML = savedEdits["edit-" + i];
    }
  });
});

// Dark mode toggle
function myFunction() {
  let body = document.body;
  let btn = document.getElementById("toggleBtn");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
    if (btn) btn.textContent = "☀️";
  } else {
    localStorage.setItem("dark-mode", "disabled");
    if (btn) btn.textContent = "🌙";
  }
}

//Editable Text
function toggleEdit() {
  const sections = document.querySelectorAll(
    "section p, section h3, .chips li, #contact address"
  );
  let btn = document.getElementById("editBtn");

  const isEditing = sections[0].isContentEditable;

  if (!isEditing) {
    // Turn editing ON
    sections.forEach(sec => {
      sec.contentEditable = "true";
      sec.style.outline = "1px dashed red";
    });
    btn.textContent = "💾 Save";
  } else {
    // Turn editing OFF and save changes
    const edits = {};
    sections.forEach((sec, i) => {
      sec.contentEditable = "false";
      sec.style.outline = "none";
      edits["edit-" + i] = sec.innerHTML;
    });
    localStorage.setItem("page-edits", JSON.stringify(edits));
    btn.textContent = "✏️ Edit";
  }
}
