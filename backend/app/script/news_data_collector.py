#!/usr/bin/python
import requests
import structlog
from pymongo import MongoClient

from app.config import settings

log = structlog.get_logger()

# MongoDB client setup
client = MongoClient(settings.mongo_url)
db = client["newsapi"]
collection = db["news_sources"]


def fetch_news_sources():
    # Fetch data from the NewsAPI
    api_url = settings.api_url.format(API_KEY=settings.api_key)
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        return data.get("sources", [])
    else:
        log.error("Failed to fetch data", status_code=response.status_code)
        return []


def store_news_sources(sources):
    # Store or update the data in MongoDB
    if sources:
        for source in sources:
            collection.update_one(
                {"source_id": source["id"]},
                {"$set": source},  # Update the document with the new data
                upsert=True,  # Insert the document if it does not exist
            )
        log.info("Processed %d news sources in MongoDB", len(sources))
    else:
        log.warning("No data to store.")


if __name__ == "__main__":
    news_sources = fetch_news_sources()
    store_news_sources(news_sources)
