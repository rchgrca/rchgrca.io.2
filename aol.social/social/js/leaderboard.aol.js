var setTableInnerHtml = '';
var index = 0;
var hash = '';
var setClicksByDay = function(o){
    var oResp = eval(o);
    var aClicksByDay = oResp.data.clicks_by_day[0].clicks;
    var numClicks = 0;             
    
    for(var i=0;i<aClicksByDay.length;i++){
        var numClicks = numClicks + aClicksByDay[i].clicks;
    }
    var tr = document.getElementById("data_bitly");               
    oHatch.setHtml(tr.innerHTML + '<tr><td class="name">'+(index+1)+'. '+aHash[index]+'</td><td class="shares">'+numClicks+'</td></tr>');
    index = index + 1;
    if(index < numHashes){
        oHatch.getClicksPerDay(aHash[index],index);
    } 
};

var oHatch = {
    getClicksPerDay:function(hash,index){
        // create path for clicks per day 
        var login = "aoldemo";
        var apiKey = "R_cbeb775a43f6d7b2a38fdb6311cba123";
        hash = hash;
        
        var sUrl = [];
        sUrl.push("http://api.bit.ly");
        sUrl.push("/v3/clicks_by_day?");
        sUrl.push("login="+login);
        sUrl.push("&apiKey="+apiKey);
        sUrl.push("&callback=setClicksByDay");     
        sUrl.push("&hash="+hash);                                                             
        
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
        //var o = eval(o);
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
    //oHatch.startLeaderboardPoll();    
    //oHatch.getPubSubStream(); 
    oHatch.getClicksPerDay(aHash[index],index);
}
