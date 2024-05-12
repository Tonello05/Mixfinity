<?php
session_start();

$_SESSION['logged'] = false;

unset($email);
unset($username);
unset($userId);
header("location: ../src/");
?>