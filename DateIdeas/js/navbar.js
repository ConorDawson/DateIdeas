import { getUser } from "./auth.js";

export function renderNavbar() {
  const user = getUser();

  const nav = document.createElement("div");

  nav.style.display = "flex";
  nav.style.justifyContent = "space-between";
  nav.style.alignItems = "center";
  nav.style.padding = "10px";
  nav.style.borderBottom = "1px solid #ddd";
  nav.style.marginBottom = "20px";

  nav.innerHTML = `
    <div>
      <strong>Date Ideas ❤️</strong>
    </div>

    <div style="display:flex; gap:10px;">
      <button id="homeBtn">Dashboard</button>
      <button id="logoutBtn">Logout</button>
    </div>
  `;

  // Go to dashboard
  nav.querySelector("#homeBtn").onclick = () => {
    window.location.href = "/pages/dashboard.html";
  };

  // Logout
  nav.querySelector("#logoutBtn").onclick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentList");

    window.location.href = "/index.html";
  };

  return nav;
}