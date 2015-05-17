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

    'click #createdByUser':function(){
        Session.set('filterByCreated', true);
    },

    'click #backAllProject':function(){
        Session.set('filterByCreated', false);
    }

});

Template.list.helpers({

    list: function() {
        var currentUserId = Meteor.userId();
        var isAdmin;

        // checking if current user is admin
        Meteor.call('isAdmin', currentUserId, function(error, result){
            Session.set('isAdmin',result);
        });
        isAdmin = Session.get('isAdmin');

        // if user selected I created button, return project created by current user
        if (Session.get('filterByCreated')) {
            return List.find({createdBy: Meteor.userId()});
        } else {
            // if user is admin, return all project
            if(isAdmin){
                return List.find();
            } else{
                // if user is not admin nor selected I created button, return project which assign to him
            return List.find({toUser: Meteor.userId()}) };
        }
    },
    users: function() {
        return Meteor.users.find().fetch();
    }
});

Template.listItem.helpers({
    briefDescription: function() {
        if (this.description.length > 30) {
            return this.description.substring(0, 30) + '...';
        } else {
            return this.description;
        }
    }
});
