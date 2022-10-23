<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch  = createEventDispatcher();
	export let lockStatus;
	if(lockStatus){
		lock();
	}
	function copyT(){
		dispatch('copyText');
	}
	let lockbtn = false;
	function lock(){
		lockbtn = lockbtn?false:true;
		dispatch('lock');
	}
</script>
	<div id="wrapper">
		<div id="additional">
			
		</div>
		<div id="btns">
			<div id="save" class="btns" onclick="save()"></div>
			<div id="copy" class="btns" on:click={copyT}></div>
			<div id="lock" class="btns" class:unlock={lockbtn} on:click={lock}></div>
			<div id="ghost" class="btns" onclick="ghost()"></div>
			<div id="bug" class="btns" onclick="bug()"></div>
		</div>
	</div>
<style>
	#wrapper{
    	width: 95%;
    	margin-left: auto;
    	margin-right: auto;
		display: grid;
		grid-template-columns :1fr  1fr;
	}
	#btns{
		display: flex;
		flex-direction: row;
		column-gap: 10px;
		justify-content: flex-end;
		color: white;
		font-weight: 280;
		user-select: none;
	}
	.btns {
		border: none;
		width:22px;
		height:22px;
		vertical-align: middle;
		padding-right: 1px;
		border-radius: 6px;
		display: inline-block;
		/*box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.35);*/
		box-shadow: 1px 1px 7px 2px rgb(0 0 0 / 8%);
		margin: 0;
		padding: 0;
		transition: al 200ms ease-in-out;
	}
	.btns:hover{
		/*box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);*/

		box-shadow: 1px 1px 7px 2px rgb(0 0 0 / 16%);
		transition: al  200ms ease-in-out;
		transform: scale(1.1);
	}
	#copy::before{
		content: url('../copy.png')
	}
	#lock::before{
		content: url('../unlock.png');
	}
	.unlock{
		content: url('../lock.png');
		background-color: rgba(255, 0, 0, 0.30);
	}
	#ghost::before{
		content: url('../ghost.png');
	}
	#save::before{
		content: url('../save.png');
	}
	#bug::before{
		content: url('../bug.png');
	}
	@media only screen and (min-width: 640px) {
		#wrapper{
			width: 60%;
    		padding-top: 0vh;
    		margin-top: 0vh;
		}
	}
</style>