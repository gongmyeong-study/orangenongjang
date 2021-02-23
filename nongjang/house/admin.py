from django.contrib import admin
from django.utils.html import format_html

from house.models import House, Place


class HouseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'introduction', 'places', 'is_hidden', 'created_at', 'updated_at')
    list_filter = ('is_hidden', )
    search_fields = ('name', )
    readonly_fields = ('place_list', )

    def places(self, house):
        return format_html(
            f"<a href='/admin/house/place/?house_id={house.id}'>places</a>"
        )

    def place_list(self, house):
        places = house.places.all()
        result = f"<div><a href='/admin/house/place/?house_id={house.id}'>[places]</a><br/><br/>"
        for place in places:
            place_display = f'<del>{place}</del>' if place.is_hidden else f'{place}'
            result += f"<a href='/admin/house/place/{place.id}/change/'>{place_display}</a><br>"
        result += "<div>"
        return format_html(result)


class PlaceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', '_house', 'is_hidden', 'created_at', 'updated_at')
    list_filter = ('is_hidden', )
    search_fields = ('name', )

    def _house(self, place):
        return format_html(
            f"<a href='/admin/house/house/{place.house.id}/change/'>{place.house}</a>"
        )


admin.site.register(House, HouseAdmin)
admin.site.register(Place, PlaceAdmin)
