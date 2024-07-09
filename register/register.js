function Form() {
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
          window.location.href = "/";
        }
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      createUser({ username, password });
    });
  });

  return `
    <form id="form" method="post" action="/db/actions/insert-user.php">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>

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
