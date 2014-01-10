/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NexttaskView = Backbone.View.extend({
        template: JST['app/scripts/templates/nextTask.ejs'],
        
        // tagName: 'div',

        events: {
        	'click .task-complete' : 'toggleTask'
        },

        initialize: function() {
        	this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        // Marks as complete or not
        toggleTask: function() {
        	this.model.toggle();
        }

    });

    return NexttaskView;
});
