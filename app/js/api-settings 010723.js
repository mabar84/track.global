//api-header-menu
const headerNav = document.querySelector(".header__nav");
const menuItems = headerNav.querySelectorAll(".header__menu-item");
const allSubmenu = document.querySelectorAll(".header__menu-submenu");

// show/close menu-additional
if (window.innerWidth > 1000) {
  menuItems.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const submenu = el.querySelector(".header__menu-submenu");

      menuItems.forEach((sm) => {
        sm.classList.remove("active");
      });
      el.classList.add("active");
    });
  });

  headerNav.addEventListener("mouseleave", () => {
    menuItems.forEach((sm) => {
      sm.classList.remove("active");
    });
  });
} else {
  menuItems.forEach((el) => {
    el.addEventListener("click", () => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      } else {
        const submenu = el.querySelector(".header__menu-submenu");
        el.classList.toggle("active");

        menuItems.forEach((sm) => {
          sm.classList.remove("active");
        });

        el.classList.add("active");
      }
    });
  });
}
// api-settings-form
const apiSettingsForm = document.querySelector(".api-settings-form");
const apiSettingsItems = apiSettingsForm?.querySelectorAll(".api-settings-item");
const saveSettings = document.getElementById("save-settings");
const rangeWidth = document.getElementById("rangeWidth");
const rangeHeight = document.getElementById("rangeHeight");
const rangeFontSize = document.getElementById("rangeFontSize");
const scene = document.querySelector(".scene");
const bigWidget = document.querySelector(".big-widget");
const itemWithCashbe = bigWidget?.querySelector(".tracking-widget__list-item-cashbe");
const inputWidget = document.querySelector(".api-settings-input-widget");
const responsiveContainer = document.querySelector(".responsive-container");
const closeButton = document.querySelector(".tracking-widget__inner-btn-close");
const closeButtonCashbe = document.querySelector(".tracking-widget__inner-btn-close-cashbe");

let allSettings = {};

rangeHeight?.addEventListener("input", () => {
  inputWidget.style.height = rangeHeight.value + "px";
});

rangeWidth?.addEventListener("input", () => {
  responsiveContainer.style.width = rangeWidth.value + "px";
  bigWidget.width = rangeWidth.value;
  if (rangeWidth.value < 1026) {
    bigWidget.classList.add("big-widget_tablet");
  } else {
    bigWidget.classList.remove("big-widget_tablet");
  }
  if (rangeWidth.value < 500) {
    bigWidget.classList.add("big-widget_mobile");
  } else {
    bigWidget.classList.remove("big-widget_mobile");
  }
  if (rangeWidth.value < 441) {
    inputWidget.classList.add("api-settings-input-widget-mobile");
  } else {
    inputWidget.classList.remove("api-settings-input-widget-mobile");
  }
});

apiSettingsForm?.addEventListener("click", (e) => {
  const targetElement = e.target;
  if (targetElement.classList.contains("item-selected")) {
    targetElement.closest(".api-settings-item").classList.add("active");
  }

  if (targetElement.classList.contains("select-item")) {
    const item = targetElement.closest(".api-settings-item");
    const itemSelected = item.querySelector(".item-selected");

    item.classList.remove("active");
    const selectItems = item.querySelectorAll(".select-item");
    selectItems.forEach((el) => {
      el.style.order = "0";
    });

    targetElement.style.order = "-1";

    itemSelected.textContent = targetElement.textContent;
  }
});

saveSettings?.addEventListener("click", () => {
  apiSettingsItems.forEach((item) => {
    const itemSelected = item.querySelector(".item-selected");
    allSettings[item.dataset.name] = itemSelected?.textContent;
  });
  allSettings["width"] = rangeWidth.value;
  allSettings["height"] = rangeHeight.value;
  allSettings["font-size"] = rangeFontSize.value;
  delete allSettings.partner;
  console.log(allSettings);

  bigWidget.classList.add("hidden");
  bigWidget.width = allSettings.width;
});

//close widget mobile
closeButton?.addEventListener("click", () => {
  bigWidget.classList.add("hidden");
});

// modals popups
const body = document.querySelector("body");
const apiModalWrappers = document.querySelectorAll(".api-modal-wrapper");

// modal partner
const apiModalPartner = document.querySelector(".api-modal-partner");
const connect = document.getElementById("connect");

connect?.addEventListener("change", () => {
  if (connect.checked) {
    apiModalPartner.classList.remove("hidden");
    body.style.overflow = "hidden";
  }
});

//plugins cms
const apiModalPlugins = document.querySelector(".api-modal-plugins");
const apiPlugins = document.querySelector(".api-plugins");

apiPlugins?.addEventListener("click", (e) => {
  if (e.target.classList.contains("card")) {
    e.preventDefault;
    apiModalPlugins.classList.remove("hidden");
    body.style.overflow = "hidden";
  }
});

// modal
apiModalWrappers?.forEach((el) => {
  const modal = el.querySelector(".api-modal");
  const modalInput = el.querySelector(".api-input");
  const modalButton = el.querySelector(".api-button");
  const modalClose = el.querySelector(".api-modal-close");

  //activation modal-button
  modalInput?.addEventListener("input", () => {
    if (modalInput.value.toLowerCase().indexOf("@") >= 0 && modalInput.value.toLowerCase().indexOf(".") >= 0) {
      modalButton.classList.remove("disabled");
    } else {
      modalButton.classList.add("disabled");
    }
  });

  modalButton?.addEventListener("click", () => {
    console.log(modalInput.id, modalInput.value);
    allSettings[modalInput.id] = modalInput.value;
    el.classList.add("hidden");
    body.style.overflow = "inherit";
  });

  // close modal
  modalClose?.addEventListener("click", (e) => {
    el.classList.add("hidden");
    body.style.overflow = "inherit";

    if (!allSettings["partner-email"]) {
      connect.checked = false;
    }
  });
});

//cashbe

const traceButton = document.getElementById("trace-button");
traceButton?.addEventListener("click", () => {
  if (connect.checked && allSettings["partner-email"]) {
    bigWidget.classList.remove("hidden");
    // itemWithCashbe.classList.remove("hidden");
  } else {
    bigWidget.classList.remove("hidden");
    // itemWithCashbe.classList.add("hidden");
  }
});

// clear inputs
const apiInputWrappers = document.querySelectorAll(".api-input-wrapper");
apiInputWrappers?.forEach((el) => {
  el.addEventListener("click", (e) => {
    const input = el.querySelector(".api-input");
    if (e.target.dataset.after === "true") {
      input.value = "";
    }
  });
});
