<?php

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
        </style>\n
HTML;



$getData = '';
for($i=1001;$i<1011;$i++){    
    $getData .= <<< HTML
                <tr>
                    <td class="name"><a href="http://atlas.aol.com/atlas/people/richardgarcia282" target="_blank">Rich {$i}</a></td>
                    <td class="shares"><a href="http://aol.com"  target="_blank">{$i}</a></td>
                </tr>\n         
HTML;
} 
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

<style>
h1{font-size: 1.5em; color:#8dc63f; text-align: center; margin:20px;}
h3{font-size: 1.1em; color:#333; text-align: center; margin:20px;}
</style>

    </head>
    <body class="socialday">
        <h4>Holy Social! Leaderboard</h4>
        <div class="leaderboard_c">
            <table cellpadding="0" cellspacing="0" class="leaderboard">
                <tbody id="data_bitly">	
                
 

 
                
                <h1>Hold Tight.</h1>
                <h1>We're updating the leaderboard.</h1>
                <h3>In the meantime, keep sharing links on <a href="http://bit.ly" target="blank">bit.ly</a> & we'll be up & running again soon!  </h3>
                
                </tbody>
            </table>
        </div>
        <!--<h5><a href="http://hatch.aol.com">driven by AOL Hatch</a></h5>-->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js" type="text/javascript"></script>
        <script src="http://www.dotnetoutsource.com/scripts/jquery.subscribe.js" type="text/javascript"></script>
      
        <script>
var oHatch = {
    setHtml:function(o){
        var sTr = [];
            sTr.push('<tr>');
            sTr.push('    <th>Name</th>');
            sTr.push('    <th>Clicks</th>');    
            sTr.push('</tr>');
        for(var i=1;i<11;i++){
            sTr.push('<tr>');
            sTr.push('    <td class="name">'+i+'. <a href="http://atlas.aol.com/atlas/people/richardgarcia282" target="_blank">Rich</a></td>');
            sTr.push('    <td class="shares"><a href="http://aol.com"  target="_blank">100'+i+'</a></td>');
            sTr.push('</tr>');
        }
        $("#data_bitly").html(sTr.join(''));
    },
    getBitlyData:function(){
        
        var host = "http://pubsub.bitly.net";
        var path_decodes = "/pro/decodes?";
        var path_encodes = "/pro/encodes?";
        var login = "aoldemo";
        var apiKey = "R_cbeb775a43f6d7b2a38fdb6311cba123";
        
        var path = (true) ? path_decodes : path_encodes;
        
        var sUrl = [];
        sUrl.push(host);
        sUrl.push(path);
        //sUrl.push("jsonp=setleaderboard");
        //sUrl.push("callback=setleaderboard");
        sUrl.push("login="+login);
        sUrl.push("&apiKey="+apiKey);  
        
        //$.publish("BitlyData");
        //$("#data_bitly").subscribe("BitlyData", this.setHtml);
        //$.ajax({ url: sUrl.join(""), dataType:"jsonp", jsonpCallback: "setleaderboard"}); 
        oUtil.setScriptNode(sUrl.join(''),"bitly_call");
        //this.setHtml();
    }

}

var oUtil = {
    setScriptNode:function(sUrl,id){
        var rand = Math.floor(Math.random()*1000000);
        var scr = document.createElement("script");
            scr.type="text/javascript";
            scr.src = sUrl;
            scr.id = id;
            document.body.appendChild(scr);
    }    
}

function setleaderboard(o){
    alert('callback')
    oHatch.setHtml(o);    
}

window.onload = function(){
    //oHatch.getBitlyData();
}        
        
        </script> 
        
        
        
        
    </body>
</html>