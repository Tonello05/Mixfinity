<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="../../img/logo.png" type="image/x-icon">
	<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
	<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Icons+Round'>
	<link rel="stylesheet" href="../../css/exploreStyle.css">
	<title>Mixfinity</title>
</head>
<body>
<?php
	session_start();

	if(!isset($_SESSION['logged']) OR $_SESSION['logged'] !== true){
		header("location: ../login");
	}
?>
	<div class="header">
		<img src="../../img/logo_long_transparent.png" alt="">
		<div id="user-button" class="user-container interactable">
			<?php echo $_SESSION['username']?> 
		</div>
	</div>
	<div class="container">
		<div class="search-bar-container">
			<div class="search-bar">
				<span class="material-icons-round">search</span>
				<input id="search-bar" type="text" placeholder="Search for a song.">
			</div>
			<div id="sorts-container" class="sorts-container">
				<button sort-type="rating" class="interactable">
					<span class="material-icons-round">star</span>
				</button>
				<button sort-type="title" class="interactable">
					<span class="material-icons-round">title</span>
				</button>
				<button sort-type="release_date" class="interactable selected">
					<span class="material-icons-round">calendar_month</span>
				</button>
				<button sort-type="username" class="interactable">
					<span class="material-icons-round">person</span>
				</button>
			</div>
		</div>
		<div class="song-container">
			<div id="scroll-container" class="scroll-container">
			</div>
		</div>
	</div>
</body>
<script src="../../js/explore.js"></script>
</html>