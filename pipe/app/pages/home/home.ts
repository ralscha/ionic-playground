import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ArrayFilterPipe} from "../../pipes/array-filter-pipe.ts";

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [ArrayFilterPipe]
})
export class HomePage {

  private players: Player[];
  private teams: Team[];
  private teamId: number;

  constructor(private navController: NavController) {

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