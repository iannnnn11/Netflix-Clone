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

const API_KEY = "9f83a5cea3a23db23f555c347d1877ec";

const trendingURL =
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

const popularURL =
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const topRatedURL =
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

const movieRow = document.querySelector(".movie-row");

async function loadMovies(url, rowSelector) {
    const response = await fetch(url);
    const data = await response.json();

    const movieRow = document.querySelector(rowSelector);

    for (let movie of data.results) {
        const card = document.createElement("div");
        card.className = "movie-card";

        const img = document.createElement("img");
        img.src =
            `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        const title = document.createElement("h3");
        title.innerText = movie.title;

        const rating = document.createElement("p");
        rating.innerText =
            "⭐ " + movie.vote_average.toFixed(1);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(rating);
        card.addEventListener("click", function () {
    window.location.href = `movie.html?id=${movie.id}`;
});

        movieRow.appendChild(card);
    }
}
loadMovies(trendingURL, "#trendingRow");
loadMovies(popularURL, "#popularRow");
loadMovies(topRatedURL, "#topRatedRow");