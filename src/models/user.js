const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

// Virtual property for full name
userSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (name) {
    let str = name.split(' ');
    this.firstName = str[0];
    this.lastName = str[1];
  });

let UserModel = mongoose.model('User', userSchema);

// Create a new user instance
let model = new UserModel();
model.fullName = 'Thomas Anderson';

console.log(model.toJSON()); // Output model fields as JSON
console.log(model.fullName); // Output the full name
