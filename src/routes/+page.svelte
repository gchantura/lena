<script lang="ts">
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

<MainTeaser />
<SectionPrimary />

<style>

</style>
