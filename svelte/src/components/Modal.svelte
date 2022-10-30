<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { fade,fly } from 'svelte/transition';
	import Form from './Form.svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal;

	const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close}></div>

<div class="modal" role="dialog" in:fly="{{ y: 100, duration: 300 }}" out:fade="{{ duration: 300 }}" aria-modal="true" bind:this={modal}>
	<Form on:close={close}/>
	<button on:click={close}>close modal</button>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 15px;
		color: white;
    	background:#939fae ;
    	z-index: 5;
	}

	button {
		display: block;
		color: #a5a59f;
    	background-color: #261e1e3b;
    	outline: none;
    	border: none;
    	margin-left: auto;
    	margin-right: auto;
    	border-radius: 6px;
	}
</style>