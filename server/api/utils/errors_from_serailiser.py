def errors_from_serialiser(serialiser, code=400):
    errors = {}
    for field_name, field_errors in serialiser.errors.items():
        errors[field_name] = field_errors[0]
    errors['status'] = code

    return errors
