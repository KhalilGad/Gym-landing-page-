let backgroundOption = true;
let backgroundInterval;
// localStorage to color
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  // remove active class for all children
  document.querySelectorAll(".color-list li").forEach((el) => {
    el.classList.remove("active");
    //  add active class
    if (el.dataset.color == mainColor) {
      el.classList.add("active");
    }
  });
}
// stor active class in localstorage

let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-background span").forEach((el) => {
    el.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
  console.log(backgroundOption);
}
//  switch background
let randomBackground = document.querySelectorAll(".random-background span");

randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    // remove active class for all children
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // add class active for element on click
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      localStorage.setItem("background_option", true);
      randomImg();
    } else {
      backgroundOption = false;
      localStorage.setItem("background_option", false);

      clearInterval(backgroundInterval);
    }
  });
});

// slider
function randomImg() {
  if (backgroundOption === true) {
    let landing = document.querySelector(".landing-area");
    let arrayOfImgs = ["2.jpg", "3.jpg", "4.jpg", "5.jpg"];
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * arrayOfImgs.length);
      landing.style.backgroundImage =
        'url("/img/' + arrayOfImgs[randomNumber] + '")';
    }, 3000);
  }
}
randomImg();
// toggle spin class on icon

document.querySelector(".toggle-setting .gearbox").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

//  switch colors
let colorLi = document.querySelectorAll(".color-list li");
// console.log(colorLi)
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color in localStorage
    localStorage.setItem("color_option", e.target.dataset.color);
    // remove active class for all children
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    // add class active for element on click
    e.target.classList.add("active");
  });
});

//  select skills

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //  skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // console.log(skillsOffsetTop)

  // outer height skills
  let skillsOuterHeight = ourSkills.offsetHeight;
  // window Height
  let windowHeight = this.innerHeight;
  // window scrollTop
  let windowScrollTop = this.pageYOffset;
  console.log(windowScrollTop);
  console.log(skillsOffsetTop + skillsOuterHeight - windowHeight);
  if (
    windowScrollTop + 2 >
    skillsOffsetTop + skillsOuterHeight - windowHeight
  ) {
    let allSkills = document.querySelectorAll(".skillBox .skillProgress span");

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//  create popup with the image

let ourGallery = document.querySelectorAll(" .gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popupOverlay";
    // append overlay to the body
    document.body.appendChild(overlay);
    // create the popup
    let popupBox = document.createElement("div");
    // add class ti the popup
    popupBox.className = "popupBox";

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");
      // create text for heading
      let imgText = document.createTextNode(img.alt);
      // append the text to the heading
      imgHeading.appendChild(imgText);
      //  append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    // create the image
    let popupImg = document.createElement("img");
    // set img src
    popupImg.src = img.src;
    //  add img to popupBox
    popupBox.appendChild(popupImg);
    // add the popupBox to body
    document.body.appendChild(popupBox);
    //  create  the  close span
    let closeButton = document.createElement("span");
    // create the close text
    let closeButtonText = document.createTextNode("x");
    // append the text to span
    closeButton.appendChild(closeButtonText);
    // add class to close button
    closeButton.className = "closeButton";
    // add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});
//  close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "closeButton") {
    // remove the current popup
    e.target.parentNode.remove();
    // remove overlay
    document.querySelector(".popupOverlay").remove();
  }
});

//  select all bullets and links
const allBullets = document.querySelectorAll(".navBullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollDown(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollDown(allBullets);
scrollDown(allLinks);

let bulletsSpan = document.querySelectorAll(".bulletsOption span");
let bulletsContainer = document.querySelector(".navBullets");
//  local stor
let bulletLocalItem = localStorage.getItem("bulletsOption");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem == "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bulletsOption .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bulletsOption .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bulletsOption", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bulletsOption", "none");
    }
    document.querySelectorAll(".bulletsOption span").forEach((el) => {
      el.classList.remove("active");
    });
    if (bulletsContainer.style.display === "block") {
      document.querySelector(".bulletsOption .yes").classList.add("active");
    } else {
      document.querySelector(".bulletsOption .no").classList.add("active");
    }
  });
});
// rest option 
document.querySelector('.restOption').onclick=function(){
  localStorage.clear();
  window.location.reload();
  //  or
  // localStorage.removeItem("you should be write the name of the localStorage name")
  // you should be write the name of the localStorage name
}
// toggle menu
let toggleButton=document.querySelector(".toggleMenu");
let tLinks = document.querySelector(".links");
toggleButton.onclick=function(e){
  e.stopPropagation()
  this.classList.toggle("menuActive");
  tLinks.classList.toggle("open");
}
// click any where outSide menu and toggle button
document.addEventListener('click',(e)=>{
  if (e.target !== toggleButton && e.target !== tLinks) {
    if(tLinks.classList.contains("open")){
      toggleButton.classList.toggle("menuActive");
       tLinks.classList.toggle("open");
    }
  }
})
tLinks.onclick=function(e){
  e.stopPropagation()
}