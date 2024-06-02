<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let relationship = '';
	let full_name = '';
	let comment = '';
	let comment_from = '';
	let comment_title = '';
	let comments = writable([]);
	let errorMessage = '';

	async function fetchComments() {
		try {
			const res = await fetch('/api/comment');
			if (!res.ok) {
				throw new Error('Failed to fetch comments.');
			}
			const data = await res.json();
			comments.set(data.rows); // Assuming `rows` contains the array of comment objects
		} catch (error) {
			console.error('Fetch error:', error);
			errorMessage = 'Failed to fetch comments.';
		}
	}

	async function submitComment() {
		try {
			const res = await fetch('/api/comment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ relationship, full_name, comment, comment_from, comment_title })
			});

			if (!res.ok) {
				throw new Error('Failed to submit comment.');
			}

			relationship = '';
			full_name = '';
			comment = '';
			comment_from = '';
			comment_title = '';
			fetchComments();
		} catch (error) {
			console.error('Submit error:', error);
			errorMessage = 'Failed to submit comment.';
		}
	}

	onMount(fetchComments);
	import { Alert, DarkMode } from 'flowbite-svelte';
</script>

<form class="container-comment" on:submit|preventDefault={submitComment}>
	<div
		class="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
	>
		<div class="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
			<div class="mb-4 grid gap-6 md:grid-cols-2">
				<div class="ml-4 w-64">
					<Label for="name">Dein Name</Label>
					<Input
						type="text"
						id="name"
						bind:value={full_name}
						placeholder="Erika Musterfrau..."
						required
					/>
				</div>
				<div class="ml-4 w-64">
					<Label for="city">Land oder Stadt</Label>
					<Input type="text" id="city" bind:value={comment_from} placeholder="..." required />
				</div>
				<div class="ml-4 w-64">
					<Label for="relation">Wer bist du für Alena?</Label>
					<Input
						type="text"
						id="relation"
						bind:value={relationship}
						placeholder="Freund:in, Kollege:in, ..."
						required
					/>
				</div>
				<div class="ml-4 w-64">
					<Label for="titel">Titel des Posts</Label>
					<Input
						type="text"
						id="titel"
						bind:value={comment_title}
						placeholder="Dear Alena..."
						required
					/>
				</div>
			</div>
		</div>
		<div class="rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
			<Label for="editor" class="sr-only">Veröffentlichen</Label>
			<textarea
				id="editor"
				rows="8"
				bind:value={comment}
				class="block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
				placeholder="Hier kannst du deine Glückwünsche schreiben..."
				required
			></textarea>
		</div>
	</div>
	<div class="container-button">
		<button type="submit">Glückwunsch speichern</button>
	</div>
</form>

<figure
	class="flex flex-col items-center justify-center rounded-t-lg border-b border-gray-200 bg-white p-8 text-center md:rounded-t-none md:rounded-ss-lg md:border-e dark:border-gray-700 dark:bg-gray-800"
>
	{#if errorMessage}
		<p>{errorMessage}</p>
	{:else}
		{#each $comments as comment}
			<blockquote class="comment mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
				<p class="my-4">{comment.comment}</p>
			</blockquote>
			<figcaption class="flex items-center justify-center">
				<div class="ms-3 space-y-0.5 text-left font-medium rtl:text-right dark:text-white">
					<div>From:{comment.full_name}</div>
					<div class="text-sm text-gray-500 dark:text-gray-400">
						Who I'm for Alena:({comment.relationship})
					</div>
					<div class="text-sm text-gray-500 dark:text-gray-400">
						From Country:{comment.comment_from}
					</div>
					<div class="text-sm text-gray-500 dark:text-gray-400">Topic:{comment.comment_title}</div>
					<small
						>{new Date(comment.created_at).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}</small
					>
				</div>
			</figcaption>
		{/each}
	{/if}
</figure>

<style>
	.container-comment {
		display: flex;
		flex-direction: column;
		width: 50vw;
		margin: 0 auto;
	}
	.container-button {
		display: flex;
		justify-content: flex-end;
	}

	@media only screen and (max-width: 992px) {
		.container-comment {
			width: 55vw;
		}
	}

	@media only screen and (max-width: 768px) {
		.container-comment {
			width: 60vw;
		}
	}

	@media only screen and (max-width: 576px) {
		.container-button {
			display: flex;
			justify-content: center;
		}
		.container-comment {
			width: 80vw;
		}
	}
</style>
