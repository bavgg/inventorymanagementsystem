function ProductModalForm() {
  setTimeout(() => {
    const CancelButton = document.getElementById("cancelButton");
    const SubmitBtn = document.getElementById("submit-btn");
    const ProductForm = document.querySelector("#product-form");

    let formChanged = false;

    SubmitBtn.disabled = true;

    CancelButton.addEventListener("click", () => {
      console.log("clicked cancel");
      EditModalContainer.innerHTML = ``;
    });

    ProductForm.addEventListener("input", function () {
      formChanged = true;
      SubmitBtn.disabled = false;
    });

    ProductForm.addEventListener("submit", () => {
      const email = document.getElementById("email").value;
      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;

      if (formChanged) {
        updateUser({ email, firstname, lastname, user_id: user.user_id });
      }
      EditModalContainer.innerHTML = ``;
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
      <form method="dialog" id="product-form" style="padding: 10px">
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
          <button id="submit-btn" type="submit">Create Product</button>
        </div>
      </form>
    </dialog>`;
}
function TableRows(products) {
    return products.map(product => {
        TableRow(product);
    }).join('');
}
function TableRow(product) {
    return `
        <tr>
            <td>${user.email}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.created_at}</td>
            <td>${user.updated_at}</td>
            <td>
                <div style="display: flex; flex-direction: column; align-items: flex-start">
                <button
                    data-user-id="${user.user_id}"
                    data-firstname="${user.first_name}"
                    data-lastname="${user.last_name}"
                    data-email="${user.email}"
                    class="edit-btn"
                >
                    Edit
                </button>
                <button data-user-id="${user.user_id}" class="delete-btn">Delete</button>
                </div>
            </td>
        </tr>
    `
}
async function fetchProducts() {
    console.log("🚀 ~ fetchProducts ~ fetchProducts:", fetchProducts)
    try {
        const response = await fetch("db/data/fetch-products.php");
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const products = data.products;

        const TableBody = document.getElementById('pt-body');
        TableBody.innerHTML = TableRows(products);

    }catch(error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
function ProductTable() {
    fetchProducts();
    return `
        <table class="center"  style="max-height: 80dvh;">
          <thead style="position: sticky; top: 0;">

            <tr><th>Image</th><th>Product Name</th><th>Stock</th><th>Description</th><th>Suppliers</th><th>Created By</th><th>Created At</th><th>Updated At</th><th>Action</th></tr>
          </thead>
          <tbody id="pt-body">
             
          </tbody>
          <!-- tbody here -->
        </table>
    `
}
function Style() {
    return `
        <style>

        </style>
    `
}
export function ProductMain() {
    return `
        <div>
            ${Style()}
            <h1>List of Products</h1>
            ${ProductTable()}
        </div>
    `
}
