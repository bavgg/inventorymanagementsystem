function Form() {
  function createUser(user) {
    const url = "/db/actions/insert-user.php";
    try {
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
            window.location.href = "/";
          }else {
            window.location.href = "/register";
          }
        });
    }catch(error) {
      console.error('Error ', error);
    }
    
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const first_name = document.getElementById("firstname").value;
      const last_name = document.getElementById("lastname").value;
      const password = document.getElementById("password").value;

      createUser({ email, first_name, last_name, password });
    });
  });

  return `
    <form id="form" method="post" action="/db/actions/insert-user.php">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" autocomplete="email" required>

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

function Index() {
  return `
    <h1>Inventory Management System</h1>

    ${Form()}
    `;
}

const Body = document.querySelector("body");

Body.innerHTML = Index();
