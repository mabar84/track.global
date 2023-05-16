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

//show block when parcel clicked
const allParcelsCardsContainer = document.querySelector(".all-parcel .cards");
console.log(allParcelsCardsContainer);

allParcelsCardsContainer.addEventListener("click", (e) => {
  // if (e.target.closest("archive")) {
  //   console.log(e.currentTarget);
  // }
  if (!e.target.closest("#archive") && !e.target.closest("#trash") && e.target.closest(".card")) {
    document.getElementById("show-when-parcel-clicked").style.display = "block";
  }

  // console.log(e.target);
  // console.log(e.currentTarget);
});
