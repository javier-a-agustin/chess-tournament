import uuid

from django.db import models
from django.contrib.auth.models import User


def generate_uuid():
    return str(uuid.uuid4())


class Tournament(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pendiente"),
        ("in_progress", "En Curso"),
        ("completed", "Finalizado"),
    ]

    MODE_CHOICES = [
        ("classical", "Clásico (>60 min)"),
        ("rapid", "Rápido (10-60 min)"),
        ("blitz", "Blitz (3-10 min)"),
        ("bullet", "Bala (<3 min)"),
        ("hyperbullet", "Ultrabala (30 seg)"),
    ]

    name = models.CharField(max_length=200, verbose_name="Nombre del Torneo")
    start_date = models.DateTimeField(verbose_name="Fecha de Inicio")
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="pending", verbose_name="Estado"
    )
    mode = models.CharField(
        max_length=200, choices=MODE_CHOICES, default="classical", verbose_name="Modo"
    )
    prize = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Premio")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    code = models.CharField(
        max_length=200,
        verbose_name="Código del Torneo",
        unique=True,
        default=generate_uuid,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Torneo"
        verbose_name_plural = "Torneos"


class Participant(models.Model):
    tournament = models.ForeignKey(
        Tournament,
        on_delete=models.CASCADE,
        related_name="participants",
        verbose_name="Torneo",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tournament_participations",
        verbose_name="Usuario",
    )
    registration_date = models.DateTimeField(
        auto_now_add=True, verbose_name="Fecha de Inscripción"
    )
    is_active = models.BooleanField(default=True, verbose_name="Activo")
    elo = models.IntegerField(default=1000, verbose_name="Elo")
    points = models.IntegerField(default=0, verbose_name="Puntos")

    def __str__(self):
        return f"{self.user.username} - {self.tournament.name}"

    class Meta:
        verbose_name = "Participante"
        verbose_name_plural = "Participantes"
        unique_together = ("tournament", "user")


class Match(models.Model):
    STATUS_CHOICES = [
        ("scheduled", "Programado"),
        ("in_progress", "En Curso"),
        ("completed", "Finalizado"),
    ]

    tournament = models.ForeignKey(
        Tournament,
        on_delete=models.CASCADE,
        related_name="matches",
        verbose_name="Torneo",
    )
    match_id = models.CharField(
        max_length=50, unique=True, verbose_name="ID de Partida"
    )
    player1 = models.ForeignKey(
        Participant,
        on_delete=models.CASCADE,
        related_name="matches_as_player1",
        verbose_name="Jugador 1",
    )
    player2 = models.ForeignKey(
        Participant,
        on_delete=models.CASCADE,
        related_name="matches_as_player2",
        verbose_name="Jugador 2",
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="scheduled",
        verbose_name="Estado",
    )
    start_time = models.DateTimeField(
        null=True, blank=True, verbose_name="Hora de Inicio"
    )
    end_time = models.DateTimeField(
        null=True, blank=True, verbose_name="Hora de Finalización"
    )
    winner = models.ForeignKey(
        Participant,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="won_matches",
        verbose_name="Ganador",
    )

    def __str__(self):
        return f"Partida {self.match_id} - {self.tournament.name}"

    class Meta:
        verbose_name = "Partida"
        verbose_name_plural = "Partidas"
