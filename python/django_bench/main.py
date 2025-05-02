import sys
import uuid
from functools import cache
from django.conf import settings
from django.http import JsonResponse
from django.urls import path
from django.core.wsgi import get_wsgi_application

# Configure Django settings
settings.configure(
    DEBUG=True,
    SECRET_KEY=str(uuid.uuid4()),
    ROOT_URLCONF=__name__,
    ALLOWED_HOSTS=['*'],
)

@cache
def get_json_items():
    return [{"message": "Hello World"} for _ in range(100)]

def hello_world(request):
    return JsonResponse(get_json_items(), safe=False)

urlpatterns = [
    path('hello-world', hello_world),
]

app = get_wsgi_application()
