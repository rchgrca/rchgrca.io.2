<?php
$user="root";
$password="gmendoza";
$database="social_day";
mysql_connect(':/var/lib/mysql/mysqldb/mysql.sock',$user,$password) or die( "can't connect");
@mysql_select_db($database) or die( "Unable to select database");
$query = <<< SQL
select * from click_counts order by click_count desc limit 10
SQL;

$result = mysql_query($query);

$getData = <<< HTML
<tr><th><span class="title">Name</span><span class="updater">Updating...</span></th><th>Clicks</th></tr>
HTML;
$i = 1;
while ($row = mysql_fetch_row($result)){
    $aName = explode("@",$row[2]);
    $aEmail = explode(".",$aName[0]);
    $name = '';
    for($j=0;$j<count($aEmail);$j++){
        $name .= " " . ucfirst($aEmail[$j]);    
    }
    //$name = ucfirst($aEmail[0]) . " " . ucfirst($aEmail[1]);
    $getData .= <<< HTML
<tr><td class="name">{$i}.<a href="mailto:{$row[2]}" target="_blank">{$name}</a></td><td class="shares">{$row[1]}</td></tr>         
HTML;
$i++;
}  
mysql_close();
?>