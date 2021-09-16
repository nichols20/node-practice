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
  const pageNumber = 2;
  const pageSize = 10;
  //you can pass a filter as the first argument of the .find method to only return
  //whatever objects meet the filter requirements
  //.find({ price: { $gte: 10, $lte: 20 } })
  //.find({ price: { $in: [10, 15, 20] } })
  //.find({ author: "Andrice", isPublished: true })
  //Regular expression queries are case sensitive, if you want to make them insensitive append i at the end
  //in regular expressions you can use the ^ character to reprsent a string that starts with something
  //in regular expressions $ is used to represent a string that ends with something /Nichols$/
  //n regular expressions to query a string that starts anywhere front, end, or middle, etc. that syntax is
  // ---  /.*open.*/ the dot star characters means there could be o or more characters in front/behind this string it doesn't matter
  const courses = await Course.find({ author: /^Andrice/i })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: "asc" })
    .count();
  console.log(courses);
}

/* There are two ways to update documents in mondoDB-
    -Query First: findById()
     Modify its properties
     save()
    - Update first: Update directly 
     optionally: get the updated document */
async function updateCourse(id) {
  //update directly approach
  //This method returns the result of the update operation not a course object
  //  Course.updateOne()
  //To return the course object that was updated you would need to use this method
  //Then add in an option to return the updated properties in the document object
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Max",
        isPublished: false,
      },
    },
    { new: true }
  );

  console.log(result);
}

updateCourse("614130651e787cacc8647308");
