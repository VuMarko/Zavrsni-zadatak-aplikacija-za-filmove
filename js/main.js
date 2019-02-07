function d(id) {
    return document.getElementById(id);
}

LS.init('ulogovan');
LS.init('korisnici');

jelUlogovan();

function jelUlogovan() {
    var email = LS.get('ulogovan').email;
    var logged = typeof email === "string";
    d("imeUlogovanogKorisnika").innerHTML = email;
    if (logged) {
        prikaziDiv("ulogovan");
        d("logInButton").style.display = "none";
        d("registerButton").style.display = "none";
        d("addMovieButton").style.display = "block";
    } else {
        prikaziDiv("logInPanel");
    }
}

document.querySelector("#ulogovan a").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("logInPanel");
    LS.remove("ulogovan")
});

d("registerButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("centralContentImage1");
    prikaziDiv("registrationPanel");
    d("centralContentImage").style.display = "none";

});

d("logInButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("centralContentImage3");
    prikaziDiv("logInPanel");
    d("centralContentImage").style.display = "none";

});

d("linkResetButton").addEventListener("click", function (event) {
    event.preventDefault();
    prikaziDiv("passwordResetPanel");
    prikaziDiv("centralContentImage2");
    d("centralContentImage").style.display = "none";
});

d("passwordResetPanel").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = d('email-reminder').value;
    var upit = prompt("What is your first pet name");
    console.log(email);
    if (LS.getElement('korisnici', email)) {
        var korisnik = LS.getElement('korisnici', email);
        console.log("postoji korisnik sa tim emailom");
        console.log('upit', upit, korisnik.answer);
        if (upit == korisnik.answer) {
            alert(LS.getElement('korisnici', email).password);
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
        // console.log('getELement',LS.getElement('korisnici',email),email);
        alert("Uneti korisnik ne postoji");
    }

});

d("registrationPanel").addEventListener("submit", function (event) {
    event.preventDefault();
    var korisnik = {
        email: d('userEmailRegistration').value,
        password: d('userPasswordRegistration').value,
        // question: d('question').value,
        // answer: d('answer').value
    };
    if (d('userPasswordRegistration').value === d('userPasswordRegistrationConfirm').value) {
        console.log('korisnik', korisnik);
        LS.setElement('korisnici', korisnik.email, korisnik);
        prikaziDiv("ulogovan");
    } else {
        alert("Šifra i potvrda moraju biti isti");
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
