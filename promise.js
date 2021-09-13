const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve(1);
    reject(new Error(`do better `));
  }, 2000);
});

/*New Promises contain two methods then and catch then is a method that is used for when
the promise is completed, it takes a callback function as it's first argument. Catch is used
for when a promise is rejected  */
p.then((result) => console.log("result ", result)).catch((error) =>
  console.log(`error ${error.message}`)
);
