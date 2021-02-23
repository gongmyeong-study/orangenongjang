from django.contrib import admin

from necessity.models import Necessity


class NecessityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'option', 'description', 'price', 'is_hidden')
    list_filter = ('is_hidden', )
    search_fields = ('name', 'option')


admin.site.register(Necessity, NecessityAdmin)
