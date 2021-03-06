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

	// If current user is normal user, return bot created by him and assign to him
	return List.find({$or: [
		{createdBy: currentUserId},
		{toUser: currentUserId}
	]});

});

Meteor.publish('users', function(){
	return Meteor.users.find({}, {fields: {'emails.address': 1}});
});


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
		    done: task.done,
		    createrEmail: task.createrEmail
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
		IcreatedFilter = false;
            List.update(currentListID, {$set: updateDoneStatus}, function(error) {
                if(error) {
                    throw error; 
                }
            });
	},

	'deleteProject': function(selectedId){
		IcreatedFilter = true;
		List.remove(selectedId);		
	},

	'isAdmin': function(id){
		if(id === adminId){
			return true;
		} else{
			return false;
		}
	}

});

