// Fonctions génériques utlisées plusieurs fois.
// Pour éviter la duplication de code.
// Exemple : affichage de la liste des adherents et livres


// Affiche la liste de idListe
function afficherListe (idListe, tableau, idElt) {
    viderListe(idListe);

    let liste = document.getElementById(idListe);
    let ul = document.createElement("ul");
    liste.appendChild(ul);

    for (let elt of tableau) {
        let li = document.createElement('li');
        li.innerText = elt[0] + " - " + elt[1];

        if (idElt === "adh" && elt[2] > 0) {
            if (elt[2] > 1)
                li.innerText += " (" + elt[2] + " emprunts)";
            else
                li.innerText += " (1 emprunt)";
        }

        if (idElt === "adh" || idElt === "dsp") {
            li.draggable = true;
            li.className = "dropzone";
        }

        li.id = idElt + elt[0]; 
        ul.appendChild(li);
    }
}

// Vide la liste de idListe
function viderListe (idListe) {
    let liste = document.getElementById(idListe);
    liste.innerHTML = "";
}

// idElt === "adh000" ou "dsp000" ou "emp000"
function getNumId (idElt) {
    return idElt.substring(3);
}

function getTypeId (idElt) {
    return idElt.substring(0, 3);
}