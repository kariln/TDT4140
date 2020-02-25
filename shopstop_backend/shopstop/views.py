from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import List, ListItem
from .serializers import ListItemSerializer, ListSerializer


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
        Endpoint needs a query parameter called group.
        It should have the id of the group you want to query in.\n
        The endpoint return lists that are connected to the group
        """
        group = request.query_params.get('group', None)
        self.queryset = self.queryset.filter(group=group)
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)


class ListItemViewSet(viewsets.ModelViewSet):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer

    @action(detail=False, methods=['get'])
    def listItems_by_list(self, request):
        """
        Endpoint needs a query parameter called list.
        It should have the id of the list you want to query in.\n
        The endpoint return listsitems that are connected to the lists
        """
        list = request.query_params.get('list', None)
        self.queryset = self.queryset.filter(list=list)
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
