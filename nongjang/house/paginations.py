from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class NecessityLogPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 20

    def get_paginated_response(self, data):
        return Response({
            'next': self.page.next_page_number() if self.page.has_next() else None,
            'count': self.page.paginator.count,
            'results': data,
        })
