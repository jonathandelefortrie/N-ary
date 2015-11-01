(function(Fry) {

    'use strict';

    var Base = Fry.Base;
    var Class = Fry.Class;

    function Node() {

        this.data = null;
        this.parent = null;
        this.children = [];

        Node.superclass.constructor.apply(this, arguments);
    }

    Node.prototype = Class.assign(Class.create(Base), {

        constructor: Node,

        init: function(config) {

            this.data = config.data;
        },

        addChild: function(child) {

            child.setParent(this);
            this.children.push(child);
        },

        addChildAt: function(index, child) {

            child.setParent(this);
            this.children.splice(index, 0, child);
        },

        getChildAt: function(index) {

            return this.children[index];
        },

        removeChildAt: function(index) {

            this.children.splice(index, 1);
        },

        removeThisIfItsAChild: function(childToBeDeleted) {

            var list = this.getChildren();
            var index = list.indexOf(childToBeDeleted);

            if (index !== - 1) {
                this.removeChildAt(index);
            }
        },

        getChildren: function() {

            return this.children;
        },

        setChildren: function(children) {

            for (var child in children) {
                children[child].setParent(this);
            }

            this.children = children;
        },

        removeChildren: function() {

            this.children.length = 0;
        },

        getData: function() {

            return this.data;
        },

        setData: function(data) {

            this.data = data;
        },

        getParent: function() {

            return this.parent;
        },

        setParent: function(parent) {

            this.parent = parent;
        },

        equals: function(obj) {

            if (null === obj) {
                return false;
            }

            if (obj instanceof Node) {
                if (obj.getData() === this.data) {
                    return true;
                }
            }

            return false;
        },

        toString: function() {

            return (this.data !== null) ? this.data.toString() : "";
        }

    });

    Fry.Node = Node;

})(Fury);