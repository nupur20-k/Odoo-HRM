import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from flask import Blueprint, request

from models import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {
            "status": "error",
            "message": "Email and password are required"
        }, 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return {
            "status": "error",
            "message": "Invalid email or password"
        }, 401

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user.password_hash.encode("utf-8")
):
        return {
        "status": "error",
        "message": "Invalid email or password"
    }, 401

    token = jwt.encode(
        {
            "user_id": user.id,
            "employee_id": user.employee_id,
            "role": user.role,
            "exp": datetime.now(timezone.utc) + timedelta(hours=8)
        },
        os.getenv("JWT_SECRET_KEY"),
        algorithm="HS256"
    )

    return {
        "status": "success",
        "message": "Login successful",
        "access_token": token,
        "user": {
            "id": user.id,
            "employee_id": user.employee_id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }