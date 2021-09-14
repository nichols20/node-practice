const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error(`could not connect to mongodb ${error}`));

/* When declaring a Schema in a mongoose class the first argument is an object*/
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  //when this array is stored each object in the array  will be a key value pair ( index of array: string )
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: true,
});

/* The .model method takes two arguments. The first argument is the name of the collection
The second argument is the schema that is correlated to the defined collection. The result
of this method is a class */
const Course = mongoose.model("Course", courseSchema);
const course = new Course({
  name: "Node.js Course",
  author: "Andrice",
  tags: ["node", "backend"],
  isPublished: true,
});
