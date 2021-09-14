async function displayResults() {
  const customer = await getCustomer(1);
  if (customer.isGold === true) {
    const movies = await topMovies();
    const emailResult = await sendEmail(customer, movies);
    console.log(emailResult);
  }
}

displayResults();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: id, customer: "Andrice", isGold: true, email: "email" });
    }, 4000);
  });
}

function topMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Top Movies ${[`movie1`, `movie2`]}`);
    });
  });
}

function sendEmail(customer, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `${customer.customer} , email sent to ${customer.email},  ${movies} `
      );
    });
  });
}
