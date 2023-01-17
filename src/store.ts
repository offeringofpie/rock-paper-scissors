import { useState, useEffect } from "react";

const globalStore = {
  ctx: localStorage.getItem("ctx") ? localStorage.getItem("ctx") : null,
  mode: localStorage.getItem("mode") ? localStorage.getItem("mode") : true,
  play: false,
  restart: false,
  amount: localStorage.getItem("amount") ? localStorage.getItem("amount") : 100,
  speed: localStorage.getItem("speed") ? localStorage.getItem("speed") : 0.5,
  winner: "",
};

class Store {
  state: any;
  listeners: any;

  constructor(initialState: any) {
    this.state = initialState || globalStore;

    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(state: any, storage = true) {
    for (let key in state) {
      this.state[key] = state[key];
      if (storage) {
        localStorage.setItem(key, state[key]);
      }
    }

    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  addListener(listener: any) {
    this.listeners.push(listener);
  }
}

const store = new Store(globalStore);

store.setState(globalStore);

export default store;
