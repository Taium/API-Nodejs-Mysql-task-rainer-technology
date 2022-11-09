-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2022 at 04:09 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointment_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `date` varchar(20) NOT NULL,
  `time` varchar(20) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `doctor_id`, `patient_id`, `date`, `time`, `reason`, `status`, `created_at`) VALUES
(2, 1, 1, '22-10-2022', '9:20-9:40', '', 0, '2022-11-05 13:58:19'),
(3, 3, 1, '30-10-2022', '8:00-8:20', '', 0, '2022-11-05 14:16:30'),
(4, 3, 5, '16-10-2022', '8:00-8:20', '', 0, '2022-11-07 12:41:03');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `category` varchar(30) NOT NULL,
  `hos_name` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `name`, `category`, `hos_name`, `created_at`) VALUES
(1, 'Dr. saifullah islam', 'medicine', 'Dhaka medical college', '2022-11-05 02:09:43'),
(3, 'Dr. sirajul islam', 'surgery', 'Dhaka medical college', '2022-11-05 02:09:51'),
(4, 'Dr. nayon hasan', 'medicine', 'khulna medical college', '2022-11-05 02:09:51');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `contact_no` int(20) NOT NULL,
  `weight` int(11) NOT NULL,
  `pressure` varchar(20) NOT NULL,
  `role` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `name`, `email`, `password`, `age`, `contact_no`, `weight`, `pressure`, `role`, `created_at`) VALUES
(1, 'abc', 'abc@gmail.com', 'abc123', 45, 1234556, 77, '70/80', 0, '2022-11-05 01:04:07'),
(3, 'taium', 'taium@gmail.com', 'taium123', 0, 1912345678, 0, '', 0, '2022-11-05 01:31:49'),
(4, 'shamim', 'shamim@gmail.com', 'shamim123', 0, 1712345678, 0, '', 0, '2022-11-06 11:13:56'),
(5, 'Taium Ahmed', 'taium44@gmail.com', 'taium123', 0, 2147483647, 0, '', 0, '2022-11-07 12:36:40'),
(6, 'admin', 'admin@gmail.com', '123456', 0, 0, 0, '', 1, '2022-11-09 00:09:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
