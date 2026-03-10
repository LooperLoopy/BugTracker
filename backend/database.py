'''
you gotta install sqlalchemy guys

this class handles all the database stuff

Ideally, we should instantiate this class one time for the server 
so that we only have one engine. However we need multiple sessions
instead of just one. Each user request will get their own session
so that they don't interfere. Implemented using a session factory aka sessionmaker
'''

import sqlalchemy as db
from sqlalchemy.orm import Session, sessionmaker
from datamodels import Base, Report, User

class DB:
    
    def __init__(self):
        self.engine = db.create_engine('sqlite:///backend/bug_database.db')

        Base.metadata.create_all(self.engine)

        self.session = Session(bind=self.engine)
        #Initialize session factory
        self.session_factory = sessionmaker(bind=self.engine)
    #Call on the session factory to generate and return a session.
    def create_session(self):
        return self.session_factory()
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
db_instance = DB() #instantiate db class
#Getter to create a unique session for each request
def get_db():
    session = db_instance.create_session() #new session
    #close session for request when done
    try:
        yield session
    finally:
        session.close()
