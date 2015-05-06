Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'list'});

Router.plugin('dataNotFound', {
 	notFoundTemplate: 'notFound',
});

Router.route('/task/:_id', {
    name: 'task',
    data: function() { return List.findOne (this.params._id); }
});

Router.route('/task/:_id/edit', {
    name: 'listEdit',
    data: function() { return List.findOne (this.params._id); }
});