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
    console.log('lo');
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
async function updateUser(user) {
  const url = `/db/actions/update-user.php`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
    if(data.success) {
      UserList();
    }

  }catch(error) {
    console.error("Fetch error:", error);
  }
}
function UserForm() {
  
  setTimeout(() => {
    const form = document.getElementById("register-form");

    console.log('loadeedeedd');
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const first_name = document.getElementById("firstname").value;
      const last_name = document.getElementById("lastname").value;
      const password = document.getElementById("password").value;

      createUser({ email, first_name, last_name, password });
    });
  }, 0);

  return `
    <h1>Create User</h1>

    

    <form id="register-form" method="post" style="margin-top: 200px;">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" required>

        <br>
        <label for="firstname">Firstname:</label>
        <input type="text" id="firstname" name="firstname" required>
        <br>

        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" name="lastname" required>
        <br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>

        <button type="submit">Register</button>
    </form>
    `;
}

async function deleteUser(user_id) {
  const url = `/db/actions/delete-user.php`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
    if(data.success) {
      UserList();
    }

  }catch(error) {
    console.error("Fetch error:", error);
  }
  
}

async function UserList() {
  
  try {
    const response = await fetch("db/data/fetch-users.php");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setTimeout(() => {
      const ttbody = document.getElementById('ttbody');
      const EditModalContainer = document.getElementById('emodal-container');

      ttbody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
          const user_id = event.target.dataset.userId;
          deleteUser(user_id);
        }

        if (event.target.classList.contains('edit-btn')) {
          
          const user_id = event.target.dataset.userId;
          const firstname = event.target.dataset.firstname;
          const lastname = event.target.dataset.lastname;
          const email = event.target.dataset.email;
          console.log('clicked edit btn');

          EditModalContainer.innerHTML = EditFormModal({firstname, lastname, email, user_id}, EditModalContainer);
          // deleteUser(user_id);
        }
        
      });

    }, 0);
    
    const users = data.users;

    const TableData = users
      .map((user) => {
        return `
              <tr>
                <td>${user.email}</td><td>${user.first_name}</td><td>${user.last_name}</td><td>${user.created_at}</td><td>${user.updated_at}</td>
                <td>
                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <button data-user-id="${user.user_id}" data-firstname="${user.first_name}" data-lastname="${user.last_name}" data-email="${user.email}" class="edit-btn"  >Edit</button>
                    <button data-user-id="${user.user_id}" class="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
     
      `;
      })
      .join("");

    const Table = `
       <table class="center"  style="max-height: 80dvh;">
          <thead style="position: sticky; top: 0;">

            <tr><th>Email</th><th>Firstname</th><th>Lastname</th><th>Created_at</th><th>Updated_at</th><th>Action</th></tr>
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
        <div id="table-container">Loading...</div>
        <!-- ASYNC -->
        <!-- ASYNC -->

      </div>
    `;
}

function EditFormModal(user, EditModalContainer) {
  setTimeout(() => {
    const CancelButton = document.getElementById('cancelButton');
    const SubmitBtn = document.getElementById('submit-btn');
    const EditForm = document.querySelector('#edit-form');

    let formChanged = false;

    SubmitBtn.disabled = true;
    
    CancelButton.addEventListener('click', () => {
      console.log('clicked cancel');
      EditModalContainer.innerHTML = ``;
    })

    EditForm.addEventListener('input', function() {
      formChanged = true;
      SubmitBtn.disabled = false;
    });

    EditForm.addEventListener('submit', () => {
      const email = document.getElementById('email').value;
      const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      
      if(formChanged) {
        updateUser({ email, firstname, lastname, user_id : user.user_id});
      }
      EditModalContainer.innerHTML = ``;
    })
  }, 0);

  return `
<style>
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  button:disabled::before {
    content: "🔒";
    margin-right: 5px;
  }
  #emodal {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    margin-top: 200px;
    z-index: 2;
  }
  #edit-overlay {
     position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  #cancelButton {
    background-color: white;
    color: var(--accent);
  }
  #cancelButton:hover {
    background-color: var(--tint);
    color: white;
  }
</style>
<div id="edit-overlay"></div>
<dialog id="emodal" open style="border-radius: var(--bd-radius)">
  <form method="dialog" id="edit-form" style="padding: 10px">
    <h3>Update</h3>
    <label>Firstname</label>
    <input id="firstname" required value="${user.firstname}"/>

    <label>Lastname</label>
    <input id="lastname" required value="${user.lastname}"/>

    <label>Email address</label>
    <input id="email" required value="${user.email}"/>
    <br>
    <div style="display: flex; gap: 5px;">
      <button
        type="button"
        id="cancelButton"
      >
        Cancel
      </button>
      <button id="submit-btn" type="submit">Ok</button>
    </div>
  </form>
</dialog>
  `
}
function IndexHTMLObject() {
  const div = document.createElement("div");
  div.style.display = "flex";
  
  div.innerHTML = `
      <div id="emodal-container"></div>
      ${Sidebar()}
      <main id="main">

      </main>

    `;
  return div;
}

document.querySelector("body").appendChild(IndexHTMLObject());
window.toggleNav = toggleNav;
