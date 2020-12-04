const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const linls = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle("open");
});

window.onload = function(){
  document.querySelector('.covid-container').addEventListener('mousemove', function(event) {eyeball(event)});
}

function eyeball(e) {
  var eye = document.querySelectorAll(".eye");
  eye.forEach(function(eye) {
    let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
    let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
    let radian = Math.atan2(e.clientX - x, e.clientY - y);
    let rot = (radian * (180 / Math.PI) * -1) + 270;
    eye.style.transform = "rotate(" + rot + "deg)";
  })
}