<script >
	import Button from './components/Buttons.svelte';
	import Home from './components/Home.svelte';
	import Spinner from './components/Spinner.svelte';
	import Dinfo from './components/Dinfo.svelte';
	import Menu from './components/Menu.svelte';
	import { onMount } from 'svelte';
	let tf;
	let share;
	let home;
	let isHome=false;
	let time = null;
	let Ready = false;
	let note = {
	created:null,
	last_updated:"",
	type:"PEER_UPDATE",
	message:'no text here',
	lock:false,
	users:1
};
	onMount(async()=>{
			//http redirect 
	/*if (location.protocol != 'https:') {
 	location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
	}*/
	if(window.location.href == window.location.origin+'/'){
                isHome = true;
 	}else{
		const loc = (window.location.href).replace("http","ws");
		let ws = new WebSocket(loc);
		ws.addEventListener('message',(event)=>{
  		Ready = true;
  		tf.readOnly = note.lock;
  		//gets a message
			let packet = JSON.parse(event.data);
			console.log("received a packet :"+JSON.stringify(packet));
			if (packet.type == "UPDATE" || packet.type == "PEER_UPDATE") {
				// note.created = packet.created;
				// note.last_updated = packet.last_updated;
				// note.users = packet.users;
				//note.lock = packet.lock;
				// note.message = packet.message;
				note =  packet;
				note.lock = note.lock;
				console.log("setting " + JSON.stringify(note.message));
				tf.value = packet.message;
			} else if (packet == "") {
				console.log("need update to peers");
				console.log("sending  :" + JSON.stringify(note));
				ws.send(JSON.stringify(note));
			}
    });
	tf = document.querySelector("#tf");
	share = document.querySelector("#Share");
	home = document.querySelector("#Home");
	tf.addEventListener('keyup',()=>{
		clearTimeout(time);
		time = setTimeout(()=>{
			note.message = tf.value;
			note.last_updated = new Date(Date.now()).toISOString();
			ws.send(JSON.stringify(note));
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
	});
	function toggleWrite(e){
		tf.readOnly = tf.readOnly?false:true;
		note.lock = tf.readOnly;
		console.log("wwrite mode is "+tf.readOnly);
	}
	function copyClip(e){
		 navigator.clipboard.writeText(note.message);
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

<main>
	{#if isHome}
		<Home/>
	{:else}
	<h1>Realnotes</h1>
	{#if !Ready}
	<Spinner/>
	{/if}
		{#if note.created}
			<Dinfo  {note}/> 
		{/if}
	<textarea id="tf" readonly spellcheck="false" placeholder="write something new to share 💌.."></textarea>
		<Menu on:copyText={copyClip} on:lock={toggleWrite} lockStatus={note.lock}/>
	<Button btn={["Share","Home"]}/>
	{/if}
</main>
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
    	box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.35);
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
