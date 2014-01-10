/*global define*/

define([
    'underscore',
    'backbone',
    'models/task'
], function (_, Backbone, TaskModel) {
    'use strict';

    var TaskCollection = Backbone.Collection.extend({
        model: TaskModel,

        getCompleted: function() {
        	return this.where({complete:true});
        },
        getSelected: function() {
        	return this.where({selected:true});
        }
    });

    return TaskCollection;
});
