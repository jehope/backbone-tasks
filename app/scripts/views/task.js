/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var TaskView = Backbone.View.extend({
        template: JST['app/scripts/templates/task.ejs'],
        tagName: 'tr',

        events: {
            'click'            : 'expandTask',
            'click .glyphicon' : 'toggleTask'
        },
        
        initialize: function() {
        	this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        // Displays task in jumbotron
        expandTask: function() {
        	this.model.select();
        },
        // Marks as completed or not
        toggleTask: function() {
        	this.model.toggle();
        }
    });

    return TaskView;
});
