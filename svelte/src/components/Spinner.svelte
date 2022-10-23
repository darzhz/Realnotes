<script>
	import { fade,fly } from 'svelte/transition';
</script>
<div id="spinner">
	<img alt="loading note" transition:fade id="spinner" src="../spinner.svg" />
</div>
<style>
	#spinner {
		display: flex;
		justify-content: center;
		align-items: centers;
	}
	img {
		width: 10rem;
		height: 10rem;
		top: 30%;
		text-align:center;
		position: absolute;
		z-index: 11;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		transform: translateX(-50%);
	}
</style>