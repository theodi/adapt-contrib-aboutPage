define([
  'coreJS/adapt',
], function(Adapt) {

    var aboutPage = _.extend({
  
    initialize: function() {
    	this.listenTo(Adapt, 'aboutPage:showAboutPage', this.showAboutPage);
    	this.listenTo(Adapt, 'router:course', this.updateCourse);
    },

    updateCourse: function(target) {
    	this.currentCourse = target;
    },

    getCourse: function() {
    	return this.currentCourse;
    },

    showAboutPage: function() {
    	items = Adapt.config.get('_aboutPage')._items;
	console.log(items);
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
            title: "About",
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
