<?php
include('inc.mysql.php');
$setDataHtml = json_encode($getData);
echo <<< JSON
'{$getData}';
JSON;


/*
echo '[';
while ($row = mysql_fetch_row($result)){    
    echo '{"employee":"'.$row[0].'","click_count":"'.$row[1].'"},';
}  
echo "null];";
*/
?>