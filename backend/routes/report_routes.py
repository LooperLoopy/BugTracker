from fastAPI import APIRouter, Depends
from ..services.report_service import create_report
from ..schemas import ReportCreate, ReportResponse
from ..database import get_db
from sqlalchemy.orm import Session
router = APIRouter(prefix="/reports")

@router.post("/create", response_model=ReportResponse)
async def create_report(report_create: ReportCreate, session: Session = Depends(get_db)):
    new_report = create_report(report_create, session)
    return new_report

