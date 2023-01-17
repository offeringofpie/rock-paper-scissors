class Entity {
  x: number;
  y: number;
  index: number;
  name: string;
  value?: string;
  wins?: string[];
  loses?: string[];

  constructor() {
    this.x = 0;
    this.y = 0;
    this.index = 0;
    this.name = "Entity";
  }
}

class Rock extends Entity {
  constructor() {
    super();
    this.name = "rock";
    this.value = "🗿";
    this.wins = ["scissors", "lizard"];
    this.loses = ["paper", "spock"];
  }
}

class Paper extends Entity {
  constructor() {
    super();
    this.name = "paper";
    this.value = "🗞️";
    this.wins = ["rock", "spock"];
    this.loses = ["scissors", "lizard"];
  }
}

class Scissors extends Entity {
  constructor() {
    super();
    this.name = "scissors";
    this.value = "✂️";
    this.wins = ["paper", "lizard"];
    this.loses = ["rock", "spock"];
  }
}

class Lizard extends Entity {
  constructor() {
    super();
    this.name = "lizard";
    this.value = "🦎";
    this.wins = ["paper", "spock"];
    this.loses = ["rock", "scissors"];
  }
}

class Spock extends Entity {
  constructor() {
    super();
    this.name = "spock";
    this.value = "🖖";
    this.wins = ["scissors", "rock"];
    this.loses = ["lizard", "paper"];
  }
}

export { Entity, Rock, Paper, Scissors, Lizard, Spock };
