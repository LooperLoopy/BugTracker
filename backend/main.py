'''
Yay!!!
don't you love OOP
'''

from collections import namedtuple
from database import DB

# This is NOT made an object on purpose
# this is because I dont care to make it one :)
Report = namedtuple('Report', ['name', 'desc'])
ReportDesciption = namedtuple('Desc', ['desc', 'serverity', 'time_added'])

database = DB()



database.close()