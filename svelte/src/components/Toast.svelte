<script>
	export let show = false;
	export let message = "notify test";
	$: showT = show;
	$: {
		if(showT)
			setTimeout(()=>{showT = false}, 5000);
	}
</script>
{#if showT}
<div id="toast" class:show={true}>
<div id="img"></div>
<div id="desc">{message}</div>
</div>
{/if}
<style>
	#toast {
    /*visibility: hidden;*/
    max-width: 50px;
    height: 50px;
    /*margin-left: -125px;*/
    margin: auto;
   	background: rgba(155 ,163, 171,50%);
   	backdrop-filter: blur(2px);
   	border-radius: 10px;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-weight: 200;
    position: fixed;
    z-index: 50;
    left: 0;right:0;
    bottom: 30px;
    font-size: 17px;
    white-space: nowrap;
}
	#img{
		content: url('../favicon.png');
		width: 100%;
		object-fit: contain;

	}
#toast #img{
	width: 50px;
	height: 50px;
    border-radius: 15%;
    float: left;
    background: rgba(255, 255, 255, 40% );
    padding-top: 16px;
    padding-bottom: 16px;
    user-select: none;
    box-sizing: border-box;
    color: #fff;
}
#toast #desc{

    
    color: #fff;
   
    padding: 16px;
    
    overflow: hidden;
	white-space: nowrap;
}

.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 2s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 4s, fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes expand {
    from {min-width: 50px} 
    to {min-width: 350px}
}

@keyframes expand {
    from {min-width: 50px}
    to {min-width: 350px}
}
@-webkit-keyframes stay {
    from {min-width: 350px} 
    to {min-width: 350px}
}

@keyframes stay {
    from {min-width: 350px}
    to {min-width: 350px}
}
@-webkit-keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 60px; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 60px; opacity: 0;}
}
</style>
