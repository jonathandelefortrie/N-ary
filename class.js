(function(Fry) {

    'use strict';

    var Class = {
        create: function(obj) {
            var Fn = new Function();
            Fn.prototype = obj.prototype;
            return new Fn();
        },
        assign: function(obj, proto) {
            var superclass = this.create(obj.constructor);
            for (var prop in proto) {
                if (proto.hasOwnProperty(prop)) {
                    if (prop === "constructor") continue;
                    obj[prop] = proto[prop];
                }
            }
            obj.constructor = proto.constructor;
            obj.constructor.superclass = superclass;
            return obj;
        }
    };

    Fry.Class = Class;

})(Fury);