export function SupplierMain() {
  return `
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <h1>List of Suppliers</h1>
            ${AddNewSupplierBtn()}
            <table>
                <thead>
                
                </thead>

                <tbody>
                
                </tbody>
            </table>
        </div>
    `;
}
function AddNewSupplierBtn() {
  setTimeout(() => {
    const addNewProductBtn = document.getElementById("add-product-btn");
    addNewProductBtn.addEventListener("click", () => {
      const ModalContainer = document.getElementById("modal-container");
      ModalContainer.innerHTML = SupplierModalForm();
    });
  }, 0);
  return `
    <button id="add-product-btn" style="width: fit-content; margin-left: auto;">Add New Supplier</button>
    `;
}
async function createSupplierThenRerenderSupplierTable(user) {
  const url = "/db/actions/insert-supplier.php";

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
function SupplierModalForm() {
  setTimeout(() => {
    const CancelButton = document.getElementById("cancelButton");
    const SupplierForm = document.querySelector("#supplier-form");
    const ModalContainer = document.getElementById("modal-container");

    CancelButton.addEventListener("click", () => {
      console.log("clicked cancel");
      ModalContainer.innerHTML = ``;
    });

    SupplierForm.addEventListener("submit", (event) => {
      const supplier_name = document.getElementById("email").value;
      const location = document.getElementById("firstname").value;
      const email = document.getElementById("lastname").value;

      createSupplierThenRerenderSupplierTable({ supplier_name, location, email });
      ModalContainer.innerHTML = ``;
    });
  }, 0);
  return `
    <div id="overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1;"></div>
    <dialog id="emodal" open style="position: absolute; margin-left: auto; margin-right: auto; margin-top: 200px; z-index: 2; border-radius: var(--bd-radius);">
        <form id="supplier-form" style="padding: 10px; display: flex; flex-direction: column;">
        
            <h3>Create Supplier</h3>
            <label>Supplier Name</label>
            <input type="text" id="product-name" required />
        
            <label>Supplier Location</label>
            <input type="text" id="supplier-location" required />
        
            <label>Email</label>
            <input type="email" id="supplier-email" required />
        
            <br>
            <div style="display: flex; gap: 5px;">
              <button
                type="button"
                id="cancelButton"
              >
                Cancel
              </button>
              <button id="submit-btn" type="submit">Create Supplier</button>
            </div>
        </form>
    </dialog>
    `;
}
