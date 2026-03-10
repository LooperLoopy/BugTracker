from pydantic import BaseModel

class ReportBase(BaseModel):
    name: str
    description: str
    importance: int

class ReportCreate(ReportBase):
    pass
class ReportResponse(ReportBase):
    id: int
    author: str
    date_added: str
