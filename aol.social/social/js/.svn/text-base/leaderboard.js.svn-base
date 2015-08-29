var oHatch = {
    refreshPeriod:60000,
    iPoll:false,
    getPubSubStream:function(){
        // create path for decode request 
        var path_decodes = "/pro/decodes?";
        var path_encodes = "/pro/encodes?";
        var login = "aoldemo";
        var apiKey = "R_cbeb775a43f6d7b2a38fdb6311cba123";
        
        var sUrl = [];
        sUrl.push("http://pubsub.bitly.net");
        sUrl.push(path_decodes);
        sUrl.push("login="+login);
        sUrl.push("&apiKey="+apiKey);
        
        oUtil.setScriptNode(sUrl.join(''),"test");
        
    },
    startLeaderboardPoll:function(){
        this.iPoll = setInterval(this.getLeaderboard,this.refreshPeriod);
    },
    getLeaderboard:function(){                                       
        $("span.updater").css("display","block");
        $.ajax({ url: "/social/xhr_leaderboard.php", success: oHatch.setHtml});
    },
    setHtml:function(o){ 
        var o = eval(o);
        /*
        var sTr = [];
            sTr.push('<tr>');
            sTr.push('    <th><span class="title">Name</span><span class="updater">Updating...</span></th>');
            sTr.push('    <th>Clicks</th>');    
            sTr.push('</tr>');
        for(var i=0;i<o.length-1;i++){
            sTr.push('<tr>');
            sTr.push('    <td class="name">'+(i+1)+'. <a href="http://atlas.aol.com/atlas/people/richardgarcia282" target="_blank">'+o[i].employee+'</a></td>');
            sTr.push('    <td class="shares"><a href="http://aol.com"  target="_blank">'+o[i].click_count+'</a></td>');
            sTr.push('</tr>');
        }
        $("#data_bitly").html(sTr.join(''));
        */
        $("#data_bitly").html(o);
        
        var setUpdaterOff = function(){
            $("span.updater").css("display","none");    
        }                                   
        setTimeout(setUpdaterOff,4000);            
    }                                       
}

var oUtil = {
    setScriptNode:function(sUrl,id){
        var rand = Math.floor(Math.random()*1000000);
        var scr = document.createElement("script");
            scr.type="text/javascript";
            scr.src = sUrl + "&c=" + rand;
            scr.id = id;
            document.body.appendChild(scr);
    }    
}

window.onload = function(){
    oHatch.startLeaderboardPoll();    
    //oHatch.getPubSubStream();
}
