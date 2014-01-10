/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CreatetaskView = Backbone.View.extend({
        template: JST['app/scripts/templates/createTask.ejs'],
        
        initialize: function() {
        	// this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        // Updates model with input values and returns
        getValues: function() {
        	var title = (this.$el.find('#taskName').val() !== '' ? this.$el.find('#taskName').val() : this.model.attributes.title);
        	var duedate = (this.$el.find('#dueDate').val() !== '' ? this.$el.find('#dueDate').val() : this.model.attributes.duedate);
        	var author = (this.$el.find('#authorName').val() !== '' ? this.$el.find('#authorName').val() : this.model.attributes.author);
        	this.model.set({
				'title'   : title,
				'duedate' : duedate,
				'author'  : author
        	});

        	return this.model;
        }
    });

    return CreatetaskView;
});
