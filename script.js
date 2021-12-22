'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Implementing smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', e => {
  //OLD WAY
  //const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  let id = e.target.getAttribute('href');
  id != '#' &&
    id &&
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

//Tabbing
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    if (e.target !== this) {
      let closest = e.target.closest('.operations__tab');
      document
        .querySelector('.operations__tab--active')
        .classList.remove('operations__tab--active');
      closest.classList.add('operations__tab--active');
      document
        .querySelector('.operations__content--active')
        .classList.remove('operations__content--active');
      document
        .querySelector(`.operations__content--${closest.dataset.tab}`)
        .classList.add('operations__content--active');
    }
  });

// Menu Fading animation
const fadingMenu = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const nav_links = document.querySelectorAll('.nav__link');
    document.querySelector('#logo').style.opacity = this;
    nav_links.forEach(el => {
      if (el != e.target) el.style.opacity = this;
    });
  }
};
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', fadingMenu.bind('0.5'));
nav.addEventListener('mouseout', fadingMenu.bind('1'));
//Sticky menu
//Bad Way
// window.addEventListener('scroll', function (e) {
//   window.scrollY > section1.getBoundingClientRect().top
//     ? nav.classList.add('sticky')
//     : nav.classList.remove('sticky');
// });
//Good way
const header = document.querySelector('.header');
const navHeigh = nav.getBoundingClientRect().height;
const observFunc = function (entries, observer) {
  entries.forEach(el =>
    !el.isIntersecting
      ? nav.classList.add('sticky')
      : nav.classList.remove('sticky')
  );
};
const observOpt = {
  root: null, // null = viewport то есть когда виден элемент на экран
  threshold: 0, // На сколько процентов виден элемент
  rootMargin: `-${navHeigh}px`, // на сколько пиксеоей раньше может показываться
};
const observer = new IntersectionObserver(observFunc, observOpt);
observer.observe(header); // передается элемент
// Sections observer
const sections = document.querySelectorAll('.section');
const observSections = new IntersectionObserver(
  (el, observer) => {
    const [ent] = el;
    if (!ent.isIntersecting) return;
    ent.target.classList.remove('section--hidden');
    observer.unobserve(ent.target);
  },
  {
    root: null,
    threshold: 0.15,
  }
);
sections.forEach(el => {
  el.classList.add('section--hidden');
  observSections.observe(el);
});

// Lazy loading Images
const images = document.querySelectorAll('.features img');
const observImg = new IntersectionObserver(
  (ents, observer) => {
    const [ent] = ents;
    if (!ent.isIntersecting) return;
    ent.target.src = ent.target.dataset.src;
    ent.target.addEventListener('load', () =>
      ent.target.classList.remove('lazy-img')
    );
    observer.unobserve(ent.target);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  }
);
images.forEach(el => observImg.observe(el));

// SLIDER
const slides = document.querySelectorAll('.slide');
const arrws = document.querySelector('.dots');
const dot = document.createElement('button');
dot.classList.add('dots__dot');
slides.forEach((el, ind) => {
  arrws.append(dot.cloneNode());
  el.style.transform = `translateX(${100 * ind}%)`;
});
const [left_arw, right_arw] = [
  document.querySelector('.slider__btn--left'),
  document.querySelector('.slider__btn--right'),
];
const dots = document.querySelectorAll('.dots__dot');
let currSlide = 0;
dots[currSlide].classList.add('dots__dot--active');
const goToSlide = function (currSlide) {
  document
    .querySelector('.dots__dot--active')
    .classList.remove('dots__dot--active');
  dots[currSlide].classList.add('dots__dot--active');
  slides.forEach(
    (el, ind) =>
      (el.style.transform = `translateX(${100 * (ind - currSlide)}%)`)
  );
};
const prevSlide = function () {
  currSlide--;
  if (currSlide === -1) currSlide = slides.length - 1;
  goToSlide(currSlide);
};
const nextSlide = function () {
  currSlide++;
  if (currSlide === slides.length) currSlide = 0;
  goToSlide(currSlide);
};
right_arw.addEventListener('click', nextSlide);
left_arw.addEventListener('click', prevSlide);
document.addEventListener('keydown', e => {
  if (e.key == 'ArrowRight') nextSlide();
  if (e.key == 'ArrowLeft') prevSlide();
});
dots.forEach((el, ind) => el.addEventListener('click', () => goToSlide(ind)));
setInterval(() => nextSlide(), 5000);
//Cookies
// const cookDiv = document.createElement('div');
// cookDiv.classList.add('cookie-message');
// cookDiv.innerHTML =
//   'We use cookies for better experience and management!  <button class="btn nav__link--btn">Got it!</button>';
// document.querySelector('.header').append(cookDiv);
// cookDiv
//   .querySelector('button')
//   .addEventListener('click', () => cookDiv.remove());

//Styles
// cookDiv.style.backgroundColor = '#37383d';
// cookDiv.style.width = '120%';
// cookDiv.style.height =
//   Number.parseFloat(getComputedStyle(cookDiv).height) + 30 + 'px';
