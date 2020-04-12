<script>
	import { createEventDispatcher } from 'svelte'

	export let rssList = []

	const removeItem = createEventDispatcher()

	function remove(item) {
		removeItem('remove', item)
	}
</script>

<style>
	.url {
		font-weight: lighter;
		font-size: 14px;
	}
</style>

<ul>
	{#each rssList as item}
		<li class="url">{item}</li>
		<button on:click={() => remove(item)}>Remove</button>
	{/each}
</ul>
