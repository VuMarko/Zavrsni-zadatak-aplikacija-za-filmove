function d(id) {
    return document.getElementById(id);
}
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
} else {
    console.log('Nisi ulogovan');
    alert('Nisi ulogovan');
};

d("registrationPanel").addEventListener("submit", function (event) {
    event.preventDefault();
    var korisnik = {
        email: d('userEmailRegistration').value,
        password: d('userPasswordRegistration').value,
        question: d('userQuestionRegistration').value,
        answer: d('userAnswerRegistration').value
    };
    if ((d('userPasswordRegistration').value === d('userPasswordRegistrationConfirm').value) && (jelPostojiEmail() == false)) {
        console.log('korisnik iz lokala:', korisnik.email, 'korisnik iz inputa:', d('userEmailRegistration').value);
        LS.setElement('korisnici', korisnik.email, korisnik);
        d("registrationPanel").reset();
    } else if (jelPostojiEmail() == true) {
        alert("Vec postoji email");
    } else if (d('userPasswordRegistration').value !== d('userPasswordRegistrationConfirm').value) {
        alert("Šifra i potvrda moraju biti isti");
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
            alert('Vasa sifra je:' + LS.getElement('korisnici', email).password);
            d("passwordResetPanel").reset();
        } else {
            alert("Ponovite sve");
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

        } else {
            alert("Pogrešna šifra!");
        }
    } else {
        alert("Uneti korisnik ne postoji");
    }
    window.location.reload()
});

document.querySelector("#ulogovan a").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.reload()
    prikaziDiv("logInPanel");
    LS.remove("ulogovan")
});

// *************** eventlisteneri za dugmad *************** //

d("homeButton").addEventListener("click", function (event) {
    event.preventDefault();
    if (jelUlogovan() == true) {
        prikaziDiv("centralContentImage");
        prikaziDiv("ulogovan");
        napraviTabeluFilmova();
        // d('tabelaFilm').style.display = "block";
        d('centralContentAddMovie').style.display = "none";
        d('addMoviePanel').style.display = "none";
        location.reload();
    } else {
        alert('Nisi ulogovan')
    };
});

d("registerButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("centralContentImage1");
    prikaziDiv("registrationPanel");
    d("centralContentImage").style.display = "none";
    d("centralContentImage3").style.display = "none";
    d('registrationPanel').reset();
});

d("logInButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("centralContentImage3");
    prikaziDiv("logInPanel");
    d("centralContentImage").style.display = "none";
    d("centralContentImage1").style.display = "none";
    d("centralContentImage2").style.display = "none";
    napraviTabeluFilmova();
    d('logInPanel').reset();
});

d("linkResetButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("passwordResetPanel");
    d("centralContentImage2").style.display = "block";
    d("centralContentImage3").style.display = "none";
    d('passwordResetPanel').reset();
});

d("addMovieButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("addMoviePanel");
    prikaziDiv("centralContentAddMovie");
    prikaziDiv("ulogovan");
    d("centralContentImage").style.display = "none";
    d('addMoviePanel').reset();
    brisiPodatke();
});

// *************** kreiranje baze sa filmovima *************** //

function jelPostojiFilm(idFilma) {
    var idFilma = d('AddMovieID').value;
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
        idFilma: d('AddMovieID').value,
        imdbAddress: d('AddMovieImdbAddress').value,
        posterAddress: d('AddPosterAddres').value,
        title: d('AddMovieTitle').value,
        movieRating: d('AddMovieRating').value,
        genre: d('AddMovieGenres').value,
        year: d('AddMovieYear').value,
        director: d('AddMovieDirector').value,
        cast: d('AddMovieCast').value,
        storyline: d('AddMovieStory').value
    };
    if (jelPostojiFilm() == true) {
        alert("Vec postoji taj ID");
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
            html += '<div id="' + Object.keys(sviFilmovi)[i] + '" class="' + (sviFilmovi[Object.keys(sviFilmovi)[i]].autorBaze) + '" style="' + 'background-image: url(' + (sviFilmovi[Object.keys(sviFilmovi)[i]].posterAddress) + ')' + '">' + (sviFilmovi[Object.keys(sviFilmovi)[i]].title) + '</div>';

        }
    }
    html += '</div>';
    document.getElementById("movieTable").innerHTML = html;
}

document.getElementById("tabelaFilm").addEventListener("click", function (event) {
    event.preventDefault();
    console.log('id', event.target.id)
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
    console.log('Adresa iz url-a:', adresa.match(regexImdb))


});

function brisiPodatke() {
    d('movieTitle').innerHTML = "";
    d('movieRating').innerHTML = "";
    d('moviePoster').innerHTML = "";
    d('movieDirector').innerHTML = "";
    d('movieCast').innerHTML = "";
    d('movieStory').innerHTML = "";
}



// *************** demo podaci *************** //




// *************** edit i brisanje *************** //


// *************** sortiranje  *************** //


// *************** profil korisnika *************** //


// *************** pretraga  *************** //











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

const eksport = JSON.stringify(localStorage)

const uvezi = JSON.parse("{\"glumci\":\"{}\",\"korisnici\":\"{\\\"123@123.com\\\":{\\\"email\\\":\\\"123@123.com\\\",\\\"password\\\":\\\"1\\\",\\\"question\\\":\\\"Your mother middle name\\\",\\\"answer\\\":\\\"1\\\"},\\\"1111@1111.com\\\":{\\\"email\\\":\\\"1111@1111.com\\\",\\\"password\\\":\\\"1\\\",\\\"question\\\":\\\"Your mother middle name\\\",\\\"answer\\\":\\\"1\\\"},\\\"aaaaa@aaaa.aaa\\\":{\\\"email\\\":\\\"aaaaa@aaaa.aaa\\\",\\\"password\\\":\\\"1\\\",\\\"question\\\":\\\"Your mother middle name\\\",\\\"answer\\\":\\\"1\\\"},\\\"1@1.d\\\":{\\\"email\\\":\\\"1@1.d\\\",\\\"password\\\":\\\"1\\\",\\\"question\\\":\\\"Your mother middle name\\\",\\\"answer\\\":\\\"1\\\"}}\",\"reditelji\":\"{}\",\"filmovi\":\"{\\\"tt0068646\\\":{\\\"autorBaze\\\":\\\"1111@1111.com\\\",\\\"idFilma\\\":\\\"tt0068646\\\",\\\"imdbAddress\\\":\\\"https://www.imdb.com/title/tt0111161/\\\",\\\"posterAddress\\\":\\\"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg\\\",\\\"title\\\":\\\"The Godfather\\\",\\\"movieRating\\\":\\\"9.2\\\",\\\"genre\\\":\\\"Drama\\\",\\\"year\\\":\\\"1972\\\",\\\"director\\\":\\\"Francis Ford Coppola\\\",\\\"cast\\\":\\\"Marlon Brando, Al Pacino, James Caan\\\",\\\"storyline\\\":\\\"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.\\\"},\\\"tt0111161\\\":{\\\"autorBaze\\\":\\\"1111@1111.com\\\",\\\"idFilma\\\":\\\"tt0111161\\\",\\\"imdbAddress\\\":\\\"https://www.imdb.com/title/tt0111161/\\\",\\\"posterAddress\\\":\\\"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg\\\",\\\"title\\\":\\\"The Shawshank Redemption\\\",\\\"movieRating\\\":\\\"9.3\\\",\\\"genre\\\":\\\"drama\\\",\\\"year\\\":\\\"1994\\\",\\\"director\\\":\\\"Frank Darabont\\\",\\\"cast\\\":\\\"Tim Robbins, Morgan Freeman, Bob Gunton\\\",\\\"storyline\\\":\\\"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.\\\"}}\",\"ulogovan\":\"{\\\"email\\\":\\\"1111@1111.com\\\",\\\"password\\\":\\\"1\\\",\\\"question\\\":\\\"Your mother middle name\\\",\\\"answer\\\":\\\"1\\\"}\"}")


