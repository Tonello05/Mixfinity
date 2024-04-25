-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 21, 2024 alle 15:57
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mixfinity`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(15, 'Alternative'),
(26, 'Ambient'),
(34, 'Bluegrass'),
(5, 'Blues'),
(33, 'Bossa Nova'),
(39, 'Breakbeat'),
(10, 'Classical'),
(6, 'Country'),
(16, 'Dance'),
(25, 'Disco'),
(38, 'Drum and Bass'),
(40, 'Dub'),
(22, 'Dubstep'),
(7, 'Electronic'),
(42, 'Experimental'),
(32, 'Flamenco'),
(11, 'Folk'),
(49, 'Folk Rock'),
(17, 'Funk'),
(28, 'Garage Rock'),
(19, 'Gospel'),
(27, 'Grunge'),
(36, 'Hard Rock'),
(3, 'Hip hop'),
(21, 'House'),
(14, 'Indie'),
(43, 'Industrial'),
(47, 'J-Pop'),
(4, 'Jazz'),
(48, 'K-Pop'),
(12, 'Metal'),
(37, 'New Wave'),
(2, 'Pop'),
(45, 'Post-rock'),
(35, 'Psychedelic'),
(13, 'Punk'),
(8, 'R&B (Rhythm and Blues)'),
(9, 'Reggae'),
(29, 'Reggaeton'),
(1, 'Rock'),
(30, 'Salsa'),
(46, 'Shoegaze'),
(24, 'Ska'),
(18, 'Soul'),
(44, 'Synth-pop'),
(31, 'Tango'),
(20, 'Techno'),
(23, 'Trap'),
(41, 'Trip hop');

-- --------------------------------------------------------

--
-- Struttura della tabella `instruments`
--

CREATE TABLE `instruments` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `file_path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `instruments`
--

INSERT INTO `instruments` (`id`, `name`, `file_path`) VALUES
(1, 'bass-electric', ''),
(2, 'bassoon', ''),
(3, 'cello', ''),
(4, 'clarinet', ''),
(5, 'contrabass', ''),
(6, 'flute', ''),
(7, 'french-horn', ''),
(8, 'guitar-acoustic', ''),
(9, 'guitar-electric', ''),
(10, 'guitar-nylon', ''),
(11, 'harmonium', ''),
(12, 'harp', ''),
(13, 'organ', ''),
(14, 'piano', ''),
(15, 'saxophone', ''),
(16, 'trombone', ''),
(17, 'trumpet', ''),
(18, 'tuba', ''),
(19, 'violin', ''),
(20, 'xylophone', '');

-- --------------------------------------------------------

--
-- Struttura della tabella `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `notes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`notes`)),
  `duration` int(3) NOT NULL,
  `release_date` date NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `file_path` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL,
  `id_music_remix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Admin', 'admin@mixfinity.it', '10c4981bb793e1698a83aea43030a388');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indici per le tabelle `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`file_path`);

--
-- Indici per le tabelle `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_music_remix` (`id_music_remix`),
  ADD KEY `id_genre` (`id_genre`) USING BTREE,
  ADD KEY `id_user` (`id_user`) USING BTREE;

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT per la tabella `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT per la tabella `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_ibfk_1` FOREIGN KEY (`id_music_remix`) REFERENCES `music` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
