const accountNav = document.querySelector(".account-nav");
const accountNavItems = accountNav.querySelectorAll(".item");
const tabContentItems = document.querySelectorAll(".tabcontent");

accountNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    const filter = item.getAttribute("for");
    const tabContent = document.getElementsByClassName(filter);
    accountNavItems.forEach((el) => {
      el.classList.remove("active");
    });
    item.classList.add("active");

    tabContentItems.forEach((item) => {
      item.classList.add("tabcontent-hidden");
    });
    tabContent[0].classList.remove("tabcontent-hidden");

    if (filter === "account-exit") {
      console.log("Выйти из аккаунта");
    }
  });
});
