from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from tournament.models import Tournament, Participant
from tournament.serializers import TournamentSerializer, TournamentDetailSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404


class TournamentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        List all tournaments, optionally filtered by status.
        """
        status = request.query_params.get('status', None)
        
        tournaments = Tournament.objects.filter()
        if status:
            tournaments = Tournament.objects.filter(status=status)

        serializer = TournamentSerializer(tournaments, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TournamentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TournamentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, code):
        tournament = get_object_or_404(Tournament, code=code)
        serializer = TournamentDetailSerializer(tournament)
        return Response(serializer.data)
    
    def post(self, request, code):
        """
        Register the authenticated user in the tournament.
        """
        tournament = get_object_or_404(Tournament, code=code)
        
        # Check if tournament is in pending status
        if tournament.status != "pending":
            return Response(
                {"error": "Cannot register in a tournament that is not pending"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user is already registered
        if Participant.objects.filter(tournament=tournament, user=request.user).exists():
            return Response(
                {"error": "You are already registered in this tournament"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create new participant
        participant = Participant.objects.create(
            tournament=tournament,
            user=request.user,
            elo=1000,  # Default ELO
            points=0    # Initial points
        )
        
        return Response(
            {"message": "Successfully registered in tournament", "participant_id": participant.id},
            status=status.HTTP_201_CREATED
        )