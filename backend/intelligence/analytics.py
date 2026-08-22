from datetime import datetime


def attendance_percentage(records):

    if not records:
        return 0

    present = sum(
        1
        for record in records
        if record["status"] == "PRESENT"
    )

    return round(
        (present / len(records)) * 100,
        2
    )


def late_count(records):

    count = 0

    for record in records:

        if (
            record["check_in"]
            and record["check_in"] > "09:00"
        ):
            count += 1

    return count


def absence_count(records):

    return sum(
        1
        for record in records
        if record["status"] == "ABSENT"
    )


def average_working_hours(records):

    total_hours = 0
    valid_days = 0

    for record in records:

        if (
            record["check_in"]
            and record["check_out"]
        ):

            check_in = datetime.strptime(
                record["check_in"],
                "%H:%M"
            )

            check_out = datetime.strptime(
                record["check_out"],
                "%H:%M"
            )

            hours = (
                check_out - check_in
            ).total_seconds() / 3600

            total_hours += hours
            valid_days += 1

    if valid_days == 0:
        return 0

    return round(
        total_hours / valid_days,
        2
    )


def attendance_change(
    previous_records,
    current_records
):

    previous = attendance_percentage(
        previous_records
    )

    current = attendance_percentage(
        current_records
    )

    return round(
        current - previous,
        2
    )