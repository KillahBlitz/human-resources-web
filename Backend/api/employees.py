from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from api import api

from extensions import db
from models import Employment
from schemas import employment_schema, employments_schema

class Employee(Resource):
    def get(self):
        employees = Employment.query.order_by(Employment.employment_id.asc()).all()
        return employments_schema.dump(employees), 200
    
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400
        try:
            employment = employment_schema.load(data)
        except ValidationError as err:
            return {"errors": err.messages}, 422
        db.session.add(employment)
        db.session.commit()
        return employment_schema.dump(employment), 201
        
class EmploymentDetail(Resource):
    def get(self, employment_id):
        employment = Employment.query.get_or_404(employment_id)
        return employment_schema.dump(employment), 200
    
    def put(self, employment_id):
        employment = Employment.query.get_or_404(employment_id)
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400
        try:
            employment = employment_schema.load(data, instance=employment, partial=False)
        except ValidationError as err:
            return {"errors": err.messages}, 422
        
        db.session.commit()
        return employment_schema.dump(employment), 200
    
    def delete(self, employment_id):
        employment = Employment.query.get_or_404(employment_id)
        db.session.delete(employment)
        db.session.commit()
        return {"message": "Deleted successfully"}, 200
    

api.add_resource(Employee, '/employees', endpoint='employees')
api.add_resource(EmploymentDetail, '/employees/<int:employment_id>', endpoint='employee_detail')