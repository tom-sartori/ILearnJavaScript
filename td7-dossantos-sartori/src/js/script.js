const boutonAddAdherent = document.getElementById("ajouterAdherent");
const nomNewAdh = document.getElementById("nomAdherent");
const boutonAddLivre = document.getElementById("ajouterLivre");
const nomNewLivre = document.getElementById("titreLivre");
const adherents = document.getElementById("listeAdherents");
const livresDisp = document.getElementById("listeLivresDisponibles");
const livresEmp = document.getElementById("listeLivresEmpruntes");


document.body.onload = afficherListes;

// Affiche tous les éléments de la page.
// Sert de mise à jour de l'affichage général.
function afficherListes(){
    requeteAJAXaffichage("Adherent");
    requeteAJAXaffichage("LivresDispo");
    requeteAJAXaffichage("LivresEmp");
}

// Bouton ajouter nouvel adhérent
boutonAddAdherent.onclick = function () {
    let tabValeur = [nomNewAdh.value];
    nomNewAdh.value="";
    requeteAJAXAdd("Adherent", tabValeur);
}

// Ajoute un adhérent si on appuie sur entrer en écrivant
nomNewAdh.onkeyup = function (event) {
    if (event.key === 'Enter') {
        let tabValeur = [nomNewAdh.value];
        nomNewAdh.value="";
        requeteAJAXAdd("Adherent", tabValeur);
    }
}

// Bouton ajouter nouveau livre
boutonAddLivre.onclick = function () {
    let tabValeur = [nomNewLivre.value];
    nomNewLivre.value="";
    requeteAJAXAdd("Livre", tabValeur);
}

// Ajoute un livre si on appuie sur entrer en écrivant
nomNewLivre.onkeyup = function (event) {
    if (event.key === 'Enter') {
        let tabValeur = [nomNewLivre.value];
        nomNewLivre.value="";
        requeteAJAXAdd("Livre", tabValeur);
    }
}

// Suppression de l'adhérent avec le clic molette
adherents.onauxclick = function (event) {
    let element = event.target;
    requeteAJAXSuppression("Adherent", [getNumId(element.id)]);
}

// Suppression du livre dispo avec le clic molette
livresDisp.onauxclick = function (event) {
    let element = event.target;
    requeteAJAXSuppression("Livre", [getNumId(element.id)]);
}


// Affiche la fenetre correspondante quand on clic sur un adhérent
adherents.onclick = function (event) {
    let element = event.target;
    requeteAJAXSelection("Adherent", getNumId(element.id));
}

// Affiche la fenetre correspondante quand on clic sur un livre dispo
livresDisp.onclick = function (event) {
    let element = event.target;
    requeteAJAXSelection("LivreDispo", getNumId(element.id));
}

// Affiche la fenetre correspondante quand on clic sur un livre emprunté
livresEmp.onclick = function (event) {
    let element = event.target;
    requeteAJAXSelection("LivreEmp", getNumId(element.id));
}


// Fonction drag and drop
// Possibilité de drag un adhérent ou un livre. Au drop, ca créée l'emprunt correspondant.
let idDragStart;
document.addEventListener("dragstart", function (event) {
    idDragStart = event.target.id;
    console.log("drag : " + idDragStart);

});

// Possibilité de drag un adhérent ou un livre. Au drop, ca créée l'emprunt correspondant.
document.addEventListener("drop", function (event) {
    if (event.target.className === "dropzone" && event.target.id !== idDragStart) {
        let idDrop = event.target.id;
        console.log("drop : " + idDrop);

        let tabValeur = [];
        if (getTypeId(idDragStart) === "adh" && getTypeId(idDrop) === "dsp")
            tabValeur = [getNumId(idDragStart), getNumId(idDrop)];  // [idAdherent, idLivre]
        else if (getTypeId(idDragStart) === "dsp" && getTypeId(idDrop) === "adh")
            tabValeur = [getNumId(idDrop), getNumId(idDragStart)];  // [idAdherent, idLivre]
        else
            return;

        requeteAJAXAdd("Emprunt", tabValeur);
    }
});

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});



function requeteAJAXaffichage(nom) {
    let url = "php/requetesAffichage.php";
    let requete = new XMLHttpRequest();
    requete.open("POST", url, true);
    requete.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    requete.addEventListener("load", function () {
        afficherObjets(nom,requete);
    });
    requete.send("objet=" + nom);
}

function requeteAJAXAdd (objet, tabValeur) {
    if (tabValeur[0] !== "") {
        let url = "php/requetesAjout.php";
        let requete = new XMLHttpRequest();
        requete.open("POST", url, true);
        requete.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        requete.addEventListener("load",function () {
            afficherListes();
        })
        let urlParametres = "objet=" + objet + "&newValeur=" + tabValeur[0];
        if(objet === "Emprunt")
            urlParametres += "&newValeur1=" + tabValeur[1];

        requete.send(urlParametres);
    }
}

function requeteAJAXSelection (objet,valeur){
    console.log(valeur);
    let url = "php/requetesSelection.php";
    let requete = new XMLHttpRequest();
    requete.open("POST",url,true);
    requete.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    requete.addEventListener("load",function () {
        fenetreObjet(objet,requete,valeur);
    });
    requete.send("objet=" + objet + "&id=" + valeur);
}

function requeteAJAXSuppression(objet, tabValeur){
    let url= "php/requetesSupression.php";
    let requete= new XMLHttpRequest();
    requete.open("POST",url,true);
    requete.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    requete.addEventListener("load",function (){
        afficherListes();
    })
    let para="objet=" + objet + "&id=" + tabValeur[0];
    if(objet === "Emprunt")
        para += "&id1=" + tabValeur[1];

    requete.send(para);
}

function fenetreObjet(objet,requete,valeur){
    switch (objet) {
        case "Adherent" :
            fenetreAdherent(requete);
            break;
        case "LivreDispo" :
            fenetreLivreDispo(requete,valeur);
            break;
        case "LivreEmp" :
            fenetreLivreEmp(requete,valeur);
    }
}

function fenetreLivreDispo(req, valeur){
    let reqParsed = JSON.parse(req.responseText);
    let text= 'Prêt de "' + reqParsed.titreLivre + '" .\nN° de l\'emprunteur ?\n';
    let idNewEmprunteur=window.prompt(text);
    let tabValeur = [idNewEmprunteur,valeur];

    requeteAJAXAdd("Emprunt", tabValeur);
}

function fenetreLivreEmp(req, valeur){
    let reqParsed = JSON.parse(req.responseText);
    let text = 'Livre prêté à ' + reqParsed.nomAdherent + '.\nRetour de ce livre ?';
    let rep = window.confirm(text);
    let tabValeur = [reqParsed.idAdherent, valeur]
    if(rep)
        requeteAJAXSuppression("Emprunt", tabValeur);
}

function fenetreAdherent(req){
    let reqParsed = JSON.parse(req.responseText);
    let text= reqParsed[0]["nomAdherent"];
    if(reqParsed[0].titreLivre==null){
        text+=" n'a aucun emprunt en ce moment."
    }
    else {
        text+=" a " + reqParsed.length + " emprunts en ce moment : \n\n";
        for (let elt of reqParsed) {
            text += "- " + elt.titreLivre + "\n";
        }
    }
    window.alert(text);
}

function afficherObjets(nom,req) {
    let reqParsed = JSON.parse(req.responseText);
    //console.log(reqParsed);

    let tab = [];

    for (let elt of reqParsed) {
        let ligne = [];
        let valId, valNom, valEmp;

        if(nom === "Adherent") {
            valId = elt.idAdherent;
            valNom = elt.nomAdherent;
            valEmp = elt.nbEmprunts;
        }
        else {
            valId=elt.idLivre;
            valNom=elt.titreLivre;
        }

        (nom === "Adherent")? ligne.push(valId, valNom, valEmp) : ligne.push(valId, valNom);

        tab.push(ligne);
    }
    switch (nom){
        case "Adherent" :
            afficherAdherents(tab);
            break;
        case "LivresDispo" || "Livre" :
            afficherLivresDispo(tab);
            break;
        case "LivresEmp" :
            afficherLivresEmp(tab);
            break;
    }

}