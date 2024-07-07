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

function toggleNav() {
  const sidebarLinks = document.querySelectorAll(".sidebar a");
  sidebarLinks.forEach((link) => {
    if (link.style.display === "none") {
      link.style.display = "block";
    } else {
      link.style.display = "none";
    }
  });

  const chevrons = document.querySelectorAll(".chevron");
  chevrons.forEach((chevron) => {
    if (chevron.style.display === "none") {
      chevron.style.display = "block";
    } else {
      chevron.style.display = "none";
    }
  });
}

function Logout(Icon, text, id) {
  return `
      <div class="da" id="${id}">
        ${Icon}
        <a href="/logout">${text}</a>
      </div>
    `;
}

function ContainerLink(Icon, text, id) {
  setTimeout(() => {
    const ContainerLinkRef = document.getElementById(id);
    if (ContainerLinkRef) {
      ContainerLinkRef.addEventListener("click", () => {
        document.querySelectorAll(".da").forEach((el) => {
          el.classList.remove("selected");
        });

        ContainerLinkRef.classList.add("selected");
      });
    }
  }, 0);
  return `
      <div class="da" id="${id}">
        ${Icon}
        <a href="#">${text}</a>
        ${Chevron()}
      </div>
    `;
}

function Chevron() {
  setTimeout(() => {
    const ChevronRef = document.querySelector(".chevron");
    if (ChevronRef) {
      ChevronRef.addEventListener("click", () => {
        ChevronRef.classList.add("selected");
      });
    }
  }, 0);
  return `
      <div class="chevron">
        &#8249;
      </div>
    `;
}

function Sidebar() {
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
        <div class="da profile">
          ${ProfileIcon}
          <a href="#">John Doe</a>
        </div>
        ${ContainerLink(DashboardIcon, "Dashboard", "dashboard")}
        ${ContainerLink(ReportsIcon, "Reports", "reports")}
        ${ContainerLink(ProductIcon, "Product", "product")}
        ${ContainerLink(SupplierIcon, "Supplier", "supplier")}
        ${ContainerLink(CartIcon, "Purchase Order", "purchase-order")}
        ${ContainerLink(UserIcon, "User", "usere")}
        ${Logout(SignoutIcon, "Log Out", "signout")}
      </div>
      <div id="main">
        <!-- Main content goes here -->
      </div>
    `;
}
function CreateUser() {
  setTimeout(() => {
    const RegisterForm = document.getElementById('register-form');

    RegisterForm.addEventListener('click', (event) => {
      event.preventDefault();
    });
  }, 0);
  return `
    <h1>Create User</h1>

    

    <form id="register-form" method="post" action="/db/actions/insert-user.php" style="margin-top: 200px;">
        <label for="email">Username:</label>
        <input type="text" id="username" name="username" required>

        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <button type="submit">Register</button>
    </form>
    `;
}

async function deleteUser() {
  const url = ``;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({}),
  });
}
function ActionColumn(user) {
  setTimeout(() => {
    const EditLink = document.getElementById(`ae-${user.id}`);
    const DeleteLink = document.getElementById(`ad-${user.id}`);

    // EditLink.addEventListener( (event) => {

    // });
    DeleteLink.addEventListener("click", (event) => {
      alert(`Are you sure you want to delete user id ${user.username}`);
    });
  }, 0);
  return `
            <button id="ae-${user.id}" >Edit</button>
            <button id="ad-${user.id}" >Delete</button>
    `;
}
function UserList(users) {
  const TableData = users
    .map((user) => {
      return `
      <tr><td>${user.username}</td><td>${user.password_hash}</td>
        <td>
          <div style="display: flex; flex-direction: column; align-items: flex-start;">
            ${ActionColumn(user)}
          </div>
        </td>
      </tr>
      `;
    })
    .join("");
  return `
    <h1>User List</h1>

    <table class="center">
      <thead>

        <tr><th>Username</th><th>Password_hash</th><th>Action</th></tr>
      </thead>
      <tbody>
        ${TableData} 
      </tbody>
    </table>
    `;
}
function Main() {
  return `
    <main>
      <div>
        ${CreateUser()}
      </div>
      <div>
        ${UserList(users)}
      </div>
    </main>
    `;
}
function IndexHTMLObject() {
  const div = document.createElement("div");
  div.style.display = "flex";

  div.innerHTML = `
      ${Sidebar()}
      ${Main()}
    `;
  return div;
}

document.querySelector("body").appendChild(IndexHTMLObject());
window.toggleNav = toggleNav;
