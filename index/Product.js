





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
function TableRow(product) {
    return `
        <tr>
            <td>
                <img height="100px" width="100px" src="${product.image_url}">
            </td>
            <td>${product.product_name}</td>
            <td>${product.stocks}</td>
            <td>${product.description}</td>
            <td>${product.supplier}</td>

            <td>User ID ${product.user_id}</td>
            <td>${product.created_at}</td>
            <td>${product.updated_at}</td>
            <td>
                <div style="display: flex; flex-direction: column; align-items: flex-start">
                <button
                    data-user-id="${product.user_id}"
                    data-firstname="${product.first_name}"
                    data-lastname="${product.last_name}"
                    data-email="${product.email}"
                    class="edit-btn"
                >
                    Edit
                </button>
                <button data-user-id="${product.user_id}" class="delete-btn">Delete</button>
                </div>
            </td>
        </tr>
    `
}
function TableRows(products) {
    console.log("🚀 ~ TableRows ~ TableRows:", products)
    return products.map(product => {
        return TableRow(product);
    }).join('');
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
        console.log("🚀 ~ fetchProducts ~ products:", products)

        const TableBody = document.getElementById('pt-body');
        TableBody.innerHTML = TableRows(products);

    }catch(error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
async function createProduct(product) {
    const url = `/db/actions/add-product.php`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      });
  
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      alert(data.message);
      if(data.success) {
        fetchProducts();
      }
  
    }catch(error) {
      console.error("Fetch error:", error);
    }
}
function validateURL(url) {   
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  function isImageUrl(url) {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
    return imageRegex.test(url);
}
function AddNewProductModalForm() {
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
    const ProductForm = document.querySelector("#product-form");
    const ModalContainer = document.getElementById('modal-container');

    CancelButton.addEventListener("click", () => {
      console.log("clicked cancel");
      ModalContainer.innerHTML = ``;
    });

 
    ProductForm.addEventListener("submit", (event) => {
        const image_url = document.getElementById('product-image-url').value;
        const product_name = document.getElementById("product-name").value;
        const description = document.getElementById("description").value;
        const supplier = document.getElementById("supplier").value;
        // user_id

        const imgUrlErrorContainer = document.getElementById('img-url-error');

        if(validateURL(image_url))  {
            if(isImageUrl(image_url)) {
                createProduct({ product_name, description, supplier, image_url });
                ModalContainer.innerHTML = ``;
            }else {
                event.preventDefault();
                imgUrlErrorContainer.textContent = 'Invalid Image URL'
            }
            
        }else {
            event.preventDefault();
            imgUrlErrorContainer.textContent = 'Invalid Image URL'
            // ModalContainer.innerHTML = ``;
        }

        
    });
  }, 0);

  return `
    ${style}
    <div id="edit-overlay"></div>
    <dialog id="emodal" open style="border-radius: var(--bd-radius)">

      <form  method="dialog" id="product-form" style="padding: 10px; display: flex; flex-direction: column;">

        <h3>Create Product</h3>
        <label>Product Name</label>
        <input id="product-name" required />
    
        <label>Description</label>
        <textarea id="description" rows="4" required style="resize: vertical;"></textarea>
    
        <label>Suppliers</label>
        <select id="supplier">
            <option>Robinson</option>
            <option>Nestle</option>
        </select>

        <label>Product Image URL</label>
        <input id="product-image-url" required placeholder="Paste image url here" />
        <span id="img-url-error" required style="color: red;"></span>
        <br>

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
function AddNewProduct() {
    setTimeout(() => {
        const AddNewProductBtn = document.getElementById('add-product-btn');
        AddNewProductBtn.addEventListener('click', () => {
            const ModalContainer = document.getElementById('modal-container');
            ModalContainer.innerHTML = AddNewProductModalForm();
        });
    }, 0);
    return `
    <button id="add-product-btn" style="width: fit-content; margin-left: auto;">Add New Product</button>
    `
}
export function ProductMain() {
    return `
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${Style()}
            <h1>List of Products</h1>
            ${AddNewProduct()}
            ${ProductTable()}
        </div>
    `
}
