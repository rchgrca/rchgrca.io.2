var isLocalHost = (location.host == "localhost") ? true : false;
var oLocal = {
    "jquery"     : "jquery.min",
    "underscore" : "underscore",
    "backbone"   : "backbone-min"
}
var oCDN = {
    "jquery"     : "https://code.jquery.com/jquery-1.11.3.min",
    "underscore" : "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
    "backbone"   : "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.2/backbone-min"
}

var oPath = (isLocalHost) ? oLocal : oCDN;

require.config({
    baseUrl: 'assets/js/lib',
    paths: {
        jquery: oPath.jquery,
        underscore: oPath.underscore,
        backbone: oPath.backbone,
        //model: '../app/json.model',
        //portfolio: '../app/portfolio',
        //controller: 'controller',
        scrollex: 'jquery.scrollex.min',
        scrolly: 'jquery.scrolly.min',
        skel: 'skel.min',
        util: 'util',
        lazyloadxt: 'jquery.lazyloadxt.extra.min',
        main: '../app/main'
    },
    shim: {
        "underscore": {
            deps: ["jquery"]
        },        
        "backbone": {
            deps: ["underscore"]
        },/*
        "model": {
            deps: ["backbone"]
        },
        "portfolio": {
            deps: ["model"]
        },
        "controller": {
            deps: ["portfolio"]
        },*/
        "scrollex": {
            deps: ["backbone"]
        },
        "scrolly": {
            deps: ["scrollex"]
        },
        "skel": {
            deps: ["scrolly"]
        },
        "util": {
            deps: ["skel"]
        },
        "lazyloadxt": {
            deps: ["util"]
        },
        "main": {
        	deps: ["lazyloadxt"]
        }
    }
});
// for imporoved performance, request modules after onload (jQuery hasnt fired yet)
window.onload = (function(){
    require([
        "jquery",
        "underscore",
        "backbone"
        ],function(){
        require([
            //"model",
            //"portfolio",
            //"controller",
            "scrollex",
            "scrolly",
            "skel",
            "util",
            "lazyloadxt",
            "main"
        ]);
    });
})();
