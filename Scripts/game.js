const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 480;

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 64) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 64));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1921) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 64) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 64));
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1921) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 8,
        })
      );
    }
  });
});

const gravity = 0.3;

const player = new Player({
  position: {
    x: 10,
    y: 250,
  },
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc: "Images/FoxGame/FoxSprite/FoxIdle.png",
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxIdle.png",
      frameRate: 8,
      frameBuffer: 10,
    },
    IdleLeft: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxIdleLeft.png",
      frameRate: 8,
      frameBuffer: 10,
    },
    Run: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxRun.png",
      frameRate: 8,
      frameBuffer: 10,
    },
    RunLeft: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxRunLeft.png",
      frameRate: 8,
      frameBuffer: 10,
    },
    Jump: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxJump.png",
      frameRate: 2,
      frameBuffer: 30,
    },
    JumpLeft: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxJumpLeft.png",
      frameRate: 2,
      frameBuffer: 30,
    },
    Fall: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxFall.png",
      frameRate: 2,
      frameBuffer: 7,
    },
    FallLeft: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxFallLeft.png",
      frameRate: 2,
      frameBuffer: 7,
    },
    Sit: {
      imageSrc: "Images/FoxGame/FoxSprite/Foxsit.png",
      frameRate: 7,
      frameBuffer: 30,
    },
    SitLeft: {
      imageSrc: "Images/FoxGame/FoxSprite/FoxsitLeft.png",
      frameRate: 7,
      frameBuffer: 30,
    },
  },
});

const keys = {
  KeyD: {
    pressed: false,
  },
  KeyA: {
    pressed: false,
  },
  KeyS: {
    pressed: false,
  },
  KeyW: {
    pressed: false,
  },
};

var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

startAnimating(60);

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
}

function animate(newtime) {
  window.requestAnimationFrame(animate);

  now = newtime;
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    c.fillStyle = "rgba(0,0,0, 0)";
    c.clearRect(0, 0, canvas.width, canvas.height);
    collisionBlocks.forEach((collisionBlock) => {
      collisionBlock.update();
    });
    platformCollisionBlocks.forEach((block) => {
      block.update();
    });

    player.update();

    player.velocity.x = 0;

    if (keys.KeyD.pressed) {
      player.switchSprite("Run");
      player.velocity.x = 4;
      player.lastDirection = "right";
    } else if (keys.KeyA.pressed) {
      player.switchSprite("RunLeft");
      player.velocity.x = -4;
      player.lastDirection = "left";
    } else if (keys.KeyS.pressed) {
      if (player.lastDirection === "right") {
        player.switchSprite("Sit");
      } else player.switchSprite("SitLeft");
    } else if (player.velocity.y === 0) {
      if (player.lastDirection === "right") {
        player.switchSprite("Idle");
      } else player.switchSprite("IdleLeft");
    }

    if (player.velocity.y < 0) {
      if (player.lastDirection === "right") player.switchSprite("Jump");
      else player.switchSprite("JumpLeft");
    } else if (player.velocity.y > 0) {
      if (player.lastDirection === "right") player.switchSprite("Fall");
      else player.switchSprite("FallLeft");
    }

    c.restore();
  }

  window.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "KeyD":
        keys.KeyD.pressed = true;
        keys.KeyS.pressed = false;
        break;
      case "KeyA":
        keys.KeyA.pressed = true;
        keys.KeyS.pressed = false;
        break;
      case "KeyW":
        if (player.velocity.y === 0) {
          player.velocity.y = -7.3;
          keys.KeyW.pressed = true;
          keys.KeyS.pressed = false;
        }
        break;
      case "KeyS":
        keys.KeyS.pressed = true;
    }
  });
}

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyD":
      keys.KeyD.pressed = false;
      break;
    case "KeyA":
      keys.KeyA.pressed = false;
      break;
  }
});
