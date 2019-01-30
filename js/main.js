var povratakNaPocetak = function () {
    location.reload();
};


LS.init('ulogovan');
LS.init('korisnici');
LS.init('filmovi');


function ajdi(id) {
    return document.getElementById(id);
}

var show = function (id) {
    document.getElementById(id).style.display = "block";
};

var hide = function (id) {
    document.getElementById(id).style.display = "none";
};


var showRegistrationForm = function () {
    show("registrationPanel");
    show("centralContentImage1")
    hide("registerTab")
    hide("logInTab");
    hide("centralContentImage")
    hide("ulogovan")
};

var showRegistrationForm = function () {
    show("registrationPanel");
    show("centralContentImage1")
    hide("registerTab")
    hide("logInTab");
    hide("centralContentImage")
    hide("ulogovan")
};




// jelUlogovan();

document.getElementById("homeTab").addEventListener('click', povratakNaPocetak);
document.getElementById("registerTab").addEventListener('click', showRegistrationForm);

