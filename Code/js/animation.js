/**
 * @author: Gustavo Rodrigues
 * @email: gugateider@gmail.com | grodrigues@vccp.com
 * Edit the array 'animationArr' below accordingly to the creative
 * animation you wish to achieve
 * Each item of the array corresponds to each frame.
 * If you have an object within this item called 'child',
 * javascript will animate that child, otherwise will animate the
 * entire "section"
 */

var transitionDelay = 2;
var tweenDuration = 0.5;
var animationArr  = [

			// Frame 1
			[
				{
					type: 'from',
					child: '.skipButton',
					object: { x: 600, onComplete: function() {
						// Advert.pause();
					}, ease: Quad.easeOut},
					overlap: '-='+ tweenDuration ,
                    exdur: 0.6
				},

				{
					type: 'to',
					child: '.cursor',
					object: { bezier:[{x:150, y: -50}, {x:100, y:-120}, {x: 40, y:-150}], onComplete: function() {
						// Advert.pause();
                        TweenMax.delayedCall(0.4, function() {

                          $(".cursor").css("backgroundPosition" , "-26px 0");

                        });

                        TweenMax.delayedCall(0.6, function() {

                            $(".cursor").css("opacity" , "0");


                        });

					}, ease: Power1.easeInOut},
					exdur: 1,
					overlap: '+='+ tweenDuration
				},

				{
					type: 'to',
					child: '.cursor',
					object: { bezier:[{x:"+=2", y:"+=2"}, {x:"-=2", y:"-=2"}], onStart: function() {


						// Advert.pause();
					}, onComplete: function() {
						

						$(".skipButton").hide();


					},


					ease: Power1.easeInOut},
					exdur: .2
				}
			],

			// Frame 2
			[

				{
					type: 'from',
					child: 'h2',
					object: { scale: 0 , opacity: 0, onComplete: function() {
						// Advert.pause();
					}, ease: Power1.easeInOut },
					overlap: "-=.2"
				},

				{
					type: 'to',
					object: { delay: 1, opacity: 0 },
					overlap: '+=' + transitionDelay
				}
			],

			// ( End Frame )
			[
				{
					type: 'from',
					object: { opacity: 0, onStart: function() { Advert.setCarouselClickTag(); }  },
					overlap: '-='+ tweenDuration
				}
			]
		];

//	animationArr = new Array();
