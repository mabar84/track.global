//Таб внутри таба универсальным кодом не отработал, делаем субтабы

// const accountTabsContainer = document.querySelector(".account-tabs-container");
const tabsButtons = document.querySelectorAll(".tabs-button");
const tabContentItems = document.querySelectorAll(".tabs-content ");

tabsButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const filter = item.getAttribute("for");
    const tabContent = document.getElementsByClassName(filter);
    tabsButtons.forEach((el) => {
      el.classList.remove("active");
    });
    item.classList.add("active");

    tabContentItems.forEach((item) => {
      item.classList.add("tabs-content-hidden");
    });
    tabContent[0].classList.remove("tabs-content-hidden");

    if (filter === "account-exit") {
      console.log("Выйти из аккаунта");
    }
  });
});

// const accountSubtabsContainer = document.querySelector(".account-subtabs-container");

// if (accountSubtabsContainer) {
//   const subTabsButtons = accountSubtabsContainer.querySelectorAll(".subtabs-button");
//   const subTabContentItems = accountSubtabsContainer.querySelectorAll(".subtabs-content");
//   subTabsButtons.forEach((item) => {
//     item.addEventListener("click", () => {
//       const filter = item.getAttribute("for");

//       const subTtabContent = accountSubtabsContainer.getElementsByClassName(filter);
//       subTabsButtons.forEach((el) => {
//         el.classList.remove("active");
//       });
//       item.classList.add("active");

//       subTabContentItems.forEach((item) => {
//         item.classList.add("tabs-content-hidden");
//       });
//       subTtabContent[0].classList.remove("tabs-content-hidden");
//       if (filter === "need-activation-services") {
//         console.log("Оставить только красные");
//       }
//     });
//   });
// }

// need-activation-services
const needActivationServicesButton = document.getElementById("need-activation-services-button");
const myServicesButton = document.getElementById("my-services-button");
const myServices = document.getElementById("my-services");

needActivationServicesButton?.addEventListener("click", () => {
  const greenItems = myServices.querySelectorAll(".account-services-item.enabled");
  greenItems.forEach((item) => {
    item.classList.add("item-hidden");
  });
  needActivationServicesButton.classList.add("active");
  myServicesButton.classList.remove("active");
});
myServicesButton?.addEventListener("click", () => {
  const greenItems = myServices.querySelectorAll(".account-services-item.enabled");
  greenItems.forEach((item) => {
    item.classList.remove("item-hidden");
  });
  needActivationServicesButton.classList.remove("active");
  myServicesButton.classList.add("active");
});

//show popup 'connect-account'
const connectAccountButtons = myServices?.querySelectorAll(".account-button");
connectAccountButtons?.forEach((el) => {
  el.addEventListener("click", () => {
    document.getElementById("connect-account").classList.remove("popup-hidden");
  });
});

// search carriers filter
const carriersInput = document.getElementById("carriers-input");
if (carriersInput) {
  const items = myServices.querySelectorAll(".item-carrier p");
  const searchButton = document.getElementById("carriers-search-button");

  function filterListCarriers() {
    let filter = carriersInput.value.toUpperCase();

    for (let i = 0; i < items.length; i++) {
      let text = items[i].textContent.toUpperCase();
      let parent = items[i].closest(".account-services-item");

      if (text.indexOf(filter) > -1) {
        parent.classList.remove("filter-hidden");
      } else {
        parent.classList.add("filter-hidden");
      }
    }
  }
  searchButton.addEventListener("click", filterListCarriers);
}

// search onboarding courier services
const courierServicesPopup = document.getElementById("courier-services");
if (courierServicesPopup) {
  const items = courierServicesPopup.querySelectorAll(".account-popup-item p");
  const input = courierServicesPopup.querySelector(".account-input");
  function filterListCouriers() {
    let filter = input.value.toUpperCase();

    for (let i = 0; i < items.length; i++) {
      let text = items[i].textContent.toUpperCase();
      let parent = items[i].closest(".account-popup-item");

      if (text.indexOf(filter) > -1) {
        parent.classList.remove("filter-hidden");
      } else {
        parent.classList.add("filter-hidden");
      }
    }
  }
  input.addEventListener("input", filterListCouriers);
}

// show/close popups
document.getElementById("show-courier-services-button")?.addEventListener("click", () => {
  document.getElementById("courier-services").classList.remove("popup-hidden");
});
document.getElementById("courier-services-next-button")?.addEventListener("click", () => {
  document.getElementById("courier-services")?.classList.add("popup-hidden");
  document.getElementById("interesting-function")?.classList.remove("popup-hidden");
});
document.getElementById("interesting-function-next-button")?.addEventListener("click", () => {
  document.getElementById("interesting-function").classList.add("popup-hidden");
  console.log("Переход на страницу подключенных служб");
  // document.getElementById("connect-account").classList.remove("popup-hidden");
});
document.getElementById("connect-account-button")?.addEventListener("click", () => {
  document.getElementById("connect-account").classList.add("popup-hidden");
  console.log("Подключение аккаунта");
});
document.getElementById("calculation-button")?.addEventListener("click", () => {
  document.getElementById("it-still-in-development").classList.remove("popup-hidden");
});
document.getElementById("point-map-button")?.addEventListener("click", () => {
  document.getElementById("it-still-in-development").classList.remove("popup-hidden");
});
document.getElementById("it-still-in-development-button")?.addEventListener("click", () => {
  document.getElementById("it-still-in-development").classList.add("popup-hidden");
});

// delete carrier
const carrierDeleteButtons = myServices?.querySelectorAll(".item-delete");
carrierDeleteButtons?.forEach((el) => {
  el.addEventListener("click", () => {
    let parent = el.closest(".account-services-item");
    parent.remove();
  });
});
