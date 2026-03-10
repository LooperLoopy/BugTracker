from fastAPI import APIRouter
from ..services.report_service import create_report
from ..schemas import ReportCreate, ReportResponse
router = APIRouter(prefix="/reports")

@router.post("/create", response_model=ReportResponse)
async def create_report(report_create: ReportCreate):
    new_report = create_report(report_create)
    return new_report

