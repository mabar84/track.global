let timeZoneOffset = new Date().getTimezoneOffset();
let isExecuting = false;
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
const showAllImport = document.getElementById("show-all-import");
if(showAllImport) {
    showAllImport.addEventListener("click", () => {
        const hiddenCards = document.querySelectorAll(".import-parcels .while-hidden");
        hiddenCards.forEach((card) => {
            card.classList.remove("while-hidden");
        });
    });
}
function saveParcel(formData){
    formData.append('time_zone',timeZoneOffset);
    $.ajax({
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(response) {
            if(response === 'exist'){
                alert('Посылка с таким номером уже существует в кабинете')
            }else{
                location.reload();
            }
        },
        error: function(xhr, status, error) {
            // Handle the error
        }
    });
}

//add-parcel
document.getElementById("add-parcel-mobile")?.addEventListener("click", (e) => {
    e.preventDefault();
    ahModalShow("modal-add-parcel-form");
});

// modalAddParcel
const modalAddParcel = document.getElementById("modal-add-parcel-form");
const modalAddParcelInput = modalAddParcel.querySelector("input");
const modalAddParcelButton = modalAddParcel.querySelector(".first");

modalAddParcelButton.addEventListener("click", () => {
    if (!modalAddParcelInput.value) {
        modalAddParcelInput.classList.add("error");
    } else {
        let form = document.getElementById('add-parcel-form');
        let formData = new FormData(form);
        const csrfToken = $('meta[name="csrf-token"]').attr("content");
        formData.append('_csrf-frontend',csrfToken);
        ahModalHide("modal-add-parcel-form");

        saveParcel(formData);
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
            if (parcelWidget && bookPost) {
                parcelWidget.classList.add("show-when-parcel-clicked");
                bookPost?.classList.add("show-when-parcel-clicked");
            }
            card.style.display = "none";

            const statusValue = card.querySelector(".status-value").dataset.action;

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
        let formData = new FormData();
        formData.append('track',document.getElementById("parcel-code").value);
        formData.append('description',document.getElementById("parcel-description").value);
        formData.append('user_id',document.getElementById("user-id").value);
        const csrfToken = $('meta[name="csrf-token"]').attr("content");
        formData.append('_csrf-frontend',csrfToken);

        saveParcel(formData);

    }
});
parcelCode.addEventListener("input", () => {
    parcelCode.classList.remove("error");
});

//show block when parcel-card clicked
const allParcelsCardsContainer = document.querySelector(".all-parcel .cards");

allParcelsCardsContainer.addEventListener("click", (e) => {
    e.preventDefault();

    // const allWidgets = allParcelsCardsContainer.querySelectorAll(".tracking-widget");

    if (!e.target.closest(".archive") && !e.target.closest(".trash") && e.target.closest(".card")) {
        const cardWrapper = e.target.closest(".card-wrapper");
        const card = e.target.closest(".card");
        let containerId = card.dataset.id ?? '';
        const parcelWidget = cardWrapper.querySelector("#tracking-widget-" + containerId);
        const isInfoHidden = !!cardWrapper.querySelector(".show-when-parcel-clicked");
        const crossClose = cardWrapper.querySelector(".cross-close");
        const crossCloseTablet = cardWrapper.querySelector(".cross-close-tablet");
        const user_id = document.getElementById('user-id').value ?? 0;
        crossClose?.addEventListener("click", () => {
            parcelWidget.classList.add("show-when-parcel-clicked");
        });

        crossCloseTablet?.addEventListener("click", () => {
            parcelWidget.classList.add("show-when-parcel-clicked");
        });

        if (isInfoHidden) {
            if (isExecuting) {
                alert('Дождитесь обновления статуса другой посылки. Одновременно не доступна проверка статусов нескольких посылок.');
                return; // Exit if already executing
            }
            isExecuting = true;
            //show progress bar
            const progress = card.querySelector(".widgetProgressMain");
            const submitButton = cardWrapper.querySelector(".hidden-submit-button");
            let track = card.querySelector('.supply-code').innerText;

            progress.classList.add("top__progress-line-bg--active");
            submitButton.classList.add("top__search-btn--active");
            setAnimate(progress, "start", submitButton);
            let params = {
                'track': track.trim(),
                'client_id': 0,
                'mobile': 0,
                'user_id': user_id,
                'time_zone': timeZoneOffset,
            }

            $.get('/user-cabinet/ajax-cabinet-widget', params , function (html) {
                try {
                    $('#container-' + containerId).html(html);
                    setAnimate(progress, "end", submitButton);
                    ajaxCardRefresh(card, containerId, 0);
                    setTimeout(() => {
                        parcelWidget.classList.toggle("show-when-parcel-clicked");
                    }, 150);
                } catch (error) {
                    // Handle the error appropriately
                } finally {
                    isExecuting = false; // Reset the flag regardless of success or failure
                }
            });
        } else {
            parcelWidget.classList.toggle("show-when-parcel-clicked");
        }
    }
});
//show block when parcel-card-mobile clicked
const allParcelsCardsContainerMobile = document.querySelector(".all-parcel .cards-mobile");
allParcelsCardsContainerMobile.addEventListener("click", (e) => {
    e.preventDefault();

    if (!e.target.closest(".archive") && !e.target.closest(".trash") && e.target.closest(".card")) {
        const cardWrapper = e.target.closest(".card-mobile-wrapper");
        const card = e.target.closest(".card");
        let containerId = card.dataset.id ?? '';
        let parcelWidget = cardWrapper.querySelector(".tracking-widget");
        let bookPost = cardWrapper.querySelector(".book-post");
        const isInfoHidden = cardWrapper.querySelector(".show-when-parcel-clicked") ? true : false;
        let track = card.querySelector('.supply-code').innerText;
        const container = cardWrapper.querySelector(".container");

        if (isInfoHidden) {
            if (isExecuting) {
                alert('Дождитесь обновления статуса другой посылки. Одновременно не доступна проверка статусов нескольких посылок.');
                return; // Exit if already executing
            }
            isExecuting = true;

            if (!e.target.closest(".book-post ")) {
                //show progress bar
                const progress = cardWrapper.querySelector(".widgetProgressMain");
                const submitButton = cardWrapper.querySelector(".hidden-submit-button");
                progress.classList.add("top__progress-line-bg--active");
                submitButton.classList.add("top__search-btn--active");
                const user_id = document.getElementById('user-id').value ?? 0;
                setAnimate(progress, "start", submitButton);
                let params = {
                    'track': track.trim(),
                    'client_id': 0,
                    'mobile': 1,
                    'user_id': user_id,
                    'time_zone': timeZoneOffset,
                }

                $.get('/user-cabinet/ajax-cabinet-widget', params , function (html) {
                    try{
                    $('#mobile-container-' + containerId).html(html)
                    setAnimate(progress, "end", submitButton);
                    ajaxCardRefresh(card, containerId, 1);
                    setTimeout(() => {
                        const crossCloseTablet = cardWrapper.querySelector(".cross-close-tablet");
                        parcelWidget = cardWrapper.querySelector(".tracking-widget");
                        bookPost = cardWrapper.querySelector(".book-post");
                        bookPostMore();
                        if(container) {
                            container.classList.toggle("show-when-parcel-clicked");
                        }
                        if(crossCloseTablet) {
                            crossCloseTablet?.addEventListener("click", () => {
                                container.classList.add("show-when-parcel-clicked");
                            });
                        }
                    }, 300);
                    } catch (error) {
                        // Handle the error appropriately
                    } finally {
                        isExecuting = false; // Reset the flag regardless of success or failure
                    }
                });

            }
        } else {
            if(container) {
                container.classList.toggle("show-when-parcel-clicked");
            }
        }
    }
});
//book-post-more
function bookPostMore() {
    const bookPostMoreCards = document.querySelectorAll(".cards-mobile .book-post");
    const trackingWidgetAsideInner = document.querySelectorAll(".cards-mobile .tracking-widget__aside-inner");

    bookPostMoreCards.forEach((banderol) => {
        banderol.addEventListener("click", () => {
            const cardWrapper = banderol.closest(".card-mobile-wrapper");
            const asideBox = cardWrapper.querySelector(".tracking-widget__aside-box");
            const asideInner = cardWrapper.querySelector(".tracking-widget__aside-inner");

            banderol.classList.toggle("collapsed");
            asideBox.classList.toggle("collapsed");
            asideInner.classList.toggle("collapsed");
        });
    });
}
//   anchors-links
const anchorsLinksDesktop = document.querySelectorAll(".parcel .wrapper .right .link");
const anchorsLinksMobile = document.querySelectorAll(".parcel-mobile .item");
const staticParcel = document.querySelector(".parcel");
const staticHeader = document.querySelector(".header");

        staticHeader.classList.add("header-personal-area");

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
})

function ajaxDeliverOrDelete(id, action) {
    const csrfToken = $('meta[name="csrf-token"]').attr("content");
    const user_id = document.getElementById('user-id').value ?? 0;
    $.post('/user-cabinet/archive-or-delete', {
        'id': id,
        'action': action,
        'user_id': user_id,
        '_csrf-frontend': csrfToken,
    }, function (html) {
       location.reload();
    });
}

//Parcel to archive
$(document).on('click', '#archive', function (e) {
    let button = $(this);
    let parentId = button.closest('.buttons').data('id');
    ajaxDeliverOrDelete(parentId, 'archive')
});
//Parcel return form archive
$(document).on('click', '#return', function (e) {
    let button = $(this);
    let parentId = button.closest('.buttons').data('id');
    ajaxDeliverOrDelete(parentId, 'return')
});
//Delete parcel
$(document).on('click', '#trash', function (e) {
    let button = $(this);
    let parentId = button.closest('.buttons').data('id');
    ajaxDeliverOrDelete(parentId, 'delete')
});

function ajaxCardRefresh(card, containerId, mobile){
    $.get('/user-cabinet/card-refresh', {
        'entry_id': containerId,
        'mobile': mobile,
    }, function (html) {
        if(html) {
            $(card).html(html);
        }
    });
}

const checkboxEmail = document.getElementById("checkbox1");
const checkboxNotification = document.getElementById("checkbox2");
if (checkboxNotification) {
    checkboxNotification.addEventListener("change", function() {
        if (this.checked) {
            const version = Math.floor(Math.random() * 100000);
            console.log("Checkbox checked");
            // Register service worker if not already registered
            if ('serviceWorker' in navigator) {
                console.log("Service Worker is supported in this browser.");
                navigator.serviceWorker.register(`/js/service-worker.js?v=${version}`)
                    .then(function(registration) {
                        console.log("Service Worker registered successfully.");
                        // Wait for the service worker to become active
                        return messaging.getToken({vapidKey: 'BIS_colwOvS6mjc9Nllf4khbfzuCpx-Y6R-iLOUI055D_Pneq7Aimrd1Dj9xSXK10BSRFXDykN2oVmEz_ueBqeo', serviceWorkerRegistration: registration});
                    })
                    .then(function(token) {
                        console.log("Token obtained: " + token);
                        // Send the subscription details to the server using the Fetch API.
                        notificationSwitch(0, 0, 'yes', token);
                    })
                    .catch(function(err) {
                        console.error('Error during service worker registration or token retrieval:', err);
                    });
            } else {
                console.error("Service Worker is not supported in this browser.");
            }
        } else {
            console.log("Checkbox unchecked");
            notificationSwitch(0, 0, 'no', 0);
        }
    });
}



if(checkboxEmail){
    checkboxEmail.addEventListener("change", function() {
        let email;
        if(this.checked){
            notificationSwitch('yes',0,0, 0 );
        }else{
           notificationSwitch('no',0, 0, 0 );
        }
    });
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function notificationSwitch(emailSwitch,email,pushSwitch, pushUserId){

    const csrfToken = $('meta[name="csrf-token"]').attr("content");
    const user_id = document.getElementById('user-id').value ?? 0;
    $.post('/user-cabinet/notification', {
        'emailSwitch': emailSwitch,
        'email': email,
        'pushSwitch': pushSwitch,
        'pushUserId': pushUserId,
        'userId': user_id,
        '_csrf-frontend': csrfToken,
    }, function (html) {
       //location.reload();
    });
}

$(document).on('click', '#save-password', function (e) {
    const newPassword = document.getElementById('new-password');
    const oldPassword = document.getElementById('old-password');
    if(newPassword.value && oldPassword.value){
        changePassword(oldPassword.value, newPassword.value);
        newPassword.value = '';
        oldPassword.value = '';
    }
});
$(document).on('click', '#delete-account', function (e) {
    e.preventDefault();
    const csrfToken = $('meta[name="csrf-token"]').attr("content");
    const user_id = document.getElementById('user-id').value ?? 0;

    let result = confirm("Вы уверены,что хотите удалить аккаунт?");
    if (result) {
        // The user clicked 'OK'
        $.post('/user-cabinet/delete-user', {
            'userId': user_id,
            '_csrf-frontend': csrfToken,
        }, function (html) {
            if(html === 'ok'){
                alert('Аккаунт удален.');
                location.href = '/';
            }else{
                alert('Произошла ошибка');
            }
        });
    }
    // If the user clicked 'Cancel', nothing happens
});
function changePassword(oldPassword, newPassword){
    const csrfToken = $('meta[name="csrf-token"]').attr("content");
    const user_id = document.getElementById('user-id').value ?? 0;
    $.post('/user-cabinet/change-password', {
        'newPassword': newPassword,
        'oldPassword': oldPassword,
        'userId': user_id,
        '_csrf-frontend': csrfToken,
    }, function (html) {
        alert(html);
    });
}