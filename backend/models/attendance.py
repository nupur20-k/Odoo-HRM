from extensions import db


class Attendance(db.Model):
    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True)

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id", ondelete="CASCADE"),
        nullable=False
    )

    date = db.Column(db.Date, nullable=False)
    check_in = db.Column(db.Time)
    check_out = db.Column(db.Time)
    status = db.Column(db.String(20), nullable=False)

    employee = db.relationship(
        "Employee",
        backref=db.backref("attendance_records", lazy=True)
    )

    __table_args__ = (
        db.UniqueConstraint(
            "employee_id",
            "date",
            name="unique_employee_attendance"
        ),
    )