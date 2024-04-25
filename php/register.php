<?php
require "connect.php";

$username = ucfirst(strtolower($_POST["username"]));
$email = strtolower($_POST["email"]);
$password = md5($_POST["password"]);

if(isset($username) && isset($email) && isset($password)){
	$sql = "SELECT * FROM users WHERE email ='$email' AND password = '$password'";
	$res = $conn->query($sql);

	if($res->num_rows > 0){
		echo "This user already exist!";
	}else{
		$sql = "INSERT INTO users(username, email, password) VALUES ('$username','$email','$password')";
		
		if($conn->query($sql) === TRUE){
			echo "User registered successfully!";
			sleep(3);
			header("Location: login.html");
		}else{
			echo "An Error has occurred!";
		}
	}
	$conn->close();
}else{
	echo "An error has occurred!";
}
?>