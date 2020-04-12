<script>
	import { createEventDispatcher } from 'svelte'

	export let valid = true

	const change = createEventDispatcher()
	const submit = createEventDispatcher()

	let inputValue = 'https://www.tagesschau.de/xml/rss2'

	function valueChangeEmitter() {
		change('input', inputValue)
	}

	function submitEmitter() {
		change('submit', inputValue)

		if(valid) {
			inputValue = ''
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;

		input[type='text'] {
			flex-grow: 1;
			max-width: 300px;

			&.valid {
				color: red
			}
		}

		> *:not(:first-child) {
			margin-left: 0.5rem;
		}
	}
</style>

<div class="container">
	<button>cancel</button>
	<input
		type="text"
		bind:value={inputValue}
		on:keyup={valueChangeEmitter}
		class:valid={!valid} />
	<button on:click={submitEmitter} disabled={!valid}>ok</button>
</div>
