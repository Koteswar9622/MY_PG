from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from pydantic import BaseModel
import bcrypt

from backend.database.db import engine
from .availability_allocation import router as availability_router
from .properties import router as properties_router

app = FastAPI()

app.include_router(availability_router)
app.include_router(properties_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)



class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


@app.get("/")
def home():
    return {
        "message": "MY-PG Backend Running"
    }


@app.get("/roles")
def get_roles():

    with engine.connect() as conn:

        result = conn.execute(
            text("SELECT * FROM roles")
        )

        roles = [
            dict(row._mapping)
            for row in result
        ]

        return roles


@app.post("/register")
def register(user: UserCreate):

    try:
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        with engine.connect() as conn:

            conn.execute(
                text("""
                    INSERT INTO users
                    (
                        full_name,
                        email,
                        password_hash
                    )
                    VALUES
                    (
                        :full_name,
                        :email,
                        :password_hash
                    )
                """),
                {
                    "full_name": user.full_name,
                    "email": user.email,
                    "password_hash": hashed_password
                }
            )

            conn.commit()

        return {
            "message": "User registered successfully",
            "email": user.email
        }

    except Exception as e:
        return {
            "error": str(e)
        }


@app.post("/login")
def login(user: UserLogin):
    try:
        with engine.connect() as conn:
            result = conn.execute(
                text(
                    "SELECT u.email, u.password_hash, r.name AS role_name "
                    "FROM users u "
                    "LEFT JOIN roles r ON u.role_id = r.id "
                    "WHERE u.email = :email"
                ),
                {"email": user.email}
            ).fetchone()

            if result is None:
                return {"error": "Invalid email or password"}

            record = dict(result._mapping)
            stored_hash = record["password_hash"]

            if not bcrypt.checkpw(user.password.encode('utf-8'), stored_hash.encode('utf-8')):
                return {"error": "Invalid email or password"}

            role_name = record.get("role_name") or "tenant"
            return {
                "message": "Login successful",
                "email": record["email"],
                "role": role_name
            }

    except Exception as e:
        return {"error": str(e)}
