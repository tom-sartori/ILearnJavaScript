class Jeu {
    constructor(probaMine) {
        this.tresor = new Tresor(this.getRandom(20));
        this.personnage = new Personnage(this.getRandom(20));
        this.listeMines = [];

        this.carte = new Array(20);
        for (let i = 0; i < this.carte.length; i++)
            this.carte[i] = new Array(20);

        for (let i = 0; i < 20; i++)
            for (let j = 0; j < 20; j++)
                this.carte[i][j] = !this.checkAdjacence(i, j) && (Math.random() <= probaMine);

        for (let i = 0; i < 20; i++)
            for (let j = 0; j < 20; j++)
                if (this.carte[i][j]) {
                    let mine = new Mine(i, j);
                    this.listeMines.push(mine);
                }

        this.personnage.afficher();
        this.tresor.afficher();
    }

    // Retourne un entier aléatoire entre 0 et n-1
    getRandom(n) {
        return Math.floor(Math.random() * n);
    }

    checkAdjacence(i, j) {
        if (this.estAdjacent(i, j, this.tresor))
            return true;
        return this.estAdjacent(i, j, this.personnage);
    }

    estAdjacent(i, j, element) {
        if (i === element.ligne)
            if (Number(j - 1) === element.colonne || (j === element.colonne || Number(j + 1) === element.colonne))
                return true;
        if (j === element.colonne)
            if (Number(i - 1) === element.ligne || Number(i + 1) === element.ligne)
                return true;

        return false;
    }

    /**
     * Affiche toutes les mines
     */
    afficherMines() {
        for (let i = 0; i < this.listeMines.length; i++)
            this.listeMines[i].afficher();
    }

    /**
     * Cache toutes les mines
     */
    cacherMines() {
        for (let i = 0; i < this.listeMines.length; i++)
            document.getElementById("champ").removeChild(this.listeMines[i].spriteElement);
    }

    /**
     * Renvoie le nombre de mines voisines de la position courante du joueur
     * @returns {number} nombre de mines adjacentes à la position du joueur
     */
    nbMinesVoisines() {
        let nbMines = 0;
        for (let i = 0; i < this.listeMines.length; i++)
            if (this.estAdjacent(this.listeMines[i].ligne, this.listeMines[i].colonne, this.personnage))
                nbMines++;

        return nbMines;
    }

    /**
     * Indique si le joueur a gagné la partie
     * @returns {boolean} true si le joueur a gagné (position sur le trésor)
     */
    estGagne() {
        return (this.personnage.ligne === this.tresor.ligne && this.personnage.colonne === this.tresor.colonne);
    }

    /**
     * Indique si le joueur a perdu la partie
     * @returns {boolean} true si le joueur est positionné sur une mine ou son score est <= 0
     */
    estPerdu() {
        if (this.personnage.score === 0)
            return true;
        for (let i = 0; i < this.listeMines.length; i++)
            if (this.listeMines[i].ligne === this.personnage.ligne && this.listeMines[i].colonne === this.personnage.colonne)
                return true;
        return false;
    }

    // Retourne vrai si la partie est toujours en cours
    enCours() {
        return !this.estGagne() && !this.estPerdu();
    }
}
