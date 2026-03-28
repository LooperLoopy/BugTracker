from datetime import datetime
from app.database.datamodels import CompletionStatus
from pydantic import BaseModel

class ReportCreate(BaseModel):
    name: str
    author: str | None = None
    description: str
    importance: int
    status: CompletionStatus

class ReportUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    importance: int | None = None
    status: bool | None = None
class ReportResponse(BaseModel):
    name: str
    id: int
    description: str
    author_id: int
    date_added: datetime
    importance: int
    status: CompletionStatus
    author: str

    class Config:
        from_attributes = True

class ReportResponseList(BaseModel):
    name: str
    id: int
    description: str
    importance: int
    class Config:
        from_attributes = True
    pass
