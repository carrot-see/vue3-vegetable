/*
 Navicat Premium Dump SQL

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80043 (8.0.43)
 Source Host           : localhost:13306
 Source Schema         : myjs

 Target Server Type    : MySQL
 Target Server Version : 80043 (8.0.43)
 File Encoding         : 65001

 Date: 23/05/2026 19:33:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chanpin
-- ----------------------------
DROP TABLE IF EXISTS `chanpin`;
CREATE TABLE `chanpin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `qian` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `pin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `text1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `leixing` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chanpin
-- ----------------------------
INSERT INTO `chanpin` VALUES (1, 'img/tj3.jpg', '点击了解', '哦哦', '200', '新品', '好多的... ...<此处省略很多字>咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩咩', '蛋糕');
INSERT INTO `chanpin` VALUES (2, 'img/tj4.jpg', '点击了解', '哦哦~', '201', '新品', '这个新出的省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (3, 'img/tj5.jpg', '点击了解', '哦哦~', '201', '新品', '新产品快来看一下此处省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (4, 'img/tj1.jpg', '了解更多', '豆豆', '40', '儿童', '适合儿童安全省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (5, 'img/tj2.jpg', '了解更多', '梨', '100', '儿童', '0添加纯天然省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (6, 'img/tj3.jpg', '了解更多', '白糖', '200', '儿童', '唐不多反正省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (7, 'img/tj4.jpg', '了解更多', '鸡蛋', '400', '儿童', '很多鸡蛋省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (8, 'img/tj5.jpg', '了解更多', '香蕉', '400', '儿童', '香蕉和鸡蛋好吃美味省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (9, 'img/tj6.jpg', '了解更多', '桃子', '251', '儿童', '好看好吃省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (10, 'img/tj1.jpg', '点击了解', '梨花', '20', '生日', '梨花的新产品降价省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (11, 'img/tj2.jpg', '点击了解', '桃花', '40', '生日', '大促销省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (12, 'img/tj3.jpg', '点击了解', '菠萝', '50', '生日', '大促销省略100字', '蛋糕');
INSERT INTO `chanpin` VALUES (13, 'img/shouji1.jpg', '点击了解', 'oppo60', '9999.99', '新品', '新型手机续航旧，性能高', '手机');
INSERT INTO `chanpin` VALUES (14, 'img/shouji.jpg', '点击了解', 'vivo90', '59999.99', '新品', '拍照就用vivo90照亮你的心', '手机');
INSERT INTO `chanpin` VALUES (15, 'img/yemianxinxi.jpg', '点击了解', '页面技术信息', '~', '页面技术包含信息', 'router（路由和路由守卫）/pinia库/axios路由获取数据和拦截/组件/vue指令如：v-for、v-if和事件等/element插件来获取样式/本地储存/', '页面信息');

-- ----------------------------
-- Table structure for neirong
-- ----------------------------
DROP TABLE IF EXISTS `neirong`;
CREATE TABLE `neirong`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `neirong` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of neirong
-- ----------------------------
INSERT INTO `neirong` VALUES ('name', '21', '2025-12-23 13:40:42');
INSERT INTO `neirong` VALUES ('name', 'jbb ', '2025-12-26 15:13:42');
INSERT INTO `neirong` VALUES ('name', '12222222222222222222', '2025-12-26 15:33:46');
INSERT INTO `neirong` VALUES ('name', '你好，这里是蛋糕点的品论低昂', '2026-01-10 10:14:17');
INSERT INTO `neirong` VALUES ('16794904783', '是的', '2026-01-22 10:02:13');
INSERT INTO `neirong` VALUES ('16794904783', '梵蒂冈的', '2026-01-22 10:02:29');
INSERT INTO `neirong` VALUES ('16794904783', 'vgu', '2026-01-22 10:02:34');

-- ----------------------------
-- Table structure for text
-- ----------------------------
DROP TABLE IF EXISTS `text`;
CREATE TABLE `text`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `shu` int NULL DEFAULT NULL,
  `jiage` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of text
-- ----------------------------
INSERT INTO `text` VALUES (1, '你好', 17, 200);
INSERT INTO `text` VALUES (2, '不好', 2, 5000);
INSERT INTO `text` VALUES (3, '太好了', 1, 200);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shoucang` json NULL COMMENT '收藏',
  `yanzhengma` varchar(9999) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gouwuche` json NULL COMMENT '购物车',
  `buy` json NULL COMMENT '购买完成',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('16794904782', '第三次', 'Ab123', '[1, 11, 13]', '4165', '[1, 11, 2, 12, 7, 13]', '[1, 11, 13]');
INSERT INTO `user` VALUES ('16794904783', 'id666', 'Ac234', '[1, 2]', '3596', '[5, 15]', '[]');

-- ----------------------------
-- Table structure for yanzhengma
-- ----------------------------
DROP TABLE IF EXISTS `yanzhengma`;
CREATE TABLE `yanzhengma`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yanzhengma
-- ----------------------------
INSERT INTO `yanzhengma` VALUES (1, '2245', NULL);
INSERT INTO `yanzhengma` VALUES (2, '3677', NULL);
INSERT INTO `yanzhengma` VALUES (3, '3369', NULL);
INSERT INTO `yanzhengma` VALUES (4, 'sdfg', NULL);
INSERT INTO `yanzhengma` VALUES (5, 'sdgg', NULL);
INSERT INTO `yanzhengma` VALUES (6, 'esev', NULL);
INSERT INTO `yanzhengma` VALUES (7, 'tthn', NULL);
INSERT INTO `yanzhengma` VALUES (8, '3fn5', NULL);
INSERT INTO `yanzhengma` VALUES (9, '3dhy', NULL);
INSERT INTO `yanzhengma` VALUES (10, '1sv7', NULL);

SET FOREIGN_KEY_CHECKS = 1;
