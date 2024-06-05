<script>
	import CommentBox from '$lib/components/comments/CommentBox.svelte';
</script>

<section class="sectionPrimary pt-10 dark:bg-gray-800">
	<p class="px-3 p-description text-left lg:text-center md:text-center text-3xl text-pink-600 dark:text-pink-400">
		Ein besonderer Tag für eine besondere Person
	</p>
	<p class="px-3 p-description pt-4 text-left lg:text-center md:text-center text-lg font-light text-gray-700 dark:text-white">
		Herzlich willkommen auf unserer Jubiläumsseite für Alena! Anlässlich ihres 60. Geburtstags haben
		wir diesen digitalen Raum geschaffen, damit Du Ihre besten Wünsche und Erinnerungen teilen
		kannst. Lass uns gemeinsam diesen Tag unvergesslich machen, indem wir Alena mit
		liebevollen Nachrichten und schönen Erinnerungen überraschen.
	</p>
</section>

<section class="sectionPrimary dark:bg-gray-800 pb-10">
	<CommentBox />
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
