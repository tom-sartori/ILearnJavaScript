<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function selectAll($table_name) {
        $sql = 'Select * from ' . $table_name;
        $req_prep = Model::$pdo->prepare($sql);
        $req_prep->execute();
        $req_prep->setFetchMode(PDO::FETCH_OBJ);
        return $req_prep->fetchAll();
    }

    public static function select($table_name,$primary_key,$primary_value) {
        $sql = "SELECT * from :v1  WHERE :=v2 =:v3";
        // Préparation de la requête
        $req_prep = Model::$pdo->prepare($sql);

        $values = array(
            "v1" => $table_name,
            "v2" => $primary_key,
            "v3" => $primary_value,
        );
        $req_prep->execute($values);

        // On récupère les résultats comme précédemment
        $req_prep->setFetchMode(PDO::FETCH_OBJ);
        $tab_gen = $req_prep->fetchAll();
        // Attention, si il n'y a pas de résultats, on renvoie false
        if (empty($tab_gen))
            return false;
        return $tab_gen[0];
    }


    public static function delete($primary_value) {
        $table_name = static::$nomTable;
        $class_name = "Model" . ucfirst($table_name);
        $primary_key = static::$primary;

        $sql = "DELETE FROM " . $table_name . " WHERE " . $primary_key . " =:valeur";

        try {
            $req_prep = Model::$pdo->prepare($sql);
            $value = array(
                "valeur" => $primary_value
            );
            $req_prep->execute($value);
        } catch (PDOException $e) {
            echo $e->getMessage();
            return 0;
        }
        return 1;
    }

    public static function update($data, $primary_value) {
        $table_name = static::$nomTable;
        $primary_key = static::$primary;
        try {
            $sql = "UPDATE $table_name SET";
            foreach ($data as $key => $value) {
                $sql = $sql . " $key='$value' ,";
            }
            $sql = rtrim($sql, ',');
            $sql = $sql . "WHERE $primary_key =:valeur";
            $req_prep = Model::$pdo->prepare($sql);
            $value = array(
                "valeur" => $primary_value
            );
            $req_prep->execute($value);
        } catch (PDOException $e) {
            echo " La mise à jour dans la base a rencontré cette erreur : <br>";
            echo "{$e->getMessage()} <br><br>";
            return 0;
        }
        return 1;
    }

    public static function save($data) {
        $table_name = static::$nomTable;
        $sql = "INSERT INTO $table_name (";
        foreach ($data as $key => $value) {
            $sql = $sql . "$key ,";
        }
        $sql = rtrim($sql, ',') . ") VALUES(";
        foreach ($data as $key => $value) {
            $sql = $sql . "'£value',";
        }
        $sql = rtrim($sql, ',') . ")";
        try {
            $prep = Model::$pdo->prepare($sql);
            $prep->execute();
        } catch (PDOException $e) {
            echo "L'insertion dans la base de données a rencontré cette erreur : <br> ";
            echo "{$e->getMessage()} <br><br>";
            return 0;
        }
        return 1;
    }
}

// on initialise la connexion $pdo
Model::init_pdo();

?>
