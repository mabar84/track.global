<?php
echo \frontend\widgets\TrackingWidget::widget(
    [
        'track' => $track,
        'client_id' => $client_id,
        'alias' => $alias
    ]);
