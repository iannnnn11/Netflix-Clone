const API_KEY = "YOUR_API_KEY";

const movieTitle = document.querySelector("#movieTitle");
const movieRating = document.querySelector("#movieRating");
const movieYear = document.querySelector("#movieYear");
const movieRuntime = document.querySelector("#movieRuntime");
const movieOverview = document.querySelector("#movieOverview");

const movieHero = document.querySelector(".movie-hero");
const castRow = document.querySelector("#castRow");

const playTrailer = document.querySelector("#playTrailer");
const trailerSection = document.querySelector("#trailerSection");
const trailerFrame = document.querySelector("#trailerFrame");
const closeTrailer = document.querySelector("#closeTrailer");


const parameters = new URLSearchParams(window.location.search);

const movieId = parameters.get("id");


async function loadMovieDetails() {
    try {
        const url =
            `https://api.themoviedb.org/3/movie/${movieId}` +
            `?api_key=${API_KEY}` +
            `&append_to_response=videos,credits`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Movie details could not be loaded");
        }

        const movie = await response.json();

        displayMovieDetails(movie);
        displayCast(movie.credits.cast);
        prepareTrailer(movie.videos.results);

    } catch (error) {
        console.error(error);

        movieTitle.innerText = "Movie could not be loaded";
    }
}


function displayMovieDetails(movie) {
    movieTitle.innerText = movie.title;

    movieRating.innerText =
        `⭐ ${movie.vote_average.toFixed(1)}`;

    movieYear.innerText =
        movie.release_date
            ? movie.release_date.slice(0, 4)
            : "Unknown year";

    movieRuntime.innerText =
        movie.runtime
            ? `${movie.runtime} minutes`
            : "";

    movieOverview.innerText =
        movie.overview || "No description available.";

    if (movie.backdrop_path) {
        movieHero.style.backgroundImage =
            `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`;
    }
}


function displayCast(cast) {
    castRow.innerHTML = "";

    const mainCast = cast.slice(0, 10);

    for (let actor of mainCast) {
        const castCard = document.createElement("div");
        castCard.className = "cast-card";

        const actorImage = document.createElement("img");

        actorImage.src = actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : "placeholder-person.png";

        actorImage.alt = actor.name;

        const actorName = document.createElement("h3");
        actorName.innerText = actor.name;

        const characterName = document.createElement("p");
        characterName.innerText = actor.character;

        castCard.appendChild(actorImage);
        castCard.appendChild(actorName);
        castCard.appendChild(characterName);

        castRow.appendChild(castCard);
    }
}


function prepareTrailer(videos) {
    const trailer = videos.find(function (video) {
        return video.site === "YouTube" &&
               video.type === "Trailer";
    });

    if (!trailer) {
        playTrailer.disabled = true;
        playTrailer.innerText = "Trailer unavailable";
        return;
    }

    playTrailer.addEventListener("click", function () {
        trailerFrame.src =
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;

        trailerSection.classList.add("show");
    });
}


closeTrailer.addEventListener("click", function () {
    trailerSection.classList.remove("show");

    trailerFrame.src = "";
});


loadMovieDetails();