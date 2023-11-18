PREFIX = 'Bearer '


def get_token(header):
    if not header.startswith(PREFIX):
        raise ValueError('Invalid token')

    return header[len(PREFIX):]
