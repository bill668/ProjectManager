Template.task.events({
    'click #delete-list':function(evt, tmpl){
        List.remove(this._id);
        Router.go('list');
    },

    'click #back-list':function(evt,tmpl){
    	Router.go('list');
    },
    
    'click #done-list':function(evt,tmpl){
        if($('#done-list').data('complete') === 'incomplete') {
            var updateDoneStatus = {
                done: 'complete'   
            }
            var currentListID = this._id;
            List.update(currentListID, {$set: updateDoneStatus}, function(error) {
                if(error) {
                    console.log('Error');  
                }
                else {
                    Router.go('list');   
                }
            });
        }
        else {
            var updateDoneStatus = {
                done: 'incomplete'   
            }
            var currentListID = this._id;
            List.update(currentListID, {$set: updateDoneStatus}, function(error) {
                if(error) {
                    console.log('Error');  
                }
                else {
                    Router.go('list');   
                }
            });
        }
    }
});

Template.task.helpers({
    task: function() {
        return List.find({postId:this._id});
    }
});

Template.task.rendered = function() {
    if($('#done-list').data('complete') === 'incomplete') {
        $('#done-list').text('Done');
    }
    else {
         $('#done-list').text('Not Done');   
    }
}