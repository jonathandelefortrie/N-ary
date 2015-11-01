(function(Fry) {

    'use strict';

    function Base() {

        if (typeof this.init === "function") {
            this.init.apply(this, arguments);
        }
    }

    Base.prototype = {

        constructor: Base

    };

    Fry.Base = Base;

})(Fury);
