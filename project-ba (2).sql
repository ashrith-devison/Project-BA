-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 03, 2024 at 08:36 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project-ba`
--
CREATE DATABASE IF NOT EXISTS `project-ba` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `project-ba`;

-- --------------------------------------------------------

--
-- Table structure for table `ba_test`
--

DROP TABLE IF EXISTS `ba_test`;
CREATE TABLE IF NOT EXISTS `ba_test` (
  `Test_ID` int NOT NULL AUTO_INCREMENT,
  `Employee_ID` int NOT NULL,
  `Device_No` varchar(21) NOT NULL,
  `test_percent` decimal(7,5) NOT NULL,
  `test_time` datetime NOT NULL,
  `Tester_Name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Status` enum('Approved','Rejected','Pending','') NOT NULL DEFAULT 'Pending',
  `Remarks` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Test_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ba_test`
--

INSERT INTO `ba_test` (`Test_ID`, `Employee_ID`, `Device_No`, `test_percent`, `test_time`, `Tester_Name`, `Status`, `Remarks`) VALUES
(1, 10005178, '12345', 1.00000, '2024-06-02 21:24:21', 'raghu', 'Rejected', ''),
(2, 10022523, '12345', 0.00000, '2024-06-02 21:30:31', 'raghu', 'Approved', ''),
(3, 14, 'VM', 0.00000, '2024-06-03 12:38:47', 'YU', 'Approved', ''),
(4, 18, 'TY', 0.00000, '2024-06-03 12:41:15', 'yuvika', 'Approved', '2 nd time failed'),
(5, 21, '23', 0.00000, '2024-06-03 10:54:52', 'Mehta', 'Approved', '2 nd time successfull'),
(6, 13, '23', 1.00000, '2024-06-03 12:46:20', 'Arya Mahajan', 'Rejected', '2 nd time Failed'),
(7, 12, '', 0.00000, '0000-00-00 00:00:00', '', 'Pending', ''),
(8, 22, '', 0.00000, '0000-00-00 00:00:00', '', 'Pending', ''),
(9, 17, '', 0.00000, '0000-00-00 00:00:00', '', 'Pending', '');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `Department_Id` varchar(5) NOT NULL,
  `Department_name` varchar(20) NOT NULL,
  PRIMARY KEY (`Department_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`Department_Id`, `Department_name`) VALUES
('1', 'CNS'),
('2', 'ATC'),
('3', 'FIRE'),
('4', 'ELECTRICAL'),
('5', 'DRIVERS');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `Employee_ID` int NOT NULL,
  `Emp_Name` varchar(50) DEFAULT NULL,
  `Designation` varchar(50) DEFAULT NULL,
  `Department_Id` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`),
  KEY `Department_Id` (`Department_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`Employee_ID`, `Emp_Name`, `Designation`, `Department_Id`) VALUES
(10020307, 'DURBADAL BRAHMACHARI', 'DGM', '2'),
(10008480, 'SANT KUMAR', 'MGR', '2'),
(10005178, 'N. ARUN KUMAR RATHOD', 'AM', '2'),
(10022523, 'ARJUN P', 'JE', '2'),
(10001851, 'K NAVEEN', 'JE', '2'),
(10000936, 'SURAJ KUMAR', 'Manager', '1'),
(10017620, 'VANGARA NAVEEN', 'AM', '1'),
(10017665, 'BONAM VENKAT SUMANTH', 'AM', '1'),
(10018037, 'MEDI SHETTY SHARAN KUMAR', 'AM', '1'),
(10021884, 'DEVARAKONDA YESU BABU', 'Supervisor', '1'),
(5, 'MOHAN', 'SKILLED', ''),
(6, 'PAVAN KUMAR', 'SKILLED', '1'),
(7, 'SUNIL', 'SKILLED', ''),
(17, 'SYED HIDAYATULLA HUSSAINI', 'SEMI SKILLED', '4'),
(12, 'ANAND KUMAR', 'SEMI SKILLED', '4'),
(8, 'BALWANTH REDDDY', 'SEMI SKILLED', ''),
(13, 'ARVIND KUMAR', 'SEMI SKILLED', '4'),
(18, 'AMBRESH', 'SEMI SKILLED', '4'),
(21, 'SANTOSH', 'UN SKILLED', '4'),
(22, 'ASHOK', 'UN SKILLED', '4'),
(14, 'TOLAPASH', 'UN SKILLED', '4'),
(10, 'KIRAN. G', 'SEMI SKILLED', '1'),
(19, 'KIRAN', 'UN SKILLED', '4'),
(20, 'ANIL', 'UN SKILLED', '4'),
(15, 'BHADRAPPA', 'SEMI SKILLED', '4'),
(16, 'JYOTIRLING', 'SEMI SKILLED', '4'),
(11, 'PRABHULIN G', 'SEMI SKILLED', ''),
(9, 'MAHABOOB', 'SEMI SKILLED', ''),
(23, 'HARISH', 'UN SKILLED', '4'),
(10015976, 'PK VIJAYAKUMAR', 'AM', '3'),
(10017518, 'MOHAMMED SHARIEF', 'AM', '3'),
(10013978, 'SHARANAYYA', 'SR SUPDT', '4'),
(10000724, 'AMEEN PASHA', 'SR SUPDT', '4'),
(10013706, 'M JAYAKUMAR', 'SUPRDT', '4'),
(100, 'Arya Mahajan', 'MGR', '1');

-- --------------------------------------------------------

--
-- Table structure for table `employee_shiftassignment`
--

DROP TABLE IF EXISTS `employee_shiftassignment`;
CREATE TABLE IF NOT EXISTS `employee_shiftassignment` (
  `Employee_ID` int DEFAULT NULL,
  `ShiftID` varchar(3) DEFAULT NULL,
  `Department_ID` varchar(5) NOT NULL,
  KEY `Employee_ID` (`Employee_ID`),
  KEY `ShiftID` (`ShiftID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee_shiftassignment`
--

INSERT INTO `employee_shiftassignment` (`Employee_ID`, `ShiftID`, `Department_ID`) VALUES
(10020307, 'S2', '2'),
(10008480, 'S2', '2'),
(10005178, 'S1', '2'),
(10022523, 'S2', '2'),
(10001851, 'S3', '2'),
(17, 'S1', '4'),
(12, 'S1', '4'),
(13, 'S1', '4'),
(18, 'S1', '4'),
(21, 'S1', '4'),
(22, 'S1', '4'),
(14, 'S1', '4');

-- --------------------------------------------------------

--
-- Table structure for table `envdata`
--

DROP TABLE IF EXISTS `envdata`;
CREATE TABLE IF NOT EXISTS `envdata` (
  `dept_code` varchar(6) NOT NULL,
  `randomized_time` datetime NOT NULL,
  `percent` int NOT NULL,
  PRIMARY KEY (`dept_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `envdata`
--

INSERT INTO `envdata` (`dept_code`, `randomized_time`, `percent`) VALUES
('1_S1', '2022-05-27 12:00:00', 80),
('2_S2', '2024-06-02 21:27:52', 80),
('2_S1', '2024-06-02 21:23:37', 80),
('1_S2', '2022-05-27 12:00:00', 80),
('1_S3', '2022-05-27 12:00:00', 80),
('1_GEN', '2022-05-27 12:00:00', 80),
('2_S3', '2022-05-27 12:00:00', 80),
('2_GEN', '2022-05-27 12:00:00', 80),
('3_S1', '2022-05-27 12:00:00', 80),
('3_S2', '2022-05-27 12:00:00', 80),
('3_S3', '2022-05-27 12:00:00', 80),
('3_GEN', '2022-05-27 12:00:00', 80),
('4_S1', '2024-06-03 08:22:14', 80),
('4_S2', '2022-05-27 12:00:00', 80),
('4_S3', '2022-05-27 12:00:00', 80),
('4_GEN', '2022-05-27 12:00:00', 80),
('5_S1', '2022-05-27 12:00:00', 80),
('5_S2', '2022-05-27 12:00:00', 80),
('5_S3', '2022-05-27 12:00:00', 80),
('5_GEN', '2022-05-27 12:00:00', 80);

-- --------------------------------------------------------

--
-- Table structure for table `login_credentials`
--

DROP TABLE IF EXISTS `login_credentials`;
CREATE TABLE IF NOT EXISTS `login_credentials` (
  `username` varchar(10) NOT NULL,
  `passkey` varchar(25) NOT NULL,
  `role` enum('admin','employee','BA Tester','HOD_1','HOD_2','HOD_3','HOD_4','HOD_5') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `login_credentials`
--

INSERT INTO `login_credentials` (`username`, `passkey`, `role`) VALUES
('22BCB7012', 'vit@', 'admin'),
('AAI_Admin', '12345', 'admin'),
('ATC_HOD', '12345', 'HOD_2'),
('DRIVER_HOD', '12345', 'HOD_5'),
('ELECTRICAL', '12345', 'HOD_4'),
('FIRE_HOD', '12345', 'HOD_3'),
('BA_Tester', '12345', 'BA Tester'),
('CNS_HOD', '12345', 'HOD_1');

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
CREATE TABLE IF NOT EXISTS `shifts` (
  `ShiftID` int NOT NULL,
  `ShiftName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ShiftID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `shifts`
--

INSERT INTO `shifts` (`ShiftID`, `ShiftName`) VALUES
(1, 'Morning Shift'),
(2, 'Night Shift'),
(3, 'General Shift');

-- --------------------------------------------------------

--
-- Table structure for table `shift_assigned`
--

DROP TABLE IF EXISTS `shift_assigned`;
CREATE TABLE IF NOT EXISTS `shift_assigned` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Employee_ID` int NOT NULL,
  `ShiftID` varchar(4) DEFAULT NULL,
  `randomized_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ShiftID` (`ShiftID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `shift_assigned`
--

INSERT INTO `shift_assigned` (`id`, `Employee_ID`, `ShiftID`, `randomized_time`) VALUES
(4, 18, 'S1', '2024-06-03 08:22:14'),
(3, 14, 'S1', '2024-06-03 08:22:14'),
(5, 21, 'S1', '2024-06-03 08:22:14'),
(6, 13, 'S1', '2024-06-03 08:22:14'),
(7, 12, 'S1', '2024-06-03 08:22:14'),
(8, 22, 'S1', '2024-06-03 08:22:14'),
(9, 17, 'S1', '2024-06-03 08:22:14');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
