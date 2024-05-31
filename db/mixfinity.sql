-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2024 at 12:06 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

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
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genres`
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
(8, 'R&B'),
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
-- Table structure for table `instruments`
--

CREATE TABLE `instruments` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `folder_url` varchar(100) NOT NULL,
  `notes` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instruments`
--

INSERT INTO `instruments` (`id`, `name`, `folder_url`, `notes`) VALUES
(1, 'Bass electric', 'https://nbrosowsky.github.io/tonejs-instruments/samples/bass-electric/', 'A#1,A#2,A#3,A#4,C#1,C#2,C#3,C#4,C#5,E1,E2,E3,E4,G1,G2,G3,G4'),
(2, 'Bassoon', 'https://nbrosowsky.github.io/tonejs-instruments/samples/bassoon/', 'A2,A3,A4,C3,C4,C5,E4,G2,G3,G4'),
(3, 'Cello', 'https://nbrosowsky.github.io/tonejs-instruments/samples/cello/', 'A2,A3,A4,A#2,A#3,B2,B3,B4,C2,C3,C4,C5,C#3,C#4,D2,D3,D4,D#2,D#3,D#4,E2,E3,E4,F2,F3,F4,F#3,F#4,G2,G3,G4,G#2,G#3,G#4'),
(4, 'Clarinet', 'https://nbrosowsky.github.io/tonejs-instruments/samples/clarinet/', 'A#3,A#4,A#5,D3,D4,D5,D6,F3,F4,F5,F#6'),
(5, 'Contrabass', 'https://nbrosowsky.github.io/tonejs-instruments/samples/contrabass/', 'A2,A#1,B3,C2,C#3,D2,E2,E3,F#1,F#2,G1,G#2,G#3'),
(6, 'Flute', 'https://nbrosowsky.github.io/tonejs-instruments/samples/flute/', 'A4,A5,A6,C4,C5,C6,C7,E4,E5,E6'),
(7, 'French horn', 'https://nbrosowsky.github.io/tonejs-instruments/samples/french-horn/', 'A1,A3,C2,C4,D3,D5,D#2,F3,F5,G2'),
(8, 'Guitar acoustic', 'https://nbrosowsky.github.io/tonejs-instruments/samples/guitar-acoustic/', 'A2,A3,A4,A#2,A#3,A#4,B2,B3,B4,C3,C4,C5,C#3,C#4,C#5,D2,D3,D4,D5,D#2,D#3,D#4,E2,E3,E4,F2,F3,F4,F#2,F#3,F#4,G2,G3,G4,G#2,G#3,G#4'),
(9, 'Guitar electric', 'https://nbrosowsky.github.io/tonejs-instruments/samples/guitar-electric/', 'A2,A3,A4,A5,C3,C4,C5,C6,C#2,D#3,D#4,D#5,E2,F#2,F#3,F#4,F#5'),
(10, 'Guitar nylon', 'https://nbrosowsky.github.io/tonejs-instruments/samples/guitar-nylon/', 'A2,A3,A4,A5,A#5,B1,B2,B3,B4,C#3,C#4,C#5,D2,D3,D5,D#4,E2,E3,E4,E5,F#2,F#3,F#4,F#5,G3,G5,G#2,G#4,G#5'),
(11, 'Harmonium', 'https://nbrosowsky.github.io/tonejs-instruments/samples/harmonium/', 'A2,A3,A4,A#2,A#3,A#4,B2,B3,B4,C2,C3,C4,C5,C#2,C#3,C#4,C#5,D2,D3,D4,D5,D#2,D#3,D#4,E2,E3,E4,F2,F3,F4,F#2,F#3,G2,G3,G4,G#2,G#3,G#4'),
(12, 'Harp', 'https://nbrosowsky.github.io/tonejs-instruments/samples/harp/', 'A2,A4,A6,B1,B3,B5,B6,C3,C5,D2,D4,D6,D7,E1,E3,E5,F2,F4,F6,F7,G1,G3,G5'),
(13, 'Organ', 'https://nbrosowsky.github.io/tonejs-instruments/samples/organ/', 'A1,A2,A3,A4,A5,C1,C2,C3,C4,C5,C6,D#1,D#2,D#3,D#4,D#5,F#1,F#2,F#3,F#4,F#5'),
(14, 'Piano', 'https://tonejs.github.io/audio/salamander/', 'A0,A1,A2,A3,A4,A5,A6,A7,C1,C2,C3,C4,C5,C6,C7,C8,D#1,D#2,D#3,D#4,D#5,D#6,D#7,F#1,F#2,F#3,F#4,F#5,F#6,F#7'),
(15, 'Saxophone', 'https://nbrosowsky.github.io/tonejs-instruments/samples/saxophone/', 'A4,A5,A#3,A#4,B3,B4,C4,C5,C#3,C#4,C#5,D3,D4,D5,D#3,D#4,D#5,E3,E4,E5,F3,F4,F5,F#3,F#4,F#5,G3,G4,G5,G#3,G#4,G#5'),
(16, 'Trombone', 'https://nbrosowsky.github.io/tonejs-instruments/samples/trombone/', 'A#1,A#2,A#3,C3,C4,C#2,C#4,D3,D4,D#2,D#3,D#4,F2,F3,F4,G#2,G#3'),
(17, 'Trumpet', 'https://nbrosowsky.github.io/tonejs-instruments/samples/trumpet/', 'A3,A5,A#4,C4,C6,D5,D#4,F3,F4,F5,G4'),
(18, 'Tuba', 'https://nbrosowsky.github.io/tonejs-instruments/samples/tuba/', 'A#1,A#2,A#3,D3,D4,D#2,F1,F2,F3'),
(19, 'Violin', 'https://nbrosowsky.github.io/tonejs-instruments/samples/violin/', 'A3,A4,A5,A6,C4,C5,C6,C7,E4,E5,E6,G3,G4,G5,G6'),
(20, 'Xylophone', 'https://nbrosowsky.github.io/tonejs-instruments/samples/xylophone/', 'C5,C6,C7,C8,G4,G5,G6,G7');

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `release_date` date NOT NULL DEFAULT current_timestamp(),
  `rating` decimal(3,1) NOT NULL DEFAULT 0.0,
  `id_user` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL,
  `id_music_remix` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`id`, `title`, `data`, `release_date`, `rating`, `id_user`, `id_genre`, `id_music_remix`) VALUES
(1, 'runaway', '{\"tracks\":{\"1\":{\"instrument\":\"Piano\",\"notes\":{\"0;19\":\"E6,1.411764705882353,0\",\"2;19\":\"E6,1.411764705882353,1.411764705882353\",\"4;19\":\"E6,1.411764705882353,2.823529411764706\",\"6;31\":\"E5,1.411764705882353,4.235294117647059\",\"8;20\":\"D#6,1.411764705882353,5.647058823529412\",\"10;20\":\"D#6,1.411764705882353,7.058823529411765\",\"12;20\":\"D#6,1.411764705882353,8.470588235294118\",\"14;32\":\"D#5,1.411764705882353,9.882352941176471\",\"16;22\":\"C#6,1.411764705882353,11.294117647058824\",\"18;22\":\"C#6,1.411764705882353,12.705882352941178\",\"20;22\":\"C#6,1.411764705882353,14.11764705882353\",\"22;34\":\"C#5,1.411764705882353,15.529411764705884\",\"24;26\":\"A5,1.411764705882353,16.941176470588236\",\"26;26\":\"A5,1.411764705882353,18.35294117647059\",\"28;27\":\"G#5,1.411764705882353,19.764705882352942\"}}},\"tempo\":85,\"duration\":24000}', '2024-05-11', 0.0, 1, 3, NULL),
(2, 'Lucid Dreams - Guitar', '{\"tracks\":{\"1\":{\"instrument\":\"Guitar acoustic\",\"notes\":{\"0;38\":\"A4,0.4,0\",\"3;46\":\"C#4,0.4,0.6000000000000001\",\"5;38\":\"A4,0.4,1\",\"8;39\":\"G#4,0.4,1.6\",\"11;46\":\"C#4,0.4,2.2\",\"13;39\":\"G#4,0.4,2.6\",\"16;41\":\"F#4,0.4,3.2\",\"19;48\":\"B3,0.4,3.8000000000000003\",\"21;41\":\"F#4,0.4,4.2\",\"28;42\":\"F4,0.4,5.6000000000000005\",\"24;41\":\"F#4,0.6000000000000001,4.800000000000001\",\"32;38\":\"A4,0.4,6.4\",\"35;46\":\"C#4,0.4,7\",\"37;38\":\"A4,0.4,7.4\",\"40;39\":\"G#4,0.4,8\",\"43;46\":\"C#4,0.4,8.6\",\"45;39\":\"G#4,0.4,9\",\"48;41\":\"F#4,0.4,9.600000000000001\",\"51;48\":\"B3,0.4,10.200000000000001\",\"53;41\":\"F#4,0.4,10.600000000000001\",\"56;41\":\"F#4,0.6000000000000001,11.200000000000001\",\"60;42\":\"F4,0.4,12\"}}},\"tempo\":300,\"duration\":24000}', '2024-05-11', 5.0, 1, 3, NULL),
(3, 'Runaway 2', '{\"tracks\":{\"1\":{\"instrument\":\"Piano\",\"notes\":{\"0;19\":\"E6,1.4117647058823533,0\",\"2;19\":\"E6,1.4117647058823533,1.411764705882353\",\"4;19\":\"E6,1.4117647058823533,2.823529411764706\",\"6;31\":\"E5,1.4117647058823533,4.235294117647059\",\"8;20\":\"D#6,1.4117647058823533,5.647058823529412\",\"10;20\":\"D#6,1.4117647058823533,7.058823529411765\",\"12;20\":\"D#6,1.4117647058823533,8.470588235294118\",\"14;32\":\"D#5,1.4117647058823533,9.882352941176471\",\"16;22\":\"C#6,1.4117647058823533,11.294117647058824\",\"18;22\":\"C#6,1.4117647058823533,12.705882352941178\",\"20;22\":\"C#6,1.4117647058823533,14.11764705882353\",\"22;34\":\"C#5,1.4117647058823533,15.529411764705884\",\"24;26\":\"A5,1.4117647058823533,16.941176470588236\",\"26;26\":\"A5,1.4117647058823533,18.35294117647059\",\"28;27\":\"G#5,1.4117647058823533,19.764705882352942\",\"1;55\":\"E3,4.235294117647059,0.7058823529411765\",\"7;56\":\"D#3,5.647058823529412,4.9411764705882355\",\"15;58\":\"C#3,5.647058823529412,10.588235294117649\",\"23;61\":\"A#2,5.647058823529412,16.23529411764706\"}}},\"tempo\":85,\"duration\":24000}', '2024-05-12', 8.5, 1, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `updates`
--

CREATE TABLE `updates` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `updates`
--

INSERT INTO `updates` (`id`, `title`, `text`, `date`) VALUES
(1, 'New Instruments', 'New instruments have been added, allowing you to create new and more profesional music. Instruments added: Bass electric, Bassoon, Cello, Clarinet, Contrabass, Flute, French horn, Guitar acoustic, Guitar electric, Guitar nylon, Harmonium, Harp, Organ, Piano, Saxophone, Trombone, Trumpet, Tuba, Violin, Xylophone.', '2024-05-10'),
(2, 'Released!', 'MIxfinity has now been released and can be enjoyed be anyone, anywhere they want and anytime', '2024-05-12');
(3, 'Tutorial Added','A new tutorial has beed added to the music editor page allowing new users to understand and start producing new music quickly. The editor has also been improved and some issues have been fixed.', '2024-05-31')

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Admin', 'admin@mixfinity.it', '10c4981bb793e1698a83aea43030a388');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`folder_url`);

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_music_remix` (`id_music_remix`),
  ADD KEY `id_genre` (`id_genre`) USING BTREE,
  ADD KEY `id_user` (`id_user`) USING BTREE;

--
-- Indexes for table `updates`
--
ALTER TABLE `updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `updates`
--
ALTER TABLE `updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_ibfk_1` FOREIGN KEY (`id_music_remix`) REFERENCES `music` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
