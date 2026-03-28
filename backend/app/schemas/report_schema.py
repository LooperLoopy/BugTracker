from datetime import datetime

from pydantic import BaseModel

class ReportBase(BaseModel):
    id: int
    name: str
    importance: int
    completed: bool = False

class ReportCreate(ReportBase):
    author: str
    author_id: int
    description: str
    created_at: datetime.utcnow

class ReportResponse(ReportBase):
    description: str

    class Config:
        from_attributes = True

class ReportResponseList(ReportBase):
    class Config:
        from_attributes = True
    pass
