import getTopRatedMovieApi from "../apis/getApi.js";

const moiveData = await getTopRatedMovieApi();

const movieStore = moiveData.map((data) => ({
  id: data.id,
  title: data.title,
  img: data.poster_path,
  widthImg: data.backdrop_path,
  overview: data.overview,
  rating: data.vote_average,
}));

export default movieStore;
