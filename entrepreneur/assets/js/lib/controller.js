//main specific to app
(function () {
    // used to bind model to view (only one view at the moment), routing not used yet
	var ctx = getModel;

    var defineModel = Backbone.Model.extend({
        initialize: function(){}
    });

    var oModel = new defineModel(ctx);

    var defineView = Backbone.View.extend({ 
        el: "body",
        context: oModel.attributes,
        contextReset: function(){
            this.context = oModel.attributes;
        },
        initialize: function(){
            _.bindAll(this, "render");
            this.render();
        },
        render: function(id){
            var template = Handlebars.templates.portfolio;
             
            this.$el.html(template(this.context));
            return this;
        },
        events: {
            "click #nav": "routerDispatch"
        },
        routerDispatch: function(e){
            e.preventDefault();
            e.stopPropagation();
            var id = e.target.id;
            switch(id){
                case "":
                case "top":
                    oRouter.routeHome();
                    break;
                case "euclid":
                    oRouter.routeEuclid();
                    break;
                case "intuit":
                    oRouter.routeIntuit();
                    break;
                case "blyve":
                    oRouter.routeBlyve();
                    break;
                case "aol":
                    oRouter.routeAol();
                    break;
                case "interests":
                    oRouter.routeInterests();
                    break;
                default:
                    console.log("switch/case default")
                    break;
            }
        }
    });
/*
    var defineRouter = Backbone.Router.extend({ 
        routes: {
            ""          : "routeHome",
            "top"       : "routeHome",
            "euclid"    : "routeEuclid",
            "intuit"    : "routeIntuit",
            "blyve"     : "routeBlyve",
            "aol"   	: "routeAol",
            "interests" : "routeInterests",
            "contact"  	: "routeContact"
        },
        routeHome: function(){
            oView.render("");
        },
        routeEuclid: function(){
            this.navigate("#euclid");
        },
        routeIntuit: function(){
            this.navigate("#intuit");
        },
        routeBlyve: function(){
            this.navigate("#blyve");
        },
        routeAol: function(){
            this.navigate("#aol");
        },
        routeInterests: function(){
            this.navigate("#interests");
        },
        routeContact: function(){
            this.navigate("#contact");
        }
    });
*/
    var oView = new defineView();
    //var oRouter = new defineRouter();
    
    //oModel.set(ctx);
    Backbone.history.start();

})();