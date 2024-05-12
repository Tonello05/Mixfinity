<!DOCTYPE html>
<html lang='it'>
<head>
	<meta charset='UTF-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1.0'>
	<link rel='stylesheet' href='../../css/userStyle.css'>
	<link href='https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap' rel='stylesheet'>
	<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' />
	<link rel="shortcut icon" href="../../img/logo.png" type="image/x-icon">
	<title>Mixfinity</title>
</head>
<body>
	<?php
	require "../../php/import/connect.php";
	session_start();

	if(!isset($_SESSION['logged']) OR $_SESSION['logged'] !== true){
		header("location: ../login/");
		return;
	}

	$sql = "SELECT * FROM updates ORDER BY date DESC";
	$updates = $conn->query($sql);

	$userEmail = $_SESSION['email'];
	$sql = "SELECT music.id AS 'music_id', title, release_date, rating, id_user, id_genre, genres.name
			FROM music
			INNER JOIN users on music.id_user = users.id
			INNER JOIN genres on music.id_genre = genres.id
			WHERE users.email LIKE '$userEmail'
			ORDER BY release_date
			LIMIT 3";
	$userSongs = $conn->query($sql);

	$sql = "SELECT music.id AS 'music_id', title, release_date, rating, id_user, id_genre, genres.name, users.username
			FROM music
			INNER JOIN users on music.id_user = users.id
			INNER JOIN genres on music.id_genre = genres.id
			ORDER BY release_date
			LIMIT 3";
	$globalSongs = $conn->query($sql);
	?>
	<div class="header">
		<img src="../../img/logo_long_transparent.png" alt="">
		<div onclick='location.href = "../../php/logout.php"' class="logout interactable">
			Log out
		</div>
	</div>
	<div class="container">
		<div class="main">
			<h2>Welcome back <?php echo $_SESSION['username']?> </h2>
			<div class="user-latest">
				<div class="top">
					<h3>Your latest songs:</h3>
					<button onclick='location.href = "../editor/"' class="interactable">Create new song</button>
				</div>
				<div class="song-container">
					<?php
					foreach ($userSongs as $song) {
						$title = $song["title"];
						$genre = $song["name"];
						$releaseDate = $song["release_date"];
						$rating = $song["rating"];
						?>
						<div class="song">
							<div class="left">
								<div class="title">
									<h4>Title: </h4>
									<p><?php echo $title;?></p>
								</div>
								<div class="genre">
									<h4>Genre: </h4>
									<p><?php echo $genre;?></p>
								</div>
								<div class="release-date">
									<h4>Release date: </h4>
									<p><?php echo $releaseDate;?></p>
								</div>
							</div>
							<div class="right">
								<div class="rating-container">
									<?php
									$activeStars = round($rating / 2);
									// Active stars
									for ($i=0; $i < $activeStars; $i++) { 
										?>
										<span class="material-symbols-rounded">star</span>
										<?php
									}
									// Unactive stars
									for ($i=0; $i < 5 - $activeStars; $i++) { 
										?>
										<span class="material-symbols-rounded unactive">star</span>
										<?php
									}
									?>
								</div>
							</div>
						</div>
						<?php
					}
					?>
				</div>
			</div>
			<div class="global-latest">
				<div class="top">
					<h3>MIxfinity latest songs:</h3>
					<button onclick='location.href = "../explore/"' class="interactable">Explore all songs</button>
				</div>
				<div class="song-container">

					<?php
					foreach ($globalSongs as $song) {
						$title = $song["title"];
						$author = $song["username"];
						$genre = $song["name"];
						$releaseDate = $song["release_date"];
						$rating = $song["rating"];
						?>
						<div class="song">
							<div class="left">
								<div class="title">
									<h4>Title: </h4>
									<p><?php echo $title;?></p>
								</div>
								<div class="author">
									<h4>Author: </h4>
									<p><?php echo $author;?></p>
								</div>
								<div class="genre">
									<h4>Genre: </h4>
									<p><?php echo $genre;?></p>
								</div>
								<div class="release-date">
									<h4>Release date: </h4>
									<p><?php echo $releaseDate;?></p>
								</div>
							</div>
							<div class="right">
								<div class="rating-container">
									<?php
									$activeStars = round($rating / 2);
									// Active stars
									for ($i=0; $i < $activeStars; $i++) { 
										?>
										<span class="material-symbols-rounded">star</span>
										<?php
									}
									// Unactive stars
									for ($i=0; $i < 5 - $activeStars; $i++) { 
										?>
										<span class="material-symbols-rounded unactive">star</span>
										<?php
									}
									?>
								</div>
							</div>
						</div>
						<?php
					}
					?>
				</div>
			</div>
		</div>
		<div class="updates">
			<h2>Latest updates: </h2>
			<div class="scroll-container">
			<?php
				foreach ($updates as $update) {
					$title = $update["title"];
					$text = $update["text"];
					$date = $update["date"];
					?>
					<div class="log">
						<h4><?php echo $title;?> | <?php echo $date;?></h4>
						<p><?php echo $text;?></p>
					</div>
					<?php
				}
				?>
			</div>
		</div>
	</div>
</body>
</html>