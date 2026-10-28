import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-games',
  styleUrl: './games.css',
  templateUrl: './games.html',
})
export class Games {
  // Lo recibe desde el componente user: <app-games [username]="username" />
  username = input('');

  games = [
    { id: 1, name: 'Chess', user: 'erik' },
    { id: 2, name: 'Checkers', user: 'erik' },
    { id: 3, name: 'Go', user: 'ana' },
    { id: 4, name: 'Monopoly', user: 'ana' },
    { id: 5, name: 'Parchís', user: 'luis' },
  ];

  // Solo los juegos del usuario que ha iniciado sesión
  userGames = computed(() =>
    this.games.filter(
      (game) => game.user.toLowerCase() === this.username().trim().toLowerCase()
    )
  );
}
