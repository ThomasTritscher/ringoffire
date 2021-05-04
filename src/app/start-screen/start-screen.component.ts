import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  game: any;

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }


  newGame() {
    // Start Game
    let game = new Game;
    this.firestore
      .collection('Games')
      .add(game.toJson())
      .then( (gameInfo: any) => {
        // console.log(gameInfo);
        this.router.navigateByUrl('/game/' +gameInfo.id);
      });
    
  }
}
