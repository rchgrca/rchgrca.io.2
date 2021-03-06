<?php
include('inc.mysql.aol.php');

$width  = (isset($_REQUEST['width'])) ? $_REQUEST['width']:'300';
$height = (isset($_REQUEST['height'])) ? $_REQUEST['height']:'300';
$bordercolor = (isset($_REQUEST['bordercolor'])) ? $_REQUEST['bordercolor']:'cccccc';

$getStyleDynamic = <<< HTML
        <style>
            .socialday h4 {
                border:1px dotted #{$bordercolor};
            }
            .socialday h5 {
                border-left:1px dotted #{$bordercolor};
                border-bottom:1px dotted #{$bordercolor};
                border-right:1px dotted #{$bordercolor};            
            }
            table.leaderboard {
                width:{$width}px;
                border-left:1px dotted #{$bordercolor};
            }
            table.leaderboard td, table.leaderboard th {
                border-bottom:1px dotted #{$bordercolor};
                border-right:1px dotted #{$bordercolor};          
            }
            table.leaderboard th {
                text-align:center;
            }
            table.leaderboard th span {
                display:block;
            }
            table.leaderboard th span.title {
                width:55px;
                float:left;
            }
            table.leaderboard th span.updater { 
                width:55px;
                float:right;
                font:italic 77% arial;
                display:none;
            }
        </style>\n
HTML;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta name="description" content="AOL Social Day Leaderboard"/>             
        <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.1.1/build/cssreset/reset-min.css">
        <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.1.1/build/cssfonts/fonts-min.css"> 
        <link rel="stylesheet" type="text/css" href="/social/css/main.css">
<?php        
echo $getStyleDynamic;        
?> 
    </head>
    <body class="socialday">
        <h4>Bit.ly Clicks By Day Nov 2 - Nov 10</h4>
        <div class="leaderboard_c">
            <table cellpadding="0" cellspacing="0" class="leaderboard">
                <tbody id="data_bitly"></tbody>
            </table>
        </div>
        <h5 style="display:none;">Updated in real-time</h5>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js" type="text/javascript"></script>
        <script src="http://www.dotnetoutsource.com/scripts/jquery.subscribe.js" type="text/javascript"></script>
<?php
echo <<< HTML
        <script>
            var aHash = [{$setHashArray}null];
            var numHashes = aHash.length-1;
        </script>
HTML;
?>        
        <script src="http://hatch.aol.com/social/js/leaderboard.aol.js" type="text/javascript"></script>
    </body>
</html>