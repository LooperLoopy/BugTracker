from ..datamodels import Report

def create_report(report_create):
    new_report = Report(
        name = report_create.name,
        description = report_create.description,
        importance = report_create.importance,
        author = "x",
        date_added = "x"
    )
    #TODO: add to db logic
    return new_report
