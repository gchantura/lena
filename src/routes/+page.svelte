<script lang="ts">
	import Header from '../lib/components/baseLayout/Header.svelte';
	import MainTeaser from '../lib/components/index/MainTeaser.svelte';
	import SectionPrimary from '../lib/components/index/SectionPrimary.svelte';

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

 	let relationship = '';
	let full_name = '';
	let comment = '';
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
				body: JSON.stringify({ relationship, full_name, comment })
			});

			if (!res.ok) {
				throw new Error('Failed to submit comment.');
			}

			relationship = '';
			full_name = '';
			comment = '';
			fetchComments();
		} catch (error) {
			console.error('Submit error:', error);
			errorMessage = 'Failed to submit comment.';
		}
	}

	onMount(fetchComments);
	import { Alert, DarkMode } from 'flowbite-svelte'; 
</script>

<Header />
<MainTeaser />
<SectionPrimary />

<div class="comment-form">
	<label class="text">
		Relationship:
		<input bind:value={relationship} type="text" placeholder="e.g., Family" />
	</label>
	<label>
		Full Name:
		<input bind:value={full_name} type="text" placeholder="e.g., John Doe" />
	</label>
	<label>
		Comment:
		<textarea bind:value={comment} placeholder="Your comment here..."></textarea>
	</label>
	<button on:click={submitComment}>Post Comment</button>
</div>

<div class="comments">
	{#if errorMessage}
		<p>{errorMessage}</p>
	{:else}
		{#each $comments as comment}
			<div class="comment">
				<strong>{comment.full_name}</strong> ({comment.relationship})
				<p>{comment.comment}</p>
				<small>{new Date(comment.created_at).toLocaleString()}</small>
			</div>
		{/each}
	{/if}
</div>

<style>
	/* Styles for comment form and comments */
</style>
