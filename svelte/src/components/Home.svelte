<script>

</script>
<h1>Realnotes</h1>
<div class="wrapper">
	<div class="whopper">
	<div class="sub-wrapper">
		<button label="new note" id="new"> New note </button>
		<input label="input link" type="text" placeholder="Enter a Code or a link"/>
		<button id="join">join</button>
	</div>
	<div class="info">
		<h2>A real time notes app for everyone</h2>
		<img alt="illustration of team work" src="collab.svg"/>
		<p>share your notes in realtime in an absolutely simple way with complete anonimity and persistant storage upto 120 minutes, enjoy writing</p>
	</div>
	</div>
</div>
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
	min-height:60vh;
	width:100%;
	border-radius: 50px;
	background: linear-gradient(145deg, #b4becb, #97a0ab);
	box-shadow:  20px 20px 60px #8f97a2,
             -20px -20px 60px #c1cddb;

	}
	.sub-wrapper{
	display:flex;
        justify-content:center;
	flex-wrap:wrap;
	margin:0;
	/*margin-top:10vh;*/
	padding:0;
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
	outline:none;
	}
	.info img{
		max-width: 80%;
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
	display:none;
        margin:0;
	padding:0;                                                    height:30px;
        width:50px;
        background:transparent;
        border:none;
        font-size:0.50rem;
        color:white;
        }
	h1 {
                color: #ffffff;
                text-transform: uppercase;
                font-size: 2.5em;
		padding-top:5vh;
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
	font-size:0.70rem;
	width:80%;
	text-align:start;
	}
	.whopper{
		position:relative;
		top:5vh;	
	}
</style>
