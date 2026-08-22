import os
from functools import wraps

import jwt
from flask import request


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return {
                "status": "error",
                "message": "Authorization token is required"
            }, 401

        try:
            parts = auth_header.split(" ")

            if len(parts) != 2 or parts[0] != "Bearer":
                return {
                    "status": "error",
                    "message": "Invalid authorization format"
                }, 401

            token = parts[1]

            payload = jwt.decode(
                token,
                os.getenv("JWT_SECRET_KEY"),
                algorithms=["HS256"]
            )

            request.user = payload

        except jwt.ExpiredSignatureError:
            return {
                "status": "error",
                "message": "Token has expired"
            }, 401

        except jwt.InvalidTokenError:
            return {
                "status": "error",
                "message": "Invalid token"
            }, 401

        return f(*args, **kwargs)

    return decorated