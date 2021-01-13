define([
  'core/js/adapt'
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
        var title = "About";
        var contactEmail = "";
        var contactLinkText = "";
        
        try { title = Adapt.course.get('_globals')._extensions._aboutPage.linkText; } catch(err) {}
        
        try { 
            var items = Adapt.course.get('_aboutPage')._items; 
        } catch(err) {
            return;
        }

        try {
        	if( $('.about-links').prop('innerHTML').trim().length > 0) {
            		$('.about-links').append(' | ');
        	} 
        	$('.about-links').append('<a class="about" onClick="require(\'core/js/adapt\').trigger(\'aboutPage:showAboutPage\'); return false;">'+title+'</a>');
	   } catch(err) {
        
       }

       try {
            contactEmail = Adapt.course.get('_globals')._extensions._aboutPage.contactEMail;
            contactLinkText = Adapt.course.get('_globals')._extensions._aboutPage.contactLinkText;
            if (contactLinkText != "" && contactEmail != "") {
                console.log(contactEmail);
                console.log(contactLinkText);
                if( $('.about-links').prop('innerHTML').trim().length > 0) {
                    $('.about-links').append(' | ');
                }
                $('.about-links').append('<a class="contact" href="mailto:'+contactEmail+'" target="_blank">'+contactLinkText+'</a>');
            }
       } catch (err) {
        console.log(err);
       }

       try {
            var aboutcredit = this.contentObject.get('_aboutPage').aboutCredit;
            if (aboutcredit != "") {
                $('.about-credit').html(aboutcredit);
            }
        } catch(err) {
        }

        try {
            var aboutSLtext = this.contentObject.get('_aboutPage').SL_text;
            if (aboutSLtext != "") {
                $('#about-SL-text').html(aboutSLtext);
            }
        } catch(err) {}
    },

    showAboutPage: function() {
        var items = [];
        try {
            items = this.contentObject.get('_aboutPage')._items;
        } catch(err) {}
        if (items.length < 1) {
            items = Adapt.course.get('_aboutPage')._items;
        }
        var title = "About";
        try {
            title = Adapt.course.get('_globals')._extensions._aboutPage.titleText;
        } catch(err) {}
    	var string = "";
    	var count = 1;
        _.each(items, function(item) {
            var graphic = item._graphic;
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