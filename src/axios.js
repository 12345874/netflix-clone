import axios from "axios";

//** base url to make requests from the movie database */

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// what it basically does is: it will create an instance and
// https://api.themoviedb.org/3/foo-bar

// instance.get("/foo-bar")

export default instance;
