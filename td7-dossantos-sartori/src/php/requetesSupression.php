<?php
ini_set('display_errors', 'on');
include_once "Fonctions.php";

$objet=$_POST["objet"];
$val=$_POST["id"];
if(isset($_POST["id1"])) {
    $val1 = $_POST["id1"];
    $tab=array("idAdherent" => $val , "idLivre" => $val1);
    supprimer($objet, $tab);
}
else{
    supprimer($objet,$val);
}

?>