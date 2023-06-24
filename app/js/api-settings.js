//api-header-menu
const headerNav = document.querySelector(".header__nav");
// const menu = document.querySelector(".header__menu");

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

const apiSettingsItems = document.querySelectorAll(".api-settings-item");

apiSettingsItems.forEach((item) => {
  const itemSelected = item.querySelector(".item-selected");
  const selectItems = item.querySelector(".select-items");

  // console.log(itemSelected);
  itemSelected.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// modals popups
//close modal
const body = document.querySelector("body");

const apiModalWrappers = document.querySelectorAll(".api-modal-wrapper");

apiModalWrappers.forEach((el) => {
  const modal = el.querySelector(".api-modal");
  modal.addEventListener("click", (e) => {
    if (e.target.dataset.after === "true") {
      el.classList.add("hidden");
      body.style.overflow = "inherit";
      // body.style.position = "static";
    }
  });
});

//plugins cms
const apiModalPlugins = document.querySelector(".api-modal-plugins");
const apiPlugins = document.querySelector(".api-plugins");

apiPlugins.addEventListener("click", (e) => {
  if (e.target.classList.contains("card")) {
    e.preventDefault;
    apiModalPlugins.classList.remove("hidden");
    body.style.overflow = "hidden";
    // body.style.position = "fixed";
  }
});

// clear inputs
const apiInputWrappers = document.querySelectorAll(".api-input-wrapper");

apiInputWrappers.forEach((el) => {
  el.addEventListener("click", (e) => {
    const input = el.querySelector(".api-input");
    if (e.target.dataset.after === "true") {
      input.value = "";
    }
  });
});

//custom-selects

// function setTrackIframeCode() {
//   const code = $("#track_code_value").val();
//   const wuid = $("#wuid").val();
//   let width = $("#calcWidth").val();
//   const height = $("#calcFrameHeight").val();

//   const initParams = btoa(JSON.stringify({ height: height + "px" }));
//   const frameCode = code.replace("#width", width).replace("#initparams", initParams).replace("#wuid", wuid);
//   $("#track_tx_code").text(frameCode);

//   const maxWidth = window.innerWidth - 35;
//   if (width > maxWidth) {
//     width = maxWidth;
//   }

//   $("#tracking-widget").css({ width: width + "px" });
//   $(".tracking-widget-form").css({ width: width + "px" });
//   $(".top__search-btn").css({ height: height + "px" });
//   $(".tracking-widget__input").css({ height: height + "px" });
// }

// function copyTextarea() {
//   var textarea = document.getElementById("track_tx_code");
//   textarea.select();
//   document.execCommand("copy");
// }

// $(function () {
//   setTrackIframeCode();
//   setSession("no_banner", 1);
//   $(document).on("click", "#check-ajax", function (e) {
//     e.preventDefault();
//     setTimeout(function () {
//       track = $("#track-code").val();
//       $.get(
//         "/ajax-track",
//         {
//           track: track,
//           client_id: 0,
//           short_notfound: 1,
//         },
//         function (html) {
//           $("#widgetContentMain").html(html);
//         }
//       );
//     }, 300);
//   });

//   $("input[type=range]").on("input", function () {
//     setTrackIframeCode();
//   });

//   $("input[type=radio]").on("input", function () {
//     setTrackIframeCode();
//   });

//   $("#track_button_code").on("click", function () {
//     copyTextarea();
//   });
// });
