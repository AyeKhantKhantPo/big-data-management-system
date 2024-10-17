# backend/app/routes.py
import re

from fastapi import APIRouter, HTTPException, Query
from pymongo import MongoClient

from app.config import settings
from app.models import NewsSource, PaginatedNewsSources

router = APIRouter(prefix="/api")

# MongoDB client setup
client = MongoClient(settings.mongo_url)
db = client["newsapi"]
collection = db["news_sources"]


@router.get("/news-sources", response_model=PaginatedNewsSources)
async def get_news_sources(
    page: int = Query(1, ge=1),
    limit: int = Query(10, gt=0),
    search: str = Query(None),
    source_id: str = Query(None),
    category: str = Query(None),
    country: str = Query(None),
    language: str = Query(None),
):
    """Retrieve paginated news sources with optional search and filters."""
    query = {}

    # Add wildcard search functionality if a search term is provided
    if search:
        regex = re.compile(f".*{search}.*", re.IGNORECASE)
        query = {
            "$or": [
                {"name": regex},
                {"description": regex},
                {"category": regex},
                {"country": regex},
                {"language": regex},
            ]
        }

    # Add additional filters
    if source_id:
        query["source_id"] = source_id
    if category:
        query["category"] = category
    if country:
        query["country"] = country
    if language:
        query["language"] = language

    # Paginate the results
    skip = (page - 1) * limit
    news_sources = list(collection.find(query).skip(skip).limit(limit))
    total_count = collection.count_documents(query)

    # Prepare pagination info
    next_page = (
        f"/api/news-sources?page={page + 1}&limit={limit}"
        if (page * limit) < total_count
        else None
    )
    previous_page = (
        f"/api/news-sources?page={page - 1}&limit={limit}" if page > 1 else None
    )

    return PaginatedNewsSources(
        total=total_count,
        page=page,
        limit=limit,
        sources=news_sources,
        next_page=next_page,
        previous_page=previous_page,
    )


@router.get("/news-sources/{source_id}", response_model=NewsSource)
async def get_news_source(source_id: str):
    """Retrieve a specific news source by source_id."""
    source = collection.find_one({"source_id": source_id})
    if source is None:
        raise HTTPException(status_code=404, detail="News source not found")
    return source


@router.post("/news-sources", response_model=NewsSource)
async def create_news_source(source: NewsSource):
    """Create a new news source."""
    source_dict = source.dict()
    if collection.find_one({"source_id": source.source_id}):
        raise HTTPException(status_code=400, detail="News source already exists")
    collection.insert_one(source_dict)
    return source


@router.put("/news-sources/{source_id}", response_model=NewsSource)
async def update_news_source(source_id: str, source: NewsSource):
    """Update an existing news source."""
    result = collection.find_one_and_replace(
        {"source_id": source_id}, source.dict(), return_document=True
    )
    if result is None:
        raise HTTPException(status_code=404, detail="News source not found")
    return result


@router.delete("/news-sources/{source_id}", response_model=dict)
async def delete_news_source(source_id: str):
    """Delete a news source."""
    result = collection.delete_one({"source_id": source_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News source not found")
    return {"detail": "News source deleted"}
