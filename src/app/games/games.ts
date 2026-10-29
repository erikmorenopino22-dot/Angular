import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-games',
  styleUrl: './games.css',
  templateUrl: './games.html',
})
export class Games {
  username = input('');
  @Output() addFavoriteGame = new EventEmitter<string>();

  filter = 'todos';
  myGames: number[] = [];
  favorites: number[] = [];

  games = [
    { id: 1, name: 'Chess', emoji: '♟️', genre: 'Estrategia', players: '2' },
    { id: 2, name: 'Checkers', emoji: '🔴', genre: 'Estrategia', players: '2' },
    { id: 3, name: 'Go', emoji: '⚪', genre: 'Estrategia', players: '2' },
    { id: 4, name: 'Monopoly', emoji: '🎩', genre: 'Familiar', players: '2-8' },
    { id: 5, name: 'Parchís', emoji: '🎲', genre: 'Familiar', players: '2-4' },
    { id: 6, name: 'Catan', emoji: '🌾', genre: 'Estrategia', players: '3-4' },
    { id: 7, name: 'Uno', emoji: '🃏', genre: 'Cartas', players: '2-10' },
    { id: 8, name: 'Scrabble', emoji: '🔤', genre: 'Palabras', players: '2-4' },
    { id: 9, name: 'Trivial', emoji: '❓', genre: 'Preguntas', players: '2-6' },
  ];

  getGames() {
    if (this.filter === 'mios') {
      return this.games.filter((game) => this.myGames.includes(game.id));
    }
    if (this.filter === 'favoritos') {
      return this.games.filter((game) => this.favorites.includes(game.id));
    }
    return this.games;
  }

  addGame(game: { id: number; name: string }) {
    if (this.myGames.includes(game.id)) {
      this.myGames = this.myGames.filter((id) => id !== game.id);
      // si lo quito de mis juegos tambien deja de ser favorito
      if (this.favorites.includes(game.id)) {
        this.fav(game);
      }
    } else {
      this.myGames.push(game.id);
    }
  }

  fav(game: { id: number; name: string }) {
    if (this.favorites.includes(game.id)) {
      this.favorites = this.favorites.filter((id) => id !== game.id);
    } else {
      this.favorites.push(game.id);
      if (!this.myGames.includes(game.id)) {
        this.myGames.push(game.id);
      }
    }
    this.addFavoriteGame.emit(game.name);
  }
}
