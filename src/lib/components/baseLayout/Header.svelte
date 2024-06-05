<script>
	import { DarkMode } from 'flowbite-svelte';
	import Monogramm from '$lib/components/baseLayout/monogramm.png';
	import Language from '$lib/components/buttons/Language.svelte';
</script>

<header>
	<div class="container-menu shadow-md dark:bg-gray-900">
		<div class="container-menu-secondary shadow-md">
			<div class="left-12 mx-8 my-2 w-10">
				<a href="/"><img src={Monogramm} alt="Ciss Logo" /></a>
			</div>
			<div class="container-darkmode gap-2">
				<Language />
				<DarkMode />
			</div>
		</div>
	</div>
</header>

<style>
	.container-menu {
		width: 100%;
	}

	.container-menu-secondary {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-self: center;
		margin: 0 auto;
	}

	.container-darkmode {
		display: flex;
		align-items: center;
		margin-right: 2em;
	}
</style>
