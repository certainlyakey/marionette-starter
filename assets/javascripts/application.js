//based on the book https://leanpub.com/marionette-gentle-introduction
//full app from the book here https://leanpub.com/marionette-gentle-introduction

//INITIALIZING THE APP

	//creating the main object that will contain everything dynamic
	var ContactManager = new Marionette.Application();

	//assigning the place for the app in HTML
	ContactManager.addRegions({
		mainRegion: "#main-region"
	});



//CREATING A BLUEPRINT OF APP (models + views)

	//SINGLE CONTACT: MODEL 
	//creating a model (data) for a single contact of ContactManager
	ContactManager.Contact = Backbone.Model.extend({
		defaults: {
			firstName: "",
			lastName: "",
			phoneNumber: "No phone number!"
		}
	});

	//CONTACTS: MODEL 
	//linking a collection to model
	ContactManager.ContactsCollection = Backbone.Collection.extend({
		model: ContactManager.Contact
	});

	//SINGLE CONTACT: VIEW 
	//setting a template for single contact view
	ContactManager.ContactItemView = Marionette.ItemView.extend({
		tagName: "li",
		template: "#contact-list-item"
	});

	//CONTACTS: VIEW 
	//creating a view for contacts
	ContactManager.ContactsView = Marionette.CollectionView.extend({
		itemView: ContactManager.ContactItemView,
		tagName: "ul"
	});

//PUTTING REAL DATA INTO THE BLUEPRINT

	ContactManager.on("initialize:after", function(){
		//creating a collection of real data based on our created model
		var contacts = new ContactManager.ContactsCollection([
		{
			firstName: "Alice",
			lastName: "Arten",
			phoneNumber: "555-0184"
		}, 
		{
			firstName: "Kot",
			lastName: "Jopkin"
		}
		]);

		//putting the real data in our created view
		var contactsListView = new ContactManager.ContactsView({
			collection: contacts
		});


		ContactManager.mainRegion.show(contactsListView);
	});


ContactManager.start();