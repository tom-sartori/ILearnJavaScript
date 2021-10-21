window.addEventListener("load", function () {
    document.getElementById("autocompletion").style.border = "0px";
});



function afficheVilles(tableau) {
    videVilles();
    let autoC = document.getElementById("autocompletion");

    for (let elt of tableau) {
        let p = document.createElement("p");
        p.innerText = elt;
        autoC.appendChild(p);
    }
}

function videVilles() {
    let autoC = document.getElementById("autocompletion");

    // Méthode 1 :
    //autoC.innerHTML = "";

    // Méthode 2 :
    let n = autoC.childElementCount;
    for (let i = 0; i < n; i++)
        autoC.removeChild(autoC.firstChild);
}

function maRequeteAJAX(stringVille) {
    requeteAJAX(stringVille, callback_4, function () {
        document.getElementById("loading").style.visibility = "visible";
    }, function () {
        document.getElementById("loading").style.visibility = "hidden";
    });
}

function requeteAJAX(stringVille,callback, startLoadingAction, endLoadingAction) {
    console.log("requete");
    startLoadingAction();
    let url = "php/requeteVille.php?ville=" + encodeURIComponent(stringVille);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        callback(requete);
        endLoadingAction();
    });
    requete.send(null);
}

function callback_1(req) {
    console.log(req);
}

function callback_2(req) {
    console.log(JSON.parse(req.responseText));
}

function callback_3(req) {
    let reqParsed = JSON.parse(req.responseText);
    let tabNomVilles = [];

    for (let elt of reqParsed)
        tabNomVilles.push(elt.name);

    console.log(tabNomVilles);
}

function callback_4(req) {
    let reqParsed = JSON.parse(req.responseText);
    let tabNomVilles = [];

    for (let elt of reqParsed)
        tabNomVilles.push(elt.name);

    afficheVilles(tabNomVilles);
}

let timeoutId;

document.getElementById("ville").oninput = function () {
    let valeur = document.getElementById("ville").value;
    let autoC = document.getElementById("autocompletion");
    clearTimeout(timeoutId);

    if (valeur === "") {
        autoC.style.border = "0px";
        videVilles();
    }
    else if (valeur.length >= 2) {

        timeoutId = window.setTimeout(function () {
            maRequeteAJAX(valeur);
            autoC.style.border = "1px solid grey";
        }, 500);


    }
}

document.getElementById("autocompletion").onclick = function (event) {
    let element = event.target;
    document.getElementById("ville").value = element.innerText;
    videVilles();
}

function checkSaisie () {

}
