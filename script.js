const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdn.jsdelivr.net/gh/AmmarHammamieh/testing@main/script.css"; // path to your CSS file
document.head.appendChild(link);

// Now create the circle
document.addEventListener("DOMContentLoaded", function () {
  const circle = document.createElement("div");
  circle.classList.add("blue-circle");
  document.body.appendChild(circle);
});
