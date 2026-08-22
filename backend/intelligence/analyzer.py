from analytics import (
    attendance_percentage,
    late_count,
    absence_count,
    average_working_hours,
    attendance_change
)

from leave_analytics import (
    total_leave_days,
    leave_request_count,
    leave_by_type
)

from insights import generate_employee_insight


def analyze_employee(
    employee_id,
    attendance_data,
    leave_data
):

    # =========================
    # ATTENDANCE
    # =========================

    employee_attendance = [
        record
        for record in attendance_data
        if record["employee_id"] == employee_id
    ]

    if not employee_attendance:
        return {
            "employee_id": employee_id,
            "error": "Attendance data not found"
        }

    # Sort by date
    employee_attendance.sort(
        key=lambda record: record["date"]
    )
    


    # Split into two equal periods
    midpoint = len(employee_attendance) // 2

    previous_records = employee_attendance[:midpoint]
    current_records = employee_attendance[midpoint:]

    previous_attendance = attendance_percentage(
        previous_records
    )

    current_attendance = attendance_percentage(
        current_records
    )

    change = attendance_change(
        previous_records,
        current_records
    )

    late = late_count(employee_attendance)

    absences = absence_count(employee_attendance)

    working_hours = average_working_hours(
        employee_attendance
    )

    # =========================
    # LEAVE
    # =========================

    employee_leaves = [
        record
        for record in leave_data
        if record["employee_id"] == employee_id
    ]

    leave_days = total_leave_days(
        employee_leaves
    )

    leave_requests = leave_request_count(
        employee_leaves
    )

    leave_types = leave_by_type(
        employee_leaves
    )

    # =========================
    # INTELLIGENCE
    # =========================

    insight = generate_employee_insight(
        change,
        late,
        absences,
        leave_days,
        leave_requests
    )

    return {
        "employee_id": employee_id,

        "attendance": {
            "previous": previous_attendance,
            "current": current_attendance,
            "change": change,
            "late_arrivals": late,
            "absences": absences,
            "average_working_hours": working_hours
        },

        "leave": {
            "total_days": leave_days,
            "requests": leave_requests,
            "by_type": leave_types
        },

        "intelligence": {
            "status": insight["status"],
            "reasons": insight["reasons"],
            "recommendation": insight["recommendation"]
        }
    }