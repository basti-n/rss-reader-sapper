<script>
	export let item

	let showDetails = false

	function hideDetails() {
		showDetails = false
	}

	function toggleDetails({ target }) {
		showDetails = target.open
	}

	$: date = new Date(item.isoDate).toLocaleDateString()
	$: snippet = showDetails ? '' : item.contentSnippet.slice(0, 120) + ' ...'
</script>

<style lang="scss">
	article {
		border: 1px solid black;
		border-radius: 10px;
		padding: 0.5rem;
		margin: 0.5rem 0.15rem;

		.headline {
			display: grid;
			grid-template-columns: 1fr auto;
			grid-gap: 0.4rem;
			align-items: center;
			padding-bottom: 0.4rem;

			.title {
				font-weight: bold;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin: 0;
			}
			.date {
				margin-left: auto;
				font-weight: lighter;
				font-size: 0.8em;
			}
		}

		.content {
			display: grid;
			grid-template-rows: auto;

			& > * {
				margin: 0;
				font-size: 12px;
			}

			.link,
			.collapse {
				color: blue;
			}

			.collapse {
				cursor: pointer;
			}
		}
	}
</style>

<article>
	<div class="headline">
		<h4 class="title">{item.title}</h4>
		{#if date}
			<span class="date">{date}</span>
		{/if}
	</div>
	<div class="content">
		<details on:toggle={toggleDetails}>
			{#if !showDetails}
				<summary>{snippet}</summary>
			{/if}
			{#if showDetails}
				<p>
					{@html item.content}
					<span class="collapse" on:click={hideDetails}>
						einklappen
					</span>
				</p>
				{#if item.link}
					<a
						class="link"
						target="blank"
						referrerpolicy="no-referrer"
						href={item.link}>
						{item.link}
					</a>
				{/if}
			{/if}
		</details>
	</div>
</article>
