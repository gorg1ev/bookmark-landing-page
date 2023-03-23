// Mobile Navbar
const hamburger = document.querySelector('#hamburger');
const close = document.querySelector('#close');
const overlay = document.querySelector('#overlay');
const mainNav = document.querySelector('#main-nav');
const mobileNav = document.querySelector('#mobile-nav');

gsap.from(mainNav, { duration: 0.5, y: -100 });

hamburger.addEventListener('click', () => {
   setTimeout(() => {
      overlay.classList.remove('hidden');
      mobileNav.classList.remove('hidden');
      mobileNav.classList.add('flex');
      mainNav.classList.remove('flex');
      mainNav.classList.add('invisible');
   }, 500);

   gsap.to(mainNav, { duration: 0.5, y: -100 });
   gsap.set(overlay, { y: 0, opacity: 0.9 });
   gsap.set(mobileNav, { y: 0, opacity: 1 });
   gsap.from(overlay, { duration: 0.5, delay: 0.5, y: -500, opacity: 0 });
   gsap.from(mobileNav, { duration: 0.5, delay: 0.5, y: -500, opacity: 0 });

   document.body.classList.add('overflow-y-hidden');
});

close.addEventListener('click', () => {
   setTimeout(() => {
      overlay.classList.add('hidden');
      mobileNav.classList.add('hidden');
      mobileNav.classList.remove('flex');
      mainNav.classList.add('flex');
      mainNav.classList.remove('invisible');
   }, 500);

   gsap.set(mainNav, { y: 0 });
   gsap.from(mainNav, { duration: 0.5, delay: 0.5, y: -100 });
   gsap.to(overlay, { duration: 0.5, y: -500, opacity: 0 });
   gsap.to(mobileNav, { duration: 0.5, y: -500, opacity: 0 });

   document.body.classList.remove('overflow-y-hidden');
});

gsap.from('#hero #right .pill', { duration: 1, x: 1000 });
gsap.from('#hero #right .img', { duration: 0.5, delay: 1, scale: 0 });
gsap.from('#hero #left h1', { duration: 0.5, delay: 1, x: -1000 });
gsap.from('#hero #left p', { duration: 0.5, delay: 1.3, x: -1000 });
gsap.from('#hero #left div', {
   duration: 0.5,
   delay: 1.6,
   x: -1000,
});

// Features Section
const tabs = document.querySelector('#tabs-buttons');
let currentTab = tabs.children[0];
let currentTabId = 'tab-1';

tabs.addEventListener('click', (e) => {
   const tab = e.target.closest('li');
   const tabId = tab.getAttribute('data-tab');

   currentTab.classList.remove('active-text');
   currentTab.children[1].classList.remove('active-tab');
   tab.classList.add('active-text');
   tab.children[1].classList.add('active-tab');

   gsap.set(`#${currentTabId} .left`, { x: 0 });
   gsap.set(`#${currentTabId} .right`, { x: 0 });
   gsap.set(`#${tabId} .left`, { x: 0 });
   gsap.set(`#${tabId} .right`, { x: 0 });
   gsap.to(`#${currentTabId} .left`, { duration: 0.5, x: -1000 });
   gsap.to(`#${currentTabId} .right`, { duration: 0.5, x: 1000 });
   gsap.from(`#${tabId} .left`, { duration: 0.5, delay: 0.5, x: -1000 });
   gsap.from(`#${tabId} .right`, { duration: 0.5, delay: 0.5, x: 1000 });

   setTimeout(() => {
      document.querySelector(`#${currentTabId}`).classList.remove('flex');
      document.querySelector(`#${currentTabId}`).classList.add('hidden');
      document.querySelector(`#${tabId}`).classList.add('flex');
      document.querySelector(`#${tabId}`).classList.remove('hidden');
      currentTab = tab;
      currentTabId = tabId;
   }, 500);
});

// FAQ Section
const questions = document.querySelector('#questions');
let currentAnswer = null;
let currentSVG = null;
let arrowDown = './images/icon-arrow.svg';
let arrowUp = './images/icon-arrow-up.svg';

questions.addEventListener('click', (e) => {
   const question = e.target.closest('li');
   const svg = question.querySelector('div img');
   const answer = question.querySelector('p');

   currentAnswer !== null && currentAnswer.classList.add('hidden');
   currentSVG !== null && currentSVG.setAttribute('src', arrowDown);
   currentSVG !== null && currentSVG.classList.remove('rotate-180');
   answer.classList.remove('hidden');
   svg.src = arrowUp;
   svg.classList.add('rotate-180');

   gsap.set(answer, { opacity: 1 });
   gsap.from(answer, { duration: 0.5, opacity: 0 });

   if (currentAnswer === answer) {
      answer.classList.add('hidden');
      svg.src = arrowDown;
      svg.classList.remove('rotate-180');
      currentAnswer = null;
      return;
   }

   currentAnswer = answer;
   currentSVG = svg;
});

// CTA Section
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const form = document.querySelector('#form');
const errorMessage = document.querySelector('#error-message');
const errorIcon = document.querySelector('#error-icon');

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const input = form.querySelector('input');

   if (input.value.trim().length === 0) {
      errorMessage.textContent = 'Email address is required';
      errorMessage.classList.remove('hidden');
      errorIcon.classList.remove('hidden');
      input.classList.add('error');
      return;
   }

   if (!input.value.match(emailRegex)) {
      errorMessage.textContent = "Whoops, make sure it's an email";
      errorMessage.classList.remove('hidden');
      errorIcon.classList.remove('hidden');
      input.classList.add('error');
      return;
   }

   !errorIcon.classList.contains('hidden') && errorIcon.classList.add('hidden');
   input.classList.contains('error') && input.classList.remove('error');
   !errorMessage.classList.contains('hidden') &&
      errorMessage.classList.add('hidden');
});
