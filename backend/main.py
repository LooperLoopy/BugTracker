'''
Yay!!!
don't you love OOP

we also need FastAPI
'''

from database import DB
from datamodels import Report, User

database = DB()

# How to use!

report_to_add = Report(name="test", description="test description", importance=0)
# database.add_bug(report_to_add)
# database.rem_bug("test")

results = database.get_all_reports()

for report in results:
    print(f"ID: {report.id}, Name: {report.name}, Description: {report.description}, Importance: {report.importance}")

database.close()