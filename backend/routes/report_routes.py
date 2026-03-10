'''
routes for handling report operations

notice how we dependency inject the db/session into the handler

this is going to help us when we create unit tests for use cases

and we don't want to use a real db!!! we can use a mock

db service which is faster and standard practice for unit tests

router gives real db to service, but unit test file will give fake db to service
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

