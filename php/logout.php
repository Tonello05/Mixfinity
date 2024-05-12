<?php
require "./import/connect.php";
session_start();

$_SESSION['logged'] = false;

unset($email);
unset($username);
header("location: ../src/index.html");

$conn->close();
?>