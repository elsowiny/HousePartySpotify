from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.

#CreateAPIView
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if room.exists():
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room not found.. :/ sorry': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request Bro :/ ': 'Code Param not found in req.'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    lookup_url = 'code'
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        code = request.data.get(self.lookup_url)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if room_result.exists():
                room = room_result[0]
                self.request.session['room_code'] = code
                #for session storage ;)
                return Response({
                    'message': 'RoomJoined!'
                }, status=status.HTTP_200_OK)
            return Response({'bad request':'srry bad room code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {'Bad Request my guy': "Invalid post data, didn't find a key, sorry"},
             status=status.HTTP_400_BAD_REQUEST)
        

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        #need access to session ID
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #now we can create room
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            #if the room already exists however
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                self.request.session['room_code'] = room.code
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                #update their current room to the new settings
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
             self.request.session.create()
        data = { 
            'code': self.request.session.get('room_code')
            }
            #serializes our dict
        return JsonResponse(data, status=status.HTTP_200_OK)

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(host=host_id)
            if room_results.exists():
                room = room_results[0]
                room.delete()
        return Response({'Message':'Deleted, succesfuly'}, status=status.HTTP_200_OK)

#this was programmed in github copilot. AI programmed this. 
class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self,request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')
            room_results = Room.objects.filter(code=code)
            if not room_results.exists():
                return Response({'msg':'Room not found'}, status=status.HTTP_404_NOT_FOUND)
            room = room_results[0]
            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({'msg':'Not your room'}, status=status.HTTP_403_FORBIDDEN)

            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])    
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
