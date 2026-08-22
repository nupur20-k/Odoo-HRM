import os
from urllib.parse import quote_plus

from flask import Flask
from dotenv import load_dotenv

from extensions import db
from models import User

from routes.auth import auth_bp

load_dotenv()


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"postgresql+psycopg2://"
        f"{os.getenv('DB_USER')}:"
        f"{quote_plus(os.getenv('DB_PASSWORD'))}@"
        f"{os.getenv('DB_HOST')}:"
        f"{os.getenv('DB_PORT')}/"
        f"{os.getenv('DB_NAME')}"
    )

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    app.register_blueprint(auth_bp)

    @app.route("/")
    def home():
        return {
            "status": "success",
            "message": "Dayflow backend is running"
        }

    @app.route("/users")
    def get_users():
        users = User.query.all()

        return {
            "status": "success",
            "users": [
                {
                    "id": user.id,
                    "employee_id": user.employee_id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role
                }
                for user in users
            ]
        }

    @app.route("/employees")
    def get_employees():
        users = User.query.all()

        employees = []

        for user in users:
            if user.employee:
                employees.append({
                    "user_id": user.id,
                    "employee_id": user.employee_id,
                    "name": user.name,
                    "department": user.employee.department,
                    "designation": user.employee.designation,
                    "phone": user.employee.phone
                })

        return {
            "status": "success",
            "employees": employees
        }

    @app.route("/attendance")
    def get_attendance():
        users = User.query.all()

        attendance_records = []

        for user in users:
            if user.employee:
                for record in user.employee.attendance_records:
                    attendance_records.append({
                        "employee_id": user.employee_id,
                        "name": user.name,
                        "date": record.date.isoformat() if record.date else None,
                        "check_in": record.check_in.isoformat() if record.check_in else None,
                        "check_out": record.check_out.isoformat() if record.check_out else None,
                        "status": record.status
                    })

        return {
            "status": "success",
            "attendance": attendance_records
        }

    @app.route("/leaves")
    def get_leaves():
        users = User.query.all()

        leave_records = []

        for user in users:
            if user.employee:
                for leave in user.employee.leave_requests:
                    leave_records.append({
                        "employee_id": user.employee_id,
                        "name": user.name,
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
                        "hr_comment": leave.hr_comment
                    })

        return {
            "status": "success",
            "leaves": leave_records
        }

    @app.route("/payroll")
    def get_payroll():
        users = User.query.all()

        payroll_records = []

        for user in users:
            if user.employee:
                for payroll in user.employee.payroll_records:
                    payroll_records.append({
                        "employee_id": user.employee_id,
                        "name": user.name,
                        "basic_salary": float(payroll.basic_salary),
                        "allowances": float(payroll.allowances),
                        "deductions": float(payroll.deductions),
                        "net_salary": float(payroll.net_salary)
                    })

        return {
            "status": "success",
            "payroll": payroll_records
        }
    
    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)