const hamMenuBtn = document.querySelector('.header-main-ham-menu-cont');
const smallMenu = document.querySelector('.header-sm-menu');
const headerHamMenuBtn = document.querySelector('.header-main-ham-menu');
const headerHamMenuCloseBtn = document.querySelector('.header-main-ham-menu-close');
const headerSmallMenuLinks = document.querySelectorAll('.header-sm-menu-link');

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header-sm-menu--active')) {
    smallMenu.classList.remove('header-sm-menu--active');
  } else {
    smallMenu.classList.add('header-sm-menu--active');
  }
  if (headerHamMenuBtn.classList.contains('disp-none')) {
    headerHamMenuBtn.classList.remove('disp-none');
    headerHamMenuCloseBtn.classList.add('disp-none');
  } else {
    headerHamMenuBtn.classList.add('disp-none');
    headerHamMenuCloseBtn.classList.remove('disp-none');
  }
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header-sm-menu--active');
    headerHamMenuBtn.classList.remove('disp-none');
    headerHamMenuCloseBtn.classList.add('disp-none');
  });
}

const headerLogoConatiner = document.querySelector('.header-logo-container');
headerLogoConatiner.addEventListener('click', () => {
  location.href = '/';
});