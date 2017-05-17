-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: daml.ddns.net    Database: investlab
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_venda`
--

DROP TABLE IF EXISTS `t_venda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_venda` (
  `codigo_venda` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `t_produto_codigo_produto` varchar(6) NOT NULL,
  `valor_compra` decimal(10,0) NOT NULL,
  `valor_venda` decimal(10,0) NOT NULL,
  `lucrobruto_venda` decimal(10,0) NOT NULL,
  `lucroliquido_venda` decimal(10,0) NOT NULL,
  `quantidade_venda` int(10) unsigned NOT NULL,
  `data_venda` date NOT NULL,
  PRIMARY KEY (`codigo_venda`,`t_produto_codigo_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_venda`
--

LOCK TABLES `t_venda` WRITE;
/*!40000 ALTER TABLE `t_venda` DISABLE KEYS */;
INSERT INTO `t_venda` VALUES (1,'pet05',25,30,30,26,6,'2017-05-09'),(2,'BAAHH1',1,10,9,8,1,'2017-05-12');
/*!40000 ALTER TABLE `t_venda` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-16 19:30:52
