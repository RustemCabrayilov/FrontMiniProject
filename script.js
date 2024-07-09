// let InputEmail=document.querySelector("#exampleInputUser1")
// let exampleInputEmail2=document.querySelector("#exampleInputEmail2")

let logInform = document.querySelector("#logIn-form");
logInform.addEventListener("submit", (event) => {
  event.preventDefault();
  let userName = event.target[0].value;
  let password = event.target[1].value;
  checkData(userName, password);
});
function checkData(userName, password) {
  let loading = document.querySelector(".spinnerContainer");
  let notFound = document.querySelector("#notFound");
  loading.style.display = "flex";
  notFound.style.display = "none";
  logInform.style.display = "none";
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.users;
      let findUser = users.find(
        (user) => user.username == userName && user.password == password
      );
      if (findUser) {
        loading.style.display = "none";
        notFound.style.display = "none";
        logInform.style.display = "flex";
        window.location.href = "products.html";
        setCookie("id", findUser.id, 9);
      } else {
        loading.style.display = "none";
        notFound.style.display = "flex";
        logInform.style.display = "none";
      }
    });
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
