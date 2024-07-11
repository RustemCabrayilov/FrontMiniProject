
window.addEventListener("load",()=>{
let userPhoto=document.querySelector(".user-profile>.user-photo>img")
let userName=document.querySelector(".user-profile>.userName>p")
let fullName=document.querySelector(".user-profile>.fullName>p")
let emailPhone=document.querySelector(".user-profile>.email-phone")
let heightWeight=document.querySelector(".user-profile>.height-weight")
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      let userId=getCookie("userId")
      console.log(userId);
      const users = data.users;
      let findUser = users.find(
        (user) => user.id == userId
      );
    userPhoto.src=findUser.image
    fullName.innerHTML+=`${findUser.firstName} ${findUser.maidenName} ${findUser.lastName}`
    userName.innerHTML+=`${findUser.username}`
    emailPhone.firstElementChild.innerHTML+=`${findUser.email}`
    emailPhone.lastElementChild.innerHTML+=`${findUser.phone}`
    heightWeight.firstElementChild.innerHTML+=`${findUser.height}`
    heightWeight.lastElementChild.innerHTML+=`${findUser.weight}`
    });
})


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