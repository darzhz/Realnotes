<script>
import { onMount } from 'svelte';
import { fly } from 'svelte/transition';
let info = {};
onMount(async () => {
		const res = await fetch(`\info`);
		info = await res.json();
		console.log(info);
	});
</script>
{#if Object.keys(info).length != 0}
<div id="infobox">
	<p transition:fly="{{ y: 200, duration: 2000 }}">
	Notes served : {info["NumS"]}
	&nbsp Notes in Database : {info["NumD"]}
	&nbsp live notes : {info["NumL"]} 
	</p>
</div>
{/if}
<style>
#infobox {
	font-size:0.75rem;
	font-weight:100;
	color:white;
	display:flex;
	justify-content:center;
	text-align:center;
}
</style>
