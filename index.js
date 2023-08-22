'use strict';

const prevBtn = document.querySelector('.btn--scroll-to');
const footer = document.querySelector('.footer');
const counterContent = document.querySelector('.counter__time');
const counterTab = document.querySelector('.count');
const btnAdd = document.querySelector('.counter__btns--btn-add');
const btnSave = document.querySelector('.counter__btns--btn-save');
const date = document.querySelector('.date');
const prevSaved = document.querySelector('.footer__prevsaved--counts');
const prevSavedHeader = document.querySelector('.footer__p');

prevBtn.addEventListener('click', () => {
  footer.scrollIntoView({ behavior: 'smooth' });
});

const prevCount = [];
let count = 0;

const updateTime = function () {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const html = `
    <p class="counter__time--hour">${
      hours > 9 ? hours : String(hours).padStart(2, '0')
    }</p>
    <p class="counter__time--minutes">${
      minutes > 9 ? minutes : String(minutes).padStart(2, '0')
    }</p>
    <p class="counter__time--seconds">${
      seconds > 9 ? seconds : String(seconds).padStart(2, '0')
    }</p>
  `;

  counterContent.innerHTML = '';

  counterContent.insertAdjacentHTML('afterbegin', html);

  setTimeout(updateTime, 1000);
};

btnAdd.addEventListener('click', () => {
  count++;
  counterTab.innerHTML = '';
  const html = `
  <p class="counter__content--count-tab">Current count: ${
    count > 9 ? count : String(count).padStart(2, '0')
  }</p>
  `;
  counterTab.insertAdjacentHTML('afterbegin', html);
});

btnSave.addEventListener('click', () => {
  date.innerHTML = '';
  startTime();
  prevCount.push(count);
  count = 0;
  const html = `
  <p class="counter__content--count-tab">Current count: ${
    count > 9 ? count : String(count).padStart(2, '0')
  }</p>
  `;

  counterTab.innerHTML = '';
  counterTab.insertAdjacentHTML('afterbegin', html);

  if (prevCount.length === 1) {
    prevSavedHeader.textContent =
      'The Number of saved counts is less than three';
  }

  if (prevCount.length > 1 && prevCount.length < 3) {
    prevSavedHeader.textContent =
      'The Number of saved counts is less than three';
  }

  if (prevCount.length >= 3) {
    prevSaved.innerHTML = '';
    displayPrevSave();
    prevSavedHeader.textContent = 'These are the most recently saved counts';
  }
});

const startTime = function () {
  const startTimeInfo = document.querySelector('.start__time');
  const now = new Date();
  const locale = navigator.locale;

  const sessionStartTime = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    year: 'numeric',
    weekday: 'long',
  }).format(now);

  //   startTimeInfo.textContent = '';
  //   startTimeInfo.textContent = sessionStartTime;
  const timeHTML = `
    <p class="date">
          current counting session began on
          <span class="start__time">${sessionStartTime}</span>
    </p>
    `;

  date.insertAdjacentHTML('afterbegin', timeHTML);

  return sessionStartTime;
};

const displayPrevSave = function () {
  const saved = prevCount.slice(-3);

  saved.reverse().forEach(save => {
    const html = `
<p class="footer__prevsaved--counts-count">${save}</p>
`;
    prevSaved.insertAdjacentHTML('afterbegin', html);
  });
};

(function () {
  updateTime();
  date.innerHTML = '';
  prevSaved.innerHTML = '';
  startTime();

  if (prevCount.length === 0) {
    prevSavedHeader.textContent = 'There are no saved counts';
  }
})();
