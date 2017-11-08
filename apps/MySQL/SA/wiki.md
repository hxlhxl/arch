



- 导出表结构
mysqldump -u USER -h HOST -p -d DATABASE TABLENAME > export.sql

- 导出整个表
mysqldump -u USER -h HOST -p DATABASE TABLENAME > export.sql

- 导出整个数据库结构
mysqldump -u USER -h HOST -p -d DATABASE > export.sql

- 导出整个数据库
mysqldump -u USER -h HOST -p DATABASE > export.sql

- 删除重复记录
DELETE FROM ReqToProxyOnline WHERE req IN  (SELECT t1.t1_req FROM 
    (SELECT req AS t1_req FROM ReqToProxyOnline GROUP BY req HAVING COUNT(req) > 1 ) AS t1
)
    AND
        id NOT IN (SELECT t2.t2_id FROM 
        (SELECT MIN(id) AS t2_id FROM ReqToProxyOline GROUP BY req HAVING COUNT(req) as t2);
    )