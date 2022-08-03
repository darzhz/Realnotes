<script>
	import Button from './components/Buttons.svelte';
	let state = "";
	let tf;
	let share;
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
	share = document.querySelector("#Share");
	/*tf.addEventListener('change',()=>{
		ws.send(tf.value);
	});*/
	tf.addEventListener('keyup',()=>{
		clearTimeout(time);
		time = setTimeout(()=>{
			ws.send(tf.value);
		},1000);
	});
	share.addEventListener('click', event => {
 	 if (navigator.share) {
 	   navigator.share({
	      title: 'checkout this Live notes',
	      url: window.location.href
    	}).then(() => {
      		console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    navigator.clipboard.writeText(window.location.href);
  }
});
	}
</script>
	<svelte:head>
	<meta charset="UTF-8">
	<title>Realnotes</title>
	<meta name="description" content="A realtime temporary notes sharing app">
	<meta name="theme-color" content="#454545">
	<meta name="keywords" content="Realtime,notes,websocket">
	<meta name="author" content="Darsh">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</svelte:head>


<main>
	<h1>RealTime notes</h1>
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
