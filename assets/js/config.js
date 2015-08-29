require.config({
    baseUrl: '/assets/js/lib',
    paths: {
        jquery: 'https://code.jquery.com/jquery-1.11.3.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.2/backbone-min',
        model: '../app/json.model',
        portfolio: '../app/portfolio',
        controller: 'controller',
        scrolly: 'jquery.scrolly.min',
        scrollzer: 'jquery.scrollzer.min',
        skel: 'skel.min',
        util: 'util',
        effects: '../app/effects'
    },
    shim: {
        "underscore": {
            deps: ["jquery"]
        },        
        "backbone": {
            deps: ["underscore"]
        },
        "model": {
            deps: ["backbone"]
        },
        "portfolio": {
            deps: ["model"]
        },
        "controller": {
            deps: ["portfolio"]
        },
        "scrolly": {
            deps: ["controller"]
        },
        "scrollzer": {
            deps: ["scrolly"]
        },
        "skel": {
            deps: ["scrollzer"]
        },
        "util": {
            deps: ["skel"]
        },
        "effects": {
        	deps: ["util"]
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
            "model",
            "portfolio",
            "controller",
            "scrolly",
            "scrollzer",
            "skel",
            "util",
            "effects"
        ]);
    });
})();
