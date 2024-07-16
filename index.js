import {
  ReportsIcon,
  UserIcon,
  DashboardIcon,
  SupplierIcon,
  ProductIcon,
  ProfileIcon,
  CartIcon,
  SignoutIcon,
} from "./icons/icons.js";
import { ProductMain } from "./index/Product.js";
import { UserMain } from "./index/UserMain.js";
import { SupplierMain } from "./index/SupplierMain.js";

function toggleNav() {
  const sidebarLinks = document.querySelectorAll(".sidebar a .link-text");
  sidebarLinks.forEach((link) => {
    if (link.style.display === "none") {
      link.style.display = "flex";
    } else {
      link.style.display = "none";
    }
  });

  const chevrons = document.querySelectorAll(".chevron");
  chevrons.forEach((chevron) => {
    if (chevron.style.display === "none") {
      chevron.style.display = "flex";
    } else {
      chevron.style.display = "none";
    }
  });
}




function Sidebar() {
  document.addEventListener("DOMContentLoaded", () => {

    const Links = document.getElementById("links");

    Links.addEventListener("click", (event) => {
      const clickedEl = event.target;
      console.log(clickedEl);

      if (clickedEl.classList.contains("link") || clickedEl.classList.contains("link-text")
      ) {
        const Links = document.querySelectorAll(".link");
        const parentOfClickedEl = clickedEl.closest('.link');
        console.log(clickedEl);

        Links.forEach((el) => {
          el.classList.remove("selected");
        });
        parentOfClickedEl.classList.add("selected");

        const Main = document.getElementById('main');

        switch(parentOfClickedEl.id) {
          case 'dashboard':
            console.log(clickedEl.id);
            break;
          case 'reports':
            console.log(clickedEl.id);
            break;
          case 'product':
            Main.innerHTML = ProductMain();
            break;
          case 'supplier':
            Main.innerHTML = SupplierMain();
            break;
          case 'purchase':
            console.log(clickedEl.id);
            break;
          case 'user':
            Main.innerHTML = UserMain();
            break;
        }
        console.log("clicked ", clickedEl.id);
      }
    });
  });
  return `
    <style>
        .toggle-container{
            padding: 16px;
        }
    </style>
      <div id="mySidebar" class="sidebar">
        <div class="toggle-container">
            <button class="togglebtn" onclick="toggleNav()">&#9776;</button>
        </div>
      

        <div id="links">
          ${Link(ProfileIcon, "John Doe", 'profile')}
          ${Link(DashboardIcon, "Dashboard", 'dashboard')}
          ${Link(ReportsIcon, "Reports", 'reports')}
          ${Link(ProductIcon, "Product", 'product')}
          ${Link(SupplierIcon, "Supplier", 'supplier')}
          ${Link(CartIcon, "Purchase Order", 'purchase')}
          ${Link(UserIcon, "User", 'user')}
          ${Logout(SignoutIcon, "Log Out")}
        </div>
        
      </div>
    `;
}
function Logout(Icon, text) {
  return `
          <a href="/logout" class="link" id="signout">
            ${Icon}
            <p class="link-text">${text}</p>
          </a>


    `;
}
function Link(Icon, text, id) {
  return `  
        <a href="#" class="link" id="${id}">
          ${Icon}
          <p class="link-text">${text}</p>
        </a>
    `;
}

function IndexHTMLObject() {
  const div = document.createElement("div");
  div.style.display = "flex";
  
  div.innerHTML = `
      <div id="modal-container"></div>
      ${Sidebar()}
      <main id="main">

      </main>

    `;
  return div;
}

document.querySelector("body").appendChild(IndexHTMLObject());
window.toggleNav = toggleNav;
