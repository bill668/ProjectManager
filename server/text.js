// Server now can sense who's loging in,
// and sent the list create by that user to clint

Meteor.publish('homeWorkList', function(){
	var currentUserId = this.userId;
	return List.find({ createdBy: currentUserId});
})


Meteor.methods({
	//recive data from clint, insert the data to List dataPool
	'inserUserData': function(task){
		List.insert({
			createdBy: task.createdBy,
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
                console.log('Error');  
            }
            else {

            	//Meteor shows error when I try to router back to our list
            	//And I don't know why
                //Router.go('task', {_id: currentListID});   
            }
        });		
	},

	'updateDone': function(currentListID, updateDoneStatus){
            List.update(currentListID, {$set: updateDoneStatus}, function(error) {
                if(error) {
                    console.log('Error');  
                }
                else {
                	console.log('Router.golist');
                    //Router.go('list');   
                }
            });

	},

	'deleteProject': function(selectedId){
		List.remove(selectedId);		
	}

});