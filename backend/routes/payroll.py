from flask import Blueprint, request

from models import User, Payroll
from utils import token_required


payroll_bp = Blueprint(
    "payroll",
    __name__,
    url_prefix="/api/payroll"
)


@payroll_bp.route("/me", methods=["GET"])
@token_required
def get_my_payroll():

    user_id = request.user["user_id"]

    user = User.query.get(user_id)

    if not user or not user.employee:
        return {
            "status": "error",
            "message": "Employee profile not found"
        }, 404

    payroll_records = Payroll.query.filter_by(
        employee_id=user.employee.id
    ).order_by(
        Payroll.id.desc()
    ).all()

    return {
        "status": "success",
        "payroll": [
            {
                "id": payroll.id,
                "employee_id": user.employee_id,
                "basic_salary": float(payroll.basic_salary),
                "allowances": float(payroll.allowances),
                "deductions": float(payroll.deductions),
                "net_salary": float(payroll.net_salary)
            }
            for payroll in payroll_records
        ]
    }
