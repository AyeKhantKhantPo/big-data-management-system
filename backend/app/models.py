# backend/app/models.py
from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel


class NewsSource(BaseModel):
    source_id: str
    category: str
    country: str
    description: str
    id: str
    language: str
    name: str
    url: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PaginatedNewsSources(BaseModel):
    total: int
    page: int
    limit: int
    sources: List[NewsSource]
    next_page: Optional[str] = None
    previous_page: Optional[str] = None
