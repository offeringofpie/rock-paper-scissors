import { Entity, Rock, Paper, Scissors, Lizard, Spock } from "./Entities";
import store from "../../store";

export default class Play {
  entities: Entity[];
  amount: number;
  speed: number;
  fontSize: number;
  index: number;
  angle: number;
  scale: number;
  state: any;

  constructor() {
    this.entities = [];
    this.speed = 0.3;
    this.state = store.getState();
    this.amount = 100;
    this.fontSize = 15;
    this.index = 0;
    this.angle = 0;
    this.scale = 1;
  }

  init() {
    if (typeof document !== "undefined") {
      const { devicePixelRatio: ratio = 1 } = window;

      this.amount = this.state.amount;
      this.speed = this.state.speed;
      const { width, height } = document
        .querySelector(".drawer-content")
        .getBoundingClientRect();
      let j = 0;
      for (let i = 0; i < this.amount; i++) {
        let entities = [new Rock(), new Paper(), new Scissors()];

        if (JSON.parse(this.state.mode)) {
          entities.push(new Lizard(), new Spock());
        }

        j++;
        if (j >= entities.length) {
          j = 0;
        }
        let entity = entities[j];
        entity.index = i;
        entity.x = Math.random() * (width / ratio);
        entity.y = Math.random() * (height / ratio);
        this.entities.push(entity);
      }
      store.setState({ entities: this.entities, winner: "" }, false);

      this.entities.forEach((entity, i) => {
        let closest = this.getClosest(entity, i, "win");
      });
    }
  }

  restart() {
    this.entities = [];
    this.init();
    store.setState({ play: true, restart: false, winner: "" }, false);
  }

  end() {
    let winner = this.entities[0].value;
    if (this.state.winner !== winner) {
      store.setState(
        {
          winner: winner,
          play: false,
        },
        false
      );
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.state.restart) {
      this.restart();
    }

    if (this.state.play) {
      if (this.allTheSame()) {
        this.end();
      } else {
        this.entities.forEach((entity: Entity, i: number) => {
          const hunted = this.getClosest(entity, i, "win");
          const ally = this.getClosest(entity, i, "ally");
          const hunter = this.getClosest(entity, i, "lose");

          // if out of bounds
          if (entity.x > ctx.canvas.width) {
            entity.x = 0;
          }
          if (entity.x < 0) {
            entity.x = ctx.canvas.width - 1;
          }
          if (entity.y > ctx.canvas.height) {
            entity.y = 0;
          }
          if (entity.y < 0) {
            entity.y = ctx.canvas.height - 1;
          }

          // if close to ally entity
          if (Math.abs(ally.x - entity.x) < 15) {
            entity.x += Math.sign(entity.x - ally.x) * this.speed;
          }
          if (Math.abs(ally.y - entity.y) < 15) {
            entity.y += Math.sign(entity.y - ally.y) * this.speed;
          }

          // if close to hunted entity
          if (Math.abs(hunted.x - entity.x) > 2) {
            entity.x += Math.sign(hunted.x - entity.x) * this.speed;
          }

          if (Math.abs(hunted.y - entity.y) > 2) {
            entity.y += Math.sign(hunted.y - entity.y) * this.speed;
          }

          // if close to hunter entity
          if (Math.abs(hunter.x - entity.x) > 2) {
            entity.x -= Math.sign(entity.x - hunter.x) * this.speed;
          }

          if (Math.abs(hunter.y - entity.y) > 2) {
            entity.y -= Math.sign(entity.y - hunter.y) * this.speed;
          }

          ctx.fillText(entity.value as string, entity.x, entity.y);
        });
      }
    } else {
      this.idle(ctx);
    }
  }

  collision(ent1: Entity, ent2: Entity, state: any) {
    const newEntity =
      ent1.name === "rock"
        ? new Rock()
        : ent1.name === "paper"
        ? new Paper()
        : ent1.name === "scissors"
        ? new Scissors()
        : ent1.name === "lizard"
        ? new Lizard()
        : new Spock();
    newEntity.index = ent2.index;
    newEntity.x = ent2.x;
    newEntity.y = ent2.y;
    // remove losing entity
    state.entities.splice(ent2.index, 1);
    // replace with cloned entity
    state.entities.splice(newEntity.index, 0, newEntity);
  }

  getClosest(entity: Entity, i: number, condition: string) {
    let entities = this.state.entities;
    let closest = entities[i];
    let delta = this.distance(entity, closest);

    entities.forEach((entity2: Entity, j: number) => {
      let d = this.distance(entity, entity2);

      if (
        !delta ||
        // it's not the same object
        (i !== j &&
          // distance is lower than the defined
          d < delta)
      ) {
        if (condition == "ally" && entity.name == entity2.name) {
          closest = entity2;
          delta = d;
        } else if (
          condition == "lose" &&
          entity.loses?.includes(entity2.name as string)
        ) {
          closest = entity2;
          delta = d;
        } else if (entity.wins?.includes(entity2.name as string)) {
          if (d <= 10) {
            this.collision(entity, entity2, this.state);
          }
          closest = entity2;
          delta = d;
        }
      }
    });

    return closest;
  }

  allTheSame() {
    let baseName = this.state.entities[0].name;
    let same = true;

    this.state.entities.forEach((entity: Entity) => {
      if (entity.name !== baseName) {
        same = false;
      }
    });

    return same;
  }

  distance(e1: Entity, e2: Entity) {
    var diffX = e1.x - e2.x;
    var diffY = e1.y - e2.y;
    return diffX * diffX + diffY * diffY;
  }

  idle(ctx: CanvasRenderingContext2D) {
    const emojis = ["🗿", "🗞️", "✂️", "🦎", "🖖"];
    const options = ["rock", "paper", "scissors", "lizard", "spock"];
    const colors = ["#1f2937", "#3adfad", "#ef4444", "#65a30d", "#fbbf24"];

    const { width } = ctx.canvas.getBoundingClientRect();
    const { devicePixelRatio: ratio = 1 } = window;

    let divisor = width > 420 ? 2 : 2;
    let fontSize = this.fontSize;

    this.angle += Math.PI / 180;
    this.scale = 0.5 + Math.abs(Math.cos(this.angle));
    fontSize += this.fontSize / this.scale;
    ctx.font = `${fontSize}px "Press Start 2P", monospace`;

    if (fontSize > 44) {
      this.index++;
    }

    if (this.index > emojis.length - 1) {
      this.index = 0;
    }

    const textDim = ctx.measureText(emojis[this.index]);
    ctx.fillText(
      emojis[this.index],
      width / divisor / ratio,
      100 - fontSize / 4
    );

    ctx.font = `${this.fontSize}px "Press Start 2P", monospace`;
    ctx.fillStyle = "grey";
    options.forEach((option, i) => {
      ctx.fillStyle = colors[i];
      ctx.fillText(
        option,
        width / divisor / ratio,
        130 + 12 * i + fontSize / 4
      );
    });
  }
}
