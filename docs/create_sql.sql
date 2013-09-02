-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.6.12-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              8.0.0.4436
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura do banco de dados para whatsplace
CREATE DATABASE IF NOT EXISTS `whatsplace` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `whatsplace`;


-- Copiando estrutura para tabela whatsplace.convite
CREATE TABLE IF NOT EXISTS `convite` (
  `id_universo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `texto_convite` varchar(255) DEFAULT NULL,
  `pendente_convite` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_universo`),
  KEY `FK_CONVITE_UNIVERSO` (`id_universo`),
  CONSTRAINT `FK_CONVITE_CONVIDADO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `FK_CONVITE_UNIVERSO` FOREIGN KEY (`id_universo`) REFERENCES `universo` (`id_universo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela whatsplace.local
CREATE TABLE IF NOT EXISTS `local` (
  `id_local` int(11) NOT NULL AUTO_INCREMENT,
  `nome_local` varchar(50) NOT NULL,
  `latitude_local` float DEFAULT NULL,
  `longitude_local` float DEFAULT NULL,
  `gerente_local` int(11) NOT NULL,
  `universo_local` int(11) NOT NULL,
  PRIMARY KEY (`id_local`),
  UNIQUE KEY `UNQ_NOME_LOCAL` (`nome_local`),
  KEY `FK_LOCAL_GERENTE` (`gerente_local`),
  KEY `FK_LOCAL_UNIVERSO` (`universo_local`),
  CONSTRAINT `FK_LOCAL_GERENTE` FOREIGN KEY (`gerente_local`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `FK_LOCAL_UNIVERSO` FOREIGN KEY (`universo_local`) REFERENCES `universo` (`id_universo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela whatsplace.mensagem
CREATE TABLE IF NOT EXISTS `mensagem` (
  `id_mensagem` int(11) NOT NULL AUTO_INCREMENT,
  `texto_mensagem` varchar(255) NOT NULL,
  `horario_mensagem` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `destinatario_mensagem` int(11) NOT NULL,
  `remetente_mensagem` int(11) NOT NULL,
  PRIMARY KEY (`id_mensagem`),
  KEY `FK_MENSAGEM_USUARIO1` (`destinatario_mensagem`),
  KEY `FK_MENSAGEM_USUARIO2` (`remetente_mensagem`),
  CONSTRAINT `FK_MENSAGEM_USUARIO1` FOREIGN KEY (`destinatario_mensagem`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `FK_MENSAGEM_USUARIO2` FOREIGN KEY (`remetente_mensagem`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela whatsplace.rastreamento
CREATE TABLE IF NOT EXISTS `rastreamento` (
  `id_usuario` int(11) NOT NULL,
  `id_local` int(11) NOT NULL,
  `data_entrada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_saida` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`,`id_local`),
  KEY `FK_RASTREAMENTO_LOCAL` (`id_local`),
  CONSTRAINT `FK_RASTREAMENTO_LOCAL` FOREIGN KEY (`id_local`) REFERENCES `local` (`id_local`),
  CONSTRAINT `FK_RASTREAMENTO_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela whatsplace.universo
CREATE TABLE IF NOT EXISTS `universo` (
  `id_universo` int(11) NOT NULL AUTO_INCREMENT,
  `nome_universo` varchar(50) NOT NULL,
  `privado_universo` tinyint(1) NOT NULL,
  `administrador_universo` int(11) NOT NULL,
  PRIMARY KEY (`id_universo`),
  KEY `FK_UNIVERSO_ADMINISTRADOR` (`administrador_universo`),
  CONSTRAINT `FK_UNIVERSO_ADMINISTRADOR` FOREIGN KEY (`administrador_universo`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela whatsplace.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(50) NOT NULL,
  `email_usuario` varchar(50) NOT NULL,
  `senha_usuario` varchar(45) NOT NULL,
  `codigo_confirmacao_usuario` varchar(100) DEFAULT NULL,
  `avatar_usuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela whatsplace.usuario_gerencia_universo
CREATE TABLE IF NOT EXISTS `usuario_gerencia_universo` (
  `id_usuario` int(11) NOT NULL,
  `id_universo` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_universo`),
  KEY `FK_GERENCIA_UNIVERSO` (`id_universo`),
  CONSTRAINT `FK_GERENCIA_UNIVERSO` FOREIGN KEY (`id_universo`) REFERENCES `universo` (`id_universo`),
  CONSTRAINT `FK_USUARIO_GERENCIA` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela whatsplace.usuario_participa_universo
CREATE TABLE IF NOT EXISTS `usuario_participa_universo` (
  `id_usuario` int(11) NOT NULL,
  `id_universo` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_universo`),
  KEY `FK_PARTICIPA_UNIVERSO` (`id_universo`),
  CONSTRAINT `FK_PARTICIPA_UNIVERSO` FOREIGN KEY (`id_universo`) REFERENCES `universo` (`id_universo`),
  CONSTRAINT `FK_USUARIO_PARTICIPA` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
