<?php
session_start();
require "./import/connect.php";

$_SESSION['logged'] = false;

unset($email);
header("location: ../src/index.html");

$conn->close();
?>