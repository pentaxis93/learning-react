import { create } from 'zustand'

const useStore = create((set) => ({
  bible: [],
  filter: '',
  selectedItem: null,
  setBible: (bible) => set(state => ({
    ...state,
    bible,
  })),
  setFilter: (filter) => set(state => ({
    ...state,
    filter,
  })),
  setSelectedItem: (selectedItem) => set(state => ({
    ...state,
    selectedItem,
  })),
}));

fetch("/the-bible-tldr/kjv.json")
  .then(res => res.json())
  .then(bible => useStore.setState(state => ({
    ...state,
    bible,
  }))
);

export default useStore;
