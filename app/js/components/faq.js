// const tabFaq = () => {
//   const tabItem = document.querySelectorAll('.faq__list-item');
//   const tabText = document.querySelectorAll('.faq__list-text');

//   tabItem.forEach((item, i) => {
//     item.addEventListener('click', function () {
//       if (this.classList.contains('faq__list-item--active')) {
//         // this.classList.remove('faq__list-item--active');
//         tabText[i].style.display = 'none';
//       } else {
//         this.classList.add('faq__list-item--active');
//         tabText[i].style.display = 'block';
//       }
//     });
//   });
// };
// tabFaq();

const tabFaq = () => {
  const tabItem = document.querySelectorAll('.faq__list-item');

  tabItem.forEach((item, i) => {
    item.addEventListener('click', function () {
      if (this.classList.contains('faq__list-item')) {
        this.classList.toggle('faq__list-item--active');
      }
    });
  });
};
tabFaq();