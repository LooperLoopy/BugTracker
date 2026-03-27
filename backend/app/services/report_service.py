'''
Functions that actually interact with dependencies (like db)
'''

from app.database.datamodels import Report

def create_report(report_create, db, user_id):
    new_report = Report(
        name = report_create.name,
        description = report_create.description,
        importance = report_create.importance,
        author = report_create.author,
        completed = report_create.completed,
        author_id = user_id
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report

def get_reports(db):
    return db.query(Report).all()

def get_report(report_id, db):
    return db.query(Report).filter(Report.id == report_id).first()

def remove_report(report_id, db):
    rows_deleted = db.query(Report).filter(Report.id == report_id).delete()
    db.commit()
    return rows_deleted
