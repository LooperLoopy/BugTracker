'''
These are the db schemas
yea
'''

from datetime import datetime, timezone

import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Enum as SAEnum
import enum

class CompletionStatus(str, enum.Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    TESTING = "testing"
    COMPLETED = "completed"

Base = declarative_base()

class Report(Base):
    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    importance = db.Column(db.Integer, nullable=False)
    author = db.Column(db.String, nullable=True)
    date_added = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    status  = db.Column(SAEnum(CompletionStatus, name="completion_status"), default=CompletionStatus.NOT_STARTED)

    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

# Put the Base table as the base when ready to use.
class User(Base):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    hashed_password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)
