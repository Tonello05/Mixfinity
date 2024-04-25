<?php
session_start();
require "connect.php";

$email = strtolower($_POST['email']);
$password = md5($_POST['password']);

if(isset($email) && isset($password)){
	$sql = "SELECT * FROM users
		WHERE email = '$email' AND password = '$password'";
	$res = $conn -> query($sql);
	
	if($res -> num_rows > 0){
		$_SESSION['logged'] = true;
		$_SESSION['email'] = $email;
		header("Location: member.php");
	}else{
		echo "This user doesn't exist!";
	}
}else{
	echo "An error has occurred!";
}
?>