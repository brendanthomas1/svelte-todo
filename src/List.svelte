<script>
  import { onMount } from 'svelte';
  import Item from './Item.svelte';
  import TodoStore from './todoStore';

  export let listTitle;

  let { todos } = TodoStore;
  let newTodoInput;

  const clearInput = () => document.getElementById('new_todo').value = '';

  function addTodo() {
    TodoStore.add({ description: newTodoInput });

    clearInput();
  };

  function destroy(event) {
    const id = event.detail;
    TodoStore.destroy(id);
  };
</script>

<div class='column'>
  <h2>{listTitle}</h2>

  <ul>
    {#each $todos as todo}
      <Item
        id={todo.id}
        description={todo.description}
        on:destroy={destroy}
      />
    {/each}

    <input id="new_todo" bind:value={newTodoInput} />
    <a class="button" on:click={addTodo}>Add Todo</a>
  </ul>
</div>
