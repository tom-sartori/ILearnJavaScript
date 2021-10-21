
// Affiche la liste des livres dispos
function afficherLivresDispo (tableau) {
    afficherListe("listeLivresDisponibles", tableau, "dsp")
}

// Vide la liste des livres dispos
function viderLivresDispo () {
    viderListe("listeLivresDisponibles");
}

// Affiche la liste des livres empruntés
function afficherLivresEmp (tableau) {
    afficherListe("listeLivresEmpruntes", tableau, "emp");
}

// Vide la liste des livres empruntés
function viderLivresEmp () {
    viderListe("listeLivresEmpruntes");
}