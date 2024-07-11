let addedProducts = document.querySelector(".added-products");
window.addEventListener("load", () => {
  let user = getCookie("id");
  let productIds = JSON.parse(localStorage.getItem(user));
  let backToProducts = document.querySelector(".backTo-products");
  loading("flex");
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      loading("none");
      let products = data.products;
      if (productIds) {
        productIds.forEach((productId) => {
          let product = products.find((p) => p.id == productId);
          if (product) {
            backToProducts.classList.add("d-none")     
            addedProducts.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${product.thumbnail}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
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
    <button href="#" class="btn btn-info  text-light" style="font-weight:bold;" onclick="handleDetail(${product.id})">Details</button>
        </div>
      </div>          
      `;
          } else {
            backToProducts.classList.remove("d-none")     
            backToProducts.classList.remove("d-flex")     
          }
        });
      }
    });
    backToProducts.addEventListener("click", () => {
      window.location.href = "../html/products.html";
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
function loading(visibility) {
  let loading = document.querySelector(".spinnerContainer");
  loading.style.display = visibility;
}
