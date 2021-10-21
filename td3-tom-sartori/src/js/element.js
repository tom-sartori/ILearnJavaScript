class Element {
    constructor(ligne, colonne, spriteURL) {
        this.ligne = ligne;     // Check valeur ? 0<= ligne < 20
        this.colonne = colonne;
        this.spriteElement = document.createElement("img");
        this.spriteElement.setAttribute("class", "element");
        this.spriteElement.setAttribute("src", spriteURL);

        this.placer(this.ligne, this.colonne);
    }

    /**
     * Déplace l'élément à la position indiquée (et replace le sprite pour qu'il soit affiché au bon endroit)
     * @param ligne {Number} indice de la ligne où placer l'élément
     * @param colonne {Number} indice de la colonne où placer l'élément
     */
    placer(ligne, colonne) {
        this.ligne = ligne;
        this.colonne = colonne;
        this.spriteElement.style.top = (51 + (20 * this.ligne)) + "px";
        this.spriteElement.style.left = (51 + (20 * this.colonne)) + "px";
    }

    /**
     * Affiche l'élément
     * Ajoute l'élément (= la balise) dans le <div id="champ">
     */
    afficher() {
        document.getElementById("champ").appendChild(this.spriteElement);
    }

    /**
     * Cache l'élément
     * Supprime l'élément du <div id="champ">
     */
    cacher() {
        let div = document.getElementById("champ");
        div.removeChild(this.spriteElement);
    }
}


class Tresor extends Element {
    constructor(colonne) {
        super(0, colonne, "img/tresor.png");
    }
}


class Mine extends Element {
    constructor(ligne, colonne) {
        super(ligne, colonne, "img/croix.png");
    }
}


class Personnage extends Element {
    constructor(colonne) {
        super(19, colonne, "img/personnage.png");
        this.score = 200;
    }

    /**
     * Exécute un déplacement du joueur horizontalement ou verticalement des valeurs passées en paramètre.
     * Si le déplacement est valide (le joueur ne sort pas de la grille 20x20), la position du personnage est modifiée
     * et le score est décrémenté de 1.
     *
     * Prérequis : exactement un des deux paramètres `dl` et `dc` est non nul, et sa valeur est 1 ou -1.
     * @param dl {Number} déplacement vertical du joueur (modifie la ligne)
     * @param dc {Number} déplacement horizontal du joueur (modifie la colonne)
     */
    deplacer(dl, dc) {
        //if (this.score === 0)
        //    return;

        const newLigne = this.ligne + dl;
        const newCol = this.colonne + dc;

        if (this.ligne !== newLigne && this.estValide(newLigne)) {
            this.ligne = newLigne;
            this.score--;
        }

        if (this.colonne !== newCol && this.estValide(newCol)) {
            this.colonne = newCol;
            this.score--;
        }

        this.placer(this.ligne, this.colonne);
    }

    estValide (position) {
        return (0 <= position && position < 20);
    }

    /**
     * Met à jour le sprite (= l'image) du personnage
     * On doit afficher l'image alternative si il y a une mine dans une case voisine
     * @param nbMinesVoisines {Number} nombre de mines dans les cases voisines
     */
    majSprite(nbMinesVoisines) {
        if (nbMinesVoisines === 0)
            this.spriteElement.setAttribute("src", "img/personnage.png");
        else
            this.spriteElement.setAttribute("src", "img/personnage2.png");
    }
}