<?php
session_start();
require "./import/connect.php";

$_SESSION['logged'] = false;

unset($email);
header("location: ../index.html");

$conn->close();
?>