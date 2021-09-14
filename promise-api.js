const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`asynchronous operation 1`);
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`asynchronous operation 2`);
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

//When wanting to run a function once one promise is completed instead of waiting
//for all to complete We can use Promise.race instead
//as soon as one promise from this method is fullfilled the parent Promise will be considered fullfileed
//the result of this method will not be the array argument but the value of the first fullfilled promise
//Promise.race([p1, p2]);
