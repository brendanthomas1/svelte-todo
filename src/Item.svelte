<script>
  import { createEventDispatcher } from 'svelte';

  export let description;
  export let id;

  const dispatch = createEventDispatcher();

  const destroy = () => dispatch('destroy', id);
</script>

<li>
  {description}
  <a class="float-right" on:click={destroy}>Delete</a>
</li>
