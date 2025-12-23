from extensions import ma, db
from marshmallow import fields, validate
from models import Employment


class EmploymentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Employment
        load_instance = True
        sqla_session = db.session

    employment_id = fields.Int(dump_only=True)
    name = ma.auto_field(required=True, validate=validate.Length(min=1, max=100))
    department = ma.auto_field(required=True, validate=validate.Length(min=1, max=100))
    salary = fields.Float(required=True, validate=validate.Range(min=0))


employment_schema = EmploymentSchema()
employments_schema = EmploymentSchema(many=True)