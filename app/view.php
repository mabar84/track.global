<?php

use yii\helpers\Url;

$urlArray = explode('/', Url::current());
$utm = '';
foreach ($urlArray as $value){
    ($utm) ? $utm .= '_' . $value : $utm = $value;
}
?>
<section class="services-pochta__inner">
            <div class="container">
                <div class="breadcrumbs">
                    <ul class="breadcrumbs__list">
                        <li class="breadcrumbs__item">
                            <a class="breadcrumbs__link" href="/">Главная</a>
                        </li>
                        <li class="breadcrumbs__item">
                            <a class="breadcrumbs__link" href="/ru/courier">Службы доставки </a>
                        </li>
                        <li class="breadcrumbs__item">
                <span class="breadcrumbs__link-lats">
                  <?=$model->name ?>
                </span>
                        </li>
                    </ul>
                </div>

                <div class="services-pochta__top">
                    <div class="services-pochta__top-info">
                        <img class="services-pochta__top-img" src="/uploads/services/<?=$model->id ?>.jpg" alt=" <?=$model->name ?>">
                        <div class="services-pochta__top-name">
                <span class="services-pochta__top-name-title">
                <?=$model->name ?>
                </span>
                            <a class="services-pochta__top-name-link" href="<?=$model->site_url ?>" target="_blank">
                                <?=$model->site_url ?>
                            </a>
                        </div>
                    </div>
                    <div class="services-pochta__top-wrapper">
                        <div class="services-pochta__top-box">
                <span class="services-pochta__top-box-text">
                  Служба поддержки
                </span>
                            <span class="services-pochta__top-box-number">
                   <?=strip_tags($model->contacts) ?>
                </span>
                        </div>
                        <?
                         if($ratingAverage){
                        ?>
                        <div class="services-pochta__top-box">
                <span class="services-pochta__top-box-text">
                  Рейтинг
                </span>
                            <span class="services-pochta__top-box-star" data-rateyo-rating="<?=$ratingAverage ?>">
                </span>
                        </div>
                        <?
                         }
                        ?>
                        <div class="services-pochta__top-box services-pochta__top-box--last">
                <span class="services-pochta__top-box-text">
                  Среднее <span>время доставки</span>
                </span>
                            <span class="services-pochta__top-box-day">   <?=strip_tags($model->time_delivery) ?></span>
                        </div>
                    </div>
                </div>

                <!-- added cashbe -->
                <div class="container">
                    <div class="big-cashbe">
                        <div class="content">
                        <img src="/images/girl-with-laptop.png" alt="wow" class="girl" />
                        <div class="formula">
                            <img src="/images/icons/logo-cashbe.svg" alt="logo" class="logo" />
                            <p class="sign">=</p>
                            <div class="">
                            <p class="text">Кешбэк до 30%</p>
                            <p class="subtext">за каждую покупку</p>
                            </div>
                            <p class="sign">+</p>
                            <div class="">
                            <p class="text">100 ₽</p>
                            <p class="subtext">за&nbsp;регистрацию</p>
                            </div>
                        </div>

                        <a target="_blank" href="<?= $utm ?>&wm_id=adp|11|694" class="toshopping">За&nbsp;покупками</a>
                        </div>
                    </div>
                </div>
                <div class="services-pochta__info">
                    <h3 class="services-pochta__info-title">
                        <?=$model->name ?>
                    </h3>
                    <div class="services-pochta__info-box">
                        <?=$model->full_text ?>
                    </div>
                </div>

                <?
                 echo \frontend\widgets\StatusWidget::widget(['name' => $model->name, 'serviceId' => $model->id]);
                ?>
            </div>
            <form class="services-pochta__form" action="" method="post">
                <input type="hidden" name="<?= Yii::$app->request->csrfParam; ?>" value="<?= Yii::$app->request->csrfToken; ?>" />
                <div class="container">
                    <h3 class="services-pochta__form-title">
                        Оставить отзыв
                        <span class="services-pochta__form-subtitle">
                Ваш email адрес не будет опубликован. Обязательные поля отмечены *
              </span>
                    </h3>
                    <div class="services-pochta__reit">
              <span class="services-pochta__reit-text">
                Рейтинг*
              </span>
                        <span class="services-pochta__star"></span>
                        <input type="hidden" name="rating" id="rating_input" />
                    </div>
                    <div class="services-pochta__box-label">
                        <label class="services-pochta__label">
                            <input class="services-pochta__input" type="text" name="name" placeholder="Ваше имя*" required>
                        </label>
                        <label class="services-pochta__label">
                            <input class="services-pochta__input" type="email" name="email" placeholder="Ваш Email*" required>
                        </label>
                    </div>
                    <textarea class="services-pochta__textarea" placeholder="Текст отзыва" name="text"></textarea>
                    <button class="services-pochta__btn" type="submit">
                        Отправить
                    </button>
                </div>
            </form>

        </section>

        <section class="poshta-reviews">
            <div class="container">
                <h3 class="poshta-reviews__title">
                    Отзывы <span id="rating-count">(<?=\common\models\Reviews::find()->where(['id_service' => $model->id])->count() ?>)</span>
                </h3>

                <?
                echo \yii\widgets\ListView::widget([
                    'dataProvider' => $dataProvider,
                    'itemView' => '_review',
                    'layout' => "{summary}\n<ul class='poshta-reviews__list'>{items}</ul>\n<div class='pagination'>{pager}</div>",
                    'itemOptions' => ['tag'=>'li', 'class'=>'poshta-reviews__item'],
                    'pager'=>[
                            'pageCssClass' => 'pagination__item',
                        'hideOnSinglePage'=>true,
                        'linkOptions' => ['class' => 'pagination__link'],
                        'disabledPageCssClass' => 'disabled',
                        'firstPageLabel' => '',
                        'nextPageLabel' => '',
                        'prevPageLabel' => '',
                        'activePageCssClass' => 'pagination__link--active' ,
                        'options' => [
                            'class' => 'pagination__list',
                            'id' => 'pager-container',
                        ],
                    ],
                ]);
                ?>
            </div>
        </section>

<script>
    const ratingStars = document.querySelectorAll('.poshta-reviews__box-star');
    const countLd = document.querySelector('span#rating-count').innerHTML.match(/\d+/g);
    const h1 = document.querySelector('h1');
    const description = document.querySelector('meta[name="description"]').content;
    let ratingLd = 0;
    if(ratingStars.length > 0){
        let sum = 0;
        ratingStars.forEach((star) => {
            let rating = Number(star.getAttribute('data-rateyo-rating'));
            sum += rating;
        });
        ratingLd = sum / ratingStars.length;
    }
    let jsonLDData =
        {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": h1 ? h1.innerText : '',
            "description": description,
            "review": {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": Number(ratingLd.toFixed(2)),
                    "bestRating": 5
                },
                "author": {
                    "@type": "Organization",
                    "name": "track global"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": Number(ratingLd.toFixed(2)),
                "reviewCount": countLd ? Number(countLd[0]) : 0
            }
        }

    let jsonLDScript = document.createElement('script');
    jsonLDScript.type = 'application/ld+json';
    jsonLDScript.textContent = JSON.stringify(jsonLDData);

    document.head.appendChild(jsonLDScript);
</script>