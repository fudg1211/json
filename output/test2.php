<?php

$a=array(a=>'sdf',b=>"sdsdfs<div></div>dfivf",c=>array(1,array(a=>'a',b=>'b',c=>'sdfsdf',d=>array(1,2,'s')),3,'http://su.bdimg.com/static/superpage/img/logo_white.png'));


echo 'jsonp('.json_encode($a).')';

?>