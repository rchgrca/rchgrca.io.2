<?php

header("Transfer-encoding: chunked");
flush(); 

echo "hi\n";
while(true){
    sleep(2);
    echo <<< JSON
{ "a": "Mozilla\/5.0 (Windows; U; Windows NT 5.1; de; rv:1.8.1.11) Gecko\/20071127 Firefox\/2.0.0.11", "c": "DE", "nk": 0, "g": "a4dAxo", "h": "bQxvjS", "m": "GET", "l": "aubreysabala", "hh": "aol.it", "r": "direct", "u": "http:\/\/t.co\/tlBW9d1", "t": 1287769968 }
JSON;
    echo "\n";
}
    
?>