// store-promotions
const storePromotionsAdditionalCardsTablet = document.querySelectorAll(".store-promotions .hide-tablet");
const storePromotionsAdditionalCardsMobile = document.querySelectorAll(".store-promotions .hide-mobile");
document.getElementById("show-all").addEventListener("click", () => {
  document.getElementById("show-all").style.display = "none";
  storePromotionsAdditionalCardsTablet.forEach((el) => {
    el.classList.remove("hide-tablet");
  });
  storePromotionsAdditionalCardsMobile.forEach((el) => {
    el.classList.remove("hide-mobile");
  });
});

//import
document.getElementById("show-all-import").addEventListener("click", () => {
  const hiddenCards = document.querySelectorAll(".import-parcels .while-hidden");
  hiddenCards.forEach((card) => {
    card.classList.remove("while-hidden");
  });
});

//add-parcel
document.getElementById("add-parcel-mobile")?.addEventListener("click", (e) => {
  e.preventDefault();
  ahModalShow("modal-add-parcel-form");
});
//authorization
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
const modalRegistrationInputs = modalRegistration.querySelectorAll("input");
const modalRegistrationButton = modalRegistration.querySelector(".first");

modalRegistrationButton.addEventListener("click", () => {
  let areFieldsFilled = true;
  modalRegistrationInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      areFieldsFilled = false;
    }
    input.addEventListener("input", () => {
      input.classList.remove("error");
    });
  });
  if (areFieldsFilled) {
    ahModalHide("modal-registration-form");
    console.log("Зарегистрировать");
  }
});

// modalAuthorization
const modalAuthorization = document.getElementById("modal-authorization-form");
const modalAuthorizationInputs = modalAuthorization.querySelectorAll("input");
const modalAuthorizationButton = modalAuthorization.querySelector(".first");

modalAuthorizationButton.addEventListener("click", () => {
  let areFieldsFilled = true;
  modalAuthorizationInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      areFieldsFilled = false;
    }
    input.addEventListener("input", () => {
      input.classList.remove("error");
    });
  });
  if (areFieldsFilled) {
    ahModalHide("modal-authorization-form");
    console.log("Войдите");
  }
});

// modalAddParcel
const modalAddParcel = document.getElementById("modal-add-parcel-form");
const modalAddParcelInput = modalAddParcel.querySelector("input");
const modalAddParcelButton = modalAddParcel.querySelector(".first");

modalAddParcelButton.addEventListener("click", () => {
  if (!modalAddParcelInput.value) {
    modalAddParcelInput.classList.add("error");
  } else {
    ahModalHide("modal-add-parcel-form");
    console.log("Добавлено");
  }
});
modalAddParcelInput.addEventListener("input", () => {
  modalAddParcelInput.classList.remove("error");
});
//filter all-parcels
const allParcels = document.querySelectorAll(".all-parcel .filter .item");
const allParcelsCards = document.querySelectorAll(".all-parcel .cards .card");

allParcels.forEach((el) => {
  el.addEventListener("click", () => {
    const filter = el.getAttribute("for");

    allParcelsCards.forEach((card) => {
      const parent = card.parentNode;
      const parcelWidget = parent.querySelector(".tracking-widget");
      const bookPost = parent.querySelector(".book-post");

      parcelWidget.classList.add("show-when-parcel-clicked");
      bookPost?.classList.add("show-when-parcel-clicked");

      card.style.display = "none";

      const statusValue = card.querySelector(".status-value").textContent;

      if (filter === statusValue) {
        card.style.display = "grid";
      }

      if (filter === "all") {
        card.style.display = "grid";
      }
    });

    allParcels.forEach((el) => {
      el.classList.remove("active");
    });

    el.classList.add("active");
  });
});

//add parcel
const parcelCode = document.getElementById("parcel-code");

document.getElementById("add-parcel").addEventListener("click", (e) => {
  e.preventDefault();
  if (!parcelCode.value) {
    parcelCode.classList.add("error");
  } else {
    console.log("Посылка добавлена");
  }
});
parcelCode.addEventListener("input", () => {
  parcelCode.classList.remove("error");
});

//show block when parcel-card clicked
const allParcelsCardsContainer = document.querySelector(".all-parcel .cards");

allParcelsCardsContainer.addEventListener("click", (e) => {
  e.preventDefault();

  const allWidgets = allParcelsCardsContainer.querySelectorAll(".tracking-widget");

  if (!e.target.closest(".archive") && !e.target.closest(".trash") && e.target.closest(".card")) {
    const cardWrapper = e.target.closest(".card-wrapper");

    const parcelWidget = cardWrapper.querySelector(".tracking-widget");
    const isInfoHidden = cardWrapper.querySelector(".show-when-parcel-clicked") ? true : false;

    // if (cardWrapper.offsetTop < 800) {
    //   window.scrollTo({
    //     top: cardWrapper.offsetTop - 180,
    //     behavior: "smooth",
    //   });
    // } else {
    //   window.scrollTo({
    //     top: 180,
    //     behavior: "smooth",
    //   });
    // }

    if (isInfoHidden) {
      //show progress bar
      const progress = cardWrapper.querySelector(".widgetProgressMain");
      const submitButton = cardWrapper.querySelector(".hidden-submit-button");
      progress.classList.add("top__progress-line-bg--active");
      submitButton.classList.add("top__search-btn--active");
      setAnimate(progress, "start", submitButton);
      getDeliveryData().then((data) => {
        setAnimate(progress, "end", submitButton);
      });
      setTimeout(() => {
        console.log("замедление 1500мс");
        parcelWidget.classList.toggle("show-when-parcel-clicked");

        allWidgets.forEach((w) => {
          if (w !== parcelWidget) {
            w.classList.add("show-when-parcel-clicked");
          }
        });
        cardWrapper.scrollIntoView({
          behavior: "smooth",
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);
    } else {
      parcelWidget.classList.toggle("show-when-parcel-clicked");

      allWidgets.forEach((w) => {
        if (w !== parcelWidget) {
          w.classList.add("show-when-parcel-clicked");
        }
      });

      cardWrapper.scrollIntoView({
        behavior: "smooth",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
});
//show block when parcel-card-mobile clicked
const allParcelsCardsContainerMobile = document.querySelector(".all-parcel .cards-mobile");
allParcelsCardsContainerMobile.addEventListener("click", (e) => {
  e.preventDefault();

  const allWidgets = allParcelsCardsContainerMobile.querySelectorAll(".tracking-widget");
  const allBookPosts = allParcelsCardsContainerMobile.querySelectorAll(".book-post");

  if (!e.target.closest(".archive") && !e.target.closest(".trash") && e.target.closest(".card")) {
    const cardWrapper = e.target.closest(".card-mobile-wrapper");

    // if (cardWrapper.offsetTop < 800) {
    //   window.scrollTo({
    //     top: cardWrapper.offsetTop - 180,
    //     behavior: "smooth",
    //   });
    // } else {
    //   window.scrollTo({
    //     top: 180,
    //     behavior: "smooth",
    //   });
    // }

    const parcelWidget = cardWrapper.querySelector(".tracking-widget");
    const bookPost = cardWrapper.querySelector(".book-post");
    const isInfoHidden = cardWrapper.querySelector(".show-when-parcel-clicked") ? true : false;

    if (isInfoHidden) {
      if (!e.target.closest(".book-post ")) {
        //show progress bar
        const progress = cardWrapper.querySelector(".widgetProgressMain");
        const submitButton = cardWrapper.querySelector(".hidden-submit-button");
        progress.classList.add("top__progress-line-bg--active");
        submitButton.classList.add("top__search-btn--active");

        setAnimate(progress, "start", submitButton);
        getDeliveryData().then((data) => {
          setAnimate(progress, "end", submitButton);
        });
        setTimeout(() => {
          console.log("замедление 1500мс");
          bookPost.classList.toggle("show-when-parcel-clicked");
          parcelWidget.classList.toggle("show-when-parcel-clicked");

          allWidgets.forEach((w) => {
            if (w !== parcelWidget) {
              w.classList.add("show-when-parcel-clicked");
            }
          });

          allBookPosts.forEach((w) => {
            if (w !== bookPost) {
              w.classList.add("show-when-parcel-clicked");
            }
          });

          cardWrapper.scrollIntoView({
            behavior: "smooth",
          });

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 1500);
      }
    } else {
      bookPost.classList.toggle("show-when-parcel-clicked");
      parcelWidget.classList.toggle("show-when-parcel-clicked");

      allWidgets.forEach((w) => {
        if (w !== parcelWidget) {
          w.classList.add("show-when-parcel-clicked");
        }
      });

      allBookPosts.forEach((w) => {
        if (w !== bookPost) {
          w.classList.add("show-when-parcel-clicked");
        }
      });

      cardWrapper.scrollIntoView({
        behavior: "smooth",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
});
//book-post-more
const bookPostMoreCards = document.querySelectorAll(".cards-mobile .book-post");
const trackingWidgetAsideInner = document.querySelectorAll(".cards-mobile .tracking-widget__aside-inner");

bookPostMoreCards.forEach((banderol) => {
  banderol.addEventListener("click", () => {
    const cardWrapper = banderol.closest(".card-mobile-wrapper");
    const asideBox = cardWrapper.querySelector(".tracking-widget__aside-box");
    const asideInner = cardWrapper.querySelector(".tracking-widget__aside-inner");

    asideBox.classList.toggle("collapsed");
    asideInner.classList.toggle("collapsed");
  });
});

//   anchors-links
const anchorsLinksDesktop = document.querySelectorAll(".parcel .wrapper .right .link");
const anchorsLinksMobile = document.querySelectorAll(".parcel-mobile .item");
const staticParcel = document.querySelector(".parcel");
const staticHeader = document.querySelector(".header");

anchorsLinksDesktop.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const ID = link.getAttribute("href").substr(1);

    let element = document.getElementById(ID);
    let elementPosition = element.getBoundingClientRect().top;

    let headerOffset = staticParcel.clientHeight;

    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});
anchorsLinksMobile.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const ID = link.getAttribute("href").substr(1);
    let element = document.getElementById(ID);
    let elementPosition = element.getBoundingClientRect().top;

    let headerOffset = staticParcel.clientHeight;

    offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

//glue add-parcel
const switchHeaderParcel = document.querySelector(".switch-header-parcel");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 79) {
    switchHeaderParcel.classList.add("visible");
    staticParcel.classList.add("glue");
    staticHeader.classList.add("glue");
  } else {
    switchHeaderParcel.classList.remove("visible");

    staticParcel.classList.remove("glue");
    staticHeader.classList.remove("glue");
  }
});

//switch add-parcel header
switchHeaderParcel.addEventListener("click", () => {
  switchHeaderParcel.classList.toggle("active");
  staticHeader.classList.toggle("z2");
});
