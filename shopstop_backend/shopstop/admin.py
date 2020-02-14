from django.contrib import admin

from .models import List, ListItem


class ListAdmin(admin.ModelAdmin):
    pass


class ListItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'bought', 'list',)
    list_filter = ('bought', 'list__name', 'list__group__name')
    search_fields = ('name', 'list__name')


admin.site.register(List, ListAdmin)
admin.site.register(ListItem, ListItemAdmin)
