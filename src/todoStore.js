import { v4 as uuid } from 'uuid';
import { writable } from 'svelte/store';

class TodoStore {
  constructor() {
    this._todos = writable(this.loadTodos());
  }

  loadTodos() {
    const todosFromStorage = localStorage.getItem('todos');

    return ((todosFromStorage != undefined) ? JSON.parse(todosFromStorage) : []);
  }

  get todos() {
    return this._todos;
  }

  add(todo) {
    if (this.validateDescription(todo)) return;

    this._todos.update(todos => {
      const newSet = [...todos, { id: uuid(), ...todo }]
      this.updateStorage(newSet)
      return newSet
    })
  }

  destroy(id) {
    this._todos.update(todos => {
      const newSet = todos.filter(todo => todo.id !== id);
      this.updateStorage(newSet)
      return newSet
    })
  }

  updateStorage(value) {
    localStorage.setItem('todos', JSON.stringify(value));
  }

  validateDescription(todo) {
    if (todo.description === undefined) {
      alert("Description can't be blank!");
      return true
    }

    return false
  }
}

const instance = new TodoStore();
Object.freeze(instance);

export default instance;
