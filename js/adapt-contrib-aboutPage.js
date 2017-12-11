define([
  'coreJS/adapt',
], function(Adapt) {

    var aboutPage = _.extend({
  
    initialize: function() {
    	this.listenTo(Adapt, 'aboutPage:showAboutPage', this.showAboutPage);
    	this.listenTo(Adapt, 'router:course', this.updateCourse);
        this.listenTo(Adapt, 'pageView:ready', this.addLink);
        this.listenTo(Adapt, 'menuView:ready', this.addLink);
        this.listenTo(Adapt, 'router:page', this.updatePage);
    },

    updateCourse: function(target) {
    	this.currentCourse = target;
    },

    updatePage: function(target) {
        this.contentObject = target;
    },

    getPage: function() {
        return this.contentObject;
    },

    getCourse: function() {
    	return this.currentCourse;
    },

    addLink: function() {
        title = "About";
        try {
            title = Adapt.course.get('_globals')._extensions._aboutPage.linkText;
        } catch(err) {
        }
        try { 
            items = Adapt.course.get('_aboutPage')._items; 
        } catch(err) {
            return;
        }
        if( $('.about-links').prop('innerHTML').trim().length > 0) {
            $('.about-links').append(' | ');
        } 
        $('.about-links').append('<a class="about" onClick=\'callAboutPageTrigger();\'>'+title+'</a>');
        try {
            aboutcredit = this.contentObject.get('_aboutPage').aboutCredit;
            if (aboutcredit != "") {
                $('.about-credit').html(aboutcredit);
            }
        } catch(err) {}
        try {
            aboutSLtext = this.contentObject.get('_aboutPage').SL_text;
            if (aboutSLtext != "") {
                $('#about-SL-text').html(aboutSLtext);
            }
        } catch(err) {}
    },

    showAboutPage: function() {
        items = [];
        try {
            items = this.contentObject.get('_aboutPage')._items;
        } catch(err) {}
        if (items.length < 1) {
            items = Adapt.course.get('_aboutPage')._items;
        }
        title = "About";
        try {
            title = Adapt.course.get('_globals')._extensions._aboutPage.titleText;
        } catch(err) {}
    	string = "";
    	count = 1;
 	_.each(items, function(item) {
		graphic = item._graphic;
		if (graphic.src) {
			string += "<div class='aboutPageGraphicElement'><img class='aboutPageGraphic' src='" + graphic.src + "'/></div>";
		}
 		string += "<div class='aboutPageText'>";
		string += "<h2>" + item.title + "</h2>";
 		string += "<p>" + item.description + "</p>";
		string += "</div>";
 		string += "<hr class='aboutPageRule'/>";
    	});
	var alertObject = {
            title: title,
            body: string
        };
        Adapt.once("notify:closed", function() {
            Adapt.trigger("tutor:closed");
        });

        Adapt.trigger('notify:popup', alertObject);

        Adapt.trigger('tutor:opened');
    }


  }, Backbone.Events);
  
  aboutPage.initialize();

  return (aboutPage);
});

function callAboutPageTrigger() {
    var Adapt = require('coreJS/adapt');
    Adapt.trigger('aboutPage:showAboutPage');
}
