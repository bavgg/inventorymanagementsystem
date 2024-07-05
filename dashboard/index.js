import {
    ReportsIcon,
    UserIcon,
    DashboardIcon,
    SupplierIcon,
    ProductIcon,
    ProfileIcon,
    CartIcon,
    CursorLeftIcon,
    SignoutIcon,
  } from "../icons/icons.js";
  
  function toggleNav() {
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    sidebarLinks.forEach((link) => {
      if (link.style.display === "none") {
        link.style.display = "block";
      } else {
        link.style.display = "none";
      }
    });

    const chevrons = document.querySelectorAll('.chevron');
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
        <a href="#">${text}</a>
      </div>
    `;
  }
  
  function ContainerLink(Icon, text, id) {
    setTimeout(() => {
      const ContainerLinkRef = document.getElementById(id);
      if (ContainerLinkRef) {
        ContainerLinkRef.addEventListener('click', () => {

          document.querySelectorAll('.da').forEach((el) => {
            el.classList.remove('selected');
          });

          ContainerLinkRef.classList.add('selected');
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
      const ChevronRef = document.querySelector('.chevron');
      if (ChevronRef) {
        ChevronRef.addEventListener('click', () => {
          ChevronRef.classList.add('selected');
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
        ${ContainerLink(DashboardIcon, 'Dashboard', 'dashboard')}
        ${ContainerLink(ReportsIcon, 'Reports', 'reports')}
        ${ContainerLink(ProductIcon, 'Product', 'product')}
        ${ContainerLink(SupplierIcon, 'Supplier', 'supplier')}
        ${ContainerLink(CartIcon, 'Purchase Order', 'purchase-order')}
        ${ContainerLink(UserIcon, 'User', 'usere')}
        ${Logout(SignoutIcon, 'Log Out', 'signout')}
      </div>
      <div id="main">
        <!-- Main content goes here -->
      </div>
    `;
  }
  
  function Index() {
    return `
      ${Sidebar()}
    `;
  }
  
  document.querySelector("body").innerHTML = Index();
  
  window.toggleNav = toggleNav;

  