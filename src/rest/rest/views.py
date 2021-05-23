from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from django.http import JsonResponse

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
collection = db.test_collection

posts = db.posts
data = []


class TodoListView(APIView):

    def get(self, request):
       
        global data
        data = list(data)
        global posts
        todo = posts.find()
        
        for post in todo:
            data.append({'title':post["title"]})
             # Implement this method - return all todo items from db instance above.
        #data = JsonResponse(data,safe=False)
        seen = set()
        new_l = []
        for d in data:
            t = tuple(d.items())
            if t not in seen:
                seen.add(t)
                new_l.append(d)
        return Response(new_l, status=status.HTTP_200_OK)
        
    def post(self, request):
        global posts
        
        
        if request.method == 'POST':
            posts.insert_one(request.data).inserted_id
        
            return Response('OK!',status=status.HTTP_200_OK)
    
        return Response("error", status=status.HTTP_400_BAD_REQUEST)

