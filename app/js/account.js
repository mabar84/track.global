//Таб внутри таба универсальным кодом не отработал, делаем субтабы

const accountTabsContainer = document.querySelector(".account-tabs-container");
const tabsButtons = accountTabsContainer.querySelectorAll(".tabs-button");
const tabContentItems = accountTabsContainer.querySelectorAll(".tabs-content ");

tabsButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const filter = item.getAttribute("for");
    const tabContent = accountTabsContainer.getElementsByClassName(filter);
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

const accountSubtabsContainer = document.querySelector(".account-subtabs-container");

if (accountSubtabsContainer) {
  const subTabsButtons = accountSubtabsContainer.querySelectorAll(".subtabs-button");
  const subTabContentItems = accountSubtabsContainer.querySelectorAll(".subtabs-content");
  console.log(subTabContentItems);
  subTabsButtons.forEach((item) => {
    console.log(item);
    item.addEventListener("click", () => {
      const filter = item.getAttribute("for");

      console.log(filter);

      const subTtabContent = accountSubtabsContainer.getElementsByClassName(filter);
      subTabsButtons.forEach((el) => {
        el.classList.remove("active");
      });
      item.classList.add("active");

      subTabContentItems.forEach((item) => {
        item.classList.add("tabs-content-hidden");
      });
      subTtabContent[0].classList.remove("tabs-content-hidden");
    });
  });
}
