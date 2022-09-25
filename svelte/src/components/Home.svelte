<script>
	import { fade,fly } from 'svelte/transition';
	import Info from './Infotrail.svelte'; 
	let target = '';
	let joinbtn = false;
	function join(){
		if(target.length>=4&&target.length<=14)
			joinbtn = true;
		else
			joinbtn = false;
	}
	function generateUrl(){
	let url = window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
	return url;
	}
	function New(){
		if(joinbtn){
		target = target.replace(' ','_');
		window.location.href += 'notes/'+target;
		}else
		window.location.href += 'notes/'+generateUrl();
	}
console.log("nthua ee thappunne (◍•ᴗ•◍)");
</script>
<h1>Realnotes</h1>
<div class="wrapper" in:fly="{{ y: 100, duration: 1000 }}" out:fade>
	<div class="whopper">
	<div class="sub-wrapper">
		<button label="new note" on:click={New} id="new">New note</button>
		<input label="input link" bind:value={target} on:input={join} type="text" placeholder="Enter a Code or a link"/>
		{#if joinbtn}
		<button transition:fade on:click={New} id="join">join</button>
		{/if}
	</div>
	<div class="info">
		<h2>A real time notes app for everyone</h2>
		<img alt="illustration of team work" src="collab.svg"/>
		<p>share your notes in realtime in an absolutely simple way with complete anonimity and persistant storage upto 120 minutes, enjoy writing</p>
	</div>
	</div>
</div>
<Info/>
<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400&display=swap');
	:global(body){
		margin:0;
		padding:0;
	}
	.wrapper{
	margin:0;
	text-align:center;
	margin-top:5vh;
	padding:0;
	/*display:flex;
	justify-content:center;*/
	min-height:62vh;
	width:90%;
	border-radius: 50px;
	background: linear-gradient(145deg, #b4becb, #97a0ab);
	box-shadow:  20px 20px 60px #8f97a2,
             -20px -20px 60px #c1cddb;
    margin-left: auto;
    margin-right: auto;
	}
	.sub-wrapper{
	display:flex;
        justify-content:center;
	flex-wrap:wrap;
	margin:0;
	padding:0;
	padding-top:3vh;
	flex-flow:row;
	}
	.sub-wrapper input{
	margin:0;
	padding:0;
	/*background-color: rgba(51, 51, 51, 0.05);*/
	text-align:center;
	box-shadow: inset 20px 20px 100px #97a0ab,
            inset -20px -20px 100px #b9c4d1;
	color:white;
	border:none;
	border-radius:8px;
	user-select: none;                                      -webkit-user-select: none;
	touch-action: manipulation;
	border-top-left-radius:0;                       	border-bottom-left-radius:0;
	outline:none;
	/*min-width:60vw;*/
	width: 55%;
	}
	.info img{
		max-width: 75vw;
		height: auto;
	}
	#new{
	

  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border-top-right-radius:0;
  border-bottom-right-radius:0;
	}
	#join{
        margin:0;
        width:50px;
        background:transparent;
        border:none;
        font-size:0.90rem;
        color:white;
        }
	h1 {
                color: #ffffff;
                text-transform: uppercase;
                font-size: 2.5em;
		padding-top:5vh;
		margin-top:0;
                font-weight: 150;
        }
	::placeholder {
		text-align:center;
		color:white;
		font-weight:200;
		font-size:0.75rem;
	}
	.info{
	color:white;
	margin:0;
	padding:0;
	display:flex;                                                 justify-content:center;
        flex-wrap:wrap;
	}
	.info h2{
	font-size:1.5rem;
	font-family: 'Nunito Sans', sans-serif;
	font-weight:300;
	text-align:start;
	width:80%;
	padding-left:10px;
	}
	.info h2::after{
		content:'✨';
	}
	.info p{
	padding-left:10px;
	font-family: 'Nunito Sans', sans-serif;
	font-weight:200;
	font-size:0.90rem;
	width:80%;
	text-align:start;
	margin-bottom:0;
	}
	/*.whopper{
		position:relative;
		top:5vh;	
	}*/
@media only screen and (min-width: 600px) {
  .wrapper {
    width: 60%;
    padding-top: 0vh;
    margin-top: 0vh;
  }
  .info img{
		max-width: 40vw;
		height: auto;
	}
	h1 {
		padding-top: 0;
	}
	.info p {
		padding-bottom: 2vh;
	}
}
</style>
