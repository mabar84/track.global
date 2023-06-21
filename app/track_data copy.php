<?php

use common\models\Pages;

($track) ? $meta_title = 'Отслеживание посылки по номеру ' . $track : $meta_title = '';
($track)
    ? $meta_description = 'Отслеживание посылки по трек-номеру ' . $track . '. На Track.Global вы можете отследить посылки более 300 служб доставки.'
    : $meta_description = '';

$page = Pages::findOne(['alias' => 'track-page','is_hide' => 0]);
if($page) {
    $meta_title = str_replace('{трек-код}', $track, $page->title);
    $meta_description =  str_replace('{трек-код}', $track, $page->description);
}
$noBanner = $noBanner ?? 0;
?>
<style>
    .tracking-widget__aside-item-info__country-one::before {
    <?php if ($fromFlag) : ?>
        background-image: <? echo 'url('.$fromFlag.')';  ?>;
    <?php else: ?>
        display: none;
    <?php endif; ?>
    }

    .tracking-widget__aside-item-info__country-two::before {
    <?php if ($toFlag) : ?>
        background-image: <? echo 'url('.$toFlag.')';  ?>;
    <?php else: ?>
        display: none;
    <?php endif; ?>
    }
</style>
<div class="tracking-widget__inner" id="tracking-widget-content-inner">
    <button class="tracking-widget__inner-btn tracking-widget__inner-btn-close" id="close-widget-content-btn" type="button">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#263238" />
        </svg>
    </button>
    <div class="tracking-widget__wrapper" id="tracking-result">
        <?

        if($predict){
            ?>
            <div class="tracking-widget__head">
                  <span class="tracking-widget__head-title">
                    Прогнозируемая дата поступление в отделение почты
                  </span>
                <span class="tracking-widget__head-date">
                    4 декабря 2021 - 7 Декабря 2021
                  </span>
                <p class="tracking-widget__head-text">
                    Указанные сроки не 100% и рассчитываются на основании статитсики 108 посылок, доставленных за
                    последние
                    60
                    дней
                </p>
            </div>
            <?
        }
        ?>
        <div class="tracking-widget__content">
            <?
            $serviceFind = [];
            if(isset($result['events'])){
                ?>
                <ul class="tracking-widget__list">
                <?
                //Banner should be located in the middle of the list
                $bannerInsert = [
                        'title' => 'banner',
                        'content' => '<li class="tracking-widget__list-item tracking-widget__list-item_banner">
                            <div class="tracking-widget__list-date tracking-widget__list-date_banner">
                                <span class="tracking-widget__date tracking-widget__date--active tracking-widget__date_banner">+100 ₽</span>
                                <span class="tracking-widget__date-day tracking-widget__date-day_banner">за регистрацию</span>
                            </div>
                            <div class="tracking-widget__list-content tracking-widget__list-content_banner">
                                <div class="tracking-widget__list-img tracking-widget__list-img_banner">
                                    <img src="/images/icons/logo_cashbe_center.svg" alt="cashbe">
                                </div>
                                <div class="tracking-widget__list-box tracking-widget__list-box_banner">
                                    <span class="tracking-widget__list-text tracking-widget__list-text--active tracking-widget__list-text_banner">
                                        Кешбэк до 30% за каждую покупку
                                    </span>
                                    <span class="tracking-widget__list-country tracking-widget__list-country_banner">Возвращайте реальные деньги с каждой онлайн покупки</span>
                                </div>
                                <div class="tracking-widget__list-button tracking-widget__list-button_banner">
                                    <a 
                                    href="https://www.cashbe.ru/?bonus&utm_source=trackglobal&utm_medium=banner_middle_tracking&utm_campaign=url_tracking_'. $track .'&wm_id=adp|11|694">
                                    За покупками
                                    </a>
                                </div>
                            </div>
                        </li>'
                ];
                if(isset($result['events'][0]['service'])){
                    $counter = 0;
                    foreach ($result['events'] as $v):

                        if(!$noBanner && round(count($result['events'])/2) == $counter ){
                            echo $bannerInsert['content'];
                        }
                        $counter++;
                        $date = $v['date'] ?? '';
                        try{
                            new DateTime($date);
                        }catch (Exception $e){
                            $dateConvert = \DateTime::createFromFormat('Y-d-m H:i', $date);
                            if($dateConvert) {
                                $date = $dateConvert->format('Y-m-d H:i');
                            }else{
                                $date = '';
                            }
                        }
                        $checkService = $v['service'] ?? key($result['system_status']);
                        $model = \common\models\Services::findOne(['alias' =>  $checkService]);
                        $path = "";
                        if($model) {
                            $path = Yii::getAlias("@frontend/web/uploads/services/square/" . $model->id . ".jpg");
                        }
                        $serviceFind[$checkService] = $checkService;
                        ?>
                        <li class="tracking-widget__list-item">
                            <div class="tracking-widget__list-date">
                        <span class="tracking-widget__date tracking-widget__date--active">
                            <?=str_replace("г.","",$formatter->asDate($date, 'long'));?>
                        </span>
                                <span class="tracking-widget__date-day">
                          <?= $formatter->asDate($date, 'php:H:i'); ?>
                        </span>
                            </div>
                            <div class="tracking-widget__list-content">
                                <div class="tracking-widget__list-img">
                                    <?php if($path) : ?>
                                        <img src="<?=\common\components\Library::getBaseImage($path) ?>" style="width: 150px;" width="150" />
                                    <?php else: ?>
                                        <?= $checkService;?>
                                    <?php endif; ?>
                                </div>
                                <div class="tracking-widget__list-box">
                          <span class="tracking-widget__list-text tracking-widget__list-text--active">
                           <?= $v['name'] ?? ''; ?>
                          </span>
                                    <?php if(isset($v['location']['country'])): ?>
                                        <span class="tracking-widget__list-country">
                                        <?= $v['location']['country'];?>
                                        </span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </li>

                    <?php endforeach;?>

                    </ul>
                    <?
                }
                else{
                    ?>
                    <ul class="tracking-widget__list">
                        <?
                        $date = $result['events']['date'] ?? date("Y-m-d");
                        try{
                            new DateTime($date);
                        }catch (Exception $e){
                            $dateConvert = \DateTime::createFromFormat('Y-d-m H:i', $date);
                            $date = $dateConvert->format('Y-m-d H:i');
                        }
                        $checkService = key($result['system_status']);
                        $model = \common\models\Services::findOne(['alias' =>  $checkService]);
                        $path = "";
                        if($model) {
                            $path = Yii::getAlias("@frontend/web/uploads/services/square/" . $model->id . ".jpg");
                        }
                        $serviceFind[$checkService] = $checkService;
                        ?>
                        <li class="tracking-widget__list-item">
                            <div class="tracking-widget__list-date">
                        <span class="tracking-widget__date tracking-widget__date--active">
                            <?
                            echo str_replace("г.","",$formatter->asDate($date, 'long'));
                            ?>
                        </span>
                                <span class="tracking-widget__date-day">
                          <?
                          echo $formatter->asDate($date, 'php:H:i');
                          ?>
                        </span>
                            </div>
                            <div class="tracking-widget__list-content">
                                <div class="tracking-widget__list-img">
                                    <?
                                    if($path){
                                        ?>
                                        <img src="<?=\common\components\Library::getBaseImage($path) ?>" style="width: 150px;" width="150" />
                                        <?
                                    }else{
                                        ?>
                                        <?
                                        echo $checkService;
                                    }
                                    ?>
                                </div>
                                <div class="tracking-widget__list-box">
                          <span class="tracking-widget__list-text tracking-widget__list-text--active">
                           <?
                           echo  $result['events']['name'] ?? '';
                           ?>
                          </span>
                                    <?
                                    if(isset($result['location']['country'])){
                                        ?>
                                        <span class="tracking-widget__list-country">
                                        <?
                                        echo $result['location']['country'];
                                        ?>
                          </span>
                                        <?
                                    }
                                    ?>
                                </div>
                            </div>
                        </li>

                    </ul>


                    <?
                }
            }
            else{
                ?>

                <b>Ничего не найдено</b>

                <?
            }
            ?>
        </div>

    </div>
    <div class="tracking-widget__aside">
        <div class="tracking-widget__aside-inner">
            <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Номер отслеживания
                    </span>
                <span class="tracking-widget__aside-item-info">
                      <?=$track ?>
                    </span>
            </div>

            <?
            if(isset($result['information']['recipient'])){
                ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Кому
                    </span>
                    <span class="tracking-widget__aside-item-info">
                      <?=$result['information']['recipient'] ?>
                    </span>
                </div>
                <?
            }
            ?>

            <?
            if(isset($result['information']['sender'])){
                ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      От
                    </span>
                    <span class="tracking-widget__aside-item-info">
                        <?=$result['information']['sender'] ?>
                    </span>
                </div>
                <?
            }
            ?>

            <?
            if(!empty($from)){
                ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Страна отправления
                    </span>
                    <span class="tracking-widget__aside-item-info tracking-widget__aside-item-info__country-one">
                       <?=$from ?>
                    </span>
                </div>
                <?
            }

            if(!empty($to)){
                ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Страна назначения
                    </span>
                    <span class="tracking-widget__aside-item-info tracking-widget__aside-item-info__country-two">
                      <?=$to ?>
                    </span>
                </div>
                <?
            }
            ?>

            <?
            $weight = 0;
            $measure = '';

            if(isset($result['events'][0]['weight']['value'])){

                $weight = $result['events'][0]['weight']['value'];
            }elseif (isset($result['weight']['value'])){

                $weight = $result['weight']['value'];
            }

            if(isset($result['events'][0]['weight']['measure'])){

                $measure = $result['events'][0]['weight']['measure'];
            }elseif (isset($result['weight']['measure'])){

                $measure = $result['weight']['measure'];
            }

            if($weight){
                ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Вес
                    </span>
                    <span class="tracking-widget__aside-item-info">
                      <?=$weight ?> <?=((!is_nan(floatval($weight))) ? $measure : '') ?>
                    </span>
                </div>
                <?
            }
            ?>

            <?
            $services = '';
            if(is_array($serviceFind)) {
                $query = \common\models\Services::find();

                foreach ($serviceFind as $alias) {
                    $query->orWhere(['alias' => $alias]);
                }
                $services = $query->all();
            }

            if($services){
                ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Найдено в
                    </span>
                    <div class="tracking-widget__aside-item-box">
                    <?

                    foreach ($services as $item){
                        ?>
                        <a class="tracking-widget__aside-item-info tracking-widget__aside-item-link" target="_blank" href="<?=\yii\helpers\Url::toRoute(['delivery/view','service' => $item['alias']]) ?>">
                            <?=$item->name ?>
                        </a>
                        <?
                    }
                    ?>
                    </div>
                </div>
                <?
            }


                ?>
            <?php
            $services = '';

            if(is_array($checkedServices)) {
                $query = \common\models\Services::find();

                foreach ($checkedServices as $alias => $value) {
                    $query->orWhere(['alias' => $alias]);
                }
                $services = $query->all();
            }

            ?>
            <?php if($services): ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Проверено в службах
                    </span>
            <div class="tracking-widget__aside-item-box">
                    <?
                    foreach ($services as $item){
                        ?>
                        <a class="tracking-widget__aside-item-info tracking-widget__aside-item-link" target="_blank" href="<?=\yii\helpers\Url::toRoute(['delivery/view','service' => $item['alias']]) ?>">
                            <?=$item->name ?>
                        </a>
                        <?
                    }
                    ?>
            </div>
                </div>
                <?php endif;?>

            <?
            if($fromLocation){
                ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Отправлено из
                    </span>
                    <span class="tracking-widget__aside-item-info">
                      <?=$fromLocation ?>
                    </span>
                </div>
                <?
            }
            ?>

            <?
            if($toLocation){
                ?>
                <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Отправлено в
                    </span>
                    <span class="tracking-widget__aside-item-info">
                       <?=$toLocation ?>
                    </span>
                </div>

                <?
            }
            ?>
            <div class="tracking-widget__aside-item">
                    <span class="tracking-widget__aside-item-text">
                      Дней в пути
                    </span>
                <span class="tracking-widget__aside-item-info">
                      <?=$days ?> дней
                    </span>
            </div>
        </div>
        <div class="tracking-widget__aside-box">
                  <span class="tracking-widget__aside-box-title">
                    Ссылка для отслеживания
                  </span>
            <label class="tracking-widget__aside-label">
                <input id="url_track" class="tracking-widget__aside-input" type="text" value="<?=\yii\helpers\Url::base('https') ?>/tracking/<?=$track ?>">
                <button class="tracking-widget__aside-btn" id="track_copy">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="4.47827" width="11.5217" height="11.5217" rx="1.5" stroke="#E24949" />
                        <path
                                d="M4.86957 2.58696V2.58696C4.86957 2.50622 4.86957 2.46585 4.87073 2.43172C4.90664 1.38073 5.7503 0.537069 6.80129 0.501166C6.83542 0.5 6.87579 0.5 6.95652 0.5H12.8C13.9201 0.5 14.4802 0.5 14.908 0.717987C15.2843 0.909734 15.5903 1.21569 15.782 1.59202C16 2.01984 16 2.5799 16 3.7V9.54348C16 9.62422 16 9.66459 15.9988 9.69872C15.9629 10.7497 15.1193 11.5934 14.0683 11.6293C14.0342 11.6304 13.9938 11.6304 13.913 11.6304V11.6304"
                                stroke="#E24949" />
                    </svg>
                </button>
            </label>
        </div>
        <?php if(!$noBanner) : ?>
        <?php $asideUrl = 'https://www.cashbe.ru/?bonus&utm_source=trackglobal&utm_medium=side_bar_right&utm_campaign=url_tracking_'. $track . '&wm_id=adp|11|694'; ?>
        <div class="tracking-widget__aside-banner">
            <a href="<?=$asideUrl ?>"class="tracking-widget__banner-logo">
                <img src="/images/icons/logo_cashbe_aside.svg" alt="cashbe">
            </a>
            <div class="tracking-widget__banner-text">
                Всё ещё отслеживаешь посылки, не получив за них кешбэк?
            </div>
            <div class="tracking-widget__banner-cashback">
                <span>Кешбэк до 30%</span>
                <p>за каждую онлайн покупку</p>
                <a href="<?=$asideUrl ?>">+100 ₽ за регистрацию </a>
            </div>
            <div class="tracking-widget__banner-text tracking-widget__banner-text_small">
                Всё просто: переходи в магазин через Cashbe, покупай как обычно и получай часть дененг обратно!
                <br>
                <br>
                Более 1000 интернет-магазинов
            </div>
            <div class="tracking-widget__banner-button">
                <a href="<?=$asideUrl ?>">За покупками</a>
            </div>
        </div>
    </div>
</div>
<?php $bottomUrl = 'https://www.cashbe.ru/?bonus&utm_source=trackglobal&utm_medium=banner_after_tracking&utm_campaign=url_tracking_'. $track . '&wm_id=adp|11|694'; ?>
<div class="tracking-widget__bottom-banner">
    <a href="<?=$bottomUrl ?>" class="bottom-banner__title">Всё ещё отслеживаешь посылки, не получив за них кешбэк?</a>
    <div class="bottom-banner__wrapper">
        <a href="<?=$bottomUrl ?>" class="bottom-banner__img">
            <img src="/images/icons/logo_cashbe_bottom.svg" alt="cashbe">
        </a>
        <a href="<?=$bottomUrl ?>" class="bottom-banner__sybmols">=</a>
        <a href="<?=$bottomUrl ?>" class="bottom-banner__text">
            <span>Кешбэк до 30%</span>
            <span>за каждую покупку</span>
        </a>
        <a href="<?=$bottomUrl ?>" class="bottom-banner__sybmols">+</a>
        <a href="<?=$bottomUrl ?>" class="bottom-banner__text">
            <span>100 ₽</span>
            <span>за регистрацию</span>
        </a>
        <div class="bottom-banner__button">
            <a href="<?=$bottomUrl ?>" class="">За покупками</a>
        </div>
    </div>
</div>
<?php endif; ?>
<script>
    var copyTextareaBtn = document.querySelector('#track_copy');

    copyTextareaBtn.addEventListener('click', function(event) {
        var copyTextarea = document.querySelector('#url_track');
        copyTextarea.focus();
        copyTextarea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });

    // close tracking content

    // есть дублирующий обработчик события в файле main.js по селектору '.tracking-widget__inner-btn-close'
    // он оставлен без изменения, чтобы ничего не сломалось
    // и он здесь нам не подходит, потому что он работает при первом рендере DOM,
    // когда этой кнопки закрытия (#close-widget-content-btn) еще нет
   
    var closeWidgetContentBtn = document.getElementById('close-widget-content-btn');
    if (closeWidgetContentBtn) {
        closeWidgetContentBtn.addEventListener('click', (e) => {
            var widgetContent = document.getElementById('widgetContentMain');
            if(widgetContent) { 
                widgetContent.innerHTML = '';
            }
        });
    }

</script>
<?php
$this->registerJs("
         title = `$meta_title`;
         metaDescription = `$meta_description`;
    
    if(title){
    document.title = title;
    }
    
    if (metaDescription) {
    let metaDescriptionTag = document.querySelector('meta[name=\"description\"]');
        if(metaDescriptionTag){
            metaDescriptionTag.setAttribute('content', metaDescription);
        }
    }
", \yii\web\View::POS_END);
?>
