<?php
require "./import/connect.php";
session_start();

$email = strtolower($_POST['email']);
$password = md5($_POST['password']);
if(isset($_SESSION['logged']) AND $_SESSION['logged'] === true){
	header("Location: member.php");
	return;
}
if(isset($email) && isset($password)){
	$sql = "SELECT * FROM users
		WHERE email = '$email' AND password = '$password'";
	$res = $conn -> query($sql);
	
	if($res -> num_rows > 0){
		$row = $res->fetch_assoc();
		$_SESSION['logged'] = true;
		$_SESSION['email'] = $email;
		$_SESSION['username'] = $row['username'];
		header("Location: member.php");
	}else{
		header("location: ../src/login");
	}
}else{
	header("location: ../src/login");
}
$conn->close();
?>