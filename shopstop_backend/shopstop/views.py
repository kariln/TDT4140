from django.http import HttpResponse


def placeholder(request):
    return HttpResponse(status=200)
