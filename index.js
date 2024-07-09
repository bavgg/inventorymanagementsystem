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

function Logout(Icon, text) {
  return `
      <div class="link" id="signout">
        ${Icon}
        <a href="/logout">${text}</a>
      </div>
    `;
}

function Link(Icon, text, id) {
  return `  
        <a href="#" class="link" id="${id}">
          ${Icon}
          ${text}
          ${Chevron()}
        </a>
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
  document.addEventListener("DOMContentLoaded", () => {
    const Links = document.getElementById("links");
    Links.addEventListener("click", (event) => {
      const clickedEl = event.target;

      if (clickedEl.classList.contains("link")) {
        document.querySelectorAll(".link").forEach((el) => {
          el.classList.remove("selected");
        });
        clickedEl.classList.add("selected");

        const Main = document.getElementById('main');

        switch(clickedEl.id) {
          case 'dashboard':
            
            break;
          case 'reports':
            console.log(clickedEl.id);
            break;
          case 'product':
            console.log(clickedEl.id);
            break;
          case 'supplier':
            console.log(clickedEl.id);
            break;
          case 'purchase':
            console.log(clickedEl.id);
            break;
          case 'user':
            Main.innerHTML = UserPage();
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
        <div class="container-link profile">
          ${ProfileIcon}
          <a href="#">John Doe</a>
        </div>

        <div id="links">
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
function UserForm() {
  function createUser(user) {
    const url = "/db/actions/insert-user.php";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.success) {
          UserList();
        }
      });
  }
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      createUser({ username, password });
    });
  });
  return `
    <h1>Create User</h1>

    

    <form id="register-form" method="post" style="margin-top: 200px;">
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
  // setTimeout(() => {
  //   const EditLink = document.getElementById(`ae-${user.user_id}`);
  //   const DeleteLink = document.getElementById(`ad-${user.user_id}`);

  //   // EditLink.addEventListener( (event) => {

  //   // });
  //   DeleteLink.addEventListener("click", (event) => {
  //     alert(`Are you sure you want to delete user id ${user.username}`);
  //   });
  // }, 0);
  return `
            <button id="ae-${user.user_id}" >Edit</button>
            <button id="ad-${user.user_id}" >Delete</button>
    `;
}
async function UserList() {
  document.addEventListener("DOMContentLoaded", () => {
    const LoadingContainer = document.getElementById("table-container");

    LoadingContainer.innerHTML = "Loading...";
  });

  try {
    console.log("start");
    const response = await fetch("db/data/fetch-users.php");
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("end");
    const users = data.users;

    const TableData = users
      .map((user) => {
        return `
              <tr>
                <td>${user.username}</td><td>${user.password_hash}</td>
                <td>
                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    ${ActionColumn(user)}
                  </div>
                </td>
              </tr>
     
      `;
      })
      .join("");

    const Table = `
       <table class="center"  style="max-height: 80dvh;">
          <thead style="position: sticky; top: 0;">

            <tr><th>Username</th><th>Password_hash</th><th>Action</th></tr>
          </thead>
          <tbody id="ttbody">
             ${TableData}
          </tbody>
          <!-- tbody here -->
        </table>
      `;
    const TableContainer = document.getElementById("table-container");
    TableContainer.innerHTML = Table;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

function UserPage() {
  UserList();
  return `
      <div>
        ${UserForm()}
      </div>
      <div>
        <h1>User List</h1>

        <!-- ASYNC -->
        <!-- ASYNC -->
        <div id="table-container"></div>
        <!-- ASYNC -->
        <!-- ASYNC -->

      </div>
    `;
}
function IndexHTMLObject() {
  const div = document.createElement("div");
  div.style.display = "flex";
  
  div.innerHTML = `
      ${Sidebar()}
      <main id="main">

      </main>

    `;
  return div;
}

document.querySelector("body").appendChild(IndexHTMLObject());
window.toggleNav = toggleNav;
