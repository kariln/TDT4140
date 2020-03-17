from django.contrib import admin

from .models import List, ListItem


class ListAdmin(admin.ModelAdmin):
    list_display = ("name", "group", "number_of_items", "modified_at", "created_at")
    list_filter = ("group__name",)

    def number_of_items(self, obj):
        return ListItem.objects.filter(list=obj).count()

    number_of_items.short_description = "Number of items"


class ListItemAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "quantity",
        "bought",
        "list",
    )
    list_filter = ("bought", "list__name", "list__group__name")
    search_fields = ("name", "list__name")


admin.site.register(List, ListAdmin)
admin.site.register(ListItem, ListItemAdmin)
