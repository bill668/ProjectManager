Template.list.events({
    'click .create-list':function(evt, tmpl){
        var warningBox = $('.alert-danger');
        var successBox = $('.alert-success');
        
        var task = formHelpers.getTaskData();
        task.done = 'incomplete';

        // store creater's information
        task.createdBy = Meteor.userId();
        var currentUserEmail = formHelpers.getCurrentEmail(Meteor.userId());
        task.createrEmail = currentUserEmail;

        // make sure user unless enter project name
        if (task.title === '' || task.description === '' || task.date === ''){
            warningBox.removeClass('hidden');
            if(!successBox.hasClass('hidden')) {
                successBox.addClass('hidden');   
            }
        }
        
        else {
            
            Meteor.call('inserUserData', task);
            successBox.removeClass('hidden');
            if(!warningBox.hasClass('hidden')) {
                warningBox.addClass('hidden');   
            }
            // clear inputs
            $('#name').val('');
            $('#datepicker').val('');
            $('#description').val('');
        }
    },

    /*'click #createdByUser':function(){
        Template.list.Icreated = true;
    },
    'click #backAllProject': function(){
        Template.list.Icreated = false;
    }*/
});

Template.list.helpers({

    list: function() {
        return List.find();
    },
    users: function() {
        return Meteor.users.find().fetch();
    },
    IcreatedList: function(){
        var currentUserId = Meteor.userId();
        return List.find({createdBy: currentUserId})
    }
});

