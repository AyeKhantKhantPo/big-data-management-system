# backend/app/config.py
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    mongo_url: str
    api_key: str
    api_url: str

    class Config:
        env_file = ".env"


# Create an instance of Settings
settings = Settings()
