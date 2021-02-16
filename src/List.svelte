<script>
  import { onMount } from 'svelte';
  import Item from './Item.svelte';

  export let listTitle;

  let todos = [];
  let new_todo;
  let tid = 1;

  function loadTodos() {
    let todosFromStorage = localStorage.getItem('todos');

    if (todosFromStorage != undefined) {
      todos = JSON.parse(todosFromStorage);
    }
  }

  onMount(async () => loadTodos())

  function addTodo() {
    todos = [...todos, { id: tid, description: new_todo }];
    updateStorage();
    tid++;
    document.getElementById('new_todo').value = '';
  }

  function destroy(event) {
    const id = event.detail;
    todos = todos.filter(todo => todo.id !== id);
    updateStorage();
  };

  function updateStorage() {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
</script>

<div class='column'>
  <h2>{listTitle}</h2>

  <ul>
    {#each todos as todo}
      <Item
        id={todo.id}
        description={todo.description}
        on:destroy={destroy}
      />
    {/each}

    <input id="new_todo" bind:value={new_todo} />
    <a class="button" on:click={addTodo}>Add Todo</a>
  </ul>
</div>
