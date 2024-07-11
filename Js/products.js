let productIds = JSON.parse(localStorage.getItem(getCookie("id"))) || [];
let basketCounter = document.querySelector(".basket-counter");
basketCounter.innerHTML = localStorage.getItem(
  getCookie("id") + "_" + "counter"
);
if (basketCounter.innerHTML == "") {
  basketCounter.classList.remove("basket-counter");
}
window.addEventListener("load", () => {
  let productList = document.querySelector(".product-list");
  let userLogo = document.querySelector(".user-logo>a>img");
  let loading = document.querySelector(".spinnerContainer");

  
  loading.style.display = "flex";
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      loading.style.display = "none";
      const products = data.products;
      products.forEach((product) => {
        productList.innerHTML += `
<div class="card" style="width: 18rem;">
  <img src="${product.thumbnail}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><i class="fa-solid fa-dollar-sign ms-1"></i><span class="ms-2">${product.price}</span></li>
    <li class="list-group-item"><i class="fa-solid fa-basket-shopping"></i><span class="ms-2">${product.stock} left</span></li>
    <li class="list-group-item"><i class="fa-solid fa-star"></i><span class="ms-2">${product.rating}</span></li>
  </ul>
  <div class="card-body">
    <button href="#" class="btn btn-warning me-2 text-light" style="
      font-size: 15px;
      font-weight: bold;" onclick="handleClick(${product.id})">Add to basket</button>
    <button href="#" class="btn btn-info  text-light" style="font-weight:bold" onclick="handleDetail(${product.id})">Details</button>
  </div>
</div>
`;
      });
    });
  
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      let userPhoto=document.querySelector(".user-photo>img")
      let userName=document.querySelector(".userName>p")
      let fullName=document.querySelector(".fullName>p")
      let emailPhone=document.querySelector(".email-phone")
      let heightWeight=document.querySelector(".height-weight")
      let users = data.users;
      let userId = getCookie("id");
      let currentUser = users.find((user) => userId == user.id);
      console.log(currentUser);
      userLogo.src = currentUser.image;
      
        // setCookie("userId",currentUser.id)
       
      userPhoto.src=currentUser.image
      fullName.innerHTML=`${currentUser.firstName} ${currentUser.maidenName} ${currentUser.lastName}`
      userName.innerHTML+=`${currentUser.username}`
      emailPhone.firstElementChild.innerHTML+=`${currentUser.email}`
      emailPhone.lastElementChild.innerHTML+=`${currentUser.phone}`
      heightWeight.firstElementChild.innerHTML+=`${currentUser.height}cm`
      heightWeight.lastElementChild.innerHTML+=`${currentUser.weight}kg`
      
    });

});

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function handleClick(id) {
  productIds.push(id);
  let user = getCookie("id");
  let counter = localStorage.getItem(user + "_" + "counter") || 0;
  localStorage.setItem(user, JSON.stringify(productIds));
  counter++;
  localStorage.setItem(user + "_" + "counter", counter);
  basketCounter.innerHTML = localStorage.getItem(user + "_" + "counter");
  if (basketCounter.innerHTML != "") {
    basketCounter.classList.add("basket-counter");
  }
}

let basketIcon = document.querySelector(".user-basket");
basketIcon.addEventListener("click", () => {
  window.location.href = "basketProduct.html";
});
function handleDetail(id) {
  localStorage.setItem("productDetail", id);
  window.location.href = "productDetail.html";
}
