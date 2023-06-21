<table class="table">
    <thead>
    <tr>
        <th scope="col">Дата</th>
        <th scope="col">Событие</th>
        <th scope="col">Служба</th>
        <th scope="col">Местоположение</th>
    </tr>
    </thead>
    <tbody>
    <?
    if(isset($result['events'])){
     foreach ($result['events'] as $v){
         $weight = "";
         $location = [];
         if(isset($v['weight']) && isset($v['weight']['value'])){
             $weight = "<br>".$v['weight']['value'].$v['weight']['measure'].".";
         }

         if(isset($v['location'])){
             $location = $v['location'];
         }

    ?>
    <tr>
        <td><?=$v['date'] ?> <?=$weight ?></td>
        <td><?=$v['name'] ?></td>
        <td><?=$v['service'] ?></td>
        <td> <? print_r($location); ?></td>

    </tr>
         <?
     }
    }
         ?>
    </tbody>
</table>

<br>

    <?php
    if(isset($result['information'])){
        if(!empty($result['information'])){
    ?>
<h3>Дополнительная информация:</h3>
<div class="row">
    <ul class="list-group">
        <?
         foreach ($result['information'] as $k => $v){
        ?>
        <li class="list-group-item"><? echo $k.":".$v; ?></li>
             <?
         }
             ?>
    </ul>
</div>

<br>
        <?php
    }
    }
        ?>



    <?php
    if(isset($result['route'])){
        if(!empty($result['route'])){
            ?>
            <h3>Маршрут:</h3>
            <div class="row">
                <ul class="list-group">
                    <?
                    foreach ($result['route'] as $k => $v){
                        ?>
                        <li class="list-group-item"><? echo $k.":".$v; ?></li>
                        <?
                    }
                    ?>
                </ul>
            </div>

            <br>
            <?php
        }
    }
    ?>