<!DOCTYPE html>
<html lang="it">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
	<link rel="stylesheet" href="../css/editorStyle.css">
	<title>Mixfinity</title>
</head>
<body>
<?php
	// Page link ../?id_song=songId
	require "../php/connect.php";

	if(isset($_GET['id_song'])){
		$songJson = null;
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
?>	
	<header>
		<div class="toolbar">
			<button class="interactable">File</button>
			<button class="interactable">Edit</button>
			<!-- <a class="interactable" href="">Another one</a> -->
			<!-- <a class="interactable" href="">idk bruh</a> -->
		</div>
		<div class="final-toolbar">
			<button class="interactable" href="">Credits</button>
			<button class="interactable" href="">Publish</button>
			<button class="interactable" href="">User</button>
		</div>
	</header>

	<div class="container">
		<!-- Instrument list -->
		<aside>
			<div class="instrument-bar">
				<div class="interactable instrument" id="piano">
					<span class="material-symbols-rounded">music_note</span>
					<h3>piano</h3>
				</div>
				<div class="interactable instrument" id="tuba">
					<span class="material-symbols-rounded">music_note</span>
					<h3>tuba</h3>
				</div>
				<div class="interactable instrument" id="violin">
					<span class="material-symbols-rounded">music_note</span>
					<h3>violin</h3>
				</div>
				<div class="interactable instrument" id="guitar-acoustic">
					<span class="material-symbols-rounded">music_note</span>
					<h3>acoustic guitar</h3>
				</div>
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
					<a href="">
						<span class="material-symbols-rounded interactable">volume_up</span>
					</a>
					<div class="interactable" id="volume-bar"></div>
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

			<div id="track-editor-container">
				<!-- <div class="track-editor">
					<div class="track-editor-top">
						<h3 class="interactable">Instrument 1</h3>
						<button class="edit-track">
							<span class="material-symbols-rounded interactable">edit</span>
						</button>
						<button class="close-track">
							<span class="material-symbols-rounded interactable">close</span>
						</button>
					</div>
					<div class="track-container">
						<div class="line-container">
							<div class="vseparator"></div>
							<div class="hseparator"></div>
						</div>
						<div class="keys-container"></div>
						<div class="track"></div>
					</div>
				</div> -->
			</div>
		</div>
	</div>
	<div class="background"></div>
</body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js" integrity="sha512-jduERlz7En1IUZR54bqzpNI64AbffZWR//KJgF71SJ8D8/liKFZ+s1RxmUmB+bhCnIfzebdZsULwOrbVB5f3nQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="../js/script.js" type = "module"></script>
<?php
	if (!empty($songJson)) {
?>
<script type="module">
	import { SongLoader } from "../js/script.js";

	var data = <?php echo $songJson;?>;
	SongLoader.loadSong(data)
</script>
<?php
	}
?>
</html>