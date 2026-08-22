from datetime import date

from flask import Blueprint, request

from extensions import db
from models import User, LeaveRequest
from utils import token_required


leave_bp = Blueprint(
    "leave",
    __name__,
    url_prefix="/api/leave"
)


@leave_bp.route("", methods=["POST"])
@token_required
def create_leave():

    user_id = request.user["user_id"]

    user = User.query.get(user_id)

    if not user or not user.employee:
        return {
            "status": "error",
            "message": "Employee profile not found"
        }, 404

    data = request.get_json()

    leave_type = data.get("leave_type")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    reason = data.get("reason")

    if not leave_type or not start_date or not end_date:
        return {
            "status": "error",
            "message": "leave_type, start_date and end_date are required"
        }, 400

    try:
        start = date.fromisoformat(start_date)
        end = date.fromisoformat(end_date)
    except ValueError:
        return {
            "status": "error",
            "message": "Dates must use YYYY-MM-DD format"
        }, 400

    if end < start:
        return {
            "status": "error",
            "message": "End date cannot be before start date"
        }, 400

    leave = LeaveRequest(
        employee_id=user.employee.id,
        leave_type=leave_type,
        start_date=start,
        end_date=end,
        reason=reason,
        status="PENDING"
    )

    db.session.add(leave)
    db.session.commit()

    return {
        "status": "success",
        "message": "Leave request submitted",
        "leave": {
            "id": leave.id,
            "employee_id": user.employee_id,
            "leave_type": leave.leave_type,
            "start_date": leave.start_date.isoformat(),
            "end_date": leave.end_date.isoformat(),
            "reason": leave.reason,
            "status": leave.status
        }
    }, 201

@leave_bp.route("/me", methods=["GET"])
@token_required
def get_my_leaves():

    user_id = request.user["user_id"]

    user = User.query.get(user_id)

    if not user or not user.employee:
        return {
            "status": "error",
            "message": "Employee profile not found"
        }, 404

    leaves = LeaveRequest.query.filter_by(
        employee_id=user.employee.id
    ).order_by(
        LeaveRequest.created_at.desc()
    ).all()

    return {
        "status": "success",
        "leaves": [
            {
                "id": leave.id,
                "employee_id": user.employee_id,
                "leave_type": leave.leave_type,
                "start_date": (
                    leave.start_date.isoformat()
                    if leave.start_date else None
                ),
                "end_date": (
                    leave.end_date.isoformat()
                    if leave.end_date else None
                ),
                "reason": leave.reason,
                "status": leave.status,
                "hr_comment": leave.hr_comment,
                "created_at": (
                    leave.created_at.isoformat()
                    if leave.created_at else None
                )
            }
            for leave in leaves
        ]
    }


