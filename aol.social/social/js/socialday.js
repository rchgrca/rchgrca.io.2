// require the http client/server
var http = require('http');
var sys = require ('sys');   
var url = require ('url');
var rest = require('restler-aaronblohowiak');

// create mysql db connection
var db = require("mysql-native").createUNIXClient('/var/lib/mysql/mysqldb/mysql.sock'); // localhost:3306 by default
db.auto_prepare = true;
function dump_rows(cmd)
{
   cmd.addListener('row', function(r) { sys.puts("row: " + sys.inspect(r)); } );
}

db.auth('social_day', "root", "gmendoza" );
//dump_rows(db.query("select 1+1,2,3,'4',length('hello')"));
//dump_rows(db.execute("select 1+1,2,3,'4',length(?)", ["hello"]));
//db.close();

// create path for decode request 
var path_decodes = "/pro/decodes?";
var path_encodes = "/pro/encodes?";
var login = "aoldemo";
var apiKey = "R_cbeb775a43f6d7b2a38fdb6311cba123";

//create bitly username, aol email address map
var oAolEmployees = {};                       
var getAolEmployeeObject = function(){
    var sUrl = 'http://bit.ly/pro/teamaol?login=aoldemo&apiKey='+apiKey;
    rest.get(sUrl).addListener('complete', function(data) {
    oAolEmployees = data.users;
    //console.log (oAolEmployees);
    console.log('\nSetting bit.ly username to AOL employee email address map.  Number AOL Employees with bitl.ly acct = '+oAolEmployees.length+'\n'); 
});
}
//make first request, then wait on specified interval  
getAolEmployeeObject()  
var iGetAolEmployees = setInterval(function(){getAolEmployeeObject();},5*60*1000); 

var getBitlyUserAolEmployee = function(l){
    for (var i=0;i<oAolEmployees.length;i++){
        if(oAolEmployees[i].login == l){
            return oAolEmployees[i];
        } 
    }
    return false;
}


var path = (true) ? path_decodes : path_encodes;

var sUrl = [];
sUrl.push(path);
sUrl.push("login="+login);
sUrl.push("&apiKey="+apiKey);  

//sUrl = ['/dummy-bitly-pubsub'];

// create a new client 
// ote the port is the port the client is listeing to
// 80 for most websites
var bitly_decodes = http.createClient(
80, 'pubsub.bitly.net'
//8081, 'labs-v1.ihost.aol.com'
)

function request_bitly_pubsub ()
{
    console.log ('connecting to bitly pubsub');
    var bitly_decodes_resp = '', // place to save the response
    // making our request here
        bitly_decodes_req = bitly_decodes.request(
      'get', sUrl.join(''),
      { 'host': 'pubsub.bitly.net' }
    );
    // end the request (needed to obtain the answer)
    bitly_decodes_req.end();
    // add our event handlers (callbacks)
    bitly_decodes_req.on('response', function(resp) {
    // here is where your streaming data comes in
    resp.on('data', function(chunk) {
        bitly_decodes_resp += chunk;
        try {                                                            
            
            var aResp = bitly_decodes_resp.split("\n"); 
            //console.log('aResp = ' + sys.inspect(aResp));
            var numStringObjects = lastIndex = aResp.length;//-1;
                        
            for(var i=0;i<aResp.length;i++){
                if(aResp[i] == ''){
                    // element of array (empty string)
                    continue;
                }
                bitly_decodes_resp = aResp[i];
                /*
                if(aResp[lastIndex] != ''){
                    console.log("\n*** INCOMPLETE DATA RECEIVED...dropping click ***\n");
                    bitly_decodes_resp = "";
                    return;
                }*/ 
                //console.log("bitly_decodes_resp = " + bitly_decodes_resp);
                //parse pubsub data
                var bitly_decodes_resp_json = JSON.parse(bitly_decodes_resp);
                //get object of bitly user with @teamaol.com address
                var oBitlyUserAolEmployee = getBitlyUserAolEmployee(bitly_decodes_resp_json.l);
                
                //console.log("long_url = " + bitly_decodes_resp_json.u);  
                var isEngadget = (bitly_decodes_resp_json.hh == "bit.ly" && (bitly_decodes_resp_json.u.indexOf("engadget.com") != -1)) ? true:false;
                var isAolit = (bitly_decodes_resp_json.hh == "aol.it") ? true:false;
                var isTcrnch = (bitly_decodes_resp_json.hh == "tcrn.ch") ? true:false;
                
                var isAolCom = (bitly_decodes_resp_json.u == "http:\/\/www.aol.com\/") ? true:false;
                var isAolIndia = (bitly_decodes_resp_json.u == "http:\/\/www.aol.in\/") ? true:false;
                var isAolCanada = (bitly_decodes_resp_json.u == "http:\/\/www.aol.ca\/") ? true:false;
                var isAolUk = (bitly_decodes_resp_json.u == "http:\/\/www.aol.co.uk\/") ? true:false;
                var isWow = (bitly_decodes_resp_json.u.indexOf("wow.com") != -1) ? true:false;
                
                
                //var isBitlyAolUrl = (isAolit || isTcrnch || isEngadget) ? true:false;
                var isBitlyAolUrl = (isAolCom || isAolIndia || isAolCanada || isAolUk) ? true:false;
                var isBitlyWowUrl = (isWow) ? true:false;
                
                if ((isBitlyAolUrl || isBitlyWowUrl) && oBitlyUserAolEmployee){
                    //console.log(bitly_decodes_resp_json);
                    var isOffendingLink = false;
                    var aOffendingLinks = [];

                    for (g=0;g<aOffendingLinks.length;g++){
                        if(bitly_decodes_resp_json.h == aOffendingLinks[g]){
                            isOffendingLink = true;
                        }
                    }
                    //console.log("*** isOffendingLink = " + isOffendingLink + " ***");
                    if(isOffendingLink){
                            console.log ('\n*********************************************************************************************************************************************************************'+
                                        '\nA click on an Bitly AOL url created by an AOL employeee has been FILTERED AND DOES NOT COUNT!'+
                                        '\nemail:'+oBitlyUserAolEmployee.email+
                                        '\nshorturl = ' + bitly_decodes_resp_json.hh + '/'+bitly_decodes_resp_json.g + 
                                        '\nlong_url = ' + bitly_decodes_resp_json.u+
                                        '\ntimestamp = ' + bitly_decodes_resp_json.t+
                                        '\n**********************************************************************************************************************************************************************'+
                                        '\n')
                            //break out of large loop            
                            continue;
                    }
                    
                    
                    console.log ('\n*** A click on an Bitly AOL url created by an AOL employeee has been registered! ***'+
                                '\nemail:'+oBitlyUserAolEmployee.email+
                                '\nshorturl = ' + bitly_decodes_resp_json.hh + '/'+bitly_decodes_resp_json.g + 
                                '\nlong_url = ' + bitly_decodes_resp_json.u+
                                '\ntimestamp = ' + bitly_decodes_resp_json.t+
                                '\n');
                                /*
                                if(isBitlyAolUrl){
                                db.execute ('insert into click_counts_aol_com(employee, email, click_count) values (?, ?, ?) on duplicate key update click_count = click_count+1',
                                [bitly_decodes_resp_json.l, oBitlyUserAolEmployee.email, 1]);
                                db.execute ('insert into bitly_decodes_aol_com(short_url_cname, global_bitly_hash, long_url, encoding_user_login, timestamp) values (?,?,?,?, now())',
                                [bitly_decodes_resp_json.hh, bitly_decodes_resp_json.g, bitly_decodes_resp_json.u, bitly_decodes_resp_json.l]);
                                } 
                                */
                                if(isBitlyWowUrl){
                                db.execute ('insert into click_counts_wow_com(employee, email, click_count) values (?, ?, ?) on duplicate key update click_count = click_count+1',
                                [bitly_decodes_resp_json.l, oBitlyUserAolEmployee.email, 1]);
                                db.execute ('insert into bitly_decodes_wow_com(short_url_cname, global_bitly_hash, long_url, encoding_user_login, timestamp) values (?,?,?,?, now())',
                                [bitly_decodes_resp_json.hh, bitly_decodes_resp_json.g, bitly_decodes_resp_json.u, bitly_decodes_resp_json.l]);          
                                } 
                } else {
                    console.log('url = ' + bitly_decodes_resp_json.hh + '/' + bitly_decodes_resp_json.g + ', login = ' + bitly_decodes_resp_json.l + ', timestamp = ' + bitly_decodes_resp_json.t)
                    //console.log(bitly_decodes_resp);    
                }
                console.log("\n");
            }
            bitly_decodes_resp = "";           
        } catch(e){       
            console.log(e);
            console.log(e.stack);
            console.log(bitly_decodes_resp);
            //bitly_decodes_resp = "";
        }
      });
      
      var reconn = function () {
          setTimeout (request_bitly_pubsub, 3000);
          console.log ('bitly pubsub died, reconnecting');
      };  
      resp.on ('end', reconn);
      resp.on ('error', reconn);
      resp.on ('close', reconn);  
    // for a keep alive, dont use the end event,
    // use the data event to get the chunks of data
    });
}

request_bitly_pubsub ();

// use the JSON native object to parse the data
//var bitly_decodes_resp_json = JSON.parse(bitly_decodes_resp);

// save it to your mysql. nodejs.org for more info
// look under links for modules

/*
http_server = http.createServer (function (req, resp) {
    var u = url.parse (req.url, true);
    var path = u.pathname;
    
    if (path === '/top-click-counts')
    {
        resp.writeHead (200, { 'Content-Type': 'application/json' });
        resp.write ('[');
        
        var q = db.query ('select * from click_counts order by click_count desc limit 10');
        q.addListener ('row', function (r) { resp.write (JSON.stringify ({employee:r[0], click_count:r[1]})); resp.write (','); });
        q.addListener ('end', function () { resp.write ('null]'); resp.end (); });
    }
    else if (path === '/dummy-bitly-pubsub')
    {
        resp.writeHead (200, { 'Content-Type': 'application/json' });
        var json = '{ "a": "Mozilla\/5.0 (Windows; U; Windows NT 5.1; de; rv:1.8.1.11) Gecko\/20071127 Firefox\/2.0.0.11", "c": "DE", "nk": 0, "g": "a4dAxo", "h": "bQxvjS", "m": "GET", "l": "aubreysabala", "hh": "aol.it", "r": "direct", "u": "http:\/\/t.co\/tlBW9d1", "t": 1287769968 }';
        setInterval (function () { resp.write (json); resp.write ('\n\n'); }, 1000);
    }
});
http_server.listen (8080);

console.log(666);
for (var x=0; x<10000000000;++x)
  ;
console.log(667);
*/               
                 
