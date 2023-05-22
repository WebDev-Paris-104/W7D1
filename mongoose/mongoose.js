const mongoose = require("mongoose");

// const {Schema, model} = mongoose

// PET SCHEMA
const petSchema = new mongoose.Schema({
	name: {
		type: String,
		maxLength: 10,
		minLength: 3,
	},
	owner: {
		ref: "User",
		type: mongoose.Schema.Types.ObjectId,
	},
});
// Creating the Pet model which will be used to access our collection in the database.
const Pet = mongoose.model("Pet", petSchema);

// Array of pets to create :)
const pets = [
	{
		name: "Bass",
	},
	{
		name: "Toinette",
	},
];

// USER SCHEMA
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			min: 0,
		},
		activities: [String],
		favoriteColor: {
			type: String,
			enum: ["yellow", "green", "blue"],
		},
	},
	// We can give a second object to the Schema to have some automatic timestamps.
	{
		timestamps: true,
	}
);

// Creating the User model
const User = mongoose.model("User", userSchema);

const users = [
	{
		name: "Bob",
		age: 20,
		favoriteColor: "yellow",
	},
	{
		name: "Alice",
		age: 27,
		favoriteColor: "yellow",
	},
	{
		name: "John",
		age: 31,
		favoriteColor: "yellow",
		activities: ["Biking", "Rock climbing"],
	},
];

// Connect to the database, and then create some data while we are connected!
mongoose
	.connect("mongodb://localhost:27017/my-first-database")
	.then(async (db) => {
		console.log(`Connected to ${db.connection.name}`);
		/**
		 * then catch syntax is not fun, but here it is :)
		 */
		// User.create({
		// 	name: "Bob",
		// 	age: -5,
		// 	favoriteColor: "yellow",
		// })
		// 	.then((createdDocument) => {
		// 		console.log(createdDocument);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error.message);
		// 	});

		try {
			// Deleting users and pets so that we don't create new documents every time we launch
			await User.deleteMany();
			await Pet.deleteMany();
			const createdUsers = await User.create(users);
			console.log(createdUsers);

			for (const oneUser of createdUsers) {
				console.log(`Created ${oneUser.name} with id: ${oneUser._id}`);
			}

			// const aliceDocument = await User.findOne({ name: "Alice" });
			// findOne, using the name key
			const aliceDocument = await User.findOneAndUpdate(
				{ name: "Alice" },
				{ activities: ["Jet-Ski", "Snowboarding"] },
				{ new: true }
			);
			console.log("Alice document: ", aliceDocument);

			// findById allow me to search in my database using the id of a document.
			const newerAlice = await User.findByIdAndUpdate(
				aliceDocument._id,
				{
					$pull: { activities: "Jet-Ski" },
					// $push: { activities: "football" },
				},
				// this third argument makes sure that Mongoose returns us the updated document and not the
				// non updated one :)
				{ new: true }
			);

			console.log("Newer alice: ", newerAlice);

			// find returns us an Array, even if we don't match anything.
			const usersOlderThan25 = await User.find({ age: { $gte: 25 } });
			console.log(usersOlderThan25);

			// await User.findOneAndDelete({ name: "John" });

			// Find all the users
			const allUsers = await User.find();
			// loop over the array of pets
			for (const onePet of pets) {
				// Get a random user
				const randomUser =
					allUsers[Math.floor(Math.random() * allUsers.length)];

				// Create the pet and set the random user as it's owner.
				const createdPet = await Pet.create({
					name: onePet.name,
					owner: randomUser._id,
				});
				console.log(createdPet);
			}

			const toitoine = await Pet.findOne(
				// We can find usinf regular expression
				{
					name: new RegExp("toinet", "i"),
				},
				// all of the find methods can take a second argument which is going to be the projection
				// projection is also called select by mongoose.
				{ _id: 0, name: 1 }
			)
				// .select({ name: 1, _id: 0 })
				.populate("owner", { _id: 0, name: 1 });

			console.log("Toitoine is here: ", toitoine);
		} catch (error) {
			console.log(error.message);
		}
	})
	.catch((error) => console.log(error.message))
	// Finally is going to run wether there is an error or not.
	.finally(() => {
		mongoose.disconnect();
	});
