'''
We will unit test the functions in here, passing a fake db.

see the cool thing is that these functions don't care

what db they are passed. 
'''

from ..datamodels import Report

def create_report(report_create, db):
    new_report = Report(
        name = report_create.name,
        description = report_create.description,
        importance = report_create.importance,
        author = report_create.author,
        completed = report_create.completed
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report
