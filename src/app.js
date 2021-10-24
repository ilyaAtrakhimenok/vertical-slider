let container = document.querySelector(".container");
let leftSide = document.querySelector(".left-side");
let rightSide = document.querySelector(".right-side");

let upBtn = document.querySelector(".actions__btn-up");
let downBtn = document.querySelector(".actions__btn-down");

let slidesLength = rightSide.querySelectorAll(".right-side__item").length;

let activeSlideIndex = 0;

let downY = null;
let upY = null;

leftSide.style.top = `-${(slidesLength - 1) * 100}vh`;

function changeSlide(str) {
  let sliderHeight = container.clientHeight;
  if (str === "up") {
    activeSlideIndex++;
    if (activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
  }
  if (str === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
  }
  rightSide.style.transform = `translateY(-${
    activeSlideIndex * sliderHeight
  }px)`;
  leftSide.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
}

function wheelScroll (event) {
    if (event.wheelDelta > 0) {
      console.log(event.wheelDelta);
      changeSlide("up");
    } else {
      console.log(event.wheelDelta);
      changeSlide("down");
    }
  };

function mouseDown(event) {
  document.body.style.cursor = 'grab';
  downY = event.clientY;
}

function mouseUp(event) {
  document.body.style.cursor = 'default';
  upY = event.clientY;
  if (this.className == "right-side") {
    if (downY - upY > 200) changeSlide("up");
    else if (upY - downY > 200) changeSlide("down");
  }
  else{
    if (downY - upY > 200) changeSlide("down");
    else if (upY - downY > 200) changeSlide("up");
  }
}


container.addEventListener("mousewheel",wheelScroll);
container.addEventListener("DOMMouseScroll",wheelScroll); // for FireFox

rightSide.addEventListener("mousedown", mouseDown);
rightSide.addEventListener("mouseup", mouseUp);
leftSide.addEventListener("mousedown", mouseDown);
leftSide.addEventListener("mouseup", mouseUp);

upBtn.addEventListener("click", () => changeSlide("up"));
downBtn.addEventListener("click", () => changeSlide("down"));
