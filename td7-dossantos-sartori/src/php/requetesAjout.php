<?php
ini_set('display_errors', 'on');
include_once "Fonctions.php";

$objet=$_POST["objet"];
$val=$_POST["newValeur"];
if(isset($_POST["newValeur1"])) {
    $val1 = $_POST["newValeur1"];
    $tab = array("idAdherent" => $val , "idLivre" => $val1);
    add($objet, $tab);
}
else{
    add($objet,$val);
}


?>