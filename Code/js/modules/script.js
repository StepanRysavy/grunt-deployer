/**
 * @author Arlan Viray, arlan.viray@creativewiz.net
 * @modified: Gustavo Rodrigues
 * @email: gugateider@gmail.com | grodrigues@vccp.com
 */

'use strict';

var Advert = {
	width: null,
	height: null,
	animationArr: [],
	debugMode: 0,
	duration: 0.2,
	timeline: new TimelineLite({
		delay: 0,
		onComplete: function(){}
	}),
	clickId: 0,
	ft: undefined,

	/**
		Initializes the banner
		@param width  -> Banner width
		@param height -> Banner height
		@param ft     -> Flash Talking Component
		@param animationArr -> Animation array of objects that needs to be animated
		@param duration -> Duration of each tween
		@param debugMode -> In case you wish to see a certain static frame
	**/
	init: function(width, height, ft, animationArr, duration, debugMode){
		this.width = width;
		this.height = height;
		this.ft = ft;
		this.animationArr = animationArr;
		this.debugMode = debugMode;
		this.duration = duration;

		this.setInstantAds();

		TweenLite.set($('#container'), {display: 'block'});
		TweenLite.set($('#container, .section, .clickTag'), {width: this.width, height: this.height});
		this.setAnim();
		//this.initVideo();
		this.setCarousel();

	},

	/**
	  Function responsible to set instantAds on the html elements
	  @param none
	**/ 
	setInstantAds: function() { 

		this.ft.addEventListener("instantads", function(){
			
			$(".section2 h2").html( myFT.instantAds.section2Text );
			$(".section3 h2").html( myFT.instantAds.endFrameText );		
			$("#sectionBtn").html( myFT.instantAds.ctaText );		
		}); 


	},


	/**
		Start playing video
		@param none
	**/
	initVideo: function() {

		$("video").get(0).play();

	},

	setCarouselClickTag: function() {
		this.clickId++;
	},

	/**
		Creates Carousel
		@param none
	**/
	setCarousel: function() {

		var _this = this;
		var countData = 0,
			listCounter = 0;

		// count number of carousel text which aren't specified either on manifest.js
		// or within FlashTalking server
		$.each($('#carousel .c_text li'), function(i, obj){
			if($(obj).text() !== ''){
				countData++;
			} else {
				// remove empty text list, include image list
				$(obj).remove();
				$('#carousel .c_image li').eq(i).remove();
			}
		});

		var $carousel = $('#carousel .c_image ul');
		if(countData < 2) {

			// hide arrows, base on number of carousel text
			$('.c_arrows').hide();
			$carousel.css({ 'margin-top': 0 });

		} else {

			// set carousel
			$carousel.roundabout({
				debug: false,
				clickToFocus: false,
				enableDrag: true,
				minScale: 0.2,
				minOpacity: 0,
				duration: 500,
				btnPrev: '.c_arrows.left',
				btnNext: '.c_arrows.right'
			});
			$carousel.on('ready', function(){
				// position image vertically during animation
				_this.setImgMiddle();
			});
			$carousel.on('animationEnd', function(){
				// set click ID for clickTag base on the focus child
				_this.clickId = $carousel.roundabout("getChildInFocus") + 1;
				// hide all the carousel text
				$('.c_text li').hide();
				// show specific carousel text base from the focus child
				$('.c_text li').eq(_this.clickId-1).show();

				// track event
				_this.ft.tracker('carousel-select', _this.clickId );
			});

			$carousel.hide();
			// set delay for image position
			setTimeout(function(){
				$carousel.show();
				_this.setImgMiddle();
			}, 100);

		}

	},

	/**
		Pause the animation
		@param none
	**/
	pause: function() {
		this.timeline.pause();
	},

	/**
		Resume playing the banner
		@param none
	**/
	play: function() {
		this.timeline.play();
	},

	/**
		Jump to a specific second of the timeline
		@param sec -> The second to jump to
	**/
	seek: function( sec  ) {
		this.timeline.seek( sec );
	},

	/**
		Jump to a specific second of the timeline
		@param sec -> The second to jump to
	**/
	seekPause: function( sec  ) {
		this.seek( sec );
		this.pause();
	},

	/**
		Fades out playing video
		@param none
	**/
	hideVideo: function() {
		TweenLite.to( $("video") , 1, { autoAlpha: 0 });
		// $("video").get(0).pause();
	},

	/**
		This function is responsible to animate your items
		@param none
	**/
	setAnim: function(){

		var _this = this;

		// set animations as array object
		var anims = _this.animationArr;

		// test specific section for styling purpose
		// has to be greater than 0. Animation will be disable
		var testSection = _this.debugMode;
		if(testSection > 0){
			TweenLite.set($('.section').eq(testSection - 1), {display: 'block'});
		} else {
			TweenLite.set($('.section'), {display: 'block'});
		}

		/**
			Loop through the animation objects and add them to timeline
			@param anims -> Animation array
			@param index -> Index count of array
			@param animObjs -> Obj within anims
		**/
		$.each(anims, function(index, animObjs){
			if(testSection > 0){
				if(index + 1 !== testSection){
					return;
				}

			} else {

				$.each(animObjs, function(i, obj){
					var elem = $('.section'+ (index + 1));
					var duration = _this.duration;
					var objects = obj.object;
					var overlap = '-=0';
					if(obj.child){
						elem = elem.find(obj.child);
					}
					if(obj.exdur){
						duration += obj.exdur;
					}
					if(obj.overlap){
						overlap = obj.overlap;
					}

					// set timeline
					if(obj.type === 'from'){
						_this.timeline.from(elem, duration, objects, overlap);
					} else {
						_this.timeline.to(elem, duration, objects, overlap);
					}

				});
			}
		});

		this.setClickTag();
		this.setElements();
	},

	/**
		Set image carousel
		@param none
	**/
	setImgMiddle: function(){
		// position image vertically
		$.each($('#carousel .c_image li'), function(i, obj){
			if($('#carousel .c_text li').eq(i).text() !== ''){
				$(obj).find('img').css({
					'position': 'absolute',
					'top': '50%',
					'margin-top': -($(obj).find('img').height() / 2)
				});
			}
		});
	},

	/**
		Set Flash Talking clickTag
		@param id -> ID of clickTag
	**/
	setClickTag: function(id){
		var _this = this;
		$('.clickTag').click(function(){
			_this.ft.clickTag(_this.clickId + 1);
		});
	},

	setElements: function(){
		var _this = this;

	},

	setEnd: function(){
		console.log('end');
	},

	restartAnim: function(){
		console.log('restart');
	}

};

