from extensions import db
from sqlalchemy import Numeric


class Employment(db.Model):
    __tablename__ = 'employment'

    employment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    salary = db.Column(Numeric(10, 2), nullable=False)

    def __repr__(self):
        return f"<employment {self.employment_id} - {self.name}>"