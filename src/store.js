import { makeAutoObservable } from 'mobx';

class Store {
  bible = [];
  filter = '';
  selectedItem = null;

  constructor() {
    makeAutoObservable(this);
  }

  setBible(bible) {
    this.bible = bible;
  }
  setFilter(filter) {
    this.filter = filter;
  }
  setSelectedItem(selectedItem) {
    this.selectedItem = selectedItem;
  }
}

const store = new Store();

fetch("/the-bible-tldr/kjv.json")
  .then(res => res.json())
  .then(bible => store.setBible(bible));

export default store;
