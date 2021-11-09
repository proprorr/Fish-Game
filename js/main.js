var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var okUp = false
var okDown = false
var shot = false

var drawBackground = function () {
   ctx.fillStyle = "darkseagreen";
   ctx.fillRect(0, 0, 1000, 400)
}
class Fish {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   setSettings() {
      var arrColors = ["red", "green", "yellow",
         "lime", "orangered", "teal", "aqua",
         "olive", "blueviolet", "brown",
         "saddlebrown", "chocolate",
         "purple", "navy",
         "darkslategray", "dodgerblue"];
      var randIndex = Math.floor(Math.random() * arrColors.length);
      this.color = arrColors[randIndex];

      this.speed = Math.random() * 4 + 3;

      this.offsetY = Math.random() * 300 + 50;

      this.freq = Math.random() * 0.01;

      this.ampl = Math.random() * 100 + 50;
   }
   drawFish() {
      if (this.x < -20) {
         this.setSettings()
         this.x = 1020
      }
      this.x -= this.speed
      this.y = this.offsetY + this.ampl * Math.cos(this.x * this.freq);


      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.x + 40, this.y, 20, Math.PI / 2, 3 * Math.PI / 2, false);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x - 10, this.y - 7, 4, 0, 2 * Math.PI, false);
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(this.x - 10, this.y - 7, 2, 0, 2 * Math.PI, false);
      ctx.fill();

      ctx.fillStroke = "black";
      ctx.beginPath();
      ctx.moveTo(this.x - 20, this.y);
      ctx.lineTo(this.x - 10, this.y);
      ctx.stroke();
   }
}

var fish = new Fish(1020, 0);
fish.setSettings();

var fish2 = new Fish(1520, 0);
fish2.setSettings();

class bullet {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   arrBullet = []
   drawBullet() {
      if (shot === true && this.arrBullet.length < 10) {
         shot = false;
         var flyBullet = new bullet(this.x, this.y);
         this.arrBullet.push(flyBullet);
         //console.log(this.arrBullet);
      }
      if (this.arrBullet.length > 0) {
         this.arrBullet.forEach(element => {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(element.x, element.y, 10, Math.PI / 2, 3 * Math.PI / 2, true);
            ctx.fill();

            if (Math.sqrt(Math.pow(element.x - fish.x, 2) + Math.pow(element.y - fish.y, 2)) < 30) {
               fish.color = "black";
            }
            if (Math.sqrt(Math.pow(element.x - fish2.x, 2) + Math.pow(element.y - fish2.y, 2)) < 30) {
               fish2.color = "black";
            }

            element.x += 10;
            if (element.x > 1000) {
               this.arrBullet.shift();
            }
         })
      }
      if (okUp === true && this.y - 10 > 0) {
         this.y -= 5;
      }
      if (okDown === true && this.y + 10 < 400) {
         this.y += 5;
      }
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, Math.PI / 2, 3 * Math.PI / 2, true);
      ctx.fill();
   }
}
var Bullet = new bullet(0, 200);

var animate = function () {
   drawBackground()
   fish.drawFish()
   fish2.drawFish()
   Bullet.drawBullet()
   requestAnimationFrame(animate)
}
animate()

addEventListener("keydown", function (event) {
   if (event.keyCode === 38) {
      okUp = true;
   }
   if (event.keyCode === 40) {
      okDown = true;
   }
   if (event.keyCode === 39) {
      shot = true;
   }
});
addEventListener("keyup", function (event) {
   if (event.keyCode === 38) {
      okUp = false;
   }
   if (event.keyCode === 40) {
      okDown = false;
   }
})
