<script>
	import Button from './components/Buttons.svelte';
	let state = "";
	let tf;
	let time = null;
	const loc = (window.location.href).replace("http","ws");
	let ws = new WebSocket(loc);
	let enc = new TextDecoder("utf8");
	ws.addEventListener('message',(event)=>{
        console.log('Message from server ', event.data);
	tf.value = enc.decode(new Uint8Array(JSON.parse(event.data).data));

    });
    window.onload=()=>{
	tf = document.querySelector("#tf");
	/*tf.addEventListener('change',()=>{
		ws.send(tf.value);
	});*/
	tf.addEventListener('keyup',()=>{
		clearTimeout(time);
		time = setTimeout(()=>{
			ws.send(tf.value);
		},1000);
	});
	}
</script>

<main>
	<h1>Real time notes</h1>
	<textarea id="tf"></textarea>
	<Button btn={["Share","close"]}/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0;
	}

	h1 {
		color: #44444;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}
	textarea{
        height:60vh;
        width:100%;
        margin:0;
        }
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
