<?php
session_start();
require "connect.php";

if(isset($_SESSION['logged']) AND $_SESSION['logged'] === true){
	$email = $_SESSION['email'];
	$sql = "SELECT * FROM music WHERE id_user = (SELECT id FROM users WHERE email = '$email')";

	$response = $conn->query($sql);
	$conn->close();
	
?>
	<!DOCTYPE html>
	<html lang='it'>
	<head>
		<meta charset='UTF-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1.0'>
		<link rel='stylesheet' href='../css/style.css'>
		<link href='https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap' rel='stylesheet'>
		<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' />
		<title>MIxfinity</title>
	</head>
	<body>
		<div class='container'>
			<div class='header'>
				<div class='logo'>
					<img src='../img/logo_long_transparent.png' alt='' srcset=''>
				</div>
				<div class='login-container'>
					<a href=''><?php $_SESSION['username'] ?></a><br>
					<a href='logout.php'>Logout</a>
				</div>
			</div>
			<div class='main'>
				<div class='center'>
					<div class='top'>
						Welcome back Username!
					</div>
					<div class='user-music'>
						Your music:
						<div class='music-container'>
							<!-- <div class='music-card'>
								Title <br>
								Style <br>
								Duration <br>
								Author <br>
								Rating
							</div> -->
<?php
	if($response->num_rows > 0){

		while ($row = $response->fetch_assoc()) {
			
			$title = $row ['title'];
			$duration = $row['duration'];
			$rating = $row['rating'];

			echo "<div class='music-card' id='music-card'>
					<br>
					".$title." <br> <br><br>
					".$duration." px <br><br>
					".$rating." <br>
					<a href=".$title.">Scarica</a>
				</div>";
		}

	}else{
		echo "non hai ancora creato nessuna canzone";
	}
?>
						</div>
					</div>
					<div class='saved-music'>
						Your favourite music:
						<div class='music-container'></div>
					</div>
				</div>
			</div>
		</div>
	</body>

	<script src="../js/member.js"></script>



	</html>
<?php
}else{
	echo "Session expired";
	//header("location: ../login.html");
}
?>