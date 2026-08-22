from flask import Blueprint, jsonify
from models import Attendance, LeaveRequest
from intelligence.analyzer import analyze_employee

intelligence_bp = Blueprint(
    "intelligence",
    __name__,
    url_prefix="/api/intelligence"
)

@intelligence_bp.route("/employee/<int:employee_id>", methods=["GET"])
def get_employee_intelligence(employee_id):
    attendance_records = Attendance.query.filter_by(
        employee_id=employee_id
    ).order_by(Attendance.date.asc()).all()

    leave_records = LeaveRequest.query.filter_by(
        employee_id=employee_id
    ).order_by(LeaveRequest.start_date.asc()).all()

    attendance_data = [
        {
            "employee_id": record.employee_id,
            "date": record.date.isoformat(),
            "check_in": (
                record.check_in.strftime("%H:%M")
                if record.check_in else None
            ),
            "check_out": (
                record.check_out.strftime("%H:%M")
                if record.check_out else None
            ),
            "status": record.status
        }
        for record in attendance_records
    ]

    leave_data = [
        {
            "employee_id": record.employee_id,
            "leave_type": record.leave_type,
            "start_date": record.start_date.isoformat(),
            "end_date": record.end_date.isoformat(),
            "reason": record.reason,
            "status": record.status
        }
        for record in leave_records
    ]

    result = analyze_employee(
        employee_id,
        attendance_data,
        leave_data
    )

    return jsonify(result)
