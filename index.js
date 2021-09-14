const { get } = require("underscore");

console.log("before");
console.log("after");

/*
getUser(1)
  .then((user) => getRepositories(user.gitHUbUsername))
  .then((repo) =>
    getCommits(repo[0])
      .then((commits) => console.log(commits))
      .catch((error) => console.log(error.message))
  );
*/
/* Three ways to deal with asynchronus code
 -Callbacks
 -Promises
 -Async/Await
 */

//Async/Await example
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repo = await getRepositories(user.gitHUbUsername);
    const commit = await getCommits(repo[0]);
    console.log(commit);
  } catch (error) {
    console.log(error.message);
  }
}

displayCommits();

//Replaced the callback function with a promise
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("reading a user from a database");

      resolve({ id: id, gitHUbUsername: "Andrice" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = ["repo1", "repo2", "repo3"];
      //resolve({ username: username, repos: list });
      reject(new Error(`error`));
    }, 2000);
  });
}

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling github api");
      resolve(["commit"]);
    });
  });
}
