CREATE TABLE webservice.SYNC_TAB (
	SYNC_ID bigint unsigned,
    TITLE text NOT NULL,
    url text NOT NULL,
    
    CONSTRAINT SYNC_TAB_PK PRIMARY KEY(SYNC_ID)
);

INSERT webservice.SYNC_TG(
	ID, 
    ACCOUNT_ID, 
    CATEGORY, 
    TITLE,
    LOCAL_ID, 
    USE_DATE
    ) 
VALUES(
	(SELECT ifnull(MAX(a.ID)+1,1) FROM webservice.SYNC_TG a),
	'user', 
    'FAVORITY', 
    'TITLE',
    1578212342149,
    1578214911565
    );

 (SELECT ifnull(MAX(a.ID)+1,1) FROM webservice.SYNC_TG a);

INSERT webservice.SYNC_TAB(
	SYNC_ID,
    TITLE,
    URL
)
VALUES(
	3,
    'title',
    'URL'
);
SELECT * FROM webservice.SYNC_TAB WHERE SYNC_ID ;
SELECT * FROM webservice.SYNC_TG WHERE ACCOUNT_ID ='user';

DELETE FROM webservice.SYNC_TAB;

DELETE 
  FROM webservice.SYNC_TAB  
 WHERE SYNC_ID = 4
 ;


SELECT MAX(b.ID)+1 FROM webservice.SYNC_TG b ;



ALTER TABLE webservice.SYNC_TAB DROP PRIMARY KEY;
ALTER TABLE webservice.SYNC_TAB convert to  character set utf8;