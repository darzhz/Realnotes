<script>
export let btn=[];
</script>

<div class="button-container">
{#each btn as bt}
	<button class="button">{bt}</button>
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
 box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  box-sizing: border-box;
  color: #444444;
  cursor: pointer;
  font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 8px 18px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;
  background-color:#F4F8FB;
}
@media screen and (max-width: 200px) {
  .button {
    font-size: 30px;
  }
}
</style>
