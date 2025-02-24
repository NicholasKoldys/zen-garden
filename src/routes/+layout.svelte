<script lang="ts">
	import * as globals from "../global.css";
	import { base } from "$app/paths";
	import type { LayoutProps } from "./$types";
	let { data, children }: LayoutProps = $props();

</script>

<svelte:head>
	<title>{ JSON.stringify(data.dataName.title) }</title>
</svelte:head>

<nav>
	<a href="{base}/">Home</a>
	<a href="{base}/about">About</a>
	<a href="{base}/collection/World">Collection</a>
</nav>

{@render children()}