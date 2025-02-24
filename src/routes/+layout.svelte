<script lang="ts">
	import * as globals from "../global.css";
	import type { LayoutProps } from './$types';
	let { data, children }: LayoutProps = $props();

</script>

<svelte:head>
	<title>{ JSON.stringify(data.dataName.title) }</title>
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/collection/World">Collection</a>
</nav>

{@render children()}