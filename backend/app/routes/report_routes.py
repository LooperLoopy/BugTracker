'''
routes for handling report operations

to test, we can override Depends(get_db) with a temporary db

so it doesn't affect real db
'''

from fastapi import APIRouter, Depends, HTTPException
import app.services.report_service as report_service
from app.schemas.report_schema import ReportCreate, ReportResponse
from app.database.database import get_db
from app.database.models import User
from sqlalchemy.orm import Session
from app.auth.access_token import get_current_user

router = APIRouter(prefix="/reports")

# Create Report
@router.post("/create", response_model=ReportResponse)
async def create_report(report_create: ReportCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        new_report = report_service.create_report(report_create, db, current_user.id)
        return new_report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get All Reports
@router.get("/", response_model=list[ReportResponse])
async def get_reports(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        reports = report_service.get_reports(db, current_user.id)
        return reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get Specific Report
@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(report_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        report = report_service.get_report(report_id, db, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if report is None:
        # do something idk
        raise HTTPException(status_code=404, detail="Report not found")

    return report

# Delete Specific Report
@router.delete("/{report_id}")
async def delete_report(report_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        deleted = report_service.remove_report(report_id, db, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if deleted == 0:
        raise HTTPException(status_code=404, detail="Report not found")

    return {"message": "Report deleted"}

# Edit
# Relieve
# ?Delete Table?????
