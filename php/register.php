<?php
require "./import/connect.php";
session_start();

$username = ucfirst(strtolower($_POST["username"]));
$email = strtolower($_POST["email"]);
$password = md5($_POST["password"]);
if(isset($_SESSION['logged']) AND $_SESSION['logged'] === true){
	header("Location: ../src/user");
	return;
}
if(isset($username) && isset($email) && isset($password)){
	$sql = "SELECT * FROM users WHERE email ='$email' AND password = '$password'";
	$res = $conn->query($sql);

	if($res->num_rows > 0){
		header("location: ../src/login/");
	}else{
		$sql = "INSERT INTO users(username, email, password) VALUES ('$username','$email','$password')";
		
		if($conn->query($sql) === TRUE){
			header("location: ../src/login/");
		}else{
			header("location: ../src/login/");
		}
	}
	$conn->close();
}else{
	header("location: ../src/register/");
}
?>