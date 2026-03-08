'''
the db will be local (Serverless)
it literally would be better if the stuff was stored in a server but whtever
We are using SQLite if we want to switch to SQL then cool ig.
'''

import sqlite3
from collections import namedtuple

class DB:
    
    def __init__(self):
        self.conn = sqlite3.connect('backend/bug_database.db')
        self.cursor = self.conn.cursor()

    def add_bug(self, bug):
        # bug is a Report object
        pass

    def rem_bug(self, bug_name):
        # tries to remove bug with its name
        pass

    def close(self): #handles closing of connection
        self.cursor.close()