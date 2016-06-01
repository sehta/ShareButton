/**
 * jQuery prettySocial: Use custom social share buttons
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {
    'use strict';

    $.fn.shareButton = function (options) {
         // Establish our default settings
        var settings = $.extend({
            displayText  : false,
			buttonStyle : false,
			pinterestText: 'Pinterest',
			facebookText: 'Facebook',
			twitterText:'Twitter',
			googleplusText:'GooglePlus',
			linkedinText:'LinkedIn',
			displayIcon:true,
            color        : null,
            fontStyle    : null
        }, options);
		
		
        var _socialSites = {
                pinterest: {
                    url: 'http://pinterest.com/pin/create/button/?url={{url}}&media={{media}}&description={{description}}'
                },
                facebook: {
                    url: 'https://www.facebook.com/sharer/sharer.php?s=100&p[title]={{title}}&p[summary]={{description}}&p[url]={{url}}&p[images][0]={{media}}'
                },
                twitter: {
                    url: 'https://twitter.com/share?url={{url}}&via={{via}}&text={{description}}'
                },
                googleplus: {
                    url: 'https://plus.google.com/share?url={{url}}'
                },
                linkedin: {
                    url: 'https://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}&summary={{description}}+&source={{via}}'
                }
            },

            _openPopup = function (site, url) {
                // center window
                var left = (window.innerWidth/2),
                    top = (window.innerHeight/2);

                return window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=500, height=600, top=' + top + ', left=' + left);
            },


            _generateLink = function (site, link) {
                // replace template url
                var url = site.url.replace(/{{url}}/g, encodeURIComponent(link.url))
                                  .replace(/{{title}}/g, encodeURIComponent(link.title))
                                  .replace(/{{description}}/g, encodeURIComponent(link.description))
                                  .replace(/{{media}}/g, encodeURIComponent(link.media))
                                  .replace(/{{via}}/g, encodeURIComponent(link.via));

                return url;
            };

        return this.each(function() {

            // declare $(this) as variable
            var $this = $(this);
			// link type
            var type = $this.data('type');
	var text='',buttonclass='';


if(type=='facebook')
{
text=settings.facebookText;
buttonclass='facebook';
}
else if(type=='pinterest')
{
text=settings.pinterestText;
buttonclass='pinterest';
}
else if(type=='twitter')
{
text=settings.twitterText;
buttonclass='twitter';
}
else if(type=='googleplus')
{
text=settings.googleplusText;
buttonclass='googleplus';
}
else if(type=='linkedin')
{
text=settings.linkedinText;
buttonclass='linkedin';
}



if(settings.displayText==true)
	$this.append('<span>'+text+'</span>');
if(settings.buttonStyle==true)
	$this.addClass(buttonclass);
if(settings.displayIcon==false)
$this.attr('class',
           function(i, c){
              return c.replace(/(^|\s)fa-\S+/g, '');
           });	
			
            

                // set site
               var site = _socialSites[type] || null;

            // check if social site is selected
            if (!site) {
                $.error('Social site is not set.');
            }

            // gather link info
            var link = {
                url: $this.data('url') || '',
                title: $this.data('title') || '',
                description: $this.data('description') || '',
                media: $this.data('media') || '',
                via: $this.data('via') || ''
            };

            // prepare link
            var url = _generateLink(site, link);
			$this.bind('click', function (e) {
                    e.preventDefault();

                    // call popup window
                    _openPopup(site, url);
            });
            
        });
    };

})(jQuery);