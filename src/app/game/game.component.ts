import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game!: Game;
  gameId: string;
  pickCardAnimation: any;
  gameOver = false;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params);
      this.gameId = params.id;

      this
        .firestore
        .collection('Games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });//Collection Daten werden von FBS eingepflegt
    });
  }

  newGame(): void {
    this.game = new Game();
    // this.firestore
    // .collection('Games')
    // .add(this.game.toJson());
  }

  takeCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true;
    }
    else if (!this.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();//delete last card of the array
      this.game.pickCardAnimation = true;
      console.log('New card:' + this.game.currentCard);
      console.log('Game is', this.game);
      this.game.currentPlayer++;// elevated to the next player
      // Modulo = 3/3 = 0 stopps the after 3 players
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);//added the card into playedCards array after the animation
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }

  }
  currentCard(currentCard: any) {
    throw new Error('Method not implemented.');
  }

  editPlayer(playerId: number) {
    console.log('Edit player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Received change', change);
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1)
          this.game.player_images.splice(playerId, 1)

        } else {
          this.game.player_images[playerId] = change;//assigns player id image
        }
        this.saveGame();
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0)//check for excisting && adds players greater than 0
        console.log('The dialog was closed', name);
      this.game.players.push(name);
      this.game.player_images.push('1.webp');
      this.saveGame();
    });
  }

  saveGame() {
    this
      .firestore
      .collection('Games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

}
function i(arg0: string, i: any) {
  throw new Error('Function not implemented.');
}

