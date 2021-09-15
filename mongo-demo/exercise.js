const mongoose = require("mongoose");

//mongoose.connect returns a promise. Forget that the .then method requires a callback as
//its first argument
mongoose
  .connect("mongodb://localhost:27017/mongo-exercises")
  .then(() => console.log(`connected to mongoDB`))
  .catch((error) => console.log(error));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Courses = mongoose.model("courses", courseSchema);
async function getCourses() {
  //Ran into a problem where the Courses.find() method wasn't returning the documents filtered
  //this is because I didn't await the promise, as a result I was getting the query search conditions as the value
  const documents = await Courses.find({ isPublished: true });
  console.log(documents);
}

getCourses();
