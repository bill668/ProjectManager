// note that I don't put "var" in front of the variable
// refer to http://docs.meteor.com/#/full/namespacing for why
// 4/20/15 Ming: This is a Package Scope. This formHelpers variable is visible to every file inside
// of this app. 

// Now clint can get the information form server
Meteor.subscribe('homeWorkList');


formHelpers = {
	getTaskData: function() {
		var name = $('#name').val();                // name input box value
		var description = $('#description').val();    // description input box value
		var date = $('#datepicker').val();          // date input box value
		
		// let our list element has a varible:current user
		// so we can filt list basd on user
		var currentUserId = Meteor.userId();
		
		// send back a premade object
		return {
			createdBy: currentUserId,
		    url: name,
		    title: name,
		    description: description,
		    date: date,
		    done: 'incomplete'
		};
	}
}; 