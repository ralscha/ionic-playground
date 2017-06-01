import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  players: Player[];
  teams: Team[];
  teamId: number;

  constructor() {

    this.players = [
      {
        "firstName": "Morgan",
        "lastName": "Benton",
        "username": "mbenton",
        "teamId": 1
      },
      {
        "firstName": "Kelsey",
        "lastName": "Banks",
        "username": "kbanks",
        "teamId": 1
      },
      {
        "firstName": "Jessica",
        "lastName": "Martinez",
        "username": "jmartinez",
        "teamId": 3
      },
      {
        "firstName": "Maggie",
        "lastName": "Walker",
        "username": "mwalker",
        "teamId": 2
      }
    ];

    this.teams = [
      {
        "id": 1,
        "name": "JMU"
      },
      {
        "id": 2,
        "name": "University of Richmond"
      },
      {
        "id": 3,
        "name": "UVA"
      }
    ];

    this.teamId = 1;

  }

}

interface Player {
  firstName: string,
  lastName: string,
  username: string,
  teamId: number;
}

interface Team {
  id: number,
  name: string
}