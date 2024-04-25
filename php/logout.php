<?php
session_start();
require "connect.php";

$_SESSION['logged'] = false;

unset($email);
header("location: ../login.html");

$conn->close();
?>