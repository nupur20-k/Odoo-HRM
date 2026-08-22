from flask import Blueprint, request

from models import User
from utils import token_required


employee_bp = Blueprint(
    "employee",
    __name__,
    url_prefix="/api/employee"
)


@employee_bp.route("/me", methods=["GET"])
@token_required
def get_my_profile():

    user_id = request.user["user_id"]

    user = User.query.get(user_id)

    if not user:
        return {
            "status": "error",
            "message": "User not found"
        }, 404

    if not user.employee:
        return {
            "status": "error",
            "message": "Employee profile not found"
        }, 404

    employee = user.employee

    return {
        "status": "success",
        "employee": {
            "id": employee.id,
            "employee_id": user.employee_id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "department": employee.department,
            "designation": employee.designation,
            "phone": employee.phone,
            "address": employee.address,
            "joining_date": (
                employee.joining_date.isoformat()
                if employee.joining_date
                else None
            ),
            "profile_picture": employee.profile_picture
        }
    }
