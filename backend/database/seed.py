from datetime import date, datetime, time, timedelta
from decimal import Decimal
import random
import sys
import os

sys.path.insert(
    0,
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

from werkzeug.security import generate_password_hash

from app import app
from extensions import db
from models import User, Employee, Attendance, LeaveRequest, Payroll


# ============================================================
# CONFIGURATION
# ============================================================

EMPLOYEE_COUNT = 90
HR_COUNT = 10

DEMO_PASSWORD = "Demo@123"

random.seed(42)


DEPARTMENTS = {
    "Engineering": [
        "Software Developer",
        "Backend Developer",
        "Frontend Developer",
        "Full Stack Developer",
        "QA Engineer",
    ],
    "Sales": [
        "Sales Executive",
        "Sales Manager",
        "Business Development Executive",
    ],
    "Finance": [
        "Accountant",
        "Financial Analyst",
        "Finance Executive",
    ],
    "Marketing": [
        "Marketing Executive",
        "Digital Marketing Specialist",
        "Marketing Manager",
    ],
    "Operations": [
        "Operations Executive",
        "Operations Manager",
        "Operations Analyst",
    ],
    "IT Support": [
        "IT Support Engineer",
        "System Administrator",
    ],
    "Administration": [
        "Administrative Executive",
        "Office Administrator",
    ],
}

LEAVE_TYPES = [
    "CASUAL",
    "SICK",
    "PAID",
]

LEAVE_STATUSES = [
    "APPROVED",
    "APPROVED",
    "APPROVED",
    "PENDING",
    "REJECTED",
]

FIRST_NAMES = [
    "Aarav", "Aditya", "Akash", "Amit", "Aniket",
    "Arjun", "Aryan", "Ayush", "Dhruv", "Harsh",
    "Karan", "Kunal", "Manish", "Mohit", "Nikhil",
    "Nishant", "Pranav", "Rahul", "Rohan", "Sachin",
    "Sahil", "Sameer", "Sanjay", "Shubham", "Siddharth",
    "Sumit", "Suraj", "Tanmay", "Varun", "Vivek",
    "Aditi", "Ananya", "Anjali", "Anushka", "Diya",
    "Isha", "Kavya", "Meera", "Neha", "Nisha",
    "Pooja", "Priya", "Riya", "Sakshi", "Shreya",
    "Simran", "Sneha", "Tanvi", "Vaishnavi", "Zoya",
]

LAST_NAMES = [
    "Patil", "Sharma", "Deshmukh", "Kulkarni", "Joshi",
    "Pawar", "Jadhav", "Garde", "More", "Shinde",
    "Chavan", "Kadam", "Bhosale", "Gaikwad", "Sawant",
    "Naik", "Mane", "Thakur", "Verma", "Gupta",
]


# ============================================================
# HELPERS
# ============================================================

def random_name():
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"


def random_phone(index):
    return f"9{random.randint(100000000, 999999999)}"


def random_joining_date():
    start = date(2022, 1, 1)
    end = date(2026, 6, 30)

    days = (end - start).days

    return start + timedelta(
        days=random.randint(0, days)
    )


def salary_for_department(department):
    salary_ranges = {
        "Engineering": (45000, 120000),
        "Sales": (30000, 80000),
        "Finance": (40000, 90000),
        "Marketing": (35000, 85000),
        "Operations": (30000, 75000),
        "IT Support": (35000, 85000),
        "Administration": (28000, 65000),
    }

    low, high = salary_ranges.get(
        department,
        (30000, 70000)
    )

    return Decimal(
        random.randrange(
            low,
            high,
            1000
        )
    )


def create_employee_user(index):
    employee_id = f"EMP{index:03d}"
    name = random_name()

    email = f"employee{index:03d}@dayflow.com"

    department = random.choice(
        list(DEPARTMENTS.keys())
    )

    designation = random.choice(
        DEPARTMENTS[department]
    )

    user = User(
        employee_id=employee_id,
        name=name,
        email=email,
        password_hash=generate_password_hash(
            DEMO_PASSWORD
        ),
        role="EMPLOYEE",
    )

    db.session.add(user)
    db.session.flush()

    employee = Employee(
        user_id=user.id,
        department=department,
        designation=designation,
        phone=random_phone(index),
        address="Pune, Maharashtra",
        joining_date=random_joining_date(),
        profile_picture=None,
    )

    db.session.add(employee)
    db.session.flush()

    return user, employee


def create_hr_user(index):
    employee_id = f"HR{index:03d}"

    name = f"HR Manager {index}"

    email = f"hr{index:03d}@dayflow.com"

    user = User(
        employee_id=employee_id,
        name=name,
        email=email,
        password_hash=generate_password_hash(
            DEMO_PASSWORD
        ),
        role="HR",
    )

    db.session.add(user)

    return user


# ============================================================
# ATTENDANCE
# ============================================================

def create_attendance(employee):
    today = date.today()

    records = []

    # Approximately 20 working days
    # before today.
    current_date = today - timedelta(days=30)

    created = 0

    while current_date <= today and created < 20:

        # Monday-Friday only
        if current_date.weekday() < 5:

            status = random.choices(
                ["PRESENT", "ABSENT", "LATE"],
                weights=[85, 8, 7],
                k=1
            )[0]

            if status == "ABSENT":
                check_in = None
                check_out = None

            else:

                minute = random.randint(0, 30)

                check_in = time(
                    hour=9,
                    minute=minute
                )

                check_out = time(
                    hour=18,
                    minute=random.randint(0, 30)
                )

            attendance = Attendance(
                employee_id=employee.id,
                date=current_date,
                check_in=check_in,
                check_out=check_out,
                status=status,
            )

            db.session.add(attendance)

            records.append(attendance)

            created += 1

        current_date += timedelta(days=1)

    return records


# ============================================================
# LEAVE
# ============================================================

def create_leave_requests(employee):
    records = []

    for _ in range(random.randint(1, 3)):

        start_date = date.today() + timedelta(
            days=random.randint(-60, 45)
        )

        duration = random.randint(1, 3)

        end_date = start_date + timedelta(
            days=duration - 1
        )

        status = random.choice(
            LEAVE_STATUSES
        )

        if status == "APPROVED":
            hr_comment = "Leave approved by HR"

        elif status == "REJECTED":
            hr_comment = "Leave rejected by HR"

        else:
            hr_comment = None

        leave = LeaveRequest(
            employee_id=employee.id,
            leave_type=random.choice(
                LEAVE_TYPES
            ),
            start_date=start_date,
            end_date=end_date,
            reason=random.choice([
                "Personal work",
                "Family function",
                "Medical appointment",
                "Health reasons",
                "Personal emergency",
                "Travel",
            ]),
            status=status,
            hr_comment=hr_comment,
        )

        db.session.add(leave)

        records.append(leave)

    return records


# ============================================================
# PAYROLL
# ============================================================

def create_payroll(employee):
    basic_salary = salary_for_department(
        employee.department
    )

    allowances = Decimal(
        random.randrange(
            2000,
            10001,
            500
        )
    )

    deductions = Decimal(
        random.randrange(
            500,
            5001,
            500
        )
    )

    net_salary = (
        basic_salary
        + allowances
        - deductions
    )

    payroll = Payroll(
        employee_id=employee.id,
        basic_salary=basic_salary,
        allowances=allowances,
        deductions=deductions,
        net_salary=net_salary,
    )

    db.session.add(payroll)

    return payroll


# ============================================================
# MAIN SEED
# ============================================================

def seed_database():

    with app.app_context():

        print("=" * 60)
        print("DAYFLOW HRMS DEMO DATABASE SEED")
        print("=" * 60)

        # ----------------------------------------------------
        # Create missing HR users
        # ----------------------------------------------------

        print("\nChecking HR users...")

        hr_created = 0

        for index in range(1, HR_COUNT + 1):

            employee_id = f"HR{index:03d}"

            existing = User.query.filter_by(
                employee_id=employee_id
            ).first()

            if existing:
                continue

            create_hr_user(index)
            hr_created += 1

        db.session.flush()

        print(
            f"Created {hr_created} new HR users."
        )

        # ----------------------------------------------------
        # Create missing employees
        # ----------------------------------------------------

        print("\nChecking employee users...")

        employees = []

        employee_created = 0

        for index in range(1, EMPLOYEE_COUNT + 1):

            employee_id = f"EMP{index:03d}"

            user = User.query.filter_by(
                employee_id=employee_id
            ).first()

            # Existing user
            if user:

                # Existing employee profile
                if user.employee:
                    employee = user.employee

                # User exists but profile doesn't
                else:

                    department = random.choice(
                        list(DEPARTMENTS.keys())
                    )

                    designation = random.choice(
                        DEPARTMENTS[department]
                    )

                    employee = Employee(
                        user_id=user.id,
                        department=department,
                        designation=designation,
                        phone=random_phone(index),
                        address="Pune, Maharashtra",
                        joining_date=random_joining_date(),
                        profile_picture=None,
                    )

                    db.session.add(employee)
                    db.session.flush()

                employees.append(employee)
                continue

            # ------------------------------------------------
            # Create missing employee user
            # ------------------------------------------------

            name = random_name()

            email = (
                f"employee{index:03d}@dayflow.com"
            )

            department = random.choice(
                list(DEPARTMENTS.keys())
            )

            designation = random.choice(
                DEPARTMENTS[department]
            )

            user = User(
                employee_id=employee_id,
                name=name,
                email=email,
                password_hash=generate_password_hash(
                    DEMO_PASSWORD
                ),
                role="EMPLOYEE",
            )

            db.session.add(user)
            db.session.flush()

            employee = Employee(
                user_id=user.id,
                department=department,
                designation=designation,
                phone=random_phone(index),
                address="Pune, Maharashtra",
                joining_date=random_joining_date(),
                profile_picture=None,
            )

            db.session.add(employee)
            db.session.flush()

            employees.append(employee)

            employee_created += 1

        db.session.flush()

        print(
            f"Created {employee_created} new employee users."
        )

        print(
            f"Total employee profiles available: "
            f"{len(employees)}"
        )

        # ----------------------------------------------------
        # Attendance
        # ----------------------------------------------------

        print("\nChecking attendance data...")

        attendance_created = 0

        for employee in employees:

            existing_dates = {
                record.date
                for record in Attendance.query.filter_by(
                    employee_id=employee.id
                ).all()
            }

            today = date.today()

            current_date = (
                today - timedelta(days=30)
            )

            created_for_employee = 0

            while (
                current_date <= today
                and created_for_employee < 20
            ):

                if current_date.weekday() < 5:

                    # Don't violate employee/date uniqueness
                    if current_date not in existing_dates:

                        status = random.choices(
                            [
                                "PRESENT",
                                "ABSENT",
                                "LATE"
                            ],
                            weights=[
                                85,
                                8,
                                7
                            ],
                            k=1
                        )[0]

                        if status == "ABSENT":

                            check_in = None
                            check_out = None

                        else:

                            check_in = time(
                                hour=9,
                                minute=random.randint(
                                    0,
                                    30
                                )
                            )

                            check_out = time(
                                hour=18,
                                minute=random.randint(
                                    0,
                                    30
                                )
                            )

                        attendance = Attendance(
                            employee_id=employee.id,
                            date=current_date,
                            check_in=check_in,
                            check_out=check_out,
                            status=status,
                        )

                        db.session.add(
                            attendance
                        )

                        attendance_created += 1
                        created_for_employee += 1

                current_date += timedelta(days=1)

        db.session.flush()

        print(
            f"Created {attendance_created} "
            f"new attendance records."
        )

        # ----------------------------------------------------
        # Leave Requests
        # ----------------------------------------------------

        print("\nChecking leave data...")

        leave_created = 0

        for employee in employees:

            existing_count = LeaveRequest.query.filter_by(
                employee_id=employee.id
            ).count()

            # Target: at least 2 leave records per employee
            required = max(
                0,
                2 - existing_count
            )

            for _ in range(required):

                start_date = (
                    date.today()
                    + timedelta(
                        days=random.randint(
                            -60,
                            45
                        )
                    )
                )

                duration = random.randint(
                    1,
                    3
                )

                end_date = (
                    start_date
                    + timedelta(
                        days=duration - 1
                    )
                )

                status = random.choice(
                    LEAVE_STATUSES
                )

                if status == "APPROVED":
                    hr_comment = (
                        "Leave approved by HR"
                    )

                elif status == "REJECTED":
                    hr_comment = (
                        "Leave rejected by HR"
                    )

                else:
                    hr_comment = None

                leave = LeaveRequest(
                    employee_id=employee.id,
                    leave_type=random.choice(
                        LEAVE_TYPES
                    ),
                    start_date=start_date,
                    end_date=end_date,
                    reason=random.choice([
                        "Personal work",
                        "Family function",
                        "Medical appointment",
                        "Health reasons",
                        "Personal emergency",
                        "Travel",
                    ]),
                    status=status,
                    hr_comment=hr_comment,
                )

                db.session.add(leave)

                leave_created += 1

        db.session.flush()

        print(
            f"Created {leave_created} "
            f"new leave requests."
        )

        # ----------------------------------------------------
        # Payroll
        # ----------------------------------------------------

        print("\nChecking payroll data...")

        payroll_created = 0

        for employee in employees:

            existing = Payroll.query.filter_by(
                employee_id=employee.id
            ).first()

            if existing:
                continue

            basic_salary = salary_for_department(
                employee.department
            )

            allowances = Decimal(
                random.randrange(
                    2000,
                    10001,
                    500
                )
            )

            deductions = Decimal(
                random.randrange(
                    500,
                    5001,
                    500
                )
            )

            net_salary = (
                basic_salary
                + allowances
                - deductions
            )

            payroll = Payroll(
                employee_id=employee.id,
                basic_salary=basic_salary,
                allowances=allowances,
                deductions=deductions,
                net_salary=net_salary,
            )

            db.session.add(payroll)

            payroll_created += 1

        db.session.flush()

        print(
            f"Created {payroll_created} "
            f"new payroll records."
        )

        # ----------------------------------------------------
        # Commit
        # ----------------------------------------------------

        db.session.commit()

        # ----------------------------------------------------
        # Final counts
        # ----------------------------------------------------

        total_users = User.query.count()

        total_employee_users = User.query.filter_by(
            role="EMPLOYEE"
        ).count()

        total_hr_users = User.query.filter_by(
            role="HR"
        ).count()

        total_employees = Employee.query.count()

        total_attendance = Attendance.query.count()

        total_leaves = LeaveRequest.query.count()

        total_payroll = Payroll.query.count()

        print("\n" + "=" * 60)
        print("DATABASE SEED COMPLETE")
        print("=" * 60)

        print(
            f"Total users:              {total_users}"
        )

        print(
            f"Employee users:           {total_employee_users}"
        )

        print(
            f"HR users:                 {total_hr_users}"
        )

        print(
            f"Employee profiles:        {total_employees}"
        )

        print(
            f"Attendance records:       {total_attendance}"
        )

        print(
            f"Leave requests:           {total_leaves}"
        )

        print(
            f"Payroll records:          {total_payroll}"
        )

        print("=" * 60)

        print("\nDEMO CREDENTIALS")

        print("\nEmployee:")
        print(
            "  Email: employee001@dayflow.com"
        )
        print(
            "  Password: Demo@123"
        )

        print("\nHR:")
        print(
            "  Email: hr001@dayflow.com"
        )
        print(
            "  Password: Demo@123"
        )

        print("\nDone.")

        
if __name__ == "__main__":
    seed_database()