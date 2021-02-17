<script>
  import { onMount } from 'svelte';
  import Item from './Item.svelte';
  import TodoStore from './todoStore';

  export let listTitle;

  let { todos } = TodoStore;
  let newTodoInput;

  const clearInput = () => document.getElementById('new_todo').value = '';

  $: sortedTodos = $todos.sort((a,b) => a.completedAt - b.completedAt)

  function addTodo() {
    TodoStore.add({ description: newTodoInput });

    clearInput();
  };

  function destroy(event) {
    const id = event.detail;
    TodoStore.destroy(id);
  };

  function complete(event) {
    const id = event.detail;
    TodoStore.complete(id);
  };
</script>

<div class='column'>
  <h2>{listTitle}</h2>

  <dl>
    {#each sortedTodos as todo}
      <Item
        id={todo.id}
        description={todo.description}
        isComplete={!!todo.completedAt}
        on:destroy={destroy}
        on:complete={complete}
      />
    {/each}

    <input id="new_todo" bind:value={newTodoInput} />
    <a class="button" on:click={addTodo}>Add Todo</a>
  </dl>
</div>
