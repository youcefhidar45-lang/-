
// Greeting System
function initGreeting() {
  let name = localStorage.getItem("username");
  if (!name) {
    name = prompt("ما اسمك؟");
    if (name) localStorage.setItem("username", name);
  }
  if (name) {
    const greeting = document.getElementById("greeting");
    if (greeting) {
      const hour = new Date().getHours();
      let timeMsg = hour < 12 ? "صباح الخير" : "مساء الخير";
      greeting.innerText = timeMsg + " يا " + name + " 🌿";
    }
  }
}

// Vibration
function vibrate() {
  if (navigator.vibrate) navigator.vibrate(50);
}

// Share Tasks
function shareTasks() {
  const tasks = document.querySelectorAll(".task-item");
  let text = "📋 مهامي اليوم:\n";
  tasks.forEach(t => text += "- " + t.innerText + "\n");
  const url = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

document.addEventListener("DOMContentLoaded", initGreeting);
