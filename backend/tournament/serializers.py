from rest_framework import serializers
from .models import Tournament, Match, Participant


class MatchSerializer(serializers.ModelSerializer):
    player1_username = serializers.CharField(source="player1.user.username")
    player2_username = serializers.CharField(source="player2.user.username")

    class Meta:
        model = Match
        fields = [
            "match_id",
            "status",
            "player1_username",
            "player2_username",
            "start_time",
            "end_time",
            "winner",
        ]


class ParticipantSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Participant
        fields = ["username", "elo", "points", "id"	]


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = [
            "name",
            "start_date",
            "status",
            "mode",
            "prize",
            "created_at",
            "updated_at",
            "code",
        ]


class TournamentDetailSerializer(serializers.ModelSerializer):
    matches = MatchSerializer(many=True, read_only=True)
    participants = ParticipantSerializer(many=True, read_only=True)

    class Meta:
        model = Tournament
        fields = [
            "name",
            "start_date",
            "status",
            "mode",
            "prize",
            "created_at",
            "updated_at",
            "code",
            "matches",
            "participants",
        ]
