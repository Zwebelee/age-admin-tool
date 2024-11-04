from flask import abort


def validate_required_fields(model, data):
    required_fields = [column.name for column in model.__table__.columns if
                       not column.nullable and not column.primary_key]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        abort(400, description=f"Missing required fields: {', '.join(missing_fields)}")
