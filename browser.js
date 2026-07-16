// class Movie{
//     constructor(title,image,rating){
//         this.title=title;
//         this.image=image;
//         this.rating=rating;

//     }
// }
// let m1 = new Movie("Stranger Things", "img6.png", 9.2);
// let m2 = new Movie("Wednesday", "img1.png", 8.7);
// let m3 = new Movie("Money Heist", "img2.png", 8.9);
// let m4 = new Movie("Squid Game", "img3.png", 8.5);
// let m5 = new Movie("Dark", "img4.png", 9.0);
// let m6 = new Movie("Breaking Bad", "img5.png", 9.8);
// let m7 = new Movie("The Witcher", "img7.png", 8.2);
// let m8 = new Movie("Peaky Blinders", "img8.png", 8.8);
// let m9 = new Movie("Lucifer", "img9.png", 8.1);
// let m10 = new Movie("The Last of Us", "img10.png", 9.3);
// let m11 = new Movie("The Boys", "img11.png", 8.7);
// let m12 = new Movie("Ozark", "img4.png", 8.5);
// let m13 = new Movie("Alice in Borderland", "img6.png", 8.4);
// let m14 = new Movie("Narcos", "img2.png", 8.8);
// let m15 = new Movie("Vikings", "img3.png", 8.6);
// let m16 = new Movie("Prison Break", "img11.png", 0.3);
// let m17 = new Movie("The Walking Dead", "img6.png", 8.2);
// let m18 = new Movie("All of Us Are Dead", "img10.png", 7.9);


// let movies = [
//     m1, m2, m3, m4, m5,
//     m6, m7, m8, m9, m10,
//     m11, m12, m13, m14, m15,
//     m16, m17, m18
// ];

// let movieRow=document.querySelector(".movie-row");

// for(let movie of movies){
//     let card=document.createElement("div");
//     card.className="movie-card";

//     let img=document.createElement("img");
//     img.src=movie.image;

//     let title=document.createElement("h2");
//     title.innerText=movie.title;

//     let rating=document.createElement("p");
//     rating.innerText="⭐"+movie.rating;

//     card.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(rating);


//     movieRow.appendChild(card);


// }
const menuBtn = document.querySelector("#menuBtn");
const sidebar = document.querySelector(".sidebar-menu");


menuBtn.addEventListener("click", function (event) {
    event.preventDefault();
    sidebar.classList.toggle("open");
});


const API_KEY = "9f83a5cea3a23db23f555c347d1877ec";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";


function createGenreURL(genreId) {
    return `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`;
}


const categories = [
    {
        url: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
        row: "#trendingRow"
    },
    {
        url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
        row: "#top10Row",
        limit: 10
    },
    {
        url: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
        row: "#popularRow"
    },
    {
        url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
        row: "#topRatedRow"
    },

    {
        url: createGenreURL(28),
        row: "#actionRow"
    },
    {
        url: createGenreURL(35),
        row: "#comedyRow"
    },
    {
        url: createGenreURL(27),
        row: "#horrorRow"
    },
    {
        url: createGenreURL(10749),
        row: "#romanceRow"
    },
    {
        url: createGenreURL(878),
        row: "#sciFiRow"
    },
    {
        url: createGenreURL(9648),
        row: "#mysteryRow"
    },
    {
        url: createGenreURL(53),
        row: "#thrillerRow"
    },
    {
        url: createGenreURL(14),
        row: "#fantasyRow"
    },
    {
        url: createGenreURL(18),
        row: "#dramaRow"
    },
    {
        url: createGenreURL(10751),
        row: "#familyRow"
    },
    {
        url: createGenreURL(12),
        row: "#adventureRow"
    },
    {
        url: createGenreURL(80),
        row: "#crimeRow"
    },
    {
        url: createGenreURL(36),
        row: "#historyRow"
    },
    {
        url: createGenreURL(10752),
        row: "#warRow"
    },
    {
        url: createGenreURL(10402),
        row: "#musicRow"
    },
    {
        url: createGenreURL(16),
        row: "#animationRow"
    },

    {
        url: `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
        row: "#tvPopularRow",
        mediaType: "tv"
    },
    {
        url: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
        row: "#tvTrendingRow",
        mediaType: "tv"
    },
    {
        url: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
        row: "#nowPlayingRow"
    },
    {
        url: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
        row: "#upcomingRow"
    }
];


async function loadMovies(
    url,
    rowSelector,
    limit = 20,
    mediaType = "movie"
) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        const movieRow = document.querySelector(rowSelector);

        if (!movieRow) {
            console.error(`HTML row not found: ${rowSelector}`);
            return;
        }

        movieRow.innerHTML = "";

        const movies = data.results.slice(0, limit);

        for (const movie of movies) {
            if (!movie.poster_path) {
                continue;
            }

            const card = document.createElement("div");
            card.className = "movie-card";

            const img = document.createElement("img");
            img.src = `${IMAGE_URL}${movie.poster_path}`;
            img.alt = movie.title || movie.name || "Poster";

            const title = document.createElement("h3");
            title.innerText =
                movie.title ||
                movie.name ||
                "Unknown title";

            const rating = document.createElement("p");

            const ratingNumber =
                typeof movie.vote_average === "number"
                    ? movie.vote_average.toFixed(1)
                    : "N/A";

            rating.innerText = `⭐ ${ratingNumber}`;

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(rating);

            card.addEventListener("click", function () {
                if (mediaType === "tv") {
                    window.location.href =
                        `tv.html?id=${movie.id}`;
                } else {
                    window.location.href =
                        `movie.html?id=${movie.id}`;
                }
            });

            movieRow.appendChild(card);
        }
    } catch (error) {
        console.error(`Could not load ${rowSelector}:`, error);
    }
}


for (const category of categories) {
    loadMovies(
        category.url,
        category.row,
        category.limit || 20,
        category.mediaType || "movie"
    );
}