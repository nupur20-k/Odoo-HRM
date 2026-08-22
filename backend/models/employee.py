from datetime import date

from extensions import db


class Employee(db.Model):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    department = db.Column(db.String(100))
    designation = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    address = db.Column(db.Text)
    joining_date = db.Column(db.Date)
    profile_picture = db.Column(db.Text)
    employee_code = db.Column(
    db.String(50),
    unique=True,
    nullable=True
)

    manager_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True
    )

    employment_type = db.Column(
        db.String(30),
        nullable=False,
        default="Full-time"
    )

    dob = db.Column(
        db.Date,
        nullable=True
    )

    gender = db.Column(
        db.String(20),
        nullable=True
    )

    marital_status = db.Column(
        db.String(20),
        nullable=True
    )

    nationality = db.Column(
        db.String(50),
        nullable=False,
        default="Indian"
    )

    bank_name = db.Column(
        db.String(100),
        nullable=True
    )

    account_number = db.Column(
        db.String(50),
        nullable=True
    )

    ifsc_code = db.Column(
        db.String(20),
        nullable=True
    )

    pan_no = db.Column(
        db.String(20),
        nullable=True
    )

    uan_no = db.Column(
        db.String(30),
        nullable=True
    )

    skills = db.Column(
        db.JSON,
        nullable=False,
        default=list
    )

    certifications = db.Column(
        db.JSON,
        nullable=False,
        default=list
    )

    about = db.Column(
        db.Text,
        nullable=True
    )

    manager = db.relationship(
        "User",
        foreign_keys=[manager_id],
        lazy=True
    )

    user = db.relationship(
        "User",
        foreign_keys=[user_id],
        backref=db.backref("employee", uselist=False)
    )