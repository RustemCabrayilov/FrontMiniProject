let addedProducts = document.querySelector(".added-products");
window.addEventListener("load", () => {
  let user=getCookie("id")
  let productIds = JSON.parse(localStorage.getItem(user));
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      let products = data.products;
        productIds.forEach(productId => {
          let product=products.find((p)=>p.id==productId)
          if (product) {
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
                <a href="#" class="btn btn-danger me-2" onclick="handleClick(${product.id})">Add to basket</a>
                <a href="#" class="btn btn-info text-light">Details</a>
              </div>
            </div>
            
            `;
          }
        });
      
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