import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Games } from '../games/games';

@Component({
  imports: [Games, FormsModule],
  selector: 'app-user',
  styleUrl: './user.css',
  templateUrl: './user.html',
})
export class User {
  username = 'erik';
  isLoggedIn = false;

  greet(){
    alert(`Hello ${this.username}`);
  }
}
