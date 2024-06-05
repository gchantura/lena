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

<form class="container-comment pt-12" on:submit|preventDefault={submitComment}>
	<div
		class=" mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
	>
		<div class="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
			<div class="mb-4 grid gap-6 md:grid-cols-2">
				<div class="ml-4 w-64">
					<Label for="name">Твоё имя</Label>
					<Input
						type="text"
						id="name"
						bind:value={full_name}
						placeholder="Иван Иванов..."
						required
					/>
				</div>
				<div class="ml-4 w-64">
					<Label for="city">Город или страна</Label>
					<Input type="text" id="city" bind:value={comment_from} placeholder="Львов..." required />
				</div>
				<div class="ml-4 w-64">
					<Label for="relation">Кто ты для Лены?</Label>
					<Input
						type="text"
						id="relation"
						bind:value={relationship}
						placeholder="Друг, подруга, однокланница ..."
						required
					/>
				</div>
				<div class="ml-4 w-64">
					<Label for="titel">Заголовок поста</Label>
					<Input
						type="text"
						id="titel"
						bind:value={comment_title}
						placeholder="Дорогая Леночка..."
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
				placeholder="Здесь ты можешь написать свое поздравление..."
				required
			></textarea>
		</div>
	</div>
	<div class="container-button">
		<button
			type="submit"
			class="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-slate-50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600"
			>Сохранить поздравление</button
		>
	</div>
</form>

<section class="sectionPrimary pt-10 dark:bg-gray-800">
	<p
		class="p-description px-3 text-left text-3xl text-pink-600 md:text-center lg:text-center dark:text-pink-400"
	>
		Обзор наших общих поздравлений
	</p>
	<p
		class="p-description px-3 pt-4 text-left text-lg font-light text-gray-700 md:text-center lg:text-center dark:text-white"
	>
		Добро пожаловать в раздел сообщений и поздравлений для Алёны! Здесь вы можете просмотреть все
		опубликованные сообщения.
	</p>
</section>

{#if errorMessage}
	<p>{errorMessage}</p>
{:else}
	{#each $comments as comment}
		<div class="container-comment py-4">
			<figure
				class="w-full rounded-lg border border-gray-200 bg-white p-4 text-center shadow sm:p-8 dark:border-gray-700 dark:bg-gray-800"
			>
				<figcaption
					class="box-header-post-content flex items-center justify-between border-b py-2 dark:border-gray-600"
				>
					<div
						class="gap-2 box-comment-description space-y-0.5 text-left font-medium rtl:text-right dark:text-white"
					>
						<div
							class="w-full box-name rounded-lg border border-gray-200 bg-white px-4 py-2 text-left sm:px-8 dark:border-gray-700 dark:bg-gray-800"
						>
							<div>{comment.full_name}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">
								{comment.relationship}
							</div>
						</div>

						<div class="box-data-place">
							<small
								>{new Date(comment.created_at).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}</small
							>
							<div class="text-sm text-gray-500 dark:text-gray-400">
								Из: {comment.comment_from}
							</div>
						</div>
					</div>

					<div class="text-sm text-gray-500 dark:text-gray-400">
						<p class="my-4 text-left text-lg font-medium text-gray-900 dark:text-white">
							{comment.comment_title}
						</p>
					</div>
				</figcaption>
				<blockquote class="comment mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
					<p class="my-4 text-left text-base font-medium text-gray-900 dark:text-white">
						{comment.comment}
					</p>
				</blockquote>
			</figure>
		</div>
	{/each}
{/if}

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

	.box-header-post-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
	}
	.box-comment-description {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.box-data-place {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		width: 100%;
	}

	.sectionPrimary {
		width: 100vw;
	}

	.p-description {
		max-width: 40em;
		margin: 0 auto;
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
