<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="../../img/logo.png" type="image/x-icon">
	<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
	<link rel="stylesheet" href="../../css/exploreStyle.css">
	<title>Mixfinity</title>
</head>
<body>
	<div class="header">
		<img src="../../img/logo_long_transparent.png" alt="">
		<div class="user-container">
			Username
		</div>
	</div>
	<div class="container">
		<div class="search-bar-container">
			<div class="search-bar">
				<span class="material-symbols-rounded">search</span>
				<input type="text" placeholder="Search for a song.">
			</div>
			<div class="sorts-container">
				<button>
					<span class="material-symbols-rounded">star</span>
				</button>
				<button class="selected">
					<span class="material-symbols-rounded">title</span>
				</button>
				<button>
					<span class="material-symbols-rounded">person</span>
				</button>
			</div>
		</div>
		<div class="song-container">
			<div class="scroll-container">
				<div class="song">
					<div class="left">
						<div class="title">
							<h3>Title: </h3>Titolo
						</div>
						<div class="author">
							<h3>Author: </h3>Autore
						</div>
						<div class="tempo">
							<h3>Tempo: </h3>130bpm
						</div>
					</div>
					<div class="right">
						<div class="mix">
							<h3>Remix of: </h3>Song name
						</div>
						<div class="rating-container">
							<button>
								<span class="material-symbols-rounded">star</span>
							</button>
							<button>
								<span class="material-symbols-rounded">star</span>
							</button>
							<button>
								<span class="material-symbols-rounded">star</span>
							</button>
							<button>
								<span class="material-symbols-rounded invalid">star</span>
							</button>
							<button>
								<span class="material-symbols-rounded invalid">star</span>
							</button>
						</div>
						<div class="buttons">
							<button id="play">Play</button>
							<button id="remix">Remix</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>