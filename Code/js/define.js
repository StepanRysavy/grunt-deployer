(function (window) {
    'use strict';

    window = window || {};
    window.vccp = window.vccp || function () {
        return {
            app: {},
            data: {
                cache: 1 * new Date()
            },
            myFT: window.myFT || new FT
        }
    }();

    console.log(window.vccp);

})(window);