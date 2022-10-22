<script>
import { onMount } from 'svelte';
import { fly } from 'svelte/transition';
// onMount(async () => {
// 	});
export let date;
export let last;
let week = 604800000;
let then = new Date(date);
let last_updated = new Date(last);
let now  = Date.now();
let tdif = then.getTime() + week;
function calcTimeDiff(current,previous){
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;
  let elapsed = current - previous;
  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return  Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return  Math.round(elapsed / msPerYear) + ' years ago';
  }
}
</script>
<div id="dates">
	<div id="time">
	<p id="show">{calcTimeDiff(now,last_updated.getTime())}</p>
	<p id="hide">{calcTimeDiff(now,then.getTime())} </p>
	</div>
	<div id="left">
	<p id="ttl">{calcTimeDiff(tdif,now).replace("ago","left")}</p>
</div>
</div>
<style>
	#dates {
    border: none;
    text-align: -moz-left;
    font-weight: 280;
    width: 95%;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    color: white;
    display: grid;
    grid-template-columns: 1fr 1fr;
	}
	#dates p {
    	text-align: left;
		margin: 0;
		z-index: 2;
		user-select: none;

	}
	#hide{
		opacity: 0.1;
		transform: translateY(-2px);
		transition: all 300ms ease-in-out;
	}
	#show{
		transform: translateY(12px);
		transition: all 300ms ease-in-out;
	}
	#show::before{
		content: url('../refresh-line.png');
		display: inline-block;
		vertical-align: middle;
		padding-right: 3px;
	}
	#ttl::before{
		content: url('../bombb.png');
		display: inline-block;
		vertical-align: middle;
		padding-right: 3px;
	}
	#hide::before{
		content: url('../created.png');
		display: inline-block;
		vertical-align: middle;
		padding-right: 3px;
	}
	#show:hover{
		transform: translateY(0px);
		transition: all 300ms ease-in-out;
	}
	#show:hover + #hide{
		opacity: 1;
		transition: all 300ms ease-in-out;
	}
	
	#left {
		display: flex;
    	align-items: center;
    	justify-content: end;
	}
	@media only screen and (min-width: 640px) {
		#dates{
			width: 60%;
    		padding-top: 0vh;
    		margin-top: 0vh;
		}
	}
</style>
