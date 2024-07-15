function AddNewUserBtn() {
  setTimeout(() => {
    const AddNewProductBtn = document.getElementById("add-user-btn");
    AddNewProductBtn.addEventListener("click", () => {
      const ModalContainer = document.getElementById("modal-container");
      ModalContainer.innerHTML = UserModalForm();
    });
  }, 0);
  return `
    <button id="add-user-btn" style="width: fit-content; margin-left: auto;">Add New User</button>
    `;
}

export function UserMain() {
  //   <div>
  //   ${UserForm()}
  // </div>
  return `
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <h1>User List</h1>
            ${AddNewUserBtn()}
            ${UserTable()}
          </div>
        `;
}

function UserTable() {
  fetchUsersThenDisplayTableBody();
  return `
          <table class="center"  style="max-height: 80dvh;">
            <thead style="position: sticky; top: 0;">
  
              <tr><th>Email</th><th>Firstname</th><th>Lastname</th><th>Created_at</th><th>Updated_at</th><th>Action</th></tr>
            </thead>
            <tbody id="ttbody">
              <tr>
                <td>Loading...</td>
              </tr>
            </tbody>
            <!-- tbody here -->
          </table>
    `;
}

async function fetchUsersThenDisplayTableBody() {
  try {
    const response = await fetch("db/data/fetch-users.php");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const users = data.users;

    const TableBody = document.getElementById("ttbody");
    TableBody.innerHTML = TableRows(users);

    const ModalContainer = document.getElementById("modal-container");

    TableBody.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        const user_id = event.target.dataset.userId;
        deleteUser(user_id);
      }

      if (event.target.classList.contains("edit-btn")) {
        const user_id = event.target.dataset.userId;
        const firstname = event.target.dataset.firstname;
        const lastname = event.target.dataset.lastname;
        const email = event.target.dataset.email;
        console.log("clicked edit btn");

        ModalContainer.innerHTML = EditFormModal(
          { firstname, lastname, email, user_id },
          ModalContainer
        );
      }
    });
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
    if (data.success) {
      fetchUsersThenDisplayTableBody();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function TableRows(users) {
  console.log("🚀 ~ TableRows ~ TableRows:", users);
  return users
    .map((user) => {
      return TableRow(user);
    })
    .join("");
}

function TableRow(user) {
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
}
function EditFormModal(user, ModalContainer) {
  setTimeout(() => {
    const CancelButton = document.getElementById("cancelButton");
    const SubmitBtn = document.getElementById("submit-btn");
    const EditForm = document.querySelector("#edit-form");

    let formChanged = false;

    SubmitBtn.disabled = true;

    CancelButton.addEventListener("click", () => {
      console.log("clicked cancel");
      ModalContainer.innerHTML = ``;
    });

    EditForm.addEventListener("input", function () {
      formChanged = true;
      SubmitBtn.disabled = false;
    });

    EditForm.addEventListener("submit", () => {
      const email = document.getElementById("email").value;
      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;

      if (formChanged) {
        updateUser({ email, firstname, lastname, user_id: user.user_id });
      }
      ModalContainer.innerHTML = ``;
    });
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
    `;
}

function UserModalForm() {
  const style = `
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
    `;
  setTimeout(() => {
    const CancelButton = document.getElementById("cancelButton");
    const UserForm = document.querySelector("#user-form");
    const ModalContainer = document.getElementById("modal-container");

    CancelButton.addEventListener("click", () => {
      console.log("clicked cancel");
      ModalContainer.innerHTML = ``;
    });

    UserForm.addEventListener("submit", (event) => {
        const email = document.getElementById("email").value;
        const first_name = document.getElementById("firstname").value;
        const last_name = document.getElementById("lastname").value;
        const password = document.getElementById("password").value;
  
        createUser({ email, first_name, last_name, password });
        ModalContainer.innerHTML = ``;
    });
  }, 0);

  return `
    ${style}
    <div id="edit-overlay"></div>
    <dialog id="emodal" open style="border-radius: var(--bd-radius)">
  
        <form  method="dialog" id="user-form" style="padding: 10px; display: flex; flex-direction: column;">
            <h3>Create User</h3>
    
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

            <div style="display: flex; gap: 5px;">
            <button
                type="button"
                id="cancelButton"
            >
                Cancel
            </button>
            <button type="submit">Create User</button>
            </div>
        </form>

      
    </dialog>`;
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
        fetchUsersThenDisplayTableBody();
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
    if (data.success) {
      fetchUsersThenDisplayTableBody();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
