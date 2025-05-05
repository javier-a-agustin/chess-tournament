from django.urls import path
from . import views

urlpatterns = [
    path('tournaments/', views.TournamentListView.as_view(), name='tournament-list'),
    path('tournaments/<str:code>/', views.TournamentDetailView.as_view(), name='tournament-detail'),
] 