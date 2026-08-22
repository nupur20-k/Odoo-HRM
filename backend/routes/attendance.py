from datetime import datetime

from flask import Blueprint, request

from extensions import db
from models import User, Attendance
from utils import token_required


attendance_bp = Blueprint(
    "attendance",
    __name__,
    url_prefix="/api/attendance"
)


@attendance_bp.route("/check-in", methods=["POST"])
@token_required
def check_in():

    user_id = request.user["user_id"]

    user = User.query.get(user_id)

    if not user or not user.employee:
        return {
            "status": "error",
            "message": "Employee profile not found"
        }, 404

    employee = user.employee
    today = datetime.now().date()

    existing_record = Attendance.query.filter_by(
        employee_id=employee.id,
        date=today
    ).first()

    if existing_record:
        return {
            "status": "error",
            "message": "Attendance already marked for today"
        }, 409

    attendance = Attendance(
        employee_id=employee.id,
        date=today,
        check_in=datetime.now().time(),
        status="PRESENT"
    )

    db.session.add(attendance)
    db.session.commit()

    return {
        "status": "success",
        "message": "Check-in successful",
        "attendance": {
            "id": attendance.id,
            "employee_id": user.employee_id,
            "date": attendance.date.isoformat(),
            "check_in": attendance.check_in.isoformat(),
            "status": attendance.status
        }
    }, 201


@attendance_bp.route("/me", methods=["GET"])
@token_required
def get_my_attendance():

    user_id = request.user["user_id"]

    user = User.query.get(user_id)

    if not user or not user.employee:
        return {
            "status": "error",
            "message": "Employee profile not found"
        }, 404

    records = Attendance.query.filter_by(
        employee_id=user.employee.id
    ).order_by(
        Attendance.date.desc()
    ).all()

    return {
        "status": "success",
        "attendance": [
            {
                "id": record.id,
                "employee_id": user.employee_id,
                "date": record.date.isoformat(),
                "check_in": (
                    record.check_in.isoformat()
                    if record.check_in else None
                ),
                "check_out": (
                    record.check_out.isoformat()
                    if record.check_out else None
                ),
                "status": record.status
            }
            for record in records
        ]
    }

@attendance_bp.route("/check-out", methods=["POST"])
@token_required
def check_out():

    user_id = request.user["user_id"]

    user = User.query.get(user_id)

    if not user or not user.employee:
        return {
            "status": "error",
            "message": "Employee profile not found"
        }, 404

    employee = user.employee
    today = datetime.now().date()

    attendance = Attendance.query.filter_by(
        employee_id=employee.id,
        date=today
    ).first()

    if not attendance:
        return {
            "status": "error",
            "message": "Please check in first"
        }, 404

    if attendance.check_out:
        return {
            "status": "error",
            "message": "Attendance already checked out"
        }, 409

    attendance.check_out = datetime.now().time()

    db.session.commit()

    return {
        "status": "success",
        "message": "Check-out successful",
        "attendance": {
            "id": attendance.id,
            "employee_id": user.employee_id,
            "date": attendance.date.isoformat(),
            "check_in": (
                attendance.check_in.isoformat()
                if attendance.check_in else None
            ),
            "check_out": (
                attendance.check_out.isoformat()
                if attendance.check_out else None
            ),
            "status": attendance.status
        }
    }