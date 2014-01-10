/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone', 'bootstrap', 'views/mainView'
], function (Backbone, bootstrap, MainviewView) {
    Backbone.history.start();
    var mainViewEl = $('#mainView');
    var mainView   = new MainviewView();
    mainViewEl.html(mainView.render().el);
    mainView.loadTasks();
    mainView.listCompleted();

});
