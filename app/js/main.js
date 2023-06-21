//гамбургер меню
const hamburger = () => {
  const hamburgerBtn = document.querySelector('.header__hamburger-btn');
  const menu = document.querySelector('.header__menu');

  if (!hamburgerBtn || !menu) return;

  hamburgerBtn.addEventListener('click', () => {
    if (hamburgerBtn.classList.contains('header__hamburger-btn--active')) {
      hamburgerBtn.classList.remove('header__hamburger-btn--active');
      menu.classList.remove('header__menu--active');
    } else if (hamburgerBtn.classList.contains('header__hamburger-btn')) {
      hamburgerBtn.classList.add('header__hamburger-btn--active');
      menu.classList.add('header__menu--active');
    }
  });
};
hamburger();



//Трек номер на форме поиска
const searchTreck = () => {
  const treckNum = document.querySelectorAll('.top__search-link');
  let inputForm = document.querySelector('.top__search-input');

  treckNum.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      inputForm.value = item.textContent.trim();
      const submitButton = document.querySelector('.tracking-widget-form button[type=submit]');
      submitButton.click();
    });
  });
};
searchTreck();

//Переключатель языков
const removeFlag = () => {
  const boxFlag = document.querySelector('.header__lang-box');
  const dropDown = document.querySelector('.header__dropdown');
  const dropDownItem = document.querySelectorAll('.header__dropdown-item');
  const langText = document.querySelector('.header__lang-text');
  const flagEn = document.querySelector('.header__lang-flag--en');
  const flagRu = document.querySelector('.header__lang-flag--ru');

  if (!boxFlag || !dropDown || !langText || !flagEn || !flagRu) return

  boxFlag.addEventListener('click', () => {
    dropDown.classList.toggle('header__dropdown--active');
  });

  dropDownItem.forEach((item, index) => {
    item.addEventListener('click', () => {
      langText.textContent = item.textContent;
      if (index == 0) {
        flagEn.style.display = 'block';
        flagRu.style.display = 'none';
      } else if (index == 1) {
        flagRu.style.display = 'block';
        flagEn.style.display = 'none';
      }
      dropDown.classList.remove('header__dropdown--active');
    });
  });

};
removeFlag();

const tabDeliveryTime = () => {
  const tabBtn = document.querySelectorAll('.delivery__time-btn');
  const tabContent = document.querySelectorAll('.time__content');

  tabBtn.forEach((item, i) => {
    item.addEventListener('click', function () {
      if (this.classList.contains('delivery__time-btn--active')) {

      } else {
        tabBtn.forEach((item, i) => {
          item.classList.remove('delivery__time-btn--active');
          tabContent[i].classList.remove('time__content--active');
        });
        this.classList.add('delivery__time-btn--active');
        tabContent[i].classList.add('time__content--active');
      }
    });
  });
};
tabDeliveryTime();

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

if (document.querySelector('.tracking-widget__aside-btn')) {
  const bufer = () => {
    const writeBtn = document.querySelector('.tracking-widget__aside-btn');
    const inputEl = document.querySelector('.tracking-widget__aside-input');

    writeBtn.addEventListener('click', () => {
      inputEl.select();
      window.navigator.clipboard.writeText(inputEl.value);
    });
  };
  bufer();
}

const trackingMix = () => {
  const trackingItem = document.querySelectorAll('.tracking .tracking__content-item');
  const trackingBtn = document.querySelectorAll('.tracking__tabs-btn');

  trackingBtn.forEach((btn) => {
    btn.addEventListener('click', function (e) {

      if (this.classList.contains('tracking__tabs-btn--active')) {} else {
        trackingBtn.forEach((item) => {
          item.classList.remove('tracking__tabs-btn--active');
        });
        this.classList.add('tracking__tabs-btn--active');
      };

      trackingItem.forEach((item) => {
        if (btn.attributes.filter.value == item.attributes?.filter?.value) {
          item.classList.add('tracking__content-item--active')
        } else {
          item.classList.remove('tracking__content-item--active')
        }
      });
    });
  });
};
trackingMix();
//jQuery---

if (document.querySelector('.services-pochta__star') || document.querySelector('.services-pochta__top-box-star') || document.querySelector('.poshta-reviews__box-star')) {
  $(function () {
    $(".services-pochta__star").rateYo({
      starWidth: "20px",
      normalFill: "#d6d6d6",
      ratedFill: "#E24949",
      spacing: "2px",
      fullStar: true,
      onSet: function (rating, rateYoInstance) {
        rating = Math.ceil(rating);
        $('#rating_input').val(rating);
      }
    })

    $(".services-pochta__top-box-star").rateYo({
      starWidth: "20px",
      normalFill: "transparent",
      ratedFill: "#E24949",
      spacing: "2px",
      readOnly: true,
      starSvg: '<svg width = "21" height = "20" viewBox = "0 0 21 20" fill = "none" xmlns = "http://www.w3.org/2000/svg" ><path d = "M10.4435 1.61908L13.085 6.97187L13.2013 7.2076L13.4615 7.2454L19.3689 8.10401L15.0943 12.2704L14.906 12.4538L14.9505 12.7129L15.9595 18.5965L10.6762 15.8189L10.4436 15.6965L10.2109 15.8189L4.92719 18.5966L5.93626 12.7129L5.98069 12.4538L5.79244 12.2704L1.51786 8.10401L7.42526 7.2454L7.68538 7.2076L7.80171 6.97189L10.4435 1.61908Z"/></svg>',
    });

    $(".poshta-reviews__box-star").rateYo({
      starWidth: "20px",
      normalFill: "transparent",
      ratedFill: "#E24949",
      spacing: "2px",
      readOnly: true,
      starSvg: '<svg width = "21" height = "20" viewBox = "0 0 21 20" fill = "none" xmlns = "http://www.w3.org/2000/svg" ><path d = "M10.4435 1.61908L13.085 6.97187L13.2013 7.2076L13.4615 7.2454L19.3689 8.10401L15.0943 12.2704L14.906 12.4538L14.9505 12.7129L15.9595 18.5965L10.6762 15.8189L10.4436 15.6965L10.2109 15.8189L4.92719 18.5966L5.93626 12.7129L5.98069 12.4538L5.79244 12.2704L1.51786 8.10401L7.42526 7.2454L7.68538 7.2076L7.80171 6.97189L10.4435 1.61908Z"/></svg>',
    });

    const mixin2 = document.querySelector('.delivery__content');
    const mixin3 = document.querySelector('.post-indexes__content');
    const mixin4 = document.querySelector('.time__box');

    if (mixin2) {
      mixitup('.delivery__content', {
        selectors: {
          control: '.mixitup'
        }
      });
    }
    if (mixin3) {
      mixitup('.post-indexes__content', {
        selectors: {
          control: '.mixitup'
        }
      });
    }
    if (mixin4) {
      mixitup('.time__box', {
        selectors: {
          control: '.mixitup'
        }
      });
    }
  });
}

const openSelectCheckbox = () => {
  const selectSingle = document.querySelectorAll('.data-select');

  if (selectSingle.length == 0) return;

  selectSingle.forEach(elem => {

    const openClick = elem.querySelector('.settings-select__title');
    const openOverflow = elem.querySelector('.settings-select__content');
    const itemListRadio = elem.querySelectorAll('.settings-select__label');

    if (!openClick || !openOverflow || !itemListRadio) return;

    const titleDefault = openClick.innerHTML;
    openClick.addEventListener('click', () => {
      _clickOutside(openClick, openOverflow);
      if (!openOverflow.classList.contains('select__checkboxShow')) {
        openOverflow.classList.add('select__checkboxShow');
        openClick.setAttribute('data-default', 'true');
        openClick.classList.add('settings-select__title2');
      } else {
        openOverflow.classList.remove('select__checkboxShow');
        openClick.setAttribute('data-default', '');
        openClick.classList.remove('settings-select__title2');
      }
    });
    itemListRadio.forEach(item => {
      item.addEventListener('click', () => {
        openOverflow.classList.remove('select__checkboxShow');
        openClick.setAttribute('data-default', '');
        openClick.classList.remove('settings-select__title2');
      });
    });
    elem.querySelectorAll('.settings-select__input').forEach(item => {
      item.addEventListener('click', () => {
        if (item.checked) {
          openClick.innerHTML = item.value;
        }
        if (openClick.innerHTML == ' ' || openClick.innerHTML == '') {
          openClick.innerHTML = titleDefault;
        }
      });
    });
  });
};

function _clickOutside(openClick, openOverflow) {
  document.addEventListener('click', function (event) {

    event.stopPropagation();

    if (event.target == openClick) return;
    let a = 0;
    for (let i = 0; i < openOverflow.children.length; i++) {
      if (event.target == openOverflow.children[i]) return a = 1;
    }
    if (a == 1) return;

    openOverflow.classList.remove('select__checkboxShow');
    openClick.setAttribute('data-default', '');
    openClick.classList.remove('settings-select__title2');
  });
}

openSelectCheckbox();

const canc__range = (rangeSelector, inputSelector) => {

  const range = document.getElementById(rangeSelector);
  const input = document.getElementById(inputSelector);

  if (!range || !input) return;

  input.value = input.value = range.value;

  input.addEventListener('input', () => {
    input.value = (input.value).replace(/\D/g, '');

    range.value = input.value;
    rangeColorChange(range);
  });

  input.addEventListener('change', () => {
    range.value = input.value;
    rangeColorChange(range);
  });

  range.addEventListener('input', (event) => {
    input.value = range.value;
  });

  range.addEventListener('change', (event) => {
    input.value = range.value;
    rangeColorChange(range);
  });

  range.addEventListener('touchend', (event) => {
    input.value = range.value;
  });
  range.addEventListener('touchmove', (event) => {
    input.value = range.value;
  });
};

const rangeColorChange = (slider) => {
  let x = Math.floor((100 * ((slider.value - slider.min) / slider.step) / ((slider.max - slider.min) / slider.step)));
  color = 'linear-gradient(90deg, rgb(203, 59, 59)' + x + '%, rgb(214, 214, 214)' + x + '%)';
  slider.style.background = color;
};

const rangeColor = (selectorId) => {

  let slider = document.getElementById(selectorId);
  if (!slider) return;

  rangeColorChange(slider);

  slider.addEventListener("mousemove", function () {
    rangeColorChange(slider);
  });

  slider.addEventListener("change", function () {
    rangeColorChange(slider);
  });

  slider.addEventListener("touchend", function () {
    rangeColorChange(slider);
  });

};

rangeColor('rangeWidth');
canc__range('rangeWidth', 'calcWidth');
rangeColor('rangeHeight');
canc__range('rangeHeight', 'calcHeight');
rangeColor('rangeFrameHeight');
canc__range('rangeFrameHeight', 'calcFrameHeight');

const copyTx = () => {
  let copyText = document.getElementById("track_tx_code");
  let myInputBtn = document.getElementById("track_button_code");

  if (!copyText || !myInputBtn) return;

  myInputBtn.addEventListener('click', () => {
    copyText.select();
    document.execCommand("copy");
  });
};

const changeSettings = () => {
  const settings = document.querySelector('.settings');
  if (!settings) return;
  
  const lang = settings.querySelectorAll('input[name="settings_language"]');
  const width = settings.querySelector('#rangeWidth');
  const height = settings.querySelector('#rangeHeight');
  const frameHeight = settings.querySelector('#rangeFrameHeight');
  const type = settings.querySelectorAll('input[name="WidgetUser[type]"]');
  const carrier = settings.querySelectorAll('input[name="WidgetUser[service]"]');

  let setLang = 'ru';
  let setWidth = width.value;
  let setHeight = height?.value;
  let setType = 'contentShift';

  carrier.forEach(elem => {
    elem.addEventListener('change', () => {
      setCarrier = elem.value;
      changeSearch();
    });
  });

  lang.forEach(elem => {
    elem.addEventListener('change', () => {
      setLang = elem.getAttribute('data-settings-value');
      changeSearch();
    });
  });

  width.addEventListener('change', () => {
    setWidth = width.value;
    changeSearch();
  });

  if (height) {
    height.addEventListener('change', () => {
      setHeight = height.value;
      changeSearch();
    });
  }

  if (frameHeight) {
    frameHeight.addEventListener('change', () => {
      setFrameHeight = frameHeight.value;
      changeSearch();
    });
  }

  type.forEach(elem => {
    elem.addEventListener('change', () => {
      setType = elem.getAttribute('data-settings-value');
      changeSearch();
    });
  });

  const changeSearch = () => {

    const search = document.querySelector('.tracking-widget-form');
    if (!search) {
      return;
    }
    const progress = document.querySelector('#' + search.getAttribute('data-widget-progress'));
    const content = document.querySelector('#' + search.getAttribute('data-widget-content'));
    const contentWrap = content.querySelector('.tracking-widget');
    const input = search.querySelector('input');

    if (!progress || !content) {
      return;
    }

    // Изменение размеров строки поиска
    search.style.maxWidth = setWidth + 'px';
    if (setHeight) {
      input.style.height = setHeight + 'px';
    }

    // Измененеие максимальной ширины контента
    content.style.setProperty('--max-width', setWidth + "px");

    // Измененеие типа наложения
    if (setType == 'contentShift') {
      content.classList.remove('widget-content--absolute');
    } else if (setType == 'overContent') {
      content.classList.add('widget-content--absolute');
    }

    // Удаление старых стилей результатов рассчета
    content.classList.remove('parent-adaptive-desktop');
    content.classList.remove('parent-adaptive-tablet');
    content.classList.remove('parent-adaptive-mobile');

    // Добавление новых стилей (адаптив от родительского контейнера)
    if (setWidth <= 1140 && setWidth > 1024) {
      content.classList.add('parent-adaptive-desktop')
    }
    if (setWidth <= 1024 && setWidth > 640) {
      content.classList.add('parent-adaptive-tablet')
    }
    if (setWidth <= 640) {
      content.classList.add('parent-adaptive-mobile')
    }
  };
};

const setAnimate = (progress, func, btn) => {

  let count = 0;
  const progresPercent = progress.querySelector('.top__progress-line')

  function animate() {
    let idInterval = requestAnimationFrame(animate);
    if (count < 80) {
      count++;
      progresPercent.style.width = count + '%';
    } else if (count == 80) {
      cancelAnimationFrame(idInterval);
    }
  }

  //докрутка полосы загрузки
  function fullDownload() {
    let idInterval = requestAnimationFrame(fullDownload);
    if (count < 100) {
      count++;
      progresPercent.style.width = count + '%';
    } else if (count >= 100) {
      cancelAnimationFrame(idInterval);
      count = 0;
      btn.classList.remove('top__search-btn--active');
      progress.classList.remove('top__progress-line-bg--active');
    }
  }

  if (func == 'start') {
    animate();
  } else {
    count = 80;
    fullDownload();
  }
};

window.addEventListener('load', () => {
  changeSettings();
  copyTx();
});

const scrollToResult = () => {
  const resultElement = document.getElementById('tracking-result');
  let resultCoordinates = resultElement?.getBoundingClientRect();
  if (resultCoordinates && resultCoordinates.top) {
    window.scrollTo(0, resultCoordinates.top);
  }
}

function ajaxTrack(track, progress, btn) {
  if (typeof client_id === 'undefined') {
    client_id = 0;
  }

  let params = {
    track: track,
    client_id: client_id
  }

  if (!btn.classList.contains('example')) params.not_frame = true;

  $.get('/ajax-track', params, function (html) {
    $('#widgetContentMain').html(html)
    if(location.href.indexOf("cabinet/widget") === -1) {
      window.history.pushState('track.' + track, document.title, '/tracking/' + track);
    }
    setAnimate(progress, 'end', btn);
    scrollToResult();
    bannerCheck();
  });
}

function ajaxTrackPost(track, progress, btn) {
  $.post('/ajax-iframe', {
    track: track,
    client_id: client_id
  }, function (html) {
    $('#widgetContentMain').html(html);
    setAnimate(progress, 'end', btn);
  });
}

const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    body: data
  });
  return await res;
};

$(function (e) {

  const forms = document.querySelectorAll('.tracking-widget-form');

  forms.forEach(form => {
    const progress = document.querySelector('#' + form.getAttribute('data-widget-progress'));
    const content = document.querySelector('#' + form.getAttribute('data-widget-content'));
    const input = form.querySelector('input');
    const btn = form.querySelector('.top__search-btn');
    let short_enabled = btn.dataset.short;
    const close = form.querySelector('.tracking-widget__btn-close');
    const closeContentBtn = document.querySelector('.tracking-widget__inner-btn-close');
    let heading;
    let user_id;
    let no_banner = document.querySelector('.no-any-banner');
    if(closeContentBtn) {
      closeContentBtn.addEventListener('click', (e) => {
        input.value = '';
        content.innerHTML = '';
        btn.classList.remove('top__search-btn--active');
        progress.classList.remove('top__progress-line-bg--active');
      });
    }

    if (!progress || !content) return;

    if (close) {
      close.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
      });
    }
    if(!short_enabled) {
      if (input && input.value.toString().replace(/\s/g, '') != '') {
        btn.classList.add('top__search-btn--active');
        progress.classList.toggle('top__progress-line-bg--active');
        setAnimate(progress, 'start', btn);
        heading = document.querySelector('h1');
        user_id = document.querySelector('#user_id');
        if(heading){
          heading = heading.innerText
          document.cookie = 'heading=' + encodeURIComponent(heading) + '; path=/';
          setSession('heading', heading);
        }else{
          document.cookie = 'heading=' + encodeURIComponent(document.title) + '; path=/';
          setSession('heading', document.title);
        }
        if(user_id){
          setSession('user_id', user_id.value);
        }
        if(no_banner){
          setSession('no_banner', 1);
        }
        setTimeout(function (){
          ajaxTrack(input.value, progress, btn);
        }, 200);
      }


      btn.addEventListener('click', (e) => {
        e.preventDefault();

        heading = document.querySelector('h1');
        user_id = document.querySelector('#user_id');
        if(heading){
          heading = heading.innerText
          document.cookie = 'heading=' + encodeURIComponent(heading) + '; path=/';
          setSession('heading', heading);
        }else{
          document.cookie = 'heading=' + encodeURIComponent(document.title) + '; path=/';
          setSession('heading', document.title);
        }
        if(user_id){
          setSession('user_id', user_id.value);
        }
        if(no_banner){
          setSession('no_banner', 1);
        }
        if (!input || input.value.toString().replace(/\s/g, '') == '') return;

        btn.classList.add('top__search-btn--active');
        progress.classList.toggle('top__progress-line-bg--active');
        setAnimate(progress, 'start', btn);

        if (form.classList.contains('tracking-widget-form-post')) {
          const formData = new FormData(form)
          const response = postData('/ajax-iframe', formData)
              .then(response => response.text())
              .then(data => {
                setAnimate(progress, 'end', btn);
                content.innerHTML = data;
                content.querySelector('#close-widget-content-btn').addEventListener('click', () => {content.innerHTML = ''});
              })
              .catch(() => console.log('no'))
              .finally(() => {
              });
        } else {

          setTimeout(function (){
            ajaxTrack(input.value, progress, btn);
          }, 200);

        }
      });
    } else {
      if (input && input.value.toString().replace(/\s/g, '') != '') {
        btn.classList.add('top__search-btn--active');
        progress.classList.toggle('top__progress-line-bg--active');
        setAnimate(progress, 'start', btn);
        heading = document.querySelector('h1');
        user_id = document.querySelector('#user_id');
        if(heading){
          heading = heading.innerText
          document.cookie = 'heading=' + encodeURIComponent(heading) + '; path=/';
          setSession('heading', heading);
        }else{
          document.cookie = 'heading=' + encodeURIComponent(document.title) + '; path=/';
          setSession('heading', document.title);
        }
        if(user_id){
          setSession('user_id', user_id.value);
        }
        if(no_banner){
          setSession('no_banner', 1);
        }
        setTimeout(function (){
          ajaxTrack(input.value, progress, btn);
        }, 200);
      }


      btn.addEventListener('click', (e) => {
        e.preventDefault();
        let trackWidgetNoFound = document.querySelector('#widgetContentMain p.mt-10');
        if(trackWidgetNoFound) {
          trackWidgetNoFound.remove();
        }
        heading = document.querySelector('h1');
        user_id = document.querySelector('#user_id');
        if(heading){
          heading = heading.innerText
          document.cookie = 'heading=' + encodeURIComponent(heading) + '; path=/';
          setSession('heading', heading);
        }else{
          document.cookie = 'heading=' + encodeURIComponent(document.title) + '; path=/';
          setSession('heading', document.title);
        }
        if(user_id){
          setSession('user_id', user_id.value);
        }
        if(no_banner){
          setSession('no_banner', 1);
        }
        if (!input || input.value.toString().replace(/\s/g, '') == '') return;

        btn.classList.add('top__search-btn--active');
        progress.classList.toggle('top__progress-line-bg--active');
        setAnimate(progress, 'start', btn);

        if (form.classList.contains('tracking-widget-form-post')) {
          const formData = new FormData(form)
          const response = postData('/ajax-iframe', formData)
              .then(response => response.text())
              .then(data => {
                setAnimate(progress, 'end', btn);
                content.innerHTML = data;
                content.querySelector('#close-widget-content-btn').addEventListener('click', () => {content.innerHTML = ''});
              })
              .catch(() => console.log('no'))
              .finally(() => {
              });
        } else {
          const animationInterval = setInterval(() => {
            let trackWidget = document.querySelector('#tracking-widget-content-inner');
            let trackWidgetInfo = document.querySelector('.tracking-widget__aside-item-info');
            let trackWidgetNoFound = document.querySelector('#widgetContentMain p.mt-10');
            if(trackWidgetNoFound) {
              setAnimate(progress, 'end', btn);
              clearInterval(animationInterval);
            }
            if(trackWidgetInfo) {
              if(input.value == trackWidgetInfo.innerText) {
                setAnimate(progress, 'end', btn);
                clearInterval(animationInterval);
              }
            }
          }, 1000);
        }
      });
    }

  });
  function mobileMenuInit() {
    const hamburgerMenu = document.querySelector('.navbar-toggler'),
          navMenu = document.querySelector('.navbar-collapse');
    if(hamburgerMenu) {
      hamburgerMenu.addEventListener('click', (e) => {
        navMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
      });
    }
  }
  mobileMenuInit();
});




/* modal */
function ahModalShow(id) {
  const modal = document.getElementById(id);

  let scrollbarWidth = window.innerWidth - document.body.clientWidth;

  document.documentElement.style.setProperty('--bodyScrollBarWidth', scrollbarWidth + "px");

  document.body.classList.add('ah-modal-show');
  document.documentElement.classList.add('ah-modal-show');

  $(modal).show(0, function () {
    $(modal).trigger('modal:show');

    modal.classList.add('ah-modal_show-modal');

    modal.onclick = function (e) {
      if (e.target === modal && !e.target.closest('.ah-modal__content')) {
        if ($('.ah-modal_show-modal').length && $('.ah-modal_show-modal').length < 2) {
          document.body.classList.remove('ah-modal-show');
          document.documentElement.classList.remove('ah-modal-show');
        }
        modal.classList.remove('ah-modal_show-modal');

        setTimeout(function (){
          $(modal).hide().trigger('modal:hide');
        }, 300)
      }
      if (e.target.hasAttribute('data-ah-modal-dismiss') || e.target.closest('[data-ah-modal-dismiss]')) {
        if ($('.ah-modal_show-modal').length && $('.ah-modal_show-modal').length < 2) {
          document.body.classList.remove('ah-modal-show');
          document.documentElement.classList.remove('ah-modal-show');
        }
        modal.classList.remove('ah-modal_show-modal');

        setTimeout(function (){
          $(modal).hide().trigger('modal:hide');
        }, 300)
      }
    }
  })
}

function ahModalHide(id) {
  const modal = document.getElementById(id);

  if ($('.ah-modal_show-modal').length && $('.ah-modal_show-modal').length < 2) {
    document.body.classList.remove('ah-modal-show');
    document.documentElement.classList.remove('ah-modal-show');
  }
  modal.classList.remove('ah-modal_show-modal');

  setTimeout(function (){
    $(modal).hide().trigger('modal:hide');
  }, 300)
}

function ahModalChangeTo(id) {

  document.body.classList.remove('ah-modal-show');
  document.documentElement.classList.remove('ah-modal-show');
  const openModals = document.querySelectorAll('.ah-modal.ah-modal_show-modal');

  if (openModals) {
    openModals.forEach(function (elem) {
      elem.classList.remove('ah-modal_show-modal');
      $(elem).hide().trigger('modal:hide');
    })
  }

  ahModalShow(id);
}

$(document).on('mousedown', '.ah-modal', function (event) {
  let modal = $(this);
  let modalContent = $('.ah-modal__content');
  if (!modalContent.is(event.target) && modalContent.has(event.target).length === 0) {
    ahModalHide(modal.attr('id'))
  }
});

/* form validate*/
function validateForm(event, formElement, successCallback, errorCallback, onReset = false) {
  const form = $(formElement);
  const formErrorMessage = form.data('required-text');
  const formErrorPlaceholder = form.data('error-placeholder');
  const inputs = form.find('input[data-required]');
  let errors = false;

  inputs.each(function () {
    const input = $(this);
    const val = input.val();
    const errorMessage = input.data('required-text');

    input.removeClass('has-error').siblings('.error-text').remove();

    if (!val.trim() && !onReset) {
      errors = true;
      input.addClass('has-error');
      if (errorMessage) input.after(`<div class="error-text">${errorMessage}</div>`)
      input.on('input', inputChangeHandler);
    } else {
      input.off('input', inputChangeHandler);
    }

  })

  if (errors && !onReset) {

    if (formErrorMessage && formErrorPlaceholder) {
      $(`<div class="error-text">${formErrorMessage}</div>`).appendTo($(formErrorPlaceholder));
    }

    if (errorCallback) {
      errorCallback();
    }
    return false;
  } else {

    if (formErrorMessage && formErrorPlaceholder) {
      $(formErrorPlaceholder).find('.error-text').remove();
    }

    if (successCallback) {
      successCallback();
    }
  }
}

function inputChangeHandler () {
  const input = $(this);
  if (input.val().trim()) {
    input.removeClass('has-error').siblings('.error-text').remove();
  }
}

$('.calculator-form__destination-swap-btn').on('click', function (e) {
  const inputFrom = $(this).closest('.calculator-form__destination').find('.calculator-form__destination-input_from');
  const inputTo = $(this).closest('.calculator-form__destination').find('.calculator-form__destination-input_to');
  const rmb = inputFrom.val();
  inputFrom.val(inputTo.val());
  inputTo.val(rmb);
});

/* end form validate*/


/**
 * Show the 'Report form' in the modal window
 *
 * @param {*} event
 */
const handleShowReportForm = (event) => {
  event.preventDefault();
  ahModalShow('modal-report-form');
}

/**
 * Remove validation errors if the input is filled in.
 *
 * @param {*} event
 */
const handleInputChange = (event) => {
  const inputElement = event.target;
  const errorElement = inputElement.nextElementSibling;

  if (!!inputElement.value.trim()) {
    inputElement.classList.remove('has-error');
    if (errorElement && errorElement.className === 'error-text') {
      errorElement.remove();
    }
  }
}

/**
 * Check required fields of 'Report form'
 *
 * @param {object} targetForm - event.target value of 'Report form'
 * @returns {boolean} form validation result
 */
const validateReportForm = (targetForm) => {

  const requiredFields = targetForm.querySelectorAll('input[data-required]');
  // const formErrorPlaceholder = formElemets.dataset.errorPlaceholder;
  let isValid = true;

  requiredFields.forEach((inputElement) => {

    // before checking, delete the previous errors
    inputElement.classList.remove('has-error');
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.className === 'error-text') {
      errorElement.remove();
    }

    const value = inputElement.value.trim();
    const errorMessage = inputElement.dataset.requiredText;

    if (!value) {
      isValid = false;

      // create an error element
      let errorElement = document.createElement('div');
      errorElement.classList.add('error-text');
      errorElement.innerText = errorMessage ? errorMessage : 'обязательно к заполнению';

      // nesting an error element after an input element
      inputElement.after(errorElement);
    }
  });


  return isValid;
}

/**
 * Check 'Report form' and open confirmation modal if validation success
 *
 * @param {object} event
 */
const handleSubtitReportForm = (event) => {
  event.preventDefault();
  const formElement = event.target;
  const isValid = validateReportForm(formElement);
  const form = document.getElementById('report-form');
  const formData = new FormData(form);
  if (isValid) {
    // TODO: submit form
    ajaxReportSend(formData);
    formElement.reset();
    ahModalChangeTo('modal-confirmation-sending');
  } else {
    // TODO: do something if error
  }
}
function ajaxReportSend(formData)
{
  $.ajax({
    url: '/feedback/report',
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    // dataType: "json",
    success: function (data) {
    }});
}
/**
 * Close the confirmation modal
 */
const handleCloseConfirmModal = () => {
  ahModalHide('modal-confirmation-sending');
}

/**
 * Initialization of the elements of the 'Report a problem' form
 *
 */
const initReportForm = () => {

  // Buttons for calling the 'Report a Problem' form
  const showReportFormButton = document.getElementById('show-modal-report-form-btn');
  const showReportFormButton2 = document.getElementById('show-modal-report-form-btn2');
  showReportFormButton?.addEventListener('click', handleShowReportForm);
  showReportFormButton2?.addEventListener('click', handleShowReportForm);

  // 'Report a Problem' form
  const reportForm = document.getElementById('report-form');
  reportForm?.addEventListener('submit', handleSubtitReportForm);

  // Required fields of the 'Report a Problem' form
  const requiredReportFormElements = reportForm?.querySelectorAll('input[data-required]');
  requiredReportFormElements.forEach((element) => {
    element.addEventListener('input', handleInputChange)
  });

  // Modal confirmation close button
  const closeModalConfirmButton = document.getElementById('close-modal-confirmation-btn');
  const closeModalConfirmButton2 = document.getElementById('close-modal-confirmation-btn2');
  closeModalConfirmButton?.addEventListener('click', handleCloseConfirmModal);
  closeModalConfirmButton2?.addEventListener('click', handleCloseConfirmModal);
}

const init = () => {
  document.addEventListener("DOMContentLoaded", (event) => {
    if(document.getElementById('report-form')) {
      initReportForm();
    }
  });
}

init()

$(document).on('click', '#show-modal-report-form-btn', function (e) {
  e.preventDefault();
  initReportForm();
  ahModalShow('modal-report-form');
});

$(document).on('click', '#show-modal-report-form-btn2', function (e) {
  e.preventDefault();
  initReportForm();
  ahModalShow('modal-report-form');
});

$(document).on('click', 'div#service_block .pagination__link', function (e) {
  e.preventDefault();

  const form = document.getElementById('service_search_form');
  let formData = new FormData(form);
  let page = e.target.getAttribute('data-page');
  const track = document.getElementById('track_hidden').value;

  formData.append('page',page);
  formData.append('track', track);
  ajaxServiceWidget(formData)

});

$(document).on('submit', '#service_search_form', function (e) {
  e.preventDefault();
  const form = document.getElementById('service_search_form');
  let formData = new FormData(form);
  const track = document.getElementById('track_hidden').value;

  formData.append('page', 0);
  formData.append('track', track);

  ajaxServiceWidget(formData)

});

function ajaxServiceWidget(formData)
{
  $.ajax({
    url: '/service-widget/search',
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    // dataType: "json",
    success: function (data) {
      $('#service_block').html(data);
    }});
}
function ajaxTrackByService(track, alias, progress, btn)
{
  $.get('/track/track-by-service', {
    track: track,
    alias: alias,
    not_frame: true
  }, function (html) {
    setAnimate(progress, 'end', btn);
    $('#widgetContentMain').html(html);
  });

}
$(document).on('click', '#tracking__content-item', function (e) {
  e.preventDefault();
  const track = document.getElementById('track_hidden').value;
  const alias = this.getAttribute('data-alias');
  const progress = document.querySelector('#widgetProgressMain');
  const btn = document.querySelector('.top__search-btn');
  const container = document.getElementById("tracking-widget");
  $('section .tracking-widget').remove();
  btn.classList.add('top__search-btn--active');
  progress.classList.toggle('top__progress-line-bg--active');
  setAnimate(progress, 'start', btn);
  ajaxTrackByService(track, alias, progress, btn);

  setTimeout(function (){
    $('html, body').animate({
      scrollTop: $(container).offset().top -30
    }, 300);
  }, 500)

});
 function setSession(key, value){
   $.ajax({
     url: '/session-store',
     method: 'POST',
     data: {key: key, data: value },
     success: function(response) {
       // Handle the response from the server
     },
     error: function(xhr, status, error) {
       // Handle the error
     }
   });
 }


 //User-cabinet

//authorization
function checkValidity(element){
  return !!element.checkValidity();
}
function userLogin(formData){
  $.ajax({
    url: '/user-cabinet/login',
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    success: function(response) {
      if(response === 'ok'){
        ahModalHide("modal-authorization-form");
        location.replace('/user-cabinet');
      }else{
        $('#error-auth').show();
        return 'error';
      }

    },
    error: function(xhr, status, error) {
      // Handle the error
    }
  });
}
function userRegister(formData){
  $.ajax({
    url: '/user-cabinet/signup',
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    success: function(response) {
      alert('Спасибо за регистрацию. Можете авторизоваться под своими данными.')
      location.replace('/user-cabinet');
    },
    error: function(xhr, status, error) {
      // Handle the error
    }
  });
}

document.getElementById("authorization")?.addEventListener("click", (e) => {
  e.preventDefault();
  ahModalShow("modal-authorization-form");
});
document.getElementById("authorization-modal")?.addEventListener("click", (e) => {
  e.preventDefault();
  ahModalHide("modal-registration-form");
  ahModalShow("modal-authorization-form");
});
//registration
document.getElementById("registration")?.addEventListener("click", (e) => {
  e.preventDefault();
  ahModalShow("modal-registration-form");
});
document.getElementById("registration-modal")?.addEventListener("click", (e) => {
  e.preventDefault();
  ahModalHide("modal-authorization-form");
  ahModalShow("modal-registration-form");
});

// modal errors
// modalRegistration
const modalRegistration = document.getElementById("modal-registration-form");
if(modalRegistration){
  const modalRegistrationInputs = modalRegistration.querySelectorAll("input");
  const modalRegistrationButton = modalRegistration.querySelector(".first");

  modalRegistrationButton.addEventListener("click", () => {
    let areFieldsFilled = true;
    let password = "";
    let passwordRepeat = "";

    modalRegistrationInputs.forEach((input) => {
      if (!input.value || !checkValidity(input)) {
        input.classList.add("error");
        areFieldsFilled = false;
      }
      if (input.id === "user-password") {
        password = input.value;
      }
      if (input.id === "user-password-repeat") {
        passwordRepeat = input.value;
      }
      input.addEventListener("input", () => {
        input.classList.remove("error");
      });
    });

    if (areFieldsFilled && password !== passwordRepeat) {
      alert("Пароли не совпадают");
      return;
    }

    if (areFieldsFilled) {
      ahModalHide("modal-registration-form");
      let form = modalRegistration.querySelector('form');
      let formData = new FormData(form);
      const csrfToken = $('meta[name="csrf-token"]').attr("content");
      formData.append('_csrf-frontend', csrfToken);
      userRegister(formData);
    }
  });
}
// modalAuthorization
const modalAuthorization = document.getElementById("modal-authorization-form");
if(modalAuthorization) {
  const modalAuthorizationInputs = modalAuthorization.querySelectorAll("input");
  const modalAuthorizationButton = modalAuthorization.querySelector(".first");

  modalAuthorizationButton.addEventListener("click", () => {
    let areFieldsFilled = true;
    modalAuthorizationInputs.forEach((input) => {
      if (!input.value || !checkValidity(input)) {
        input.classList.add("error");
        areFieldsFilled = false;
      }
      input.addEventListener("input", () => {
        input.classList.remove("error");
      });
    });

    if (areFieldsFilled) {
      let form = modalAuthorization.querySelector('form');
      let formData = new FormData(form);
      const csrfToken = $('meta[name="csrf-token"]').attr("content");
      formData.append('_csrf-frontend', csrfToken);
      userLogin(formData);
    }
  });
}
// проверка банеров
function bannerCheck() {
  const widget = document.querySelector('#widgetContentMain');
  const widgetInner = widget.querySelector('.tracking-widget__inner');
  const bannerBootom = widget.querySelector('.tracking-widget__bottom-banner');
  const bannerAside = widget.querySelector('.tracking-widget__aside-banner');
  if(widgetInner){
    if(widgetInner.offsetHeight >= 2400) {
      bannerBootom.classList.add('hide');
      bannerAside.classList.add('show');
    } else {
      bannerBootom.classList.add('show');
      bannerAside.classList.add('hide');
    }
  }
}