import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Games } from '../games/games';

@Component({
  imports: [Games, FormsModule],
  selector: 'app-user',
  styleUrl: './user.css',
  templateUrl: './user.html',
})
export class User {
  username = '';
  isLoggedIn = signal(false);
  githubUser = signal<any>(null);
  error = signal('');
  loading = signal(false);
  favGames: string[] = [];

  async login() {
    if (this.username.trim() === '') {
      this.error.set('Escribe tu usuario de GitHub');
      return;
    }

    this.loading.set(true);
    try {
      const res = await fetch(`https://api.github.com/users/${this.username.trim()}`);
      if (!res.ok) {
        this.error.set('Ese usuario no existe en GitHub');
        this.loading.set(false);
        return;
      }
      this.githubUser.set(await res.json());
      this.error.set('');
      this.isLoggedIn.set(true);
    } catch {
      this.error.set('No se ha podido conectar con GitHub');
    }
    this.loading.set(false);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.githubUser.set(null);
    this.favGames = [];
  }

  getfavoriteGame(Game: string) {
    if (this.favGames.includes(Game)) {
      this.favGames = this.favGames.filter((g) => g !== Game);
    } else {
      this.favGames.push(Game);
    }
  }

  greet() {
    alert(`Hello ${this.username}`);
  }
}
