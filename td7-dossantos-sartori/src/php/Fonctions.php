<?php
require "Model.php";

function getAdherents(){
    $sql = 'SELECT a.idAdherent, nomAdherent, COUNT(idLivre) AS \'nbEmprunts\' 
                FROM adherent a
                LEFT JOIN emprunt e ON a.idAdherent = e.idAdherent
                GROUP BY a.idAdherent, nomAdherent;';
    $req = Model::$pdo->query($sql);
    $req->setFetchMode(PDO::FETCH_OBJ);
    $tab = $req->fetchAll();
    return $tab;
}


/*
 SELECT a.idAdherent, nomAdherent, COUNT(idLivre) AS 'nbEmprunt'
FROM adherent a
LEFT JOIN emprunt e ON a.idAdherent = e.idAdherent
GROUP BY a.idAdherent, nomAdherent
 */

function getLivresDispo(){
    $sql = "SELECT * from livre WHERE idLivre NOT IN (SELECT idLivre from emprunt)";
    $req = Model::$pdo->query($sql);
    $req->setFetchMode(PDO::FETCH_OBJ);
    $tab = $req->fetchAll();
    return $tab;
}

function getLivresEmpruntes(){
    $sql = "SELECT L.idLivre,L.titreLivre FROM livre L JOIN emprunt E ON L.idLivre=E.idLivre";
    $req = Model::$pdo->query($sql);
    $req->setFetchMode(PDO::FETCH_OBJ);
    $tab = $req->fetchAll();
    return $tab;
}

function getObjets($objet) {
    switch ($objet) {
        case "Adherent" :
            return getAdherents();
        case "LivresEmp" :
            return getLivresEmpruntes();
        case "LivresDispo" || "Livre" :
            return getLivresDispo();
    }
}

//, COUNT(E.idLivre) AS 'nbEmprunts'
// GROUP BY A.idAdherent,A.nomAdherent
function selectionAdherent($valeur){
    $sql = 'SELECT nomAdherent,titreLivre
                FROM adherent A LEFT JOIN emprunt E ON A.idAdherent = E.idAdherent
                LEFT JOIN livre L ON E.idLivre=L.idLivre
                WHERE A.idAdherent=:val';
    $req = Model::$pdo->prepare($sql);
    $tab = array("val"=>$valeur);
    $req->execute($tab);
    $req->setFetchMode(PDO::FETCH_OBJ);
    $tab = $req->fetchAll();
    return $tab;
}

function selectionLivreDispo($valeur){
    $sql = "SELECT titreLivre FROM livre WHERE idLivre=:val";
    $req = Model::$pdo->prepare($sql);
    $tab = array("val" => $valeur);
    $req->execute($tab);
    $req->setFetchMode(PDO::FETCH_OBJ);
    $val = $req->fetch();
    return $val;
}

function selectionLivreEmp($valeur){
    $sql= "SELECT A.nomAdherent,A.idAdherent FROM emprunt E LEFT JOIN adherent A ON E.idAdherent=A.idAdherent WHERE idLivre=:val";
    $req = Model::$pdo->prepare($sql);
    $tab = array("val"=>$valeur);
    $req->execute($tab);
    $req->setFetchMode(PDO::FETCH_OBJ);
    $val = $req->fetch();
    return $val;
}


function selectionObjet($objet, $valeur){
    // $valeur = htmlspecialchars($valeur);
    switch ($objet){
        case "Adherent" :
            return selectionAdherent($valeur);
        case "LivreDispo" :
            return selectionLivreDispo($valeur);
        case "LivreEmp" :
            return selectionLivreEmp($valeur);
    }
}

function addAdherent($valeur){
    $valeur = htmlspecialchars($valeur);
    $sql = 'INSERT INTO adherent (nomAdherent) VALUES (?);';
    Model::$pdo->prepare($sql)->execute([$valeur]);
}

function addLivre($valeur){
    $valeur = htmlspecialchars($valeur);
    $sql = 'INSERT INTO livre (titreLivre) VALUES (?);';
    Model::$pdo->prepare($sql)->execute([$valeur]);
}

function addEmprunt($tabValeur){
    $sql= 'INSERT INTO emprunt (idAdherent,idLivre) VALUES (?,?);';
    Model::$pdo->prepare($sql)->execute([$tabValeur["idAdherent"], $tabValeur["idLivre"]]);
}

// Permet d'ajouter un adhérent ou un livre dans la base.
// type = adherent ou livre. valeur est le nom ou le titre.
function add ($objet, $valeur) {
    switch ($objet) {
        case "Adherent" :
            addAdherent($valeur);
            break;
        case "Livre" :
            addLivre($valeur);
            break;
        case "Emprunt" :
            addEmprunt($valeur);
            break;
    }
}

function supprimerAdherent($valeur){
    $sql = 'DELETE FROM adherent WHERE idAdherent=:val';
    $req = Model::$pdo->prepare($sql);
    $val= array("val" => $valeur);
    $req->execute($val);
}

function supprimerLivre($valeur){
    $sql = 'DELETE FROM livre WHERE idLivre=:val';
    $req = Model::$pdo->prepare($sql);
    $val= array("val" => $valeur);
    $req->execute($val);
}

function supprimerEmprunt($tabValeur){
    $sql = 'DELETE FROM emprunt WHERE idAdherent=:val AND idLivre=:val1';
    $req = Model::$pdo->prepare($sql);
    $val= array("val" => $tabValeur["idAdherent"] , "val1" => $tabValeur["idLivre"]);
    $req->execute($val);
}

function supprimer($objet,$valeur){
    switch ($objet) {
        case "Adherent" :
            supprimerAdherent($valeur);
            break;
        case "Livre" :
            supprimerLivre($valeur);
            break;
        case "Emprunt" :
            supprimerEmprunt($valeur);
            break;
    }
}

// Retourne le nombre d'emprunts pour l'adhérent correspondant en paramètre.
function getNbEmprunts ($idAdherent) {
    $sql = 'SELECT COUNT(*) as \'nb\' FROM emprunt WHERE idAdherent=\'' . $idAdherent . '\'; ';
    $req = Model::$pdo->query($sql);
    $req->setFetchMode(PDO::FETCH_OBJ);
    $val = $req->fetch();
    return $val;
}


?>


