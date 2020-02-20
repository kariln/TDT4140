from rest_framework import viewsets
from .serializers import ListSerializer
from .models import List
from rest_framework.response import Response
from rest_framework.decorators import action


class ListViewSet(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    queryset = List.objects.all()
    """
    Authentication_classes?
    permission_classes?
    pagination_class?
    """
    @action(detail=False, methods=['get'])
    def list_by_group(self, request):
        """
        Endpoint needs a query parameter called group. It should have the id of the group you want to query in.\n
        The endpoint return lists that are connected to the group
        """
        group = request.query_params.get('group', None)
        self.queryset = self.queryset.filter(group=group)
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
