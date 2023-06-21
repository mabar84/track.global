<section class="time__wrapper">
    <div class="container">
        <div class="breadcrumbs">
            <ul class="breadcrumbs__list">
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link" href="/">Главная</a>
                </li>
                <li class="breadcrumbs__item">
                <span class="breadcrumbs__link-lats">
                  Сроки доставки
                </span>
                </li>
            </ul>
        </div>

        <h3 class="time__title">
            <?=$russian->h1 ?>
        </h3>

        <div class="time__inner">
            <div class="delivery__tabs">
                <button class="delivery__tabs-btn delivery__time-btn delivery__time-btn--active">Россия</button>
                <button class="delivery__tabs-btn delivery__time-btn">Беларусь</button>
                <button class="delivery__tabs-btn delivery__time-btn">Украина</button>
                <button class="delivery__tabs-btn delivery__time-btn">Казахстан</button>
            </div>
            <div class="time__box">
                <div class="time__content time__content--active">
                    <?=$russian->full_description ?>
                </div>
                <div class="time__content">
                    <?=$belarus->full_description ?>
                </div>
                <div class="time__content">
                    <?=$ukraina->full_description ?>
                </div>
                <div class="time__content">
                    <?=$kazakstan->full_description ?>
                </div>
            </div>
        </div>
        <button class="top__search-btn" type="submit">
            <div class="top__btn-spiner" id="circularG">
                <div id="circularG_1" class="circularG"></div>
                <div id="circularG_2" class="circularG"></div>
                <div id="circularG_3" class="circularG"></div>
                <div id="circularG_4" class="circularG"></div>
                <div id="circularG_5" class="circularG"></div>
                <div id="circularG_6" class="circularG"></div>
                <div id="circularG_7" class="circularG"></div>
                <div id="circularG_8" class="circularG"></div>
            </div>
            <span class="top__btn-text">отследить</span>
            <span class="top__btn-text--active">поиск</span>
        </button>
</section>