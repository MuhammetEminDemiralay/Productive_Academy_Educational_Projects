const body = document.querySelector("body"),
      sidebar = document.querySelector(".sidebar"),
      home = document.querySelector(".home"),
      image = document.querySelector(".image");

let count = 30;
let accessKey = "8rnymTBmLkxRSpdhRcaMoYOmuOgEtaYeCCkkacGKhc4";
let dynamic_api = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`
let imgTag = [];
let width = 200;
let height = 200;
let allImages = [];

window.addEventListener("load", () => {

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
