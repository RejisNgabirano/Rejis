const LButton = document.querySelector('.carousel__button--left');
const RButton = document.querySelector('.carousel__button--right');


// const midIndex = Math.floor(slides.length / 2);
// const midElement = slides[midIndex];
// let slideIndex = midIndex;
// console.log(slideIndex);

// track.style.transform = 'translateX(-' + width * slideIndex + 'px)';
// midElement.classList.add('current-slide');

// Initialise play the carousel
// need to make this variable from DOM
var directionForward = true;
const slideTimeInMs = 3000;
var carouselPaused = false;
let slideIndex = midIndex + 1;
var width = slideWidth;



function sleep(ms) {
    if (carouselPaused == true) { return 0 }
    else {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
};


function AutoSlideScroll() {
    console.log(slideIndex);
    if (slideIndex >= slides.length - 1) { slideIndex = slides.length - 1; }
    else if (slideIndex <= 0) { slideIndex = 0; };

    if (directionForward === true) {
        track.style.transform = 'translateX(-' + width * slideIndex + 'px)';
        if (slideIndex >= 1) {
            slides[slideIndex].classList.add('current-slide');
            slides[slideIndex - 1].classList.remove('current-slide');
        } else {
            slides[slideIndex].classList.add('current-slide');
            slides[slideIndex + 1].classList.remove('current-slide');
        }
    } else {
        if (slideIndex >= slides.length - 1) {
            slides[slideIndex].classList.add('current-slide');
            slides[slideIndex - 1].classList.remove('current-slide');
        } else {
            slides[slideIndex].classList.add('current-slide');
            slides[slideIndex + 1].classList.remove('current-slide');
        }
        track.style.transform = 'translateX(-' + width * slideIndex + 'px)';
    }
};

function manualSlideScroll() {
    AutoSlideScroll();
}

async function InitializeSlides() {
    while (!document.hidden && carouselPaused === false) {
        if (slideIndex < slides.length - 1 && directionForward === true) {
            await sleep(slideTimeInMs);
            AutoSlideScroll();
            slideIndex++;
        } else {
            await sleep(slideTimeInMs);
            AutoSlideScroll();
            slideIndex--;
            if (slideIndex === 0) { directionForward = true; }
            else { directionForward = false; };
        }
    }
    console.log('Done sliding for now');
}

InitializeSlides();

// This won't work as intended = bugs noted TODO: make this efficient.
track.addEventListener("visibilitychange", () => {
    if (track.visibilityState === 'hidden') {
        carouselPaused = true;
    } else if (track.visibilityState === 'visible' && document.activeElement !== LButton && document.activeElement !== RButton) {
        carouselPaused = false;
        InitializeSlides();
    } else if (track.visibilityState === 'visible' && carouselPaused === true) {
        async function awaitResume() {
            await sleep(4000);
            carouselPaused = false;
            InitializeSlides();
        }
        awaitResume();
    }
});


// Check if user has pressed any of the buttons so that carousel can pause
// Use currentSlideindex - get it from the async function so that it's more responsive - if possible
LButton.addEventListener('click', () => {
    carouselPaused = true;
    directionForward = false;

    manualSlideScroll();
    slideIndex--;
    console.log('clicked');
});

RButton.addEventListener('click', () => {
    carouselPaused = true;
    directionForward = true;

    manualSlideScroll();
    slideIndex++;
    console.log('clicked');
});

