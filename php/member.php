<?php
session_start();
require "connect.php";

if(isset($_SESSION['logged']) AND $_SESSION['logged'] === true){
	echo "<h1>Ciao</h1><br>
	".$_SESSION['email']."
	<br><a href='logout.php'><button>Logout</button></a>";
}else{
	echo "Session expired";
	//header("location: ../login.html");
}
?>