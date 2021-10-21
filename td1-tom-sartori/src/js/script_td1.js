function adapterGalerie(nom) {
    for(let i = 1; i <= 6; i++) {
        const image = document.getElementById('fleur' + i);
        image.src = 'img/fleurs/' + nom + '/' + nom + i + '.jpg';
        image.alt = nom;
        image.title = nom + i;
        // ou avec la syntaxe `` qui permet le remplacement de variables
        // image.src = `img/fleurs/${nom}/${nom}${i}.jpg`
        adapterTitre(nom);
    }
}

function cacher(im) {
    im.classList.remove('visible');
    im.classList.add('cachee');
}

function afficher(im) {
    im.classList.remove('cachee');
    im.classList.add('visible');
}

function suivant(n) {
    if (Number(n) === 6)
        return 1;
    else
        return Number(n) + 1;
}

function changeBanniereV1() {
    const tab = document.getElementsByClassName('visible');
    const idSuivant = suivant(tab[0].id);
    cacher(document.getElementById(tab[0].id));
    afficher(document.getElementById(idSuivant));
}

function changeBanniereV2() {
    const tab = document.getElementsByClassName('visible');
    tab[0].style.transition = "opacity 3s";

    const doc2 = document.getElementById(suivant(tab[0].id))
    doc2.style.transition = "opacity 3s";

    cacher(document.getElementById(tab[0].id));
    afficher(doc2);
}

function adapterTitre(nom) {
    const titre = document.getElementById('titre');
    titre.innerHTML = tabTitres[nom];
}

function stopperDefilement() {
    clearInterval(chb);
}

function lancerDefilement() {
    chb = setInterval(changeBanniereV2, 600);
}

function construitInfobulle() {
    const info = document.createElement('div'); // Creation d'un <div></div>
    info.innerHTML = "<p>C'est moi la bulle !</p>"; // Ajout de balise <p> dans le div precedent
    info.id = "bulle";  // Ajout d'id au div
    info.style.position = "fixed";  // Ajout style au div
    info.style.top = "100px";   // Ajout style au div
    info.style.right = "150px"; // Ajout style au div
    info.style.backgroundColor = "darkblue";    // Ajout style au div
    info.style.color = "white"; // Ajout style au div
    info.style.borderRadius = "5px";
    info.style.paddingRight = "15px";
    document.body.appendChild(info);    // On ajoute le <div> comme fils du <body>
}

function detruitInfobulle() {
    const info = document.getElementById('bulle');  // On récupère le <div> de la bulle grace à son id
    document.body.removeChild(info);    // On supprime le fils info au body
}

function changerParametres() {
    const doc1 = document.getElementsByClassName("visible");    // Baniere actuelle
    const index1 = doc1[0].id;

    let n;
    do {
        n = Math.floor(Math.random() * 5) + 1;
    }
    while (index1 === n);

    const doc2 = document.getElementById(n) // Nouvelle banière
    doc2.style.transition = "opacity 3s";

    cacher(doc1[0]);
    afficher(doc2);
}

let chb = setInterval(changeBanniereV2, 6000);

const tabTitres = {
    'rose' : 'Galerie de roses',
    'hortensia': 'Galerie d\’hortensias',
    'fruitier': 'Galerie de fruitiers',
    'autre': 'Galerie de fleurs diverses'
};