# MySQLdb in语句的正确姿势

```
    idxs = data.get('id',[])
    fmt = ','.join(['%s'] * len(idxs))
    sql_fmt = "DELETE FROM cfg WHERE id IN ({0});".format(fmt)
    print sql_fmt
    recs = get_db_res(conn,sql_fmt,0,tuple(idxs))
    return {'error_id':0,'error_str':''}
	```






```
#!/usr/bin/env python
# coding: utf8

import MySQLdb
from MySQLdb.cursors import DictCursor


class DBHandler(object):
	def __init__(self,host,user,passwd,db):
		self.host = host
		self.user = user
		self.passwd = passwd
		self.db = db
	def GetConnection(self):

		conn = MySQLdb.connect(host=self.host,user=self.user,passwd=self.passwd,\
								db=self.db,charset='utf8')
		return conn
	def ExecuteSQL(self,sql,args = None):
		ret = 0
		try:
			conn = self.GetConnection()
			cur = conn.cursor()
			ret = cur.execute(sql, args)
			conn.commit()
		except MySQLdb.Error as e:

			return False
		finally:
			cur.close()
			conn.close()
		return ret
	def ExecuteSQLs(self,sql,args=None):
		ret = 0
		try:
			conn = self.GetConnection()
			cur = conn.cursor()
			ret = cur.executemany(sql, args)
			conn.commit()
		except MySQLdb.Error as e:
			return False
		finally:
			cur.close()
			conn.close()
		return ret

	def QueryBySQL(self,sql, args = None):
		'''
			通过sql查询数据库，正常返回查询结果，否则返回None
		'''
		results = []
		try:
			print "hello world"
			conn = self.GetConnection()
			cur = conn.cursor(cursorclass = DictCursor)

			cur.execute(sql, args)
			rs = cur.fetchall()
			for row in rs :
				results.append(row)
		except MySQLdb.Error, e:
			#logger.error("QueryBySQL error: %s" %str(e))
			print str(e)
			return None
		finally:
			cur.close()
			conn.close()

		return results

#do-->can do almost anything
	def do(self,sql,args = None):
		words=sql.strip().split(' ')
		if words[0].strip().upper()=="SELECT":
			return self.QueryBySQL(sql,args)
		elif (args==None or (not isinstance(args[0],tuple))):
				return self.ExecuteSQL(sql,args)
		else:
				return self.ExecuteSQLs(sql,args)
```





