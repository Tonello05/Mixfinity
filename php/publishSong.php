<?php
require "../php/import/connect.php";

$title = $_POST["title"];
$genreId = $_POST["genre"];
$song = $_POST["songData"];

$sql = "INSERT INTO music (title, data, id_user, id_genre)
		VALUES('$title', '$song', 1, $genreId)";

if($conn->query($sql) === TRUE){
	echo "<br/>music added!";
}else{
	echo "<br/>An Error has occurred!";
}

?>