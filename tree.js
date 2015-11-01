(function(Fry) {

    'use strict';

    var Node = Fry.Node;
    var Base = Fry.Base;
    var Class = Fry.Class;

    var createTree = function(tree) {

        var node = new Node(tree);

        for (var child in tree.children) {
            if (tree.children.hasOwnProperty(child)) {
                node.addChild(createTree(tree.children[child]));
            }
        }

        return node;
    };

    function Tree() {

        this.root = null;

        Tree.superclass.constructor.apply(this, arguments);
    }

    Tree.prototype = Class.assign(Class.create(Base), {

        constructor: Tree,

        init: function(config) {

            this.root = createTree(config);
        },

        isEmpty: function() {

            return (this.root === null) ? true : false;
        },

        exists: function(key) {

            return this.find(this.root, key);
        },

        getNumberOfNodes: function() {

            return this.getNumberOfDescendants(this.root) + 1;
        },

        getNumberOfDescendants: function(node) {

            var children = node.getChildren();
            var number = children.length;

            for (var child in children) {
                number += this.getNumberOfDescendants(children[child]);
            }

            return number;
        },

        find: function(node, keyNode) {

            var result = false;

            if (node.getData() === keyNode) {
                return true;
            } else {

                var children = node.getChildren();

                for (var child in children) {
                    if (this.find(children[child], keyNode)) {
                        result = true;
                    }
                }
            }

            return result;
        },

        findNode: function(node, keyNode) {

            if (!node) {
                return null;
            }

            if (node.getData() === keyNode) {
                return node;
            } else {

                var childnode = null;
                var children = node.getChildren();

                for (var child in children) {
                    if ((childnode = this.findNode(children[child], keyNode)) !== null) {
                        return childnode;
                    }
                }
            }

            return null;
        },

        getPreOrderTraversal: function() {

            var preOrder = [];

            this.buildPreOrder(this.root, preOrder);
            return preOrder;
        },

        getPostOrderTraversal: function() {

            var postOrder = [];

            this.buildPostOrder(this.root, postOrder);
            return postOrder;
        },

        buildPreOrder: function(node, preOrder) {

            var children = node.getChildren();

            preOrder.push(node);

            for (var child in children) {
                this.buildPreOrder(children[child], preOrder);
            }
        },

        buildPostOrder: function(node, postOrder) {

            var children = node.getChildren();

            for (var child in children) {
                this.buildPostOrder(children[child], postOrder);
            }

            postOrder.push(node);
        },

        getLongestPathFromRootToAnyLeaf: function() {

            var max = 0;
            var longestPath = null;
            var paths = this.getPathsFromRootToAnyLeaf();

            for (var path in paths) {
                var length = paths[path].length;
                if (length > max) {
                    max = length;
                    longestPath = path;
                }
            }

            return longestPath;
        },

        getMaxDepth: function() {

            return this.getLongestPathFromRootToAnyLeaf();
        },

        getPathsFromRootToAnyLeaf: function() {

            var paths = [];
            var currentPath = [];

            this.getPath(this.root, currentPath, paths);

            return paths;
        },

        getPath: function(node, currentPath, paths) {

            if (!currentPath) {
                return;
            }

            var children = node.getChildren();

            currentPath.push(node);

            if (children.length === 0) {
                paths.push(this.clone(currentPath));
            }

            for (var child in children) {
                this.getPath(children[child], currentPath, paths);
            }

            var index = currentPath.indexOf(node);

            for (var i = index; i < currentPath.length; i++) {
                currentPath.splice(index, 0);
            }
        },

        clone: function(list) {

            return list.slice(0);
        }

    });

    Fry.Tree = Tree;

})(Fury);