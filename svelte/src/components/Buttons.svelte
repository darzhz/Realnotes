<script>
export let btn=[];
</script>

<div class="button-container">
{#each btn as bt}
	<button class="button" id={bt}>{bt}</button>
{/each}
</div>
<style>

.button-container{
	position:absolute;
	left:0;
	right:0;
	text-align:center;
	z-index:1;
	margin-top:2rem;
}
.button {
margin:0 0.5em 0 0.5em;
  border-radius: 999px;
 /* box-shadow: 0px 3px 8px 1px rgba(0,0,0,0.35);*/
  box-sizing: border-box;
  cursor: pointer;
  font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
  font-size: 16px;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 8px 18px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: none;
  background-color:rgba(0,0,0,0.05);
  backdrop-filter:blur(20px);
  color:white;
  font-weight:250;
}
@media screen and (max-width: 200px) {
  .button {
    font-size: 30px;
  }
}
</style>
