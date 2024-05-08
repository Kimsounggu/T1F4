const getTopRatedMovieApi = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjUxYmI1M2Q5YTNkMTA0NGRiYTcwZDFiMmI2ZGEwNSIsInN1YiI6IjY2MmNmNDRlZjZmZDE4MDEyODIyNGI3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yGcscHFGjYQq6B7s_OqCif9IH5jw8vlFboOuJZNKnTk",
      },
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=KR",
      options,
    );
    if (!response.ok) alert("Failed to fetch api data: " + error);
    const apiData = await response.json();
    return apiData.results;
  } catch (error) {
    alert("An error ocurred while fetching api data: " + error);
  }
};

export default getTopRatedMovieApi;
