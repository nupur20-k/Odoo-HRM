def generate_employee_insight(
    attendance_change,
    late_count,
    absence_count,
    leave_days,
    leave_requests
):
    reasons = []

    if attendance_change < -10:
        reasons.append(
            f"Attendance declined by {abs(attendance_change)} percentage points"
        )

    if late_count >= 5:
        reasons.append(
            f"{late_count} late arrivals recorded"
        )

    if absence_count >= 3:
        reasons.append(
            f"{absence_count} absences recorded"
        )

    if leave_days >= 5:
        reasons.append(
            f"{leave_days} leave days recorded"
        )

    if leave_requests >= 3:
        reasons.append(
            f"{leave_requests} leave requests submitted"
        )

    # Determine severity
    if attendance_change < -20 or absence_count >= 5:
        status = "HIGH"
        recommendation = "HR check-in recommended"

    elif (
        late_count >= 5
        or absence_count >= 3
        or leave_days >= 5
    ):
        status = "MEDIUM"
        recommendation = "Continue monitoring attendance and leave patterns"

    else:
        status = "NORMAL"
        recommendation = "No action required"

    return {
        "status": status,
        "reasons": reasons,
        "recommendation": recommendation
    }