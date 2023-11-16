def protected_route_middleware(get_response):
    # One-time configuration and initialization.

    def middleware(request):
        print(request.path)

        response = get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    return middleware