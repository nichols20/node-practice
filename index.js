console.log("before");
getUser(1, (user) => {
  console.log(user);
  getRepositories(user.gitHUbUsername, (repos) => {
    console.log(repos);
  });
});
console.log("after");

/* Three ways to deal with asynchronus code
 -Callbacks
 -Promises
 -Async/Await
 */

//This is an example of a callback, I created a callback method to take the value of id
//Then above I wrote a function to perform a task based on the callback argument below.
function getUser(id, callback) {
  setTimeout(() => {
    console.log("reading a user from a database");

    callback({ id: id, gitHUbUsername: "Andrice" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    const list = ["repo1", "repo2", "repo3"];
    callback({ username: username, repos: list });
  }, 2000);
}
