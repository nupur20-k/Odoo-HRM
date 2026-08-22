"""
Quick diagnostic: prints the exact password_hash stored for a given email,
and tells you whether Demo@123 verifies against it.

Run from your backend folder (venv active):
    python check_user.py employee002@dayflow.com
"""
import sys
from app import app
from models import User
from werkzeug.security import check_password_hash

if len(sys.argv) != 2:
    print("Usage: python check_user.py <email>")
    sys.exit(1)

email = sys.argv[1]

with app.app_context():
    user = User.query.filter_by(email=email).first()

    if not user:
        print(f"No user found with email: {email}")
        sys.exit(0)

    print(f"employee_id: {user.employee_id}")
    print(f"role:        {user.role}")
    print(f"hash:        {user.password_hash}")

    try:
        ok = check_password_hash(user.password_hash, "Demo@123")
        print(f"'Demo@123' matches: {ok}")
    except ValueError as e:
        print(f"Hash format not recognized by check_password_hash: {e}")