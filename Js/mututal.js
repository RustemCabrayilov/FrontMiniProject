let productIds = JSON.parse(localStorage.getItem(getCookie("id"))) || [];
function handleClick(id) {
  productIds.push(id);
  let userId = getCookie("id");
  let counter = localStorage.getItem(userId + "_" + "counter") || 0;
  localStorage.setItem(userId, JSON.stringify(productIds));
  counter++;
  localStorage.setItem(userId + "_" + "counter", counter);
  toastTrigger()
  basketCounter.innerHTML = localStorage.getItem(userId + "_" + "counter");
  if (basketCounter.innerHTML != "") {
    basketCounter.classList.add("basket-counter");
  }
}

function handleDetail(id) {
  localStorage.setItem("productDetail", id);
  window.location.href = "productDetail.html";
}
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
function toastTrigger(){
 
    var toastEl = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(toastEl, { delay: 1500 });
    toast.show();

}