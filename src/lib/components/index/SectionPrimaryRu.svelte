<script>
	import CommentBoxRu from "../comments/CommentBoxRu.svelte";
</script>

<section class="sectionPrimary pt-10 dark:bg-gray-800">
	<p class="px-3 p-description text-left lg:text-center md:text-center text-3xl text-pink-600 dark:text-pink-400">
		Особенный день для особенного человека
	</p>
	<p class="px-3 p-description pt-4 text-left lg:text-center md:text-center text-lg font-light text-gray-700 dark:text-white">
		Добро пожаловать на нашу юбилейную страницу, посвященную Леночке! В честь её 60-летия мы создали
		это цифровое пространство, чтобы вы могли поделиться своими наилучшими пожеланиями и
		воспоминаниями. Давайте вместе сделаем этот день незабываемым, удивив Ленусю добрыми сообщениями
		и приятными воспоминаниями.
	</p>
</section>

<section class="sectionPrimary dark:bg-gray-800 pb-10">
	<CommentBoxRu />
</section>

<style>
	.sectionPrimary {
		width: 100vw;
	}

	.p-description {
		max-width: 40em;
		margin: 0 auto;
	}
</style>
