import IMask from 'imask';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';


const body = document.querySelector('body');

// Top menu item set active
const topMenuItem = document.querySelectorAll('.top-menu .menu-item');

if (typeof(topMenuItemActive) != "undefined" && topMenuItemActive !== null) {
  topMenuItem[topMenuItemActive].classList.add('active');
}

// To top кнопка вверх
const toTopImage = document.querySelector(".to-top-image");

if (toTopImage) {
  toTopImage.onclick = () => {
    scroll(0, 0);
  }
}

// Interior slider
const InteriorSlider = new Swiper('.interior-slider', {
  modules: [Navigation],
  spaceBetween: 20,
  breakpoints: {
    // when window width is >= 320px
    320: {
        slidesPerView: 1,
        spaceBetween: 10,
    },
    // when window width is >= 576px
    576: {
        slidesPerView: 'auto',
        spaceBetween: 15,
    },
    // when window width is >= 992px
    992: {
        spaceBetween: 20,
    },
  },
  loop: true,
  navigation: {
    nextEl: '.interior-section-slider .swiper-button-next',
    prevEl: '.interior-section-slider .swiper-button-prev',
  },

});

// Menu slider
const MenuSlider = new Swiper('.menu-slider', {
  modules: [Navigation],
  spaceBetween: 10,
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.menu-section-slider .swiper-button-next',
    prevEl: '.menu-section-slider .swiper-button-prev',
  },

});

// Input phone mask
function inputPhoneMask() {
  const elementPhone = document.querySelectorAll('.js-input-phone-mask');

  const maskOptionsPhone = {
    mask: '+{7} (000) 000 00 00'
  };

  elementPhone.forEach((item) => {
    const mask = IMask(item, maskOptionsPhone);
  });
}

inputPhoneMask();


// Mobile menu
const burgerMenu = document.querySelectorAll('.burger-menu');
const menuClose = document.querySelector('.menu-close');
const mobileMenu = document.querySelector('.mobile-menu');

function openMobileMenu() {
  body.classList.add('overflow-hidden');
  mobileMenu.classList.add('active');
}

function closeMobileMenu() {
  body.classList.remove('overflow-hidden');
  mobileMenu.classList.remove('active');
}

burgerMenu.forEach((item) => {
  item.onclick = function() {
    openMobileMenu();
  }
});

menuClose.onclick = function() {
  closeMobileMenu();
}

const listParentClick = document.querySelectorAll('.mobile-menu .valenki-menu-item__link');

for (let i=0; i < listParentClick.length; i++) {
  listParentClick[i].onclick = function (event) {
    event.preventDefault();
    closeMobileMenu();
    let hrefClick = this.href;
    setTimeout(function() {
      location.href = hrefClick
    }, 500);
  }
}

// Current year
const now = new Date();
const year = now.getFullYear();

const currentYear = document.getElementById('current-year');
currentYear.innerText = year;


// Set cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/" + "; sameSite=Lax;";
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function loadMetrica() {
  console.log('metrika load');
}

function checkCookies() {
  let cookieNote = document.querySelector('#cookie_note');
  let cookieBtnAccept = cookieNote.querySelector('#cookie_accept');
  const cookieBtnDontAccept = cookieNote.querySelector('#cookie_dont_accept');

  // Если куки we-use-cookie нет или она просрочена, то показываем уведомление
  if (!getCookie('we_use_cookie')) {
    cookieNote.classList.add('active');
  }

  if (getCookie('we_use_cookie') == 'true') {
    loadMetrica();
  }

  cookieBtnAccept.addEventListener('click', function () {
    setCookie('we_use_cookie', 'true', 365);
    cookieNote.classList.remove('active');
    loadMetrica();
  });

  cookieBtnDontAccept.addEventListener('click', function () {
    setCookie('we_use_cookie', 'false', 10);
    cookieNote.classList.remove('active');
  });
}

checkCookies();


// Окна
const modalWindows = document.querySelectorAll('.modal-window');
const callbackModalBtns = document.querySelectorAll('.js-callback-modal-btn');
const callbackModal = document.querySelector('#callback-modal');
const modalCloseBtns = document.querySelectorAll('.modal-window .modal-close');

if (callbackModalBtns) {
  callbackModalBtns.forEach((item) => {
    item.onclick = function () {
      modalWindowOpen(callbackModal);
    }
  });
}

function modalWindowOpen(win) {
  // Открытие окна
  body.classList.add('overflow-hidden');
  win.classList.add('active');
  setTimeout(function(){
    win.childNodes[1].classList.add('active');
  }, 200);
}

for (let i=0; i < modalCloseBtns.length; i++) {
  modalCloseBtns[i].onclick = function() {
    modalWindowClose(modalWindows[i]);
  }
}

for (let i = 0; i < modalWindows.length; i++) {
  modalWindows[i].onclick = function(event) {
    let classList = event.target.classList;
    for (let j = 0; j < classList.length; j++) {
      if (classList[j] == "modal" || classList[j] == "modal-wrapper" || classList[j] == "modal-window") {
        modalWindowClose(modalWindows[i])
      }
    }
  }
}

function modalWindowClose(win) {
  body.classList.remove('overflow-hidden');
  win.childNodes[1].classList.remove('active');
  setTimeout(() => {
    win.classList.remove('active');
  }, 300);
}


// Отправка формы ajax
const callbackModalForm = document.querySelector('#callback-modal-form');
const callbackModalSubmitBtn = document.querySelector('#callback-modal-submit-btn');
const callbackForm = document.querySelector('#callback-form');
const callbackSubmitBtn = document.querySelector('#callback-submit-btn');

function ajaxCallback(form) {

  const inputs = form.querySelectorAll('.input-field');
  let arr = [];

  const inputName = form.querySelector('.js-required-name');
  if (inputName.value.length < 3 || inputName.value.length > 20) {
    inputName.classList.add('required');
    arr.push(false);
  }

  const inputPhone = form.querySelector('.js-required-phone');
  if (inputPhone.value.length != 18) {
    inputPhone.classList.add('required');
    arr.push(false);
  }

  const inputCheckboxes = form.querySelectorAll('.js-required-checkbox');

  inputCheckboxes.forEach((item) => {
    if (!item.checked) {
      arr.push(false);
    }
  });

  if (arr.length == 0) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove('required');
    }

    fetch('/phpmailer/mailer.php', {
      method: 'POST',
      cache: 'no-cache',
      body: new FormData(form)
    })
    .catch((error) => {
      console.log(error);
    })

    alert("Спасибо. Мы свяжемся с вами.");

    form.reset();

  }

  return false;
}

callbackModalSubmitBtn.onclick = () => {
  ajaxCallback(callbackModalForm);
}

if (callbackSubmitBtn) {
  callbackSubmitBtn.onclick = () => {
    ajaxCallback(callbackForm);
  }
}


// Закреп header
const header = document.querySelector('.header');
const bottomMenu = document.querySelector('.bottom-menu');

// Показать header при скролле
window.onscroll = () => {
  
  let scrToTop = window.scrollY || document.documentElement.scrollTop;
  
  if (scrToTop > 800) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }

  if (scrToTop > 500) {
    bottomMenu.classList.add('active');
  } else {
    bottomMenu.classList.remove('active');
  }

}


// Скрытие Яндекс карты на мобильных устройствах
function hideYandexMap() {
  let width = window.innerWidth;
  const map = document.querySelector('.map');

  if (width < 768) {
    map.innerHTML = '';
  }
  
  return;
}

hideYandexMap();

window.addEventListener('resize', () => {
  hideYandexMap();
});
