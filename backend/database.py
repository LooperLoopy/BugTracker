'''
you gotta install sqlalchemy guys

this class handles all the database stuff
'''

import sqlalchemy as db
from sqlalchemy.orm import Session
from datamodels import Base, Report, User

class DB:
    
    def __init__(self):
        self.engine = db.create_engine('sqlite:///backend/bug_database.db')

        Base.metadata.create_all(self.engine)

        self.session = Session(bind=self.engine)

    def add_bug(self, report: Report):
        self.session.add(report)
        self.session.commit()

    def rem_bug(self, bug_name: str):
        report = self.session.query(Report).filter_by(name=bug_name).first()

        if report:
            self.session.delete(report)
            self.session.commit()

    def rem_bug_id(self, id: int):
        report = self.session.query(Report).filter_by(id=id).first()

        if report:
            self.session.delete(report)
            self.session.commit()

    def get_all_reports(self):
        return self.session.query(Report).all()

    def clear_report_table(self):
        # be careful, this legit just clears the report table
        # not implemented
        pass

    def close(self): #handles closing of connection
        self.session.close()
db_instance = DB() #initialize db instance then pass to main