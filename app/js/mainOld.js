//РіР°РјР±СѓСЂРіРµСЂ РјРµРЅСЋ
const hamburger = () => {
  const hamburgerBtn = document.querySelector('.header__hamburger-btn');
  const menu = document.querySelector('.header__menu');

  if (!hamburgerBtn || !menu) return;

  hamburgerBtn.addEventListener('click', () => {
    if (hamburgerBtn.classList.contains('header__hamburger-btn--active')) {
      hamburgerBtn.classList.remove('header__hamburger-btn--active');
      menu.classList.remove('header__menu--active')
    } else if (hamburgerBtn.classList.contains('header__hamburger-btn')) {
      hamburgerBtn.classList.add('header__hamburger-btn--active');
      menu.classList.add('header__menu--active')
    }
  })
}
hamburger();

const setSearch = () => {
  console.log('setSearch')
  const search = document.querySelector('.tracking-widget')
  const btn = document.querySelector('.tracking-widget .top__search-btn')
  const close = document.querySelector('.tracking-widget .tracking-widget__btn')
  const input = document.querySelector('.tracking-widget .tracking-widget__input')
  const progress = document.querySelector('.tracking-widget .top__progress-line-bg')

  if (!search || !btn || !close) return;

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      body: data
    })
    return res
  }


  close.addEventListener('click', () => {
    input.value = '';
    btn.classList.remove('top__search-btn--active');
    progress.classList.remove('top__progress-line-bg--active');
  })

  search.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(search)
    const response = postData('/ajax-iframe', formData)
      .then(response => response.text())
      .then(data => {
        document.getElementById("result_ajax").innerHTML = data
      })
      .catch(() => console.log('no'))
      .finally(() => {
        //overlay.classList.add('tracking-widget__inner-show')
      })

    //console.log('response ', response.json())
    // if (response) {
    //   overlay.innerHTML = ''
    //   overlay = response
    // }

  })

}



window.addEventListener('load', () => {
  //РїРѕРёСЃРє РЅР° РєРЅРѕРїРєРµ start
  let elem = document.getElementById('top__progress-line');
  let count = 0;
  let idInterval;
  const searchBtn = document.querySelector('.top__search-btn');
  const progressBar = document.querySelector('.top__progress-line-bg');

  function searchSpinner() {
    searchBtn.addEventListener('click', () => {
      searchBtn.classList.toggle('top__search-btn--active');
      progressBar.classList.toggle('top__progress-line-bg--active');
      animate();
      count = 0;
    });
  }
  searchSpinner();
  //Р°РЅРёРјР°С†РёСЏ Р·Р°РіСЂСѓР·РєРё
  function animate() {
    idInterval = requestAnimationFrame(animate);
    if (count < 80) {
      count++
      elem.style.width = count + '%';
    } else if (count = 80) {
      cancelAnimationFrame(idInterval);
    }
  };
  //РґРѕРєСЂСѓС‚РєР° РїРѕР»РѕСЃС‹ Р·Р°РіСЂСѓР·РєРё
  function fullDownload() {
    let idInterval = requestAnimationFrame(fullDownload);
    if (count < 100) {
      count++
      elem.style.width = count + '%';
    } else if (count >= 100) {
      cancelAnimationFrame(idInterval);
      count = 0;
      searchBtn.classList.remove('top__search-btn--active');
      progressBar.classList.remove('top__progress-line-bg--active');
    }
  }

  setSearch()
})
//РїРѕРёСЃРє РЅР° РєРЅРѕРїРєРµ End

//РўСЂРµРє РЅРѕРјРµСЂ РЅР° С„РѕСЂРјРµ РїРѕРёСЃРєР°
const searchTreck = () => {
  const treckNum = document.querySelectorAll('.top__search-link');
  let inputForm = document.querySelector('.top__search-input');

  treckNum.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      inputForm.value = item.textContent;
    });
  });
}
searchTreck();

//РџРµСЂРµРєР»СЋС‡Р°С‚РµР»СЊ СЏР·С‹РєРѕРІ
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
    })
  })

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
  }
  bufer();
}

const trackingMix = () => {
  const trackingItem = document.querySelectorAll('.tracking__content-item');
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
        if (btn.attributes.filter.value == item.attributes.filter.value) {
          item.classList.add('tracking__content-item--active')
        } else {
          item.classList.remove('tracking__content-item--active')
        }
      })
    })
  })
}
trackingMix()
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
      })
    };
    if (mixin3) {
      mixitup('.post-indexes__content', {
        selectors: {
          control: '.mixitup'
        }
      })
    };
    if (mixin4) {
      mixitup('.time__box', {
        selectors: {
          control: '.mixitup'
        }
      })
    };
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
      })
    })
  })
}

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
}

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

const copyTx = () => {
  let copyText = document.getElementById("track_tx_code");
  let myInputBtn = document.getElementById("track_button_code");

  if (!copyText || !myInputBtn) return;

  myInputBtn.addEventListener('click', () => {
    copyText.select();
    document.execCommand("copy");
  })
}

copyTx()


const changeSettings = () => {

  const settings = document.querySelector('.settings');
  const content = document.querySelector('.settings .tracking-widget__inner');

  if (!settings || !content) return;

  const lang = settings.querySelectorAll('input[name="settings_language"]');
  const width = settings.querySelector('#rangeWidth');
  const height = settings.querySelector('#rangeHeight');
  const type = settings.querySelectorAll('input[name="settings_type"]');
  const carrier = settings.querySelectorAll('input[name="settings_carrier"]');

  let setLang = 'ru';
  let setWidth = width.value;
  let setHeight = height.value;
  let setType = 'contentShift';
  let setCarrier = carrier[0].value;

  carrier.forEach(elem => {
    elem.addEventListener('change', () => {
      setCarrier = elem.value;
      changeSearch();
    })
  })

  lang.forEach(elem => {
    elem.addEventListener('change', () => {
      setLang = elem.getAttribute('data-settings-value');
      changeSearch();
    })
  })

  width.addEventListener('change', () => {
    setWidth = width.value;
    changeSearch();
  })

  height.addEventListener('change', () => {
    setHeight = height.value;
    changeSearch();
  })

  type.forEach(elem => {
    elem.addEventListener('change', () => {
      setType = elem.getAttribute('data-settings-value');
      changeSearch();
    })
  })

  const changeSearch = () => {

    const search = document.querySelector('.tracking-widget');

    if (!search) return;

    const input = search.querySelector('.tracking-widget__input');
    search.style.maxWidth = setWidth + 'px'
    input.style.height = setHeight + 'px'

    if (setType == 'contentShift')
      content.classList.remove('tracking-widget--absolute')
    else
      content.classList.add('tracking-widget--absolute')


    const frame = document.querySelector('.track-button-code');

    frame.value = `<iframe src = 'https://devtracking.ru/iframe' frameborder = "0" width = "${setWidth}" height = "500" 
      data-search-carrier = '${setCarrier }'
      data-search-lang = '${setLang }'
      data-search-height = ${setHeight}`
    if (setType != 'contentShift') {
      frame.value += `
      data-search-class = 'tracking-widget--absolute'
    </iframe>`
    } else {
      frame.value += `
      data-search-class = '' 
    </iframe>`
    }

  }
}

changeSettings()