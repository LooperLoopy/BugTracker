'''
routes for handling report operations

to test, we can override Depends(get_db) with a temporary db

so it doesn't affect real db
'''

from fastAPI import APIRouter, Depends
from ..services.report_service import create_report
from ..schemas import ReportCreate, ReportResponse
from ..database import get_db
from sqlalchemy.orm import Session
router = APIRouter(prefix="/reports")

@router.post("/create", response_model=ReportResponse)
async def create_report(report_create: ReportCreate, db: Session = Depends(get_db)):
    new_report = create_report(report_create, db)
    return new_report

