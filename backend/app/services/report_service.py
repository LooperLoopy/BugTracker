'''
Functions that actually interact with dependencies (like db)
'''

from app.database.datamodels import Report
from app.schemas.report_schema import ReportCreate, ReportUpdate

def create_report(report_create: ReportCreate, db, user_id):
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

def get_reports(db, user_id):
    return db.query(Report).filter(Report.author_id == user_id).all()

def get_report(report_id, db, user_id):
    return db.query(Report).filter(Report.id == report_id, Report.author_id == user_id).first()

def remove_report(report_id, db, user_id):
    rows_deleted = db.query(Report).filter(Report.id == report_id, Report.author_id == user_id).delete()
    db.commit()
    return rows_deleted

def update_report(report_id, updated_report: ReportUpdate, db, user_id):
    report_query = db.query(Report).filter(Report.id == report_id, Report.author_id == user_id)
    report_query.update(updated_report.model_dump(exclude_unset=True))
    db.commit()
    return report_query.first()