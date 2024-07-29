window.addEventListener("load", () => {
  let brand = document.querySelector(".product-details>h1");
  let title = document.querySelector(".product-details>h4");
  let rating = document.querySelector(".product-details>.rating");
  let price = document.querySelector(".product-details>h3");
  let desc = document.querySelector(".product-details>p");
  let qrCode = document.querySelector(".product-details>.qr-code>img");
  let slideImages = document.querySelectorAll(".swiper-slide>img");
  let relatedProducts = document.querySelector(".related-products");
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      let productId = localStorage.getItem("productDetail");
      const products = data.products;
      let findProduct = products.find((product) => product.id == productId);
      brand.innerHTML = findProduct.brand==undefined?"No Brand":findProduct.brand;
      title.innerHTML = findProduct.title;
      rating.innerHTML =`<span class="rating">${findProduct.rating}</span> ${getStars(findProduct.rating)}`;
      desc.innerHTML = findProduct.description;
      qrCode.src = findProduct.meta.qrCode;
      price.innerHTML = `<i class="fa-solid fa-dollar-sign ms-1"></i><span class="ms-2">${findProduct.price}</span>`;
     
      for (let index = 0; index < slideImages.length; index++) {
        slideImages[index].src = findProduct.images[index];
      }
      // findProduct.images.forEach((image, index) => {
      //   if (index <slideImages.length) {
      //     slideImages[index].src = image;
      //   }
      // });
      products.forEach((product) => {    
          if (
           product.category==findProduct.category
          ) {
            if (product != findProduct) {
              relatedProducts.innerHTML += `
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
                  <button href="#" class="btn btn-warning me-2" style="
                    background-color: rgb(255, 166, 0);
                    color: white;
                    font-size: 15px;
                    font-weight: bold;" onclick="handleClick(${product.id})">Add to basket</button>
                  <button href="#" class="btn btn-info font-weight-bolder text-light" onclick="handleDetail(${product.id})">Details</button>
                </div>
              </div>
              `;
            }
          }      
      });
      let shoppingCart=document.querySelector(".shopping-cart")
      shoppingCart.addEventListener("click",()=>{
        window.location.href="../html/basketProduct.html"
        handleClick(findProduct.id)
      })
    });
   
});

 

function getStars(rating){
  let stars=""
  const fullStars=Math.floor(rating)
const halfStars=rating%1>=0.5
for (let index = 0; index < fullStars; index++) {
  stars+=`
  <i class="fa-solid fa-star text-warning"></i>`
}
if(halfStars){
    stars += `<i class="fa-solid fa-star-half-alt text-warning ms-1"></i>`;
}
return stars
}