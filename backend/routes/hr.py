from flask import Blueprint, request

from extensions import db
from models import User, LeaveRequest
from utils import token_required


hr_bp = Blueprint(
    "hr",
    __name__,
    url_prefix="/api/hr"
)


# ============================================================
# HR LEAVE MANAGEMENT
# ============================================================

@hr_bp.route("/leaves", methods=["GET"])
@token_required
def get_all_leaves():

    if request.user.get("role") != "HR":
        return {
            "status": "error",
            "message": "HR access required"
        }, 403

    leaves = LeaveRequest.query.order_by(
        LeaveRequest.created_at.desc()
    ).all()

    result = []

    for leave in leaves:

        employee = leave.employee

        if not employee:
            continue

        user = employee.user

        result.append({
            "id": leave.id,
            "employee_id": user.employee_id,
            "name": user.name,
            "department": employee.department,
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
        })

    return {
        "status": "success",
        "leaves": result
    }


@hr_bp.route("/leaves/<int:leave_id>", methods=["PUT"])
@token_required
def update_leave_status(leave_id):

    if request.user.get("role") != "HR":
        return {
            "status": "error",
            "message": "HR access required"
        }, 403

    leave = LeaveRequest.query.get(leave_id)

    if not leave:
        return {
            "status": "error",
            "message": "Leave request not found"
        }, 404

    data = request.get_json()

    status = data.get("status")
    hr_comment = data.get("hr_comment")

    if status not in ["APPROVED", "REJECTED"]:
        return {
            "status": "error",
            "message": "Status must be APPROVED or REJECTED"
        }, 400

    if leave.status != "PENDING":
        return {
            "status": "error",
            "message": "Only pending leave requests can be updated"
        }, 409

    leave.status = status
    leave.hr_comment = hr_comment

    db.session.commit()

    employee = leave.employee
    user = employee.user

    return {
        "status": "success",
        "message": f"Leave request {status.lower()}",
        "leave": {
            "id": leave.id,
            "employee_id": user.employee_id,
            "name": user.name,
            "leave_type": leave.leave_type,
            "start_date": leave.start_date.isoformat(),
            "end_date": leave.end_date.isoformat(),
            "reason": leave.reason,
            "status": leave.status,
            "hr_comment": leave.hr_comment
        }
    }


# ============================================================
# HR PAYROLL
# ============================================================

@hr_bp.route("/payroll", methods=["GET"])
@token_required
def get_all_payroll():

    if request.user.get("role") != "HR":
        return {
            "status": "error",
            "message": "HR access required"
        }, 403

    from models import Payroll

    payroll_records = Payroll.query.all()

    result = []

    for payroll in payroll_records:

        employee = payroll.employee

        if not employee:
            continue

        user = employee.user

        result.append({
            "id": payroll.id,
            "employee_id": user.employee_id,
            "name": user.name,
            "basic_salary": float(payroll.basic_salary),
            "allowances": float(payroll.allowances),
            "deductions": float(payroll.deductions),
            "net_salary": float(payroll.net_salary)
        })

    return {
        "status": "success",
        "payroll": result
    }


# ============================================================
# HR EMPLOYEES
# ============================================================

@hr_bp.route("/employees", methods=["GET"])
@token_required
def get_all_employees():

    if request.user.get("role") != "HR":
        return {
            "status": "error",
            "message": "HR access required"
        }, 403

    users = User.query.all()

    result = []

    for user in users:

        if not user.employee:
            continue

        employee = user.employee

        result.append({
            "id": employee.id,
            "employee_id": user.employee_id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "department": employee.department,
            "designation": employee.designation,
            "phone": employee.phone,
            "joining_date": (
                employee.joining_date.isoformat()
                if employee.joining_date
                else None
            )
        })

    return {
        "status": "success",
        "employees": result
    }


@hr_bp.route("/employees/<employee_id>", methods=["GET"])
@token_required
def get_employee_details(employee_id):

    if request.user.get("role") != "HR":
        return {
            "status": "error",
            "message": "HR access required"
        }, 403

    user = User.query.filter_by(
        employee_id=employee_id
    ).first()

    if not user or not user.employee:
        return {
            "status": "error",
            "message": "Employee not found"
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


# ============================================================
# HR ATTENDANCE
# ============================================================

@hr_bp.route("/attendance", methods=["GET"])
@token_required
def get_all_attendance():

    if request.user.get("role") != "HR":
        return {
            "status": "error",
            "message": "HR access required"
        }, 403

    from models import Attendance

    records = Attendance.query.order_by(
        Attendance.date.desc()
    ).all()

    result = []

    for record in records:

        employee = record.employee

        if not employee:
            continue

        user = employee.user

        result.append({
            "id": record.id,
            "employee_id": user.employee_id,
            "name": user.name,
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
        })

    return {
        "status": "success",
        "attendance": result
    }