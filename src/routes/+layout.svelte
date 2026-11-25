<script lang="ts">
	import '../app.css';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';

	let { children } = $props();
</script>

<a class="skip-link" href="#main">Skip to content</a>
<Header />
<main id="main" tabindex="-1">
	{@render children()}
</main>
<Footer />
