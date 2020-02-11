-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: spo
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Block`
--

DROP TABLE IF EXISTS `Block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Block` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `puzzleId` bigint(20) NOT NULL,
  `type` varchar(255) NOT NULL,
  `cellX` bigint(20) NOT NULL,
  `cellY` bigint(20) NOT NULL,
  `item` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Block`
--

LOCK TABLES `Block` WRITE;
/*!40000 ALTER TABLE `Block` DISABLE KEYS */;
INSERT INTO `Block` VALUES (1,0,'Normal',4,-3,''),(2,0,'Purple',5,-3,'Diamond'),(3,0,'Normal',6,-3,''),(4,0,'Normal',7,-3,''),(5,0,'Normal',4,-2,''),(6,0,'Purple',7,-2,'Diamond'),(7,0,'Purple',4,-1,'Diamond'),(8,0,'Normal',7,-1,''),(9,0,'Normal',0,0,''),(10,0,'Normal',1,0,''),(11,0,'Purple',2,0,'Diamond'),(12,0,'Normal',3,0,''),(13,0,'Normal',4,0,''),(14,0,'Normal',5,0,''),(15,0,'Purple',6,0,'Diamond'),(16,0,'Normal',7,0,'');
/*!40000 ALTER TABLE `Block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Puzzle`
--

DROP TABLE IF EXISTS `Puzzle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Puzzle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `lappInitX` double NOT NULL,
  `lappInitY` double NOT NULL,
  `lappInitDir` bigint(20) NOT NULL,
  `blockInitX` double NOT NULL,
  `blockInitY` double NOT NULL,
  `backInitX` double NOT NULL,
  `backInitY` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Puzzle`
--

LOCK TABLES `Puzzle` WRITE;
/*!40000 ALTER TABLE `Puzzle` DISABLE KEYS */;
INSERT INTO `Puzzle` VALUES (0,'Puzzle 0 For Test',300,300,2,300,300,0,0);
/*!40000 ALTER TABLE `Puzzle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fluent`
--

DROP TABLE IF EXISTS `fluent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fluent` (
  `id` varbinary(16) NOT NULL,
  `name` varchar(255) NOT NULL,
  `batch` bigint(20) NOT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `updatedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fluent`
--

LOCK TABLES `fluent` WRITE;
/*!40000 ALTER TABLE `fluent` DISABLE KEYS */;
INSERT INTO `fluent` VALUES (_binary ':Y(] ¼A\öª>‚T A˜','PuzzleSeeder',1,'2020-02-11 04:51:07.769493','2020-02-11 04:51:07.769493'),(_binary 's\æ¾Þ„FSª¯˜XŽ6','Puzzle',1,'2020-02-11 04:51:07.347806','2020-02-11 04:51:07.347806'),(_binary '‡aj—FEOC‚\Õ<,xbx¬','BlockSeeder',1,'2020-02-11 04:51:08.786189','2020-02-11 04:51:08.786189'),(_binary '\ËA\n—:“BX»¼^›T³l(','Block',1,'2020-02-11 04:51:07.622043','2020-02-11 04:51:07.622043');
/*!40000 ALTER TABLE `fluent` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-11 14:53:36
