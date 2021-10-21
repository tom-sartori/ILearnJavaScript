let jeu;  // variable globale représentant le jeu actuel
let clickA = false;

document.addEventListener("keydown", function (event) {
    if (jeu.enCours()) {
        switch (event.key) {
            case 'ArrowLeft':
                jeu.personnage.deplacer(0, -1);
                break;
            case 'ArrowUp':
                jeu.personnage.deplacer(-1, 0);
                break;
            case 'ArrowRight':
                jeu.personnage.deplacer(0, 1);
                break;
            case 'ArrowDown':
                jeu.personnage.deplacer(1, 0);
                break;
            default:
        }
        miseAJour();
    }
});


/**
 * Met à jour la partie et l'affichage pour le joueur en fonction de la position du joueur
 * - indique si la partie est gagnée ou perdue
 * - indique le nombre de mines à proximité du joueur
 * - affiche le score du joueur
 * - met à jour l'image représentant le joueur
 */
function miseAJour() {
    document.getElementById("score").innerText = jeu.personnage.score;
    jeu.personnage.majSprite(jeu.nbMinesVoisines());
    if (jeu.enCours())
        document.getElementById("message").innerText = jeu.nbMinesVoisines();

    if (jeu.estGagne()) {
        document.getElementById("message").innerText = "Gagné !";
        jeu.afficherMines();
    }
    if (jeu.estPerdu()) {
        document.getElementById("message").innerText = "Perdu !";
        jeu.afficherMines();
    }
}


/**
 * Démarre une nouvelle partie
 */
function nouvellePartie() {
    document.getElementById("champ").innerHTML = "";
    jeu = new Jeu(0.1);

    miseAJour();
}


window.addEventListener("load", function () {
    nouvellePartie();
});

document.getElementById("nouvelle-partie").onclick = function () {
    nouvellePartie();
}

document.addEventListener("keypress", function (event) {
    if (!clickA) {
        clickA = true;
        jeu.afficherMines();
        setTimeout(() => {
            jeu.cacherMines();
            clickA = false;
        }, 1000);
        console.log("time");
        jeu.personnage.score += -50;
        miseAJour();
    }
})