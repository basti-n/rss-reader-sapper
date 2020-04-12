<script>
	import { onMount } from 'svelte'

	import AddForm from '../components/AddForm.svelte'
	import RssList from '../components/RssList.svelte'
	import RssItem from '../components/RssItem.svelte'

	let showAddForm = false
	let rssUrl
	let rssList
	let feed

	$: isValidUrl = rssUrl && validateUrl(rssUrl)
	$: updateFeed = rssList && refreshRssList()

	onMount(() => {
		fetch('api/list', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(result => updateRssList(result, true))
	})

	const validateUrl = str => {
		try {
			new URL(str)
		} catch {
			return false
		}
		return true
	}

	function toggleAddForm() {
		showAddForm = !showAddForm
	}

	function setRssUrl({ detail: url }) {
		if (url && url.length > 3) {
			rssUrl = url
		}
	}

	function addRssToList({ detail: url }) {
		fetch('/api/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url }),
		})
			.then(res => res.json())
			.then(updateRssList)
	}

	function updateRssList(result, initial = false) {
		if (!!result.added || !!result.deleted || !!initial) {
			rssList = result.rssList
		}
	}

	function removeItemFromRssList({ detail: url }) {
		fetch('api/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url }),
		})
			.then(res => res.json())
			.then(updateRssList)
	}

	function refreshRssList() {
		fetch('api/refresh')
			.then(res => res.json())
			.then(setFeed)
	}

	function setFeed({ result }) {
		feed = result
	}
</script>

<style lang="scss">
	.container {
		display: flex;

		.feed-list {
			display: flex;
			flex-direction: column;
			margin-right: 15px;
		}
		.feed {
			display: flex;
			flex-flow: column;
		}
	}
</style>

<svelte:head>
	<title>Sapper RSS Reader</title>
</svelte:head>

{#if showAddForm}
	<AddForm on:input={setRssUrl} on:submit={addRssToList} valid={isValidUrl} />
{/if}

<section class="container">
	<div class="feed-list">
		{#if !showAddForm}
			<button on:click={toggleAddForm}>Add</button>
			<button on:click={refreshRssList}>Reload</button>
		{/if}

		<RssList {rssList} on:remove={removeItemFromRssList} />
	</div>

	{#if feed && feed.length}
		<section class="feed">
			{#each feed as item, index}
				<RssItem {item} isFirst={index === 0} />
			{/each}
		</section>
	{/if}
</section>
