import { Component, OnInit } from '@angular/core';
import { Card } from '../interfacce/card';
import { timer } from 'rxjs';
@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrls: ['./board.css']
})
export class Board implements OnInit {
  cards: Card[] = [];
  contatoreClick: number = 0;
  turnoGiocatore1: boolean = true;
  primaCardClick!: Card;
  punteggioGiocatore1: number = 0;
  punteggioGiocatore2: number = 0;
  isFlipped = false;
  lock = false;

  ngOnInit() {
    let seeds: number[] = [];
    //creo un array di seed casuali 
    while (seeds.length < 16) {
      let seedCasuale = Math.floor(Math.random() * 100);
      if (!seeds.includes(seedCasuale)) {
        seeds.push(seedCasuale);
        seeds.push(seedCasuale);
      }
    }
    //mischio l ordine dell'array
    for (let seed in seeds) {
      let indexCasuale = Math.floor(Math.random() * 8);
      let varAppoggio = seeds[seed];
      seeds[seed] = seeds[indexCasuale];
      seeds[indexCasuale] = varAppoggio
    }

    // creo le carte con id unico
    this.cards = seeds.map((seed, index) => ({
      id: index,
      seed,
      flipped: false
    }));
  }



//   flipCard(id: number) {
//     const card = this.cards.find(c => c.id === id);
//      if (!card || card.flipped || this.contatoreClick >= 2) return;
//       if (card && !card.flipped) {
//         card.flipped = true;
//         this.contatoreClick++;
//         if (this.contatoreClick == 1) {
//           this.primaCardClick = card;
//         }
//         else {
//           if (card.seed != this.primaCardClick.seed) {
//             this.contatoreClick++;
//             card.flipped = false;
//             this.primaCardClick.flipped = false;
//             this.contatoreClick = 0;
//           }

//           else {
//             if(this.turnoGiocatore1){
//               this.punteggioGiocatore1++;
//             }
//             else{
//               this.punteggioGiocatore2++;
//             }
//             this.contatoreClick=0;
//           }
//       }
    
//   }

// }

flipCard(id: number) {
  if (this.lock) return;

  const card = this.cards.find(c => c.id === id);
  if (!card || card.flipped) return;

  card.flipped = true;
  this.contatoreClick++;

  if (this.contatoreClick === 1) {
    this.primaCardClick = card;
  } else if (this.contatoreClick === 2) {
    this.controllaCoppia(card);
  }
}

controllaCoppia(secondaCard: any) {
  if (secondaCard.seed !== this.primaCardClick.seed) {
    this.lock = true;
    // ribalta le carte dopo 2 secondi
    setTimeout(() => {
      secondaCard.flipped = false;
      this.primaCardClick.flipped = false;
      this.contatoreClick = 0;
      this.lock = false;
    }, 2000);
  } else {
    // carte uguali assegna punteggio
    if (this.turnoGiocatore1) this.punteggioGiocatore1++;
    else this.punteggioGiocatore2++;
    this.contatoreClick = 0;
  }
}

}


