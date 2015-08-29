http=require('http');
url=require('url');
http_server = http.createServer (function (req, resp) {
    var u = url.parse (req.url, true);
    var path = u.pathname;
    
    if (path === '/dummy-bitly-pubsub')
    {
        console.log ('request!');
        resp.writeHead (200, { 'Content-Type': 'application/json' });
        var json = '{ "a": "Mozilla\/5.0 (Windows; U; Windows NT 5.1; de; rv:1.8.1.11) Gecko\/20071127 Firefox\/2.0.0.11", "c": "DE", "nk": 0, "g": "a4dAxo", "h": "bQxvjS", "m": "GET", "l": "aubreysabala", "hh": "aol.it", "r": "direct", "u": "http:\/\/t.co\/tlBW9d1", "t": 1287769968 }';
        //setInterval (function () { resp.write (json); resp.write ('\n\n'); }, 2000);
        resp.write (json); resp.write ('\n\n');
        for (var x=0; x<100000000; x++);
        resp.write (json); resp.write ('\n\n');
        resp.end ();
    }
});
http_server.listen (8081);

