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
      zoomBox = document.querySelector(".zoom-box"),
      backgroundInfo = document.querySelectorAll(".background-info");



      
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
                <div clas="background-info" style="width:100%; height:50%; background-color:#1e96fc; display:flex; align-items:center; justify-content:center;">
                    <div class="profile-image" style="width:40%; height:80%; border-radius: 50%; background-color:#fff; position:relative;">
                        <img style="position:absolute; width:100%; height:100%;  padding:5px; border-radius:50%;" src="${imgs.user.profile_image.large}">
                    </div>
                </div>
                <div style="padding:5%; position:relative;">
                    <div style="font-weight:700; font-size:1.2rem; margin:6px 0;">${imgs.user.name}</div>
                    <div style="margin:3px 0; font-size:0.8rem;"><b>İmage Description : </b>${imgs.alt_description}</div>
                    <div style="margin:3px 0; font-size:1.2rem;"></div>
                    <span><b>Location : </b>${imgs.location.city} / ${imgs.location.country}</span>
                    <div style="position:absolute; right:3px; top:3px; display:flex; font-size:18px; margin:3px;">
                        <i style="color:#dd2a7b;" class='bx bxl-instagram-alt'></i>
                        <i style="color:#08a0e9;" class='bx bxl-twitter'></i>
                        <i style="color:#4267b3;" class='bx bxl-facebook-circle'></i>
                        <i style="color:#ff0000;" class='bx bxl-youtube' ></i>
                    </div>
                </div>
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

    let userInfo = document.querySelectorAll(".user-info");
    userInfo.forEach((user) => user.addEventListener("click", (e) => {
        user.classList.toggle("turn-image");
        if(user.classList.contains("turn-image")){
            e.target.parentElement.parentElement.firstElementChild.style = "transform:rotateY(90deg);"
        }else{
            e.target.parentElement.parentElement.firstElementChild.style = "transform:rotateY(0deg);"
        }
    }))
    

    let downloadBtn = document.querySelectorAll(".download");
    downloadBtn.forEach((btn) => btn.addEventListener("click", (e) => {
        let imgUrl = e.target.parentElement.parentElement.firstElementChild.src;
        allImages.forEach(img => {
            if(img.urls.small == imgUrl){
                let fileLink = img.links.download;
                location.href = fileLink;
            }
            console.log(allImages);
        })
    }) )

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
}, 2000)


