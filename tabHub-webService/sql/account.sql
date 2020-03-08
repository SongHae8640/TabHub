DELETE FROM webservice.account WHERE ID = 'test';
INSERT INTO webservice.account (ID, EMAIL, ROLE , CHECK_CODE) VALUE ('test','thdgo456@naver.com','USER', '4589362'); 
SELECT * FROM webservice.account;

UPDATE webservice.account SET ROLE = 'UNCERTIFID' WHERE ID ='test' AND PASSWORD = '1234';
SELECT * FROM webservice.account;


