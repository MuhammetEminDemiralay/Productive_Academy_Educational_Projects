const body = document.querySelector("body"),
      sidebar = document.querySelector(".sidebar"),
      home = document.querySelector(".home"),
      image = document.querySelector(".image"),
      widthSize = document.querySelector(".width"),
      widthText = document.querySelector(".width-text"),
      heightSize = document.querySelector(".height"),
      heightText = document.querySelector(".height-text"),
      incrementBtn = document.querySelector(".increment-box"),
      decreementBtn = document.querySelector(".decrement-box"),
      screenBox = document.querySelector(".screen"),
      loadBtn = document.querySelector(".load-btn"),
      setting = document.querySelector(".setting"),
      bottomContent = document.querySelector(".bottom-content"),
      checkBtn = document.querySelector(".check");
      
let accessKey = "8rnymTBmLkxRSpdhRcaMoYOmuOgEtaYeCCkkacGKhc4";
let imgTag = [];
let width = 300;
let height = 300;
let allImages = [];
let count = 30;

loadBtn.addEventListener("click", () => {
    window.location.reload();
})

window.addEventListener("load", () => {
    if(localStorage.getItem("count")){
        count = 30;
    }
    width = localStorage.getItem("width");
    height = localStorage.getItem("height");
    widthText.textContent = localStorage.getItem("width");
    heightText.textContent = localStorage.getItem("height");
    widthSize.value = localStorage.getItem("width");
    heightSize.value = localStorage.getItem("height");
    count = localStorage.getItem("count");
    screenBox.textContent = count;


    let dynamic_api = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`
    fetch(dynamic_api)
    .then(response => response.json())
    .then(response => allImages = response)
    .then(response => Createİmage())
    .catch(err => console.log(err));
})


function Createİmage(){
    allImages.forEach((imgs) => {
            home.insertAdjacentHTML("beforeend",
            `<div style="width:${width}px; height:${height}px" class="image-box">
                <img class="image" src="${imgs.urls.small}">
            </div>`)
    })
}

widthSize.addEventListener("input", (e) => {
    width = e.target.value;
    widthText.textContent = e.target.value;
    localStorage.setItem("width", e.target.value);
})

heightSize.addEventListener("input", (e) => {
    height = e.target.value;
    heightText.textContent = e.target.value;
    localStorage.setItem("height", e.target.value);
})


incrementBtn.addEventListener("click", () => {
    count++;
    localStorage.setItem("count", count);
    screenBox.textContent = count;
})

decreementBtn.addEventListener("click", () => {
    count--;
    localStorage.setItem("count", count);
    screenBox.textContent = count;
})

setting.addEventListener("click", () => {
    bottomContent.classList.toggle("active");
})

checkBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
})