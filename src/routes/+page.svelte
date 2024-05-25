<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let relationship = '';
	let full_name = '';
	let comment = '';
	let comments = writable([]);

	async function fetchComments() {
		const res = await fetch('/api/comment');
		const data = await res.json();
		comments.set(data);
	}

	async function submitComment() {
		const res = await fetch('/api/comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ relationship, full_name, comment })
		});

		if (res.ok) {
			relationship = '';
			full_name = '';
			comment = '';
			fetchComments();
		} else {
			const errorData = await res.json();
			alert(errorData.error);
		}
	}

	onMount(fetchComments);
</script>

<div class="comment-form">
	<label>
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
	{#each $comments as comment}
		<div class="comment">
			<strong>{comment.full_name}</strong> ({comment.relationship})
			<p>{comment.comment}</p>
			<small>{new Date(comment.created_at).toLocaleString()}</small>
		</div>
	{/each}
</div>

<style>
	.comment-form {
		margin-bottom: 1em;
	}
	.comment {
		border: 1px solid #ddd;
		padding: 1em;
		margin-bottom: 1em;
	}
</style>
