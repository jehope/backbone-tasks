/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',   
    'templates',
    'collections/task',
    'models/task',
    'views/task',
    'views/nextTask',
    'views/createTask'
], function ($, _, Backbone, JST, TaskCollection, TaskModel, TaskView, NexttaskView, CreatetaskView) {
    'use strict';

    var MainviewView = Backbone.View.extend({
        template: JST['app/scripts/templates/mainView.ejs'],

        events: {
            'click'              : 'clearSelected',
            'click .task-create' : 'createTask',
            'click .task-save'   : 'saveTask',
            'click .task-delete' : 'deleteTask',
            'click .task-clear'  : 'clearList',
            'click .reset-demo'  : 'resetDemo'
        },

        initialize: function() {
            // preloaded tasks
            this.tasklist = new TaskCollection(this.loadTaskData());
   
            this.currentTask;
        	// Listen for the change event on the collection.
            // This is equivalent to listening on every one of the 
            // task objects in the collection.
            this.listenTo(this.tasklist, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template());
            this.loadTasks();
            this.listCompleted();
            this.saveToLocal();
            return this;
        },

        /************
         *  Views  *
         ************/

        // Display all tasks in task list
        loadTasks: function() {
		    var list = $('#task-list');
            var foundSelected = false;

		    // The main view of the application
		    this.tasklist.each(function(task,index){
                if (!task.attributes.complete) {
		          var view = new TaskView({ model: task });
		          list.append(view.render().el);
                }
		    }, this);   // "this" is the context in the callback

            // Preview initial task in jumbotron
            var nextTask = this.tasklist.find(function(task) {
                return task.attributes.selected;
            });
            if(nextTask) {
                this.listNextTask(nextTask);
            }
            else {
                nextTask = this.tasklist.find(function(task) {
                    return !task.attributes.complete;
                });
                if(nextTask)
                this.listNextTask(nextTask);
            }
        },

        // Display selected task in jumbotron at top
        listNextTask: function(model) {
            this.currentTask = model;
            var nextTaskList = $('#next-task');
            var nextTaskView = new NexttaskView({ model : model });
            nextTaskList.html(nextTaskView.render().el);
        },

        // Display completed tasks
        listCompleted: function() {
            var listComplete = $('#completed-tasks');
            this.tasklist.each(function(task,index){
                if (task.attributes.complete) {
                    var view = new TaskView({ model: task });
                    listComplete.append(view.render().el);
                }
            }, this);
        },
                
        /************
         *  Events  *
         ************/

        // Renders view for creating a new task
        createTask: function() {
            var nextTaskList = $('#next-task');
            this.newTaskView = new CreatetaskView({ model: new TaskModel() });
            nextTaskList.html(this.newTaskView.render().el);
        },
        // Adds task to collection
        saveTask: function() {
            var newTaskModel = this.newTaskView.getValues();
            this.listNextTask(newTaskModel);
            this.tasklist.add(newTaskModel);
            this.render();        
        },
        // Deletes task from collection
        deleteTask: function() {
            this.tasklist.remove(this.currentTask);
            this.render();
        },
        // Deletes alls tasks in collection
        clearList: function() {
            this.tasklist.reset();
            this.render();
        },
        // Sets all tasks selected property to false in collection
        clearSelected: function() {
            this.tasklist.each(function(task,index){
                task.attributes.selected = false;
            }, this);
        },
        // Reloads collection with test data
        resetDemo: function() {
            this.tasklist.reset(this.loadTestData());
            this.render();
        },

        /***************
         *  Utilities  *
         ***************/

        // Saves tasks to localStorage if supported
        saveToLocal: function() {
            if(typeof(Storage)!=="undefined") {
                // Put the object into storage
                localStorage.setItem('taskObject', JSON.stringify(this.tasklist));
            }
            else {
              console.log('Sorry! No web storage support.. ')
            }
        },

        // Loads from localStorage if exhists, else loads test data
        loadTaskData: function() {
            var data;
            if(typeof(Storage)!=="undefined") {
                // Yes! localStorage and sessionStorage support!
                if(localStorage.getItem('taskObject')) {
                    var myData = JSON.parse(localStorage.getItem('taskObject'));
                    data = myData;
                }
                else {
                    // Data hasn't been saved to local yet.
                    data = this.loadTestData();
                }        
            }
            else {
              // Sorry! No web storage support..         
              data = this.loadTestData();
            }
            return data;
        },

        // Returns TaskModel array with test data
        loadTestData: function() {
            var jsonData = [ 
                {title: 'Save to LocalStorage', author: 'Me', duedate: 'tomorrow'},
                {title: 'Contact pops up as modal', author: 'Me', duedate: 'thursday'},
                {title: 'Click the task title will popup description', author: 'Me', duedate: 'saturday'},
                {title: 'Load task from json', author: 'You', duedate: 'saturday'},
                {title: 'Find my shoes', author: 'Me', duedate: 'now', complete: true}
            ];
            return jsonData;
        }

    });

    return MainviewView;
});
