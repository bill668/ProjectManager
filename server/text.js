// Server now can sense who's loging in,
// and sent the list create by that user to clint

Meteor.publish('homeWorkList', function(){
	var currentUserId = this.userId;
	return List.find({ createdBy: currentUserId});
})


/*Meteor.methods({
	//recive data from clint
	'inserUserData': function(){
		var currentUserId = this.userId;
		List.insert({
			createdBy: currentUserId,
		    url: 'aaa',
		    title: 'aaaa',
		    description: 'bbbbbbbbbbbb',
		    date: '1111',
		    done: 'incomplete'
		})

	}

});*/