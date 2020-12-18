import './styles.scss';
import { movies } from './src/data';

// every files in "static" folder can be used directly like that
// app.innerHTML += '<img src="images/kitten.jpg" style="width:100px;" />';

/** ******************************** AFFICHAGE ***************************** */

// Injection des éléments de base de la page
const app = document.getElementById('app');
app.innerHTML = `
    <header>
        <h1>HackerFlix</h1>
        <div id="moviesFilter">
            <button class="btnFilter" id="btnHide">Recent Movies Only</button>
            <button class="btnFilter" id="btnReveal">Show All Movies</button>
        </div>
    </header>
    <main></main>
`;

// Injection des posters dans le main
const main = document.querySelector('main');
movies.forEach((movie) => {
  if (movie.img) {
    main.innerHTML += `
    <div class="poster" id="${movie.imdb}">
        <img id="${movie.imdb}" src="images/${movie.imdb}.jpg" alt="movie's poster" />
    </div>`;
  } else {
    main.innerHTML += `<div class="poster emptyPoster" id="${movie.imdb}"><p>${movie.title}</p></div>`;
  }
});

/* delegate on the body to manage events  */
document.body.addEventListener('click', (e) => {
  /* popUp */
  /* show popup + background div to block additional click on the poster wall */
  if (e.target.matches('.poster') || e.target.matches('img')) {
    movies.forEach((movie) => {
      if (e.target.id === movie.imdb) {
        console.log(e.target.id);
        const popUpInfos = `
        <div id="popUpWall">
          <div class="popUp">
            <i class="far fa-times-circle"></i>
            <h3>${movie.title}</h3>
            <p id="movieYear">${movie.year}</p>
            <p>${movie.genres}</p>
            <p> ${movie.plot}</p>
            <p> note: ${movie.note} / 10</p>
          </div>
        </div> `;
        app.innerHTML += popUpInfos;
      }
    });
  } else if (e.target.matches('.fa-times-circle')) {
    document.getElementById('popUpWall').remove();
  } else if (e.target.matches('#btnHide')) {
    const posterList = document.querySelectorAll('.poster');
    for (const movie of movies) {
      posterList.forEach((poster) => {
        if (poster.id === movie.imdb && movie.year < 2000) {
          const posterHide = poster;
          posterHide.style.display = 'none';
        }
      });
    }
    const btnHideMov = document.getElementById('btnHide');
    const btnRevealMov = document.getElementById('btnReveal');
    btnHideMov.style.display = 'none';
    btnRevealMov.style.display = 'block';
  } else if (e.target.matches('#btnReveal')) {
    const posterList = document.querySelectorAll('.poster');
    // for (const movie of movies) {
    posterList.forEach((poster) => {
      // if (poster.id === movie.imdb && movie.year < 2000) {
      //  const posterHide = poster;
      //  posterHide.style.display = 'block';
      const thisMovie = movies.find((movie) => movie.imdb === poster.id);
      if (thisMovie.year < 2000) { poster.style.display = 'block'; }
    });
    // }
    const btnHideMov = document.getElementById('btnHide');
    const btnRevealMov = document.getElementById('btnReveal');
    btnRevealMov.style.display = 'none';
    btnHideMov.style.display = 'block';
  }
});
