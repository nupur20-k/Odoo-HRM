from datetime import date


def total_leave_days(records):

    total = 0

    for record in records:

        if record["status"] in ["APPROVED", "PENDING"]:

            start = record["start_date"]
            end = record["end_date"]

            total += (end - start).days + 1

    return total


def leave_request_count(records):

    return len(records)


def leave_by_type(records):

    result = {}

    for record in records:

        leave_type = record["leave_type"]

        result[leave_type] = (
            result.get(leave_type, 0) + 1
        )

    return result