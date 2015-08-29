<!DOCTYPE html> 
<html> 
    <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" /> 
        <title>Google Maps Sports</title> 
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script> 
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js"></script>
        <script type="text/javascript" src="/gms/js/jquery.xdomainajax.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
        <script type="text/javascript"> 
        //<![CDATA[
        var geocoder;
        var map;
        var marker;
        var infoWindow;
        var latlng;
        var urlParams = {};
        
        var oFanFeedr = {
            radius:50,
            zoom:7,
            aTeams:[],
            aLatLng:[],
            oCenter:{},
            currentLocation:{},
            setScriptNode:function(sUrl,id){
                var rand = Math.floor(Math.random()*1000000);
                var scr = document.createElement("script");
                    scr.type="text/javascript";
                    scr.src = sUrl + "&c=" + rand;
                    scr.id = id;
                    scr.onclick = "callback();"
                    document.body.appendChild(scr);
            }, 
            appId:"rx8apbsurwft7h8bayhyktcv",
            getLocalScoreboard:function(){
                var rand = Math.floor(Math.random()*1000000);
                var radius = 50;
                var sUrl = "http://www.thepaperboy.com/api/search/coordinates/"+oFanFeedr.aLatLng[0]+"/"+oFanFeedr .aLatLng[1]+"/"+radius+"?apikey=346829D8B0F3424384DA21FAF740C699&";
                
                $.ajax({ 
                    type: "GET", 
                    url: sUrl,
                    //dataType:"json",
                    success: function(res){;

                        var aHtml = [];
                        aHtml.push("<ul class='listing_c'>")

                        try {
                            
                            var results = res.responseText.query.results;
                            var oJson = (results.json.DATA.json) ? results.json.DATA.json : results.json.DATA;
                            //var oJson = res.responseText.query.results.json.DATA;

                            if (results.json.DATA.json){
                                // only 1 results, response has a different data structure
                                aHtml.push("    <li class='listing'><a href='" + oJson[1] + "' target='_blank'>"+oJson[0]+"</a></li>\n");
                            } else {
                                // multiple results, response has a different data structure
                                for (var i=0;i<oJson.length;i++){
                                    aHtml.push("    <li class='listing'><a href='" + oJson[i]['json'][1] + "' target='_blank'>"+oJson[i]['json'][0]+"</a></li>\n");
                                }
                            }

                        } catch(e){
                            aHtml.push("    <li>0 results. Try another location.</li>\n");
                            console.log(e)
                            _.throttle(oFanFeedr.getLocalScoreboard, 50)
                            
                        }

                        aHtml.push("</ul>")
                        
                        $("#local_scoreboard").html(aHtml.join(''))
                        
                        if(infoWindow == undefined){
                            infoWindow = new google.maps.InfoWindow({
                                content: document.getElementById("thislocation").innerHTML
                            });    
                            infoWindow.open(map,marker);
                        } else {
                            //infoWindow.setContent(document.getElementById("thislocation").innerHTML)
                        }
                        
                        //map.panTo(oFanFeedr.currentLocation);
                        //infoWindow.open(map,marker);
                    }
                });
            },
            getLocalSportsInfo:function(a){
                var radius = 30;
                //a = [37.43,-122.14]; 
                var sUrl = "http://api.fanfeedr.com/basic/v1/local_teams?format=json&lat="+a[0]+"&long="+a[1]+"&radius="+radius+"&appId="+this.appId;
                //alert(sUrl)
                //var sUrl = "http://api.fanfeedr.com/basic/v1/local_teams?format=json&lat="+a[0]+"&long="+a[1]+"&radius="+radius+"&appId="+this.appId;
                //oFanFeedr.setScriptNode(sUrl,'fanfeeder');
                
                $.ajax({ 
                    type: "GET", 
                    url: sUrl,
                    //dataType:"json",
                    success: function(res){;
                        var sHtml = $(res.responseText).text();
                        // replace line breaks
                        var sJson = sHtml.replace(/\n/g,'')
                        var oJson = eval(sJson)
                        oFanFeedr.aTeams = oJson;
                        oFanFeedr.getLocalScoreboard();
                        //debugger;
                        //alert(oJson.length)
                        
                        
                    }
                });
                
            },
            
        }
        
        
        function getLocale(results, status){
             if (status == google.maps.GeocoderStatus.OK) {   
                  document.getElementById("local_location").innerHTML = '<b>Your current location is: </b><br>' + results[0].formatted_address;
                  if (results[0]) {
                    map.setZoom(11);
                    marker = new google.maps.Marker({
                      position: latlng, 
                      map: map
                    });
                     
                  //infowindow.setContent(results[1].formatted_address);
                  //infowindow.open(map, marker);
                } else {
                  alert("No results found");
                }
              } else {
                alert("Geocoder failed due to: " + status);
              }
        }

        function geolocateMap(position) { 
             
            var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var markerOptions = {position: currentLocation, map: map, title:"Your geolocated position"}; 
            if(marker == undefined) {
                marker = new google.maps.Marker(markerOptions);
            } else {
                marker.setOptions(markerOptions);
            }                                       
            //var contentString = "<div style='width:200px;'><small><strong>Your Geolocated Position:</strong><br>" + new Date().toLocaleTimeString() + " at " + marker.position.toUrlValue(2) +" <br><br>NOTE: The demo continuously updates your geolocation using W3C Geolocation API and Google Maps. For details 'View Source' in your browser.</small></div>";
            //document.getElementById("thislocation").innerHTML = contentString;
            
            //var lat = position.coords.latitude;
            //var lng = position.coords.longitude;
            oFanFeedr.currentLocation = currentLocation;
            latlng = new google.maps.LatLng(oFanFeedr.aLatLng[0], oFanFeedr.aLatLng[1]);
            //geocoder.geocode({'latLng': latlng}, getLocale);
            //oFanFeedr.getLocalSportsInfo(oFanFeedr.aLatLng)
            oFanFeedr.getLocalScoreboard();

        }

          function codeAddress() {
            var address = document.getElementById("address").value;
            geocoder.geocode( { 'address': address}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) { 
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map, 
                    position: results[0].geometry.location
                });
                var oAddress = results[0];
                document.getElementById("thislocation").innerHTML = '&nbsp;&nbsp;' + oAddress.formatted_address;
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
            });
          }        
        
        function setUrlParams(){
            var e,
                a = /\+/g,  // Regex for replacing addition symbol with a space
                r = /([^&=]+)=?([^&]*)/g,
                d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                q = window.location.search.substring(1);

            while (e = r.exec(q)){
               urlParams[d(e[1])] = d(e[2]);
            }
            oFanFeedr.zoom = (urlParams["z"]) ? urlParams["z"]:oFanFeedr.zoom;
            oFanFeedr.radius = (urlParams["r"]) ? urlParams["r"]:oFanFeedr.radius;
            document.getElementById("radiusvalue").innerHTML = oFanFeedr.radius;
        }        
        
        
        function handleError(error) {alert(error.message);}
 
        function getMap(position){
            geocoder = new google.maps.Geocoder();
            //r latlng = new google.maps.LatLng(57.17,10.21);
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            latlng = new google.maps.LatLng(lat, lng);
            oFanFeedr.aLatLng = [lat,lng]
            var z = parseInt(oFanFeedr.zoom,10);
            var myOptions = {
                zoom: z,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                mapTypeControl: false
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            oFanFeedr.oCenter = map.getCenter();
            geolocateMap(position);
            
            google.maps.event.addListener(map, 'dragend', function() {
                oFanFeedr.oCenter = map.getCenter();
                var position = {
                    coords:{
                        latitude:oFanFeedr.oCenter.lat(),
                        longitude:oFanFeedr.oCenter.lng()
                    } 
                }
                oFanFeedr.aLatLng = [oFanFeedr.oCenter.lat(),oFanFeedr.oCenter.lng()]
                //marker.setMap(null);
                //infoWindow.close();
                geolocateMap(position);
            });
        }
  
        function initialize() {
            //document.getElementById("thislocation").innerHTML = "&nbsp;&nbsp;Determining your location...";
            // Request repeated updates.
            //var watchId = navigator.geolocation.watchPosition(getMap, handleError);    
            setUrlParams();
            var watchId = navigator.geolocation.getCurrentPosition(getMap, handleError); 
            //oFanFeedr.aLatLng = [37.43,-122.14];
            //oFanFeedr.getLocalSportsInfo([37.43,-122.14])
        }
        //]]>
        </script> 
        
        <style type="text/css"> 
        /*<![CDATA[*/
        html { height: 100% }
        body { height: 100%; margin: 0px; padding: 0px; position:relative; }
        #map_canvas { height: 100%; position: relative; }
        #sports_info_c {display:none;background:#fff;border:1px solid #000;width:66%;position:absolute;top:0;right:0; padding:0 10px;}
        #thislocation div {margin-top:5px;font-size:77%;}
        #local_location {font-size:77%;font-weight:bold;}
        #local_scoreboard li {margin-left:-20px !important;font-size:77%;}
        /*]]>*/
        </style> 
    </head> 
    <body onload="initialize()"> 
        <div id="map_canvas"></div>
        <div id="sports_info_c">
            <div id="thislocation">
                <div id="local_location">Local newspapers within a <span id="radiusvalue"></span> mile radius:</div>
                <div id="local_scoreboard">Loading...</div>
                <div id="local_news"></div>
            </div>
        </div>
    </body> 
</html>