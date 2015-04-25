Template.list.events({
    'click .create-list':function(evt, tmpl){
        var warningBox = $('.alert-danger');
        var successBox = $('.alert-success');
        
        //remove old task and use task library
        var task = formHelpers.getTaskData();

        // make sure user unless enter project name
        if (task.name === '' || task.description === '' || task.date === ''){
            warningBox.removeClass('hidden');
            if(!successBox.hasClass('hidden')) {
                successBox.addClass('hidden');   
            }
        }
        
        else {

            List.insert(task);
            successBox.removeClass('hidden');
            if(!warningBox.hasClass('hidden')) {
                warningBox.addClass('hidden');   
            }
            // clear inputs
            $('#name').val('');
            $('#datepicker').val('');
            $('#description').val('');
        }
    }
});

Template.list.helpers({
    list: function() {
        var currentUserId = Meteor.userId();
        return List.find();
    }
});