<!DOCTYPE html>
<html lang="it">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
	<link rel="stylesheet" href="../../css/formStyle.css">
	<link rel="stylesheet" href="../../css/editorStyle.css">
	<link rel="shortcut icon" href="../../img/logo.png" type="image/x-icon">
	<title>Mixfinity</title>
</head>
<body>
<?php
	require "../../php/import/connect.php";
	session_start();
	if(!isset($_SESSION['logged']) OR $_SESSION['logged'] !== true){
		header("location: ../login");
	}
	if(isset($_GET['id_song'])){
		$id_song = $_GET["id_song"];
		$sql = "SELECT data FROM music WHERE id = $id_song";

		try {
			$res = $conn->query($sql);
			if($res->num_rows == 1){
				$songJson= $res->fetch_assoc()['data'];
			}
		} catch (Exception $e) {
			echo "Error while reading song from database<br/>$e";
			return;
		}
	}

	// Get instruments from database
	$sql = "SELECT * FROM instruments
			ORDER BY name";
	$res = $conn->query($sql);

	if ($res->num_rows == 0) {
		echo "Instruments not found in database<br/>";
		return;
	} else {
		$instruments = $res;
	}

	// Get genres from database
	$sql = "SELECT * FROM genres
			ORDER BY name";
	$res = $conn->query($sql);

	if ($res->num_rows == 0) {
		echo "Genres not found in database<br/>";
		return;
	} else {
		$genres = $res;
	}
?>	
	<header id="header" class="">
		<div class="toolbar topbar-div">
			<div>
				<button id="file" class="interactable dropdown-button">File</button>
				<div class="dropdown" hidden>
					<button id="new-editor" class="interactable">New Editor</button>
					<button id="exit" class="interactable">Exit</button>
				</div>
			</div>
			<!-- <div>
				<button id="edit" class="interactable dropdown-button">Edit</button>
				<div class="dropdown" hidden>
					<button id="opt1" class="interactable">Option1</button>
					<button id="opt2" class="interactable">Option2</button>
				</div>
			</div> -->
		</div>
		<div class="final-toolbar topbar-div">
			<button id="credits" class="interactable">Credits</button>
			<button id="publish" class="interactable">Publish</button>
			<div id="user"><?php echo $_SESSION['username']; ?></div>
		</div>
	</header>

	<div id="container" class="container">
		<!-- Instrument list -->
		<aside>
			<div class="instrument-bar">
				<?php
				foreach ($instruments as $instrument) {
					$name = $instrument["name"];
					$folderUrl = $instrument["folder_url"];
					$notes = $instrument["notes"];

					?>
					<div class="interactable instrument" id="<?php echo $name;?>" folder_url="<?php echo $folderUrl;?>" notes="<?php echo $notes;?>">
						<span class="material-symbols-rounded">music_note</span>
						<h3><?php echo $name;?></h3>
					</div>
					<?php
				}
				?>
			</div>
		</aside>
		<!-- End instrument list -->

		<div class="main-container">
			<div class="song-controls">
				<div class="bar-left">
					<!-- Music controls -->
					<button id="toStart" class="interactable">
						<span class="material-symbols-rounded">keyboard_double_arrow_left</span>
					</button>
					<button id="play" class="interactable">
						<span class="material-symbols-rounded">play_arrow</span>
					</button>
					<button id="pause" class="interactable">
						<span class="material-symbols-rounded">pause</span>
					</button>
					<button id="stop" class="interactable">
						<span class="material-symbols-rounded">stop</span>
					</button>
					<button id="toEnd" class="interactable">
						<span class="material-symbols-rounded">double_arrow</span>
					</button>
					<!-- End music controls -->
				</div>
				<div class="bar-center">
					<!-- Track editor controls -->
					<button id="track-mode-select" class="interactable">
						<span class="material-symbols-rounded">arrow_selector_tool</span>
					</button>
					<button id="track-mode-add" class="selected interactable">
						<span class="material-symbols-rounded">music_note</span>
					</button>
					<button id="track-mode-resize" class="interactable">
						<span class="material-symbols-rounded">width</span>
					</button>
					<button id="track-mode-remove" class="interactable">
						<span class="material-symbols-rounded">delete</span>
					</button>
					<!-- End track editor controls -->
				</div>
				<div class="bar-right">
					<!-- Volume -->
					<button id="volume-button" class="interactable">
						<span class="material-symbols-rounded interactable">volume_up</span>
					</button>
					<div class="interactable" id="volume-bar">
						<div id="volume"></div>
					</div>
					<!-- End volume -->
				</div>
			</div>

			<div class="timeline-container">
				<div class="tempo-container">
					<input type="number" name="" value="120" id="tempo">
				</div>
				<div id="timeline">
					<div class="playhead">
						<span class="arrow material-symbols-rounded">arrow_drop_down</span>
						<div class="line"></div>
					</div>
				</div>
			</div>

			<div id="track-editor-container"></div>
		</div>
	</div>

	<div hidden id="publish-container" class="publish">
		<div class="publish-container">
			<div class="form-container">
				<h3>Publish Song</h3>
				<form name="input" id="publish-form">
					<div class="input-container">
						<input id="song-title" type="text" min="3" maxlength="30" placeholder="Song title" name="title" required>
						<input id="remix-input" type="text" name="remix-id">
						<input id="song-input" type="text" name="song">
						<div class="custom-select">
							<select name="genre" id="select-form">
								<option selected value=0></option>
								<?php
								foreach ($genres as $genre) {
									$id = $genre["id"];
									?>
									<option value="<?php echo $id;?>"></option>
									<?php
								}
								?>
							</select>
							<div id="genre-header" class="select-header interactable">
								<div class="select-text">Select song genre</div>
								<div class="select-arrow">
									<span id="genre-arrow" class="material-symbols-rounded">expand_more</span>
								</div>
							</div>
							<div id="genre-select" hidden class="select-container">
								<div class="scroll-container">
								<?php
								foreach ($genres as $genre) {
									$id = $genre["id"];
									$name = $genre["name"];
									?>
									<div genre-id="<?php echo $id;?>" class="genre-item interactable"><?php echo $name;?></div>
									<?php
								}
								?>
								</div>
							</div>
						</div>
					</div>
					<div class="bottom-container">
						<div></div>
						<div id="genre-buttons">
							<button id="cancel-submit" type="button" class="interactable">Cancel</button>
							<button id="genre-submit" type="button" class="interactable">Publish</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="error-message-container">
		<div hidden id="error-message" class="error-message">
			<div class="errror-title">Error</div>
			<div class="divisor"></div>
			<div id="error-content"></div>
		</div>
	</div>

	<div hidden id="credits-panel">
		<div class="credits-container">
			<div class="credits">
				<div class="top">
					<h2>Credits</h2>
					<button id="close-credits" class="close-credits interactable">
						<span class="material-symbols-rounded">close</span>
					</button>
				</div>
				<h3>Developers</h3>
				<div class="devs">
					<div>Front-end, Music editor - Ricatti Luca</div>
					<div>Back-end, Database - Wu YiJun</div>
					<div>Font-end, Sound managment - Tonello Samuele</div>
				</div>
				<hr>
				<h3>External Tools</h3>
				<div class="tools">
					<div>Tone.js</div>
				</div>
			</div>
		</div>
	</div>
</body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js" integrity="sha512-jduERlz7En1IUZR54bqzpNI64AbffZWR//KJgF71SJ8D8/liKFZ+s1RxmUmB+bhCnIfzebdZsULwOrbVB5f3nQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="../../js/editorController.js" type = "module"></script>
<script src="../../js/publishSong.js"></script>
<?php
	if (!empty($songJson)) {
?>
<script type="module">
	document.getElementById("remix-input").value="<?php echo $_GET['id_song'];?>"

	import { SongLoader } from "../../js/editorController.js";

	var data = <?php echo $songJson;?>;
	SongLoader.loadSong(data)
</script>
<?php
	}
$conn->close();
?>
</html>