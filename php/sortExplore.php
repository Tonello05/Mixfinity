<?php
require "../php/import/connect.php";

$sortType = $_POST["sortType"];

$sql = "SELECT music.id AS 'music_id', title, release_date, rating, id_user, id_genre, id_music_remix, genres.name, users.username
		FROM music
		INNER JOIN users on music.id_user = users.id
		INNER JOIN genres on music.id_genre = genres.id
		ORDER BY $sortType";
$songs = $conn->query($sql);

$first = true;
$count = 1;
echo "{";
foreach ($songs as $song) {
	if (!$first) {
		echo ",";
	}

	$id = $song["music_id"];
	$title = $song["title"];
	$author = $song["username"];
	$genre = $song["name"];
	$releaseDate = $song["release_date"];
	$rating = $song["rating"];
	$remixId = $song["id_music_remix"];

	$sql = "SELECT title FROM music
			WHERE id = '$remixId'";
	$remixRes = $conn->query($sql);
	if (isset($remixId)) {
		$remixTitle = $remixRes->fetch_assoc()["title"];
	} else {
		$remixTitle = "";
	}

	echo "\"$count\":{\"id\":\"$id\",\"title\": \"$title\",\"author\":\"$author\",\"genre\":\"$genre\",\"releaseDate\":\"$releaseDate\",\"rating\":\"$rating\",\"remixTitle\":\"$remixTitle\"}";

	$count++;
	$first = false;
}
echo "}";

$conn->close()
?>