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
  isPublished: Boolean,
});

/* The .model method takes two arguments. The first argument is the name of the collection
 The second argument is the schema that is correlated to the defined collection. The result
 of this method is a class */
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Andrice",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });

  /* The .save method is an asynchronouse function that returns a promise 
    meaning we can await it and get the result later*/
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  //you can pass a filter as the first argument of the .find method to only return
  //whatever objects meet the filter requirements
  //.find({ price: { $gte: 10, $lte: 20 } })
  //.find({ author: "Andrice", isPublished: true })
  const courses = await Course.find({ price: { $in: [10, 15, 20] } })
    .limit(10)
    .sort({ name: "asc" })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
