(function (window) {
    'use strict';

    window = window || {};

    function VCCP () {
    	return {
    		app: {},
    		data: {
    			cache: 1 * new Date()
    		},
    		myFT: window.myFT || new FT()
    	}
    }

    var vccp = window.vccp = new VCCP();

})(window);