#设置
SET NAMES UTF8;
#丢弃数据库
DROP DATABASE  IF EXISTS cake;
#创建新的数据库cake
CREATE DATABASE cake CHARSET=UTF8;
#进入数据库
USE cake;

/**用户信息**/
CREATE TABLE cake_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32),
	upwd VARCHAR(32),
	phone VARCHAR(16),
	birthday VARCHAR(32)
);
