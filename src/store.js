import { makeObservable, observable, computed } from 'mobx';

class Store {
  bible = [];
  filter = '';
  selectedItem = null;

  constructor() {
    makeObservable(this, {
      bible: observable,
      filter: observable,
      selectedItem: observable,
      filteredVerses: computed,
    });
  }

  get filteredVerses() {
    return this.bible
      .filter((verse) => verse.text.toLowerCase().includes(this.filter.toLowerCase()))
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
  filteredVerses
}

const store = new Store();

fetch("/the-bible-tldr/kjv.json")
  .then(res => res.json())
  .then(bible => store.setBible(bible));

export default store;
