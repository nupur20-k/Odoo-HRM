from extensions import db


class Payroll(db.Model):
    __tablename__ = "payroll"

    id = db.Column(db.Integer, primary_key=True)

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id", ondelete="CASCADE"),
        nullable=False
    )

    basic_salary = db.Column(
        db.Numeric(12, 2),
        nullable=False
    )

    allowances = db.Column(
        db.Numeric(12, 2),
        default=0
    )

    deductions = db.Column(
        db.Numeric(12, 2),
        default=0
    )

    net_salary = db.Column(
        db.Numeric(12, 2),
        nullable=False
    )

    employee = db.relationship(
        "Employee",
        backref=db.backref("payroll_records", lazy=True)
    )