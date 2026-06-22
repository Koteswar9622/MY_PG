from sqlalchemy import create_engine
from dotenv import load_dotenv
from pathlib import Path
import os

base_dir = Path(__file__).resolve().parent
dotenv_path = base_dir.parent / '.env'
if not dotenv_path.exists():
    raise RuntimeError(f'Could not find .env file at {dotenv_path}')

load_dotenv(dotenv_path)

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise RuntimeError('DATABASE_URL is not set in .env')

print("URL Loaded:", DATABASE_URL is not None)

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        print("Database Connected Successfully!")
except Exception as e:
    print("Database Connection Failed!")
    print(e)