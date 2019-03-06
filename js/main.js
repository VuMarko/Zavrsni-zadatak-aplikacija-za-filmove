function d(id) {
    return document.getElementById(id);
}

// *************** Intro page *************** //


function removeIntro() {
    d('introPage').style.display = "none";
    d('mainDiv').style.display = "block";
}

setTimeout(removeIntro, 5000)



// *************** localStorage *************** //
LS.init('ulogovan');
LS.init('korisnici');
LS.init('filmovi');
LS.init('glumci');
LS.init('reditelji');
jelUlogovan();


// *************** log in, registracija i reset sifre *************** //

function jelUlogovan() {
    var email = LS.get('ulogovan').email;
    var logged = typeof email === "string";
    d("imeUlogovanogKorisnika").innerHTML = email;
    if (logged) {
        prikaziDiv("ulogovan");
        d("logInButton").style.display = "none";
        d("registerButton").style.display = "none";
        d("addMovieButton").style.display = "block";
        d("searchButton").style.display = "block";
        return true
    } else {
        prikaziDiv("logInPanel");
        return false
    }
};

function jelPostojiEmail(email) {
    var email = d('userEmailRegistration').value;
    if (LS.getElement('korisnici', email)) {
        return true
    } else {
        return false
    }
};

if (jelUlogovan() == true) {
    napraviTabeluFilmova();
    console.log('Ulogovan je:', LS.get('ulogovan').email);
    console.log('Ulogovan si');
    removeIntro()
} else {
    console.log('Nisi ulogovan');
    alert('You are not logged in');
};

d("registrationPanel").addEventListener("submit", function (event) {
    var korisnik = {
        email: d('userEmailRegistration').value,
        question: d('userQuestionRegistration').value,
        answer: d('userAnswerRegistration').value,
        password: d('userPasswordRegistration').value
    };
    if ((d('userPasswordRegistration').value === d('userPasswordRegistrationConfirm').value) && (jelPostojiEmail() == false)) {
        console.log('korisnik iz lokala:', korisnik.email, 'korisnik iz inputa:', d('userEmailRegistration').value);
        LS.setElement('korisnici', korisnik.email, korisnik);
        d("registrationPanel").reset();
    } else if (jelPostojiEmail() == true) {
        alert("The email already exists");
    } else if (d('userPasswordRegistration').value !== d('userPasswordRegistrationConfirm').value) {
        alert("Password must be same as confirmation !");
    }
});

d("passwordResetPanel").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = d('userEmailReset').value;
    var upit = prompt("What is your first pet name");
    if (LS.getElement('korisnici', email)) {
        var korisnik = LS.getElement('korisnici', email);
        console.log("postoji korisnik sa tim emailom");
        console.log('upit:', upit, 'odgovor:', korisnik.answer);
        if (upit == korisnik.answer) {
            alert('Your password is:' + LS.getElement('korisnici', email).password);
            d("passwordResetPanel").reset();
        } else {
            alert("Repeat all");
        }
    }
});

d("logInPanel").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = d('emailLogIn').value;
    var pass = d('passWordLogIn').value;
    var korisnik = LS.getElement('korisnici', email);
    if (korisnik) {
        if (korisnik.password === pass) {
            prikaziDiv("ulogovan");
            LS.set("ulogovan", korisnik);
            jelUlogovan();
            location.reload();
        } else {
            alert("Wrong password!");
            location.href('#logInButton');
        }
    } else {
        alert("The user you entered does not exist");
        location.href('#logInButton');
    }
});

document.querySelector("#ulogovan button").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.reload()
    prikaziDiv("logInPanel");
    LS.remove("ulogovan")
});

function jerSePoklapaUser() {
    var ulogovanUser = LS.get('ulogovan').email;
    var sviFilmovi = LS.get('filmovi')
    for (var i = 0; i < Object.keys(sviFilmovi).length; i++) {
        if (ulogovanUser == (sviFilmovi[Object.keys(sviFilmovi)[i]].autorBaze)) {
            return true
        }
    }
};
jerSePoklapaUser();

// *************** eventlisteneri za dugmad *************** //

d("homeButton").addEventListener("click", function (event) {
    event.preventDefault();
    if (jelUlogovan() == true) {
        prikaziDiv("centralContentImage");
        prikaziDiv("ulogovan");
        napraviTabeluFilmova();
        d('centralContentAddMovie').style.display = "none";
        d('addMoviePanel').style.display = "none";
        location.reload();
    } else {
        alert('You are not logged in')
    };
});

d("registerButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("centralContentRegistration");
    prikaziDiv("registrationPanel");
    d("centralContentImage").style.display = "none";
    d("centralContentLogIn").style.display = "none";
    d('movieTableSort').style.display = "none";
    d('registrationPanel').reset();
});

d("logInButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("centralContentLogIn");
    prikaziDiv("logInPanel");
    d("centralContentImage").style.display = "none";
    d("centralContentRegistration").style.display = "none";
    d("centralContentReset").style.display = "none";
    d('movieTableSort').style.display = "none";
    napraviTabeluFilmova();
    d("logInPanel").reset();
});

d("linkResetButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("passwordResetPanel");
    d("centralContentReset").style.display = "block";
    d("centralContentLogIn").style.display = "none";
    d('movieTableSort').style.display = "none";
    d("passwordResetPanel").reset();
});

d("addMovieButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("addMoviePanel");
    d("centralContentAddMovie").style.display = "flex";
    prikaziDiv("ulogovan");
    d("centralContentImage").style.display = "none";
    d("centralContentUserProfil").style.display = "none";
    d("centralContentSearch").style.display = "none";
    d('moviePopUp').style.display = "none";
    d('moviePopUpTrailer').style.display = "none"
    d('movieTableSort').style.display = "none";
    d("addMoviePanel").reset();
    d('iframeWindow').innerHTML = "";
    brisiPodatke();
});

d("searchButton").addEventListener("click", function (event) {
    event.preventDefault();
    d("centralContentSearch").style.display = "flex";
    d("centralContentSearchDisplay").style.display = "flex";
    d("centralContentImage").style.display = "none";
    d("centralContentAddMovie").style.display = "none";
    d('moviePopUp').style.display = "none";
    d('moviePopUpTrailer').style.display = "none";
    d('movieTableSort').style.display = "none";
    d('iframeWindow').innerHTML = "";
});



// *************** kreiranje baze sa filmovima *************** //

function jelPostojiFilm(idFilma) {
    var idFilma = d('addMovieID').value;
    if (LS.getElement('filmovi', idFilma)) {
        return true
    } else {
        return false
    }
};

d("addMoviePanel").addEventListener("submit", function (event) {
    event.preventDefault();
    var film = {
        autorBaze: LS.get('ulogovan').email,
        idFilma: d('addMovieID').value,
        imdbAddress: d('addMovieImdbAddress').value,
        posterAddress: d('addPosterAddress').value,
        trailerAddress: d('addTrailerAddress').value,
        title: d('addMovieTitle').value,
        movieRating: d('addMovieRating').value,
        genre: d('addMovieGenres').value,
        year: d('addMovieYear').value,
        director: d('addMovieDirector').value,
        cast: d('addMovieCast').value,
        storyline: d('addMovieStory').value

    };

    var idFilma = d('addMovieID').value;
    if (jelPostojiFilm(idFilma) == true) {
        alert("ID already exist");
    } else {
        LS.setElement('filmovi', film.idFilma, film);
        d('addMoviePanel').reset();
    }

});

// *************** kreiranje tabele sa filmovima *************** //

console.log('Objekat', LS.get('filmovi'))
console.log('Niz:', Object.keys(LS.get('filmovi')))

function napraviTabeluFilmova() {
    var ulogovanUser = LS.get('ulogovan').email;
    var sviFilmovi = LS.get('filmovi');
    var html = '<div id="tabelaFilm">';
    for (var i = 0; i < Object.keys(sviFilmovi).length; i++) {
        if (ulogovanUser == (sviFilmovi[Object.keys(sviFilmovi)[i]].autorBaze)) {
            html += '<div id="' + Object.keys(sviFilmovi)[i] + '" class="' + (sviFilmovi[Object.keys(sviFilmovi)[i]].autorBaze) + '\t' + 'poljeFilma' + '" style="' + 'background-image: url(' + (sviFilmovi[Object.keys(sviFilmovi)[i]].posterAddress) + ')' + '">' + (sviFilmovi[Object.keys(sviFilmovi)[i]].title) + '</div>';

        }
    }
    html += '</div>';
    document.getElementById("movieTable").innerHTML = html;
};

if (jelUlogovan() == true) {
    d('tabelaFilm').addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target.classList.contains('poljeFilma')) {
            var podaciOFilmu = LS.get('filmovi')[event.target.id]
            d('movieTitle').innerHTML = podaciOFilmu.title;
            d('movieRating').innerHTML = podaciOFilmu.movieRating;
            d('moviePoster').innerHTML = '<img src="' + podaciOFilmu.posterAddress + '" alt="' + podaciOFilmu.posterAddress + '">';
            d('movieDirector').innerHTML = podaciOFilmu.director;
            d('movieCast').innerHTML = podaciOFilmu.cast;
            d('movieStory').innerHTML = podaciOFilmu.storyline;
            console.log('imdb adresa', podaciOFilmu.imdbAddress)
            var regexImdb = /[a-z][a-z]*[0-9]+[a-z0-9]/;
            var adresa = podaciOFilmu.imdbAddress;
            // console.log('Adresa iz url-a:', adresa.match(regexImdb).input)
        }
    });

    d('tabelaFilm').addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (event.target.classList.contains('poljeFilma')) {
            console.log('ID kliknutog filma:', event.target.id)
            d('moviePopUp').style.display = "block";
            function ispisObelezenogFilma() {
                var sviFilmovi = LS.get('filmovi')
                console.log()
                d('popUpPoster').innerHTML = '<img src="' + sviFilmovi[event.target.id].posterAddress + '" alt="' + sviFilmovi[event.target.id].posterAddress + '"><button id="popUpTrailerButton">Movie trailer</button>';
                d('movieIdFromStorage').innerHTML = sviFilmovi[event.target.id].idFilma;
                d('movieImdbAddressFromStorage').innerHTML = sviFilmovi[event.target.id].imdbAddress;
                d('movieImdbPosterAddressFromStorage').innerHTML = sviFilmovi[event.target.id].posterAddress;
                d('movieImdbTrailerAddressFromStorage').innerHTML = sviFilmovi[event.target.id].trailerAddress;
                d('movieTitleFromStorage').innerHTML = sviFilmovi[event.target.id].title;
                d('movieRatingFromStorage').innerHTML = sviFilmovi[event.target.id].movieRating;
                d('movieGenreFromStorage').innerHTML = sviFilmovi[event.target.id].genre;
                d('movieYearFromStorage').innerHTML = sviFilmovi[event.target.id].year;
                d('movieDirectorFromStorage').innerHTML = sviFilmovi[event.target.id].director;
                d('movieCastFromStorage').innerHTML = sviFilmovi[event.target.id].cast;
                d('movieStoryFromStorage').innerHTML = sviFilmovi[event.target.id].storyline;

            };
            ispisObelezenogFilma();
        }
        d('popUpTrailerButton').className = event.target.id;
        d('popUpTrailerButton').addEventListener('click', function (event) {
            event.preventDefault();
            var sviFilmovi = LS.get('filmovi');
            d('moviePopUpTrailer').style.display = "block";
            console.log(sviFilmovi[popUpTrailerButton.className].trailerAddress)
            d('iframeWindow').innerHTML = '<iframe src="' + sviFilmovi[popUpTrailerButton.className].trailerAddress + '" allowfullscreen="true" width = "500" height = "400"></iframe >';
        });

    });
}
d('remove').addEventListener('click', function (event) {
    event.preventDefault();
    d('moviePopUp').style.display = "none";
});

d('removeTrailer').addEventListener('click', function (event) {
    event.preventDefault();
    d('moviePopUpTrailer').style.display = "none";
    d('iframeWindow').innerHTML = "";

});

function brisiPodatke() {
    d('movieTitle').innerHTML = "";
    d('movieRating').innerHTML = "";
    d('moviePoster').innerHTML = "";
    d('movieDirector').innerHTML = "";
    d('movieCast').innerHTML = "";
    d('movieStory').innerHTML = "";
};

// *************** demo podaci *************** //

var film = {
    "autorBaze": "123@123.com",
    "idFilma": "tt0111161",
    "imdbAddress": "https://www.imdb.com/title/tt0111161/",
    "posterAddress": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "trailerAddress": "https://www.imdb.com/videoembed/vi3877612057",
    "title": "The Shawshank Redemption",
    "movieRating": "9.3",
    "genre": "Drama",
    "year": "1994",
    "director": "Frank Darabont",
    "cast": "Tim Robbins, Morgan Freeman, Bob Gunton",
    "storyline": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
};
LS.setElement('filmovi', 'tt0111161', film);

// *************** edit i brisanje filmova *************** //

d('editMovieProfile').addEventListener('click', function (event) {
    event.preventDefault();
    var sviFilmovi = LS.get('filmovi')
    var idFilmaIzDiva = d('movieIdFromStorage').innerText;
    console.log(idFilmaIzDiva)
    d('movieImdbAddressFromStorage').innerHTML = '<input id="movieImdbAddressFromStorage1" type="text" value="' + sviFilmovi[idFilmaIzDiva].imdbAddress + '">';
    d('movieImdbPosterAddressFromStorage').innerHTML = '<input id="movieImdbPosterAddressFromStorage1" type="text" value="' + sviFilmovi[idFilmaIzDiva].posterAddress + '">';
    d('movieImdbTrailerAddressFromStorage').innerHTML = '<input id="movieImdbTrailerAddressFromStorage1" type="text" value="' + sviFilmovi[idFilmaIzDiva].trailerAddress + '">';
    d('movieTitleFromStorage').innerHTML = '<input id="movieTitleFromStorage1" type="text" value="' + sviFilmovi[idFilmaIzDiva].title + '">';
    d('movieRatingFromStorage').innerHTML = '<input id="movieRatingFromStorage1"  type="number" min="0.0" max="10" step="0.1" value="' + sviFilmovi[idFilmaIzDiva].movieRating + '">';
    d('movieGenreFromStorage').innerHTML = '<select id="movieGenreFromStorage1" ><option>' + sviFilmovi[idFilmaIzDiva].genre + '</option><option value="Action">Action</option><option value="Adventure">Adventure</option><option value="Animation">Animation</option><option value="Biography">Biography</option><option value="Comedy">Comedy</option><option value="Crime">Crime</option><option value="Focumentary">Documentary</option><option value="Drama">Drama</option><option value="Fantasy">Fantasy</option><option value="History">History</option><option value="Horror">Horror</option><option value="Musical">Musical</option><option value="Mystery">Mystery</option><option value="Romance">Romance</option><option value="Sci-fi">Sci-Fi</option><option value="Thriller">Thriller</option><option value="War">War</option><option value="Western">Western</option></select>';
    d('movieYearFromStorage').innerHTML = '<input id="movieYearFromStorage1" type="number"  min="1900" max="2050" value="' + sviFilmovi[idFilmaIzDiva].year + '">';
    d('movieDirectorFromStorage').innerHTML = '<input id="movieDirectorFromStorage1" type="text" value="' + sviFilmovi[idFilmaIzDiva].director + '">';
    d('movieCastFromStorage').innerHTML = '<input id="movieCastFromStorage1" type="text" value="' + sviFilmovi[idFilmaIzDiva].cast + '">';
    d('movieStoryFromStorage').innerHTML = '<textarea id="movieStoryFromStorage1">' + sviFilmovi[idFilmaIzDiva].storyline + '</textarea>';
    console.log()
});

d('confirmMovieProfile').addEventListener('click', function (event) {
    event.preventDefault();
    if (confirm('Are you sure?')) {
        var idTrenutnogFilma = d('movieIdFromStorage').innerText;
        LS.setElement('filmovi', idTrenutnogFilma, (idTrenutnogFilma) = { "autorBaze": LS.get('ulogovan').email, "idFilma": d('movieIdFromStorage').innerText, "imdbAddress": d('movieImdbAddressFromStorage1').value, "posterAddress": d('movieImdbPosterAddressFromStorage1').value, "trailerAddress": d('movieImdbTrailerAddressFromStorage1').value, "title": d('movieTitleFromStorage1').value, "movieRating": d('movieRatingFromStorage1').value, "genre": d('movieGenreFromStorage1').value, "year": d('movieYearFromStorage1').value, "director": d('movieDirectorFromStorage1').value, "cast": d('movieCastFromStorage1').value, "storyline": d('movieStoryFromStorage1').value })
        location.reload();
    }
});

d('deleteMovieProfile').addEventListener('click', function (event) {
    event.preventDefault();
    if (confirm('Are you sure?')) {
        var idTrenutnogFilma = d('movieIdFromStorage').innerText;
        LS.removeElement('filmovi', idTrenutnogFilma)
        location.reload();
    }
});


// *************** sortiranje  *************** //



d('sortByYear_asc').addEventListener('click', function (event) {
    event.preventDefault();
    var sviFilmovi = LS.get('filmovi');
    function objToArray(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(obj[i]);
        }
        return arr;
    }
    console.log(objToArray(sviFilmovi).sort(function (a, b) {
        return a.year - b.year
    }));
});

d('sortByYear_desc').addEventListener('click', function (event) {
    event.preventDefault();
    var sviFilmovi = LS.get('filmovi');
    function objToArray(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(obj[i]);
        }
        return arr;
    }

    console.log(objToArray(sviFilmovi).sort(function (a, b) {
        return b.year - a.year
    }));
});

d('sortByTitle_asc').addEventListener('click', function (event) {
    event.preventDefault();
    var sviFilmovi = LS.get('filmovi');
    function objToArray(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(obj[i]);
        }
        return arr;
    }
    console.log(objToArray(sviFilmovi).sort())
});

d('sortByTitle_desc').addEventListener('click', function (event) {
    event.preventDefault();
    var sviFilmovi = LS.get('filmovi');
    function objToArray(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(obj[i]);
        }
        return arr;
    }
    console.log(objToArray(sviFilmovi).reverse())

});

d('sortByRating_asc').addEventListener('click', function (event) {
    event.preventDefault();
    var sviFilmovi = LS.get('filmovi');
    function objToArray(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(obj[i]);
        }
        return arr;
    }
    console.log(objToArray(sviFilmovi).sort(function (a, b) {
        return a.movieRating - b.movieRating
    }));
});

d('sortByRating_desc').addEventListener('click', function (event) {
    event.preventDefault();
    var sviFilmovi = LS.get('filmovi');
    function objToArray(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(obj[i]);
        }
        return arr;
    }
    console.log(objToArray(sviFilmovi).sort(function (a, b) {
        return b.movieRating - a.movieRating
    }));
});

// *************** profil korisnika *************** //

d('imeUlogovanogKorisnika').addEventListener('click', function (event) {
    event.preventDefault();
    d('centralContentUserProfil').style.display = "block";
    d('centralContentImage').style.display = "none";
    d('addMoviePanel').style.display = "none";
    d('centralContentAddMovie').style.display = "none";
    d('centralContentSearch').style.display = "none";
    d('moviePopUp').style.display = "none";
    d('moviePopUpTrailer').style.display = "none";
    d('movieTableSort').style.display = "none";
    d('iframeWindow').innerHTML = "";
    ispisProfilaUlogovanogUsera()
    brisiPodatke();
});

function ispisProfilaUlogovanogUsera() {
    var ulogovanUser = LS.get('ulogovan')
    d('userEmailFromStorage').innerHTML = ulogovanUser.email;
    d('userQuestionFromStorage').innerHTML = ulogovanUser.question;
    d('userAnswerFromStorage').innerHTML = ulogovanUser.answer;
    d('userPasswordFromStorage').innerHTML = ulogovanUser.password;
};

d('editUserProfile').addEventListener('click', function (event) {
    event.preventDefault();
    var ulogovanUser = LS.get('ulogovan')
    d('userQuestionFromStorage').innerHTML = '<select id="userQuestionFromStorage1"><option>' + ulogovanUser.question + '</option><option value="Your mother middle name">Your mother middle name</option><option value="Your first pet name">Your first pet name</option><option value="Name of your first love">Name of your first love</option><option value="Name of your primary school teacher">Name of your primary school teacher</option></select>'
    d('userAnswerFromStorage').innerHTML = '<input id="userAnswerFromStorage1" value="' + ulogovanUser.answer + '">'
    d('userPasswordFromStorage').innerHTML = '<input id="userPasswordFromStorage1"value="' + ulogovanUser.password + '">'
});

d('confirmUserProfile').addEventListener('click', function (event) {
    event.preventDefault();
    if (confirm('Are you sure?') == true) {
        var ulogovan = LS.get('ulogovan')['email']
        LS.setElement('korisnici', ulogovan, (ulogovan) = { "email": ulogovan, "question": d('userQuestionFromStorage1').value, "answer": d('userAnswerFromStorage1').value, "password": d('userPasswordFromStorage1').value })
        LS.remove('ulogovan');
        location.reload();
    }
});

// *************** pretraga  *************** //

d('searchPanel').addEventListener('submit', function (event) {
    event.preventDefault();
    pretragaFilmova()

    function pretragaFilmova() {
        var rezultati = [];
        var parametri = {};
        var ukupno = 0;
        var sviFilmovi = LS.get('filmovi');
        document.querySelectorAll(".search_param").forEach(function (i) {
            if (i.value != '') {
                parametri[i.id] = i.value;
                ukupno++;
                console.log('Parametri-value:', parametri[i.id], parametri)
            }
        });
        // console.log(Object.keys(parametri).length);
        if (Object.keys(parametri).length == 0) {
            alert("You must select the search parameters");
        } else {
            for (var i in sviFilmovi) {
                // console.log('sviFilmovi[i]', sviFilmovi[i])
                var prolazi = 0;
                for (var p in parametri) {
                    // console.log('Parametri[p]: ', parametri[p])
                    if (sviFilmovi[i][p].indexOf(parametri[p]) != -1) {
                        prolazi++;
                        // console.log(parametri)
                    }
                }
                if (prolazi == ukupno) {
                    rezultati.push(sviFilmovi[i]);
                    // console.log(prolazi, ukupno)
                }
                function napraviTabeluFilmovaPretraga() {
                    var ulogovanUser = LS.get('ulogovan').email;
                    var html = '<div id="tabelaPretraga">';
                    for (var r in rezultati) {
                        if (ulogovanUser == rezultati[r].autorBaze) {
                            html += '<div id="' + rezultati[r].idFilma + '" class="' + (rezultati[r].autorBaze) + '\t' + 'poljeFilma' + '" style="' + 'background-image: url(' + (rezultati[r].posterAddress) + ')' + '">' + (rezultati[r].title) + '</div>';
                        }

                    }
                    html += '</div>';
                    document.getElementById("centralContentSearchDisplay").innerHTML = html;
                };
                napraviTabeluFilmovaPretraga()
            }
        }
    }
});
d('searchPanel').reset();
d('searchCancelButton').addEventListener('click', function (event) {
    d('tabelaPretraga').innerHTML = " ";
});


d('centralContentSearchDisplay').addEventListener('dblclick', function (event) {
    event.preventDefault();
    // d('popUpTrailerButton').style.display = "none";
    if (event.target.classList.contains('poljeFilma')) {
        console.log('ID kliknutog filma:', event.target.id);
        d('moviePopUp').style.display = "flex";
        d('tabelaFilm').style.display = "none";

        function ispisObelezenogFilma() {
            var sviFilmovi = LS.get('filmovi')
            console.log()
            d('popUpPoster').innerHTML = '<img src="' + sviFilmovi[event.target.id].posterAddress + '" alt="' + sviFilmovi[event.target.id].posterAddress + '"><button id="popUpTrailerButton">Movie trailer</button>';
            d('movieIdFromStorage').innerHTML = sviFilmovi[event.target.id].idFilma;
            d('movieImdbAddressFromStorage').innerHTML = sviFilmovi[event.target.id].imdbAddress;
            d('movieImdbPosterAddressFromStorage').innerHTML = sviFilmovi[event.target.id].posterAddress;
            d('movieImdbTrailerAddressFromStorage').innerHTML = sviFilmovi[event.target.id].trailerAddress;
            d('movieTitleFromStorage').innerHTML = sviFilmovi[event.target.id].title;
            d('movieRatingFromStorage').innerHTML = sviFilmovi[event.target.id].movieRating;
            d('movieGenreFromStorage').innerHTML = sviFilmovi[event.target.id].genre;
            d('movieYearFromStorage').innerHTML = sviFilmovi[event.target.id].year;
            d('movieDirectorFromStorage').innerHTML = sviFilmovi[event.target.id].director;
            d('movieCastFromStorage').innerHTML = sviFilmovi[event.target.id].cast;
            d('movieStoryFromStorage').innerHTML = sviFilmovi[event.target.id].storyline;
        };
        ispisObelezenogFilma()
        d('popUpTrailerButton').className = event.target.id;
        d('popUpTrailerButton').addEventListener('click', function (event) {
            event.preventDefault();
            var sviFilmovi = LS.get('filmovi');
            d('moviePopUpTrailer').style.display = "block";
            console.log(sviFilmovi[popUpTrailerButton.className].trailerAddress)
            d('iframeWindow').innerHTML = '<iframe src="' + sviFilmovi[popUpTrailerButton.className].trailerAddress + '" allowfullscreen="true" width = "500" height = "400"></iframe >';
        });
    }
});

function prikaziDiv(id) {
    var ids = [
        "logInPanel",
        "registrationPanel",
        "passwordResetPanel",
        "ulogovan",
    ];
    // prikazuje div sa ovim id-em ostale divove sklanja

    for (var i = 0; i < ids.length; i++) {
        if (id != ids[i]) {
            d(ids[i]).style.display = "none";
        }
    }
    d(id).style.display = "block";
}




