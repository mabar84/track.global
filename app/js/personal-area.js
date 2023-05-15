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
document.getElementById("add-parcel")?.addEventListener("click", (e) => {
  e.preventDefault();
  ahModalShow("modal-add-parcel-form");
});
//authorization
document.getElementById("authorization")?.addEventListener("click", (e) => {
  e.preventDefault();
  ahModalShow("modal-authorization-form");
});
//registration
document.getElementById("registration")?.addEventListener("click", (e) => {
  e.preventDefault();
  ahModalShow("modal-registration-form");
});
