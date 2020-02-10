from django.contrib import admin

from shopstop_backend.shopstop.models import Placeholder


class PlaceholderAdmin(admin.ModelAdmin):
    pass


admin.site.register(Placeholder, PlaceholderAdmin)
