'''
routes for handling report operations

to test, we can override Depends(get_db) with a temporary db

so it doesn't affect real db
'''

from fastapi import APIRouter, Depends, HTTPException
import app.services.report_service as report_service
from app.schemas.report_schema import ReportCreate, ReportResponse
from app.database.database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/reports")

# Create Report
@router.post("/create", response_model=ReportResponse)
async def create_report(report_create: ReportCreate, db: Session = Depends(get_db)):
    new_report = report_service.create_report(report_create, db)
    return new_report

# Get All Reports
@router.get("/", response_model=list[ReportResponse])
async def get_reports(db: Session = Depends(get_db)):
    reports = report_service.get_reports(db)
    return reports

# Get Specific Report
@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(report_id: int, db: Session = Depends(get_db)):
    report = report_service.get_report(report_id, db)

    if report is None:
        # do something idk
        raise HTTPException(status_code=404, detail="Report not found")

    return report

# Delete Specific Report
@router.delete("/{report_id}")
async def delete_report(report_id: int, db: Session = Depends(get_db)):
    deleted = report_service.remove_report(report_id, db)

    if deleted == 0:
        raise HTTPException(status_code=404, detail="Report not found")

    return {"message": "Report deleted"}

# Edit
# Relieve
# ?Delete Table?????