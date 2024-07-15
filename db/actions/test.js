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

async function UserList() {
  
    try {
      const response = await fetch("db/data/fetch-users.php");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTimeout(() => {
        const ttbody = document.getElementById('ttbody');
        const EditModalContainer = document.getElementById('modal-container');
  
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