//Close NavBar

window.addEventListener("load", () => {
  setTimeout(() => {
    navBar.style.transform = "translateX(0%)";
  }, 2000);
});

function navClose() {
  setTimeout(() => {
    navBar.style.transform = "translateX(-120%)";
  }, 800);
}

function navCloseInstant() {
  navBar.style.transform = "translateX(-120%)";
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navCloseInstant();
  }
});
//background img
const foreground = document.getElementById("foreground-img");
const setBackground = () => {
  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  let totalMonth = month;

  if (totalMonth >= 3 && totalMonth <= 5) {
    document.body.style.backgroundImage =
      "url('/Images/BackgroundPixelArt-Spring.png')";
    setTimeout(() => {
      foreground.src = "/Images/Foreground-Spring.png";
    }, 500);
    return;
  } else if (totalMonth >= 6 && totalMonth <= 8) {
    document.body.style.backgroundImage =
      "url('/Images/BackgroundPixelArt-Summer.png')";
    setTimeout(() => {
      foreground.src = "/Images/Foreground-Summer.png";
    }, 500);
    return;
  } else if (totalMonth >= 9 && totalMonth <= 11) {
    document.body.style.backgroundImage =
      "url('/Images/BackgroundPixelArt-Fall.png')";
    setTimeout(() => {
      foreground.src = "/Images/Foreground-Fall.png";
    }, 500);
    return;
  } else if (totalMonth == 12 || totalMonth == 1 || totalMonth == 2) {
    document.body.style.backgroundImage =
      "url('/Images/BackgroundPixelArt-Winter.png')";
    setTimeout(() => {
      foreground.src = "/Images/Foreground-Winter.png";
    }, 500);
    return;
  } else {
    document.body.style.backgroundImage =
      "url('/Images/BackgroundPixelArt-Winter.png')";
    setTimeout(() => {
      foreground.src = "/Images/Foreground-Winter.png";
    }, 500);
    return;
  }
};

setBackground();

//game
let gameHasStarted = false;
const sleepyFox = document.querySelector(".sleepyFox");
const presentation = document.querySelector(".presentation");
const wasd = document.querySelector(".wasdAnim");

window.addEventListener(
  "keyup",
  (gameEvent) => {
    if (
      gameHasStarted == false &&
      ["KeyW", "KeyA", "KeyS", "KeyD"].indexOf(gameEvent.code) > -1
    ) {
      animate();
      navBar.style.transform = "translateX(-120%)";
      sleepyFox.style.display = "none";
      wasd.style.display = "none";
      presentation.style.transform = "translateY(-320px)";
      gameHasStarted = true;
      return;
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

//change season buttons

const springBtn = document.querySelector(".spring-btn");
const summerBtn = document.querySelector(".summer-btn");
const fallBtn = document.querySelector(".fall-btn");
const winterBtn = document.querySelector(".winter-btn");

springBtn.addEventListener("click", () => {
  foreground.src = "";
  document.body.style.backgroundImage =
    "url('/Images/BackgroundPixelArt-Spring.png')";
  setTimeout(() => {
    foreground.src = "/Images/Foreground-Spring.png";
  }, 500);
});

summerBtn.addEventListener("click", () => {
  foreground.src = "";
  document.body.style.backgroundImage =
    "url('/Images/BackgroundPixelArt-Summer.png')";
  setTimeout(() => {
    foreground.src = "/Images/Foreground-Summer.png";
  }, 500);
});

fallBtn.addEventListener("click", () => {
  foreground.src = "";
  document.body.style.backgroundImage =
    "url('/Images/BackgroundPixelArt-Fall.png')";
  setTimeout(() => {
    foreground.src = "/Images/Foreground-Fall.png";
  }, 500);
});

winterBtn.addEventListener("click", () => {
  foreground.src = "";
  document.body.style.backgroundImage =
    "url('/Images/BackgroundPixelArt-Winter.png')";
  setTimeout(() => {
    foreground.src = "/Images/Foreground-Winter.png";
  }, 500);
});

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

//notAssigned alert
const noLinkElements = document.querySelectorAll(".notAssigned");

noLinkElements.forEach((link) => {
  link.addEventListener("click", () => {
    alert("Cette partie du site n'est pas encore finie.");
    return;
  });
});

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
