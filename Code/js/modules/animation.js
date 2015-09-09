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
	// Frame $
	[
		// animates anything with .section.section$ 
		{
			type: 'from',
			// use child: 'element query' to animate only section$ child elements
			object: {},
			overlap: 0,
			exdur: 0
		}, 
		{
			type: 'to',
			object: {},
			overlap: 0,
			exdur: 0
		}
	]
];

//	animationArr = new Array();
