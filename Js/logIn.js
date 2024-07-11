let logInform = document.querySelector("#logIn-form");
let logIn = document.querySelector(".log-in");
logInform.addEventListener("submit", (event) => {
  event.preventDefault();
  let userName = event.target[0].value;
  let password = event.target[1].value;
  checkData(userName, password);
});

function checkData(userName, password) {
  let loading = document.querySelector(".spinnerContainer");
  loading.style.display = "flex";
  logIn.style.display = "none";
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.users;
      let findUser = users.find(
        (user) => user.username == userName && user.password == password
      );
      if (findUser) {
        window.location.href = "products.html";
        setCookie("id", findUser.id, 9);
      } else {
        logIn.style.display = "flex";
      }
    });
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
