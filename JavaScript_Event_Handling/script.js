let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const thumbnails = document.querySelectorAll('.thumbnails img');
let slideInterval;

function showSlide(index) {

  if (index < 0) {
    currentSlide = slides.length - 1;
  } else if (index >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }
  
 
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  thumbnails.forEach(thumbnail => {
    thumbnail.classList.remove('active');
  });
  

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  thumbnails[currentSlide].classList.add('active');
}


document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentSlide + 1);
  resetTimer();
});

document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentSlide - 1);
  resetTimer();
});

dots.forEach(dot => {
  dot.addEventListener('click', function() {
    const slideIndex = parseInt(this.getAttribute('data-index'));
    showSlide(slideIndex);
    resetTimer();
  });
});

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
    const slideIndex = parseInt(this.getAttribute('data-index'));
    showSlide(slideIndex);
    resetTimer();
  });
});


function startSlideTimer() {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3000);
}

function resetTimer() {
  clearInterval(slideInterval);
  startSlideTimer();
}


startSlideTimer();