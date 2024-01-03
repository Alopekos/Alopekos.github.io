//onload navBar
setTimeout(() => {
  navBar.style.transform = "translateX(0)";
}, 2000).onload;

//Close NavBar
function navClose() {
  setTimeout(() => {
    navBar.style.transform = "translateX(-120%)";
  }, 800);
}

function navCloseInstant() {
  navBar.style.transform = "translateX(-120%)";
}

//game
let gameHasStarted = false;
const sleepyFox = document.querySelector(".sleepyFox");
const presentation = document.querySelector(".presentation");

window.addEventListener(
  "keyup",
  (gameEvent) => {
    if (
      gameHasStarted == false &&
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        gameEvent.code
      ) > -1
    ) {
      animate();
      navBar.style.transform = "translateX(-120%)";
      sleepyFox.style.display = "none";
      presentation.style.transform = "translateY(-120px)";
      gameHasStarted = true;
      return gameHasStarted;
    }
  },
  false
);

function startGame() {
  if (gameHasStarted == false) {
    animate();
    navBar.style.transform = "translateX(-120%)";
    sleepyFox.style.display = "none";
    gameHasStarted = true;
    return gameHasStarted;
  }
}

//navbar onscroll
const navBar = document.querySelector(".navbar");

let prevScrollPos = window.scrollY;

window.addEventListener("scroll", () => {
  let currScrollPos = window.scrollY;

  if (currScrollPos > prevScrollPos) {
    navBar.style.transform = "translateX(-120%)";
  } else if (prevScrollPos > currScrollPos) {
    navBar.style.transform = "translateX(0)";
  }

  prevScrollPos = currScrollPos;
});

//navbar animation

const indicator = document.querySelector(".indicator");
const list = document.querySelectorAll(".list");
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
  indicator.style.display = "inline-block";
}

function deactivateLink() {
  list.forEach((item) => item.classList.remove("active"));
  indicator.style.display = "none";
}
list.forEach((item) => item.addEventListener("mouseover", activeLink));
list.forEach((item) => item.addEventListener("mouseout", deactivateLink));

//sidemenu
const sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.display = "auto";
  sidemenu.style.right = "0";
  document.querySelector("html").style.overflowY = "hidden";
  prevScrollPos = window.scrollY;
  navBar.style.transform = "translateX(-120%)";
}

function closemenu() {
  sidemenu.style.right = "-300px";
  document.querySelector("html").style.overflowY = "auto";
}

//about me interactions
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function openTab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

//submit a message
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzKYpMO3bSDHcOfXj5lG3j0KYMq7Z9LTMs546wLciODUBIhUeEcOOX-7kch6bGTuxw7bg/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent sucessfully<br/>";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
