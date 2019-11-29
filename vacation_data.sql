-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2019 at 08:31 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `admin` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `password`, `admin`) VALUES
(1, 'Vlad', 'Semyonov', 'vlad_admin', '12345', b'1'),
(8, 'Jack', 'Nicholson', 'jacky_boy', '000000', b'0'),
(9, 'John', 'Doe', 'john_doe', '567890', b'0'),
(10, 'Tom', 'Hazel', 'tommy1', '111111', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT 'No description found',
  `destination` varchar(255) CHARACTER SET utf8 NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 DEFAULT 'http://localhost/vladi_project_images/no_image.jpg',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int(50) NOT NULL,
  `follow_count` int(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `description`, `destination`, `image`, `start_date`, `end_date`, `price`, `follow_count`) VALUES
(1, 'Come to Russia, blyat!', 'Moscow, Russia', 'http://localhost/vladi_project_images/moscow-russia.jpg', '2019-06-05', '2019-06-22', 3000, 0),
(2, 'lol', 'Pyongyang, North Korea', 'http://localhost/vladi_project_images/no_image.jpg', '2019-06-04', '2019-06-21', 2500, 3),
(4, 'Come to la Paris! Ho-ho!', 'Paris, France', 'http://localhost/vladi_project_images/paris-france.jpg', '2019-06-12', '2019-06-15', 5000, 0),
(5, 'Sunshine and cocaine!', 'Mexico City, Mexico ', 'http://localhost/vladi_project_images/mexico_city-mexico.jpg', '0000-00-00', '0000-00-00', 2500, 1),
(6, 'Safest (most boring) place on earth!', 'Reykjavik, Iceland', 'http://localhost/vladi_project_images/no_image.jpg', '2019-07-25', '2019-08-08', 6000, 0),
(7, 'We sail tonight for Singapore!', 'Singapore', 'http://localhost/vladi_project_images/singapore-singapore.jpg', '2019-06-30', '2019-07-03', 5000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations_by_users`
--

CREATE TABLE `vacations_by_users` (
  `_index` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vacations_by_users`
--

INSERT INTO `vacations_by_users` (`_index`, `user_id`, `vacation_id`) VALUES
(2, 8, 2),
(1, 8, 5),
(3, 9, 2),
(4, 9, 7),
(7, 10, 2),
(6, 10, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations_by_users`
--
ALTER TABLE `vacations_by_users`
  ADD PRIMARY KEY (`_index`),
  ADD UNIQUE KEY `user_id` (`user_id`,`vacation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vacations_by_users`
--
ALTER TABLE `vacations_by_users`
  MODIFY `_index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
