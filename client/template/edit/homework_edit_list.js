Template.listEdit.events({
    // 4/20/15 Ming: remove cancel-edit-list function. use iron-router replace it.
    
    'click .save-list':function(evt, tmpl){
        // collect user input data, and the project ID, send them to server
        // let server edit the project
        var currentListID = this._id;
        var task = formHelpers.getTaskData();

        Meteor.call('updateProject', currentListID, task, function(error, result) {
            if (error) {
                // display the error some how to the user
            } else {
                Router.go('task', {_id: currentListID});         
            }
        });
    }


});


Template.listEdit.helpers({
    task: function() {
        return List.find({postId:this._id});
    },
});

