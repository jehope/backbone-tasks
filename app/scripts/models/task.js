/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TaskModel = Backbone.Model.extend({
        defaults: {
        	title: 'New task',
        	author: 'Author',
        	duedate: 'Due date',
        	complete: false,
        	selected: false
        },
        toggle: function() {
        	this.set('complete', !this.get('complete'));
        },
        select: function() {
        	this.set('selected', true);
        }
    });

    return TaskModel;
});
