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
      checkBtn = document.querySelector(".check"),
      closeBtn = document.querySelector(".close-btn"),
      searchBtn = document.querySelector(".search-btn"),
      modeText = document.querySelector(".options-box span"),
      image1 = document.querySelector(".image-1"),
      image2 = document.querySelector(".image-2"),
      image3 = document.querySelector(".image-3"),
      zoomWrapper = document.querySelector(".zoom-wrapper"),
      zoomClose = document.querySelector(".zoom-close-box"),
      zoomBox = document.querySelector(".zoom-box");



      
let accessKey = "8rnymTBmLkxRSpdhRcaMoYOmuOgEtaYeCCkkacGKhc4";
let imgTag = [];
let width = 300;
let height = 300;
let allImages = [];
let count = 30;
let randomIndex = [];

loadBtn.addEventListener("click", () => {
    window.location.reload();
})

window.addEventListener("load", () => {
    zoomBox.classList.add("initialize-zoom-box");
    if(localStorage.getItem("dark")){
        body.classList.add("dark");
    }
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
    .then(response => BigImageİnitialize())
    .then(response => Createİmage())
    .catch(err => console.log(err));


})

function BigImageİnitialize(){
    image1.src = allImages[1].urls.regular;
    image2.src = allImages[2].urls.regular;
    image3.src = allImages[3].urls.regular;
}

function Createİmage(){
    allImages.forEach((imgs) => {
            home.insertAdjacentHTML("beforeend",
            `<div style="width:${width}px; height:${height}px" class="image-box">
                <img class="image" src="${imgs.urls.small}">
                <div class="info">
                    <i class='bx bx-search zoom'></i>
                    <i class='bx bxs-info-circle user-info'></i>
                    <i class='bx bxs-download download'></i>
                </div>
            </div>`)
    })

    
    let zoom = document.querySelectorAll(".zoom");
    zoom.forEach((zoom) => zoom.addEventListener("click", (e) => {
        zoomBox.classList.remove("initialize-zoom-box");
        if(zoomWrapper){
            zoomWrapper.innerHTML = "";
        }
        if(zoomBox.classList.contains("zoom-box-visiblity")){
            zoomBox.classList.remove("zoom-box-visiblity");
        }
        
        let targetImageSrc = e.target.parentElement.parentElement.firstElementChild.src;
        
        zoomWrapper.insertAdjacentHTML("afterbegin", 
            `<img width="500px" height="500px" style="object-fit:cover; z-index:95;" class"zoom-image" src="${targetImageSrc}">`
        )
    }))

    // let userInfo = document.querySelectorAll(".user-info");
    // userInfo.forEach((user) => user.addEventListener("click", (e) => {

    //     user.classList.toogle("turn-image");
    // }))
    

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

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

checkBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("dark", "dark");
    }else{
        localStorage.removeItem("dark")
    }

    if(body.classList.contains("dark")){
        modeText.textContent = "Light Mode"
    }else{
        modeText.textContent = "Dark Mode"
    }
})

zoomClose.addEventListener("click", () => {
    zoomBox.classList.toggle("zoom-box-visiblity");
})

setInterval(() => {
    let initializeTime = 100;
    

    if(allImages != null){
        randomIndex.length = 0;
    }

    for (let i = 0; i < 3; i++) {
        randomIndex.push(Math.floor(Math.random() * 30))
    }
   
   allImages.forEach((img, index) => {

    for (let i = 0; i < 3; i++) {
        if(randomIndex[0] === index){
            image1.src = allImages[randomIndex[0]].urls.regular;
        }
        if(randomIndex[1] === index){
            image2.src = allImages[randomIndex[1]].urls.regular;
        }
        if(randomIndex[2] === index){
            image3.src = allImages[randomIndex[2]].urls.regular;
        }
    }
    
   })
}, 3000)


