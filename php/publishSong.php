<?php
session_start();
require "../php/import/connect.php";

$userId = $_SESSION["userId"];
$title = $_POST["title"];
$genreId = $_POST["genre"];
$song = $_POST["songData"];
$remixId = $_POST["remixId"];

if (!empty($remixId)) {
	$sql = "INSERT INTO music (title, data, id_user, id_genre, id_music_remix)
			VALUES('$title', '$song', $userId, $genreId, $remixId)";
} else {
	$sql = "INSERT INTO music (title, data, id_user, id_genre)
			VALUES('$title', '$song', $userId, $genreId)";
}

if($conn->query($sql) === TRUE){
	echo json_encode(array("success" => true));
}else{
	echo json_encode(array($conn->error, empty($remixId), isset($remixId)));
}

$conn->close()
?>
