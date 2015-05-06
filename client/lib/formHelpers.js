// note that I don't put "var" in front of the variable
// refer to http://docs.meteor.com/#/full/namespacing for why
// 4/20/15 Ming: This is a Package Scope. This formHelpers variable is visible to every file inside
// of this app. 

// Now clint can get the information form server
Meteor.subscribe('homeWorkList');
Meteor.subscribe('users');



formHelpers = {
	getTaskData: function() {
		var name = $('#name').val();                // name input box value
		var description = $('#description').val();    // description input box value
		var date = $('#datepicker').val();          // date input box value

		var toUserInput = $('#to-User').val();	// let client selent the project is create for whom
		
		var task = {
			toUser: toUserInput, 
		    url: name,
		    title: name,
		    description: description,
		    date: date,
		};
		
		return task;
	},

	// let Meteor will find a object relate to userId, then return the email to us
	getCurrentEmail: function(userId){
		return Meteor.users.find(userId).fetch()[0].emails[0].address;
	}
}; 