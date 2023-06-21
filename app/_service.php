<a class="delivery__content-item-logo" href="<?=\yii\helpers\Url::toRoute(['delivery/view','service' => $model['alias']]) ?>">
    <img class="delivery__content-item-img" src="/uploads/services/<?=$model->id ?>.jpg" alt="Логотип службы">
</a>
<div class="delivery__content-item-box">
    <a class="delivery__content-item-name" href="<?=\yii\helpers\Url::toRoute(['delivery/view','service' => $model['alias']]) ?>">
        <?=$model->name ?>
    </a>
    <span class="delivery__content-item-text">

                    </span>
    <a class="delivery__content-item-link" href="<?=\yii\helpers\Url::toRoute(['delivery/view','service' => $model['alias']]) ?>">
        Отследить посылку
    </a>
</div>