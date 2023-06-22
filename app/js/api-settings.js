console.log(1234);

const apiSettingsItems = document.querySelectorAll(".api-settings-item");

apiSettingsItems.forEach((item) => {
  const itemSelected = item.querySelector(".item-selected");
  const selectItems = item.querySelector(".select-items");

  console.log(itemSelected);
  itemSelected.addEventListener("click", () => {
    item.classList.toggle("active");
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
