from datetime import datetime

from pydantic import BaseModel

class ReportBase(BaseModel):
    name: str
    importance: int
    completed: bool = False

class ReportCreate(ReportBase):
    author: str
    description: str
class ReportUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    importance: int | None = None
    completed: bool | None = None
class ReportResponse(ReportBase):
    id: int
    description: str
    author_id: int
    date_added: datetime

    class Config:
        from_attributes = True

class ReportResponseList(ReportBase):
    id: int
    class Config:
        from_attributes = True
    pass
