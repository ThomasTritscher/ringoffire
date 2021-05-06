import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  allProfilepictures = ['1.webp', '2.png', 'monkey.png', 'pinguin.svg',];

  constructor() { }

  ngOnInit(): void {
  }

}
