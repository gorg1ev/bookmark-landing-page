// Mobile Navbar
const hamburger = document.querySelector('#hamburger');
const close = document.querySelector('#close');
const overlay = document.querySelector('#overlay');
const mainNav = document.querySelector('#main-nav');
const mobileNav = document.querySelector('#mobile-nav');

hamburger.addEventListener('click', () => {
   overlay.classList.remove('hidden');
   mobileNav.classList.remove('hidden');
   mobileNav.classList.add('flex');
   mainNav.classList.remove('flex');
   mainNav.classList.add('hidden');
   document.body.classList.add('overflow-y-hidden');
});

close.addEventListener('click', () => {
   overlay.classList.add('hidden');
   mobileNav.classList.add('hidden');
   mobileNav.classList.remove('flex');
   mainNav.classList.add('flex');
   mainNav.classList.remove('hidden');
   document.body.classList.remove('overflow-y-hidden');
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

   document.querySelector(`#${currentTabId}`).classList.remove('flex');
   document.querySelector(`#${currentTabId}`).classList.add('hidden');
   document.querySelector(`#${tabId}`).classList.add('flex');
   document.querySelector(`#${tabId}`).classList.remove('hidden');

   currentTab = tab;
   currentTabId = tabId;
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
