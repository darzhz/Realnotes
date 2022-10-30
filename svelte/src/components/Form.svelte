<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  const dispatch = createEventDispatcher();
 window.post = function(url, data) {
  return fetch(url, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
}
 let name;
  let id;
  let desc;
 const close = () =>{
  dispatch('close');
  post('/report',{name,id,desc});
  }
</script>
<div class="container">
  <div class="row">
    <div class="col-25">
    </div>
    <div class="col-75">
      <input type="text" id="fname"  bind:value={name} spellcheck="false" name="firstname" placeholder="Your name..">
    </div>
  </div>
  <div class="row">
    <div class="col-25">
    </div>
    <div class="col-75">
      <input type="text" id="email"  bind:value={id} spellcheck="false" name="email" placeholder="Your email or social media handle">
    </div>
  </div>
  <div class="row">
    <div class="col-25">
    </div>
    <div class="col-75">
      <textarea id="subject" spellcheck="false"  bind:value={desc} name="subject" placeholder="describe the bug" style="height:200px"></textarea>
    </div>
  </div>
  <br>
  <div class="row">
    <input type="submit" on:click={close} value="Submit">
  </div>
</div>
<style>

* {
  box-sizing: border-box;
}
.row {
  width:100%;
}
input[type=text], textarea {
    width: 95%;
    padding: 14px;
    border: none;
    border-radius: 13px;
    background: #bcc5ce;
    resize: vertical;
    color: white;
    text-align: center;
    outline:none;
}
input[type=submit] {
    background-color: #19c384;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 97px;
}

input[type=submit]:hover {
  background-color: #04AA6D;
}

.container {
  border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.col-25 {
  margin-top: 6px;
}

.col-75 {
  margin-top: 6px;
}

@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    /*width: 100%;*/
    margin-top: 0;
  }
}

</style>