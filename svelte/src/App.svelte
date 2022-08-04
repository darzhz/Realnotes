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
	<meta name="theme-color" content="#ADB7C1">
	<meta name="keywords" content="Realtime,notes,websocket">
	<meta name="author" content="Darsh">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</svelte:head>

<body>
<main>
	<h1>RealTime notes</h1>
	<textarea id="tf"></textarea>
	<Button btn={["Share","close"]}/>
</main>
</body>
<style>
	:root{
		--pri:#bcc5ce;
		--sec:#939fae;
	}
	main {
		text-align: center;
		padding: 1em;
		margin: 0;
	}
	:global(body){
		background-image:linear-gradient(90deg,var(--pri),var(--sec));
	}
	h1 {
		color: #ffffff;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 150;
	}
	textarea{
	border:none;
        height:60vh;
	font-weight: 200;
        width:100%;
        margin:0;
	outline:none;
	color:white;
	/*border-radius:2%;
	background-color:transparent;
	backdrop-filter:blur(5px);*/

	background-color: rgba(53, 53, 53, 0.20);
    	border-radius: 10px;
    	box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.55);
	backdrop-filter:blur(2px);
        }
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
