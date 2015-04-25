Template.listEdit.events({
    // 4/20/15 Ming: remove cancel-edit-list function. use iron-router replace it.
    
    'click .save-list':function(evt, tmpl){

        var currentListID = this._id;
        var updatedList = formHelpers.getTaskData(); 

        
        List.update(currentListID, {$set: updatedList}, function(error) {
            if(error) {
                console.log('Error');  
            }
            else {
                Router.go('task', {_id: currentListID});   
            }
        });
    }
});


Template.listEdit.helpers({
    task: function() {
        return List.find({postId:this._id});
    }
});