from django.shortcuts import render
from rest_framework import serializers
from rest_framework.generics import GenericAPIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class RegisterApi(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializers = UserSerializer(data=request.data)
        print('data -------------', request.data, type(request.data))
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=HTTP_201_CREATED)
        return Response(serializers.errors, status=HTTP_400_BAD_REQUEST)
