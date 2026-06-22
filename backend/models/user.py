from sqlalchemy import Table, Column, BigInteger, String, MetaData

metadata = MetaData()

users = Table(
    "users",
    metadata,
    Column("id", BigInteger, primary_key=True),
    Column("full_name", String),
    Column("email", String),
    Column("password_hash", String),
)