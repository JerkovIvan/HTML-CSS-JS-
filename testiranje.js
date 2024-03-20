//galerija 
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("moj-slajd");
  let text = document.getElementsByClassName("text");
  
  // Prikaz trenutnog slajda
  slides[slideIndex].classList.add("fade-in");
  
  // Sakrivanje prethodnog slajda
  let prevSlideIndex = slideIndex === 0 ? slides.length - 1 : slideIndex - 1;
  slides[prevSlideIndex].classList.remove("fade-in");

  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  
  setTimeout(showSlides, 2000); // Promijeni sliku svakih 2 sekunde
}

