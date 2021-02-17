<script>
  import { createEventDispatcher } from 'svelte';

  // Props
  export let id;
  export let description;
  export let isComplete;
  //////////////////////

  const dispatch = createEventDispatcher();

  const destroy = () => dispatch('destroy', id);
  const complete = () => dispatch('complete', id);
</script>

<dt class="clearfix">
  <span class="float-left {isComplete ? 'strike' : ''}">{description}</span>
  <a class="button float-right danger" id="destroy_button" on:click={destroy}>Delete</a>
  {#if !isComplete}
    <a  class="button float-right" on:click={complete}>Complete</a>
  {/if}
</dt>

<style>
  #destroy_button {
    margin-left: 15px;
  }

  .danger {
    background-color: red;
    border: red;
  }

  .strike {
    text-decoration: line-through;
  }
</style>
