import datetime

from pydantic import BaseModel

class ReportBase(BaseModel):
    name: str
    description: str
    importance: int
    completed: bool = False

class ReportCreate(ReportBase):
    pass
class ReportResponse(ReportBase):
    id: int
    date_added: datetime

    class Config:
        from_attributes = True
