<script>
	import Button from './components/Buttons.svelte';
	import Home from './components/Home.svelte';
	let state = "";
	let tf;
	let share;
	let home;
	let isHome=false;
	let time = null;
	window.onload=()=>{
	//http redirect 
	/*if (location.protocol != 'https:') {
 	location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
	}*/
	if(window.location.href == window.location.origin+'/'){
                isHome = true;
        }else{
	const loc = (window.location.href).replace("http","ws");
	let ws = new WebSocket(loc);
	let enc = new TextDecoder("utf8");
	ws.addEventListener('message',(event)=>{
        
	//console.log("mesage : "+event.data);
	let textS = JSON.parse(event.data);
	//console.log(textS);
	if(textS !='')
		tf.value = textS;
	else
		ws.send(tf.value);

    });
	tf = document.querySelector("#tf");
	share = document.querySelector("#Share");
	home = document.querySelector("#home");
	tf.addEventListener('keyup',()=>{
		clearTimeout(time);
		time = setTimeout(()=>{
			ws.send(tf.value);
		},750);
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
	home.addEventListener('click',()=>{
		window.location.href = window.location.origin;
	});
	}
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
	{#if isHome}
		<Home/>
	{:else}
	<h1>RealTime notes</h1>
	<textarea id="tf" spellcheck="false" placeholder="write something new to share 💌.."></textarea>
	<Button btn={["Share","Home"]}/>
	{/if}
</main>
</body>
<style>
	:root{
		--pri:#bcc5ce;
		--sec:#939fae;
		--priAlt:#947FFE;
		--secAlt:#A998FE;
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
		text-align:-moz-left ;
  	height:60vh;
		font-weight: 380;
    /*width:100%;*/	
    width:95%;
    margin:0;
    margin-left: auto;
    margin-right: auto;
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
  textarea:hover{
 	transition: all 0.3s ease-in-out;
 		transform: scale(1.01);
  	box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
  }
   textarea:focus{
 	transition: all 0.3s ease-in-out;
 		transform: scale(1.07);
  	box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
  }
  textarea::placeholder {
   		text-align: center;
   		transition:all 1s ease-in-out;
   }
	@media only screen and (min-width: 640px) {
		main {
			max-width: none;
		}
		textarea{
			width: 60%;
    padding-top: 0vh;
    margin-top: 0vh;
		}
	}
</style>
