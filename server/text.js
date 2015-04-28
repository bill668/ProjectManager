// Server now can sense who's loging in,
// and sent the list create by that user to clint

/* create admin account*/
var adminEmail = 'admin@admin.com',
	adminUser = Meteor.users.findOne({'emails.address': adminEmail}),
	adminId;


if (! adminUser ) {
	adminId = Accounts.createUser({
		email: adminEmail,
		password: 'admin'
	});	
} else {
	adminId = adminUser._id;
}


Meteor.publish('homeWorkList', function(){
	var currentUserId = this.userId;
	// If current User is Admin, return all list to client
	if(currentUserId === adminId){
		return List.find();
	}
	else {
		// if current User is not Admin, then only return project which current user created 
		return List.find({ toUser: currentUserId});
	}

	return List.find({ toUser: currentUserId});
})


Meteor.methods({
	//recive data from clint, insert the data to List dataPool
	'inserUserData': function(task){
		List.insert({
			createdBy: task.createdBy,
			toUser: task.toUser,
		    url: task.url,
		    title: task.title,
		    description: task.description,
		    date: task.date,
		    done: task.done
		})
	},

	'updateProject': function(currentListID, task){

        List.update(currentListID, {$set: task}, function(error) {
            if(error) {
                throw error;
            }
        });		
	},

	'updateDone': function(currentListID, updateDoneStatus){
            List.update(currentListID, {$set: updateDoneStatus}, function(error) {
                if(error) {
                    throw error; 
                }
            });

	},

	'deleteProject': function(selectedId){
		List.remove(selectedId);		
	}

});