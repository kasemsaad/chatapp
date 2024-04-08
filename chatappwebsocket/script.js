var username = prompt("Your Name");
var myDiv = document.getElementById("myDiv");
var chatmessage = document.getElementById("chatmessage")
var sendmessage = document.getElementById("sendmsg")
var chatpage = document.getElementById('chatbox')


  myDiv.textContent = `Live chat ${username}`;
  let mysocket=new WebSocket("ws://localhost:5501")
mysocket.onopen=function(){
  console.log("open connection")
  senddata={
  name: username,
  type: "login"
  }
  data=JSON.stringify(senddata)
  mysocket.send(data)
}
mysocket.onerror=function(){
  console.log("error connection")
}
mysocket.onmessage= function (event){
    console.log("message received")
    console.log(event.data, typeof data)
    msg= JSON.parse(event.data)
    chatpage.innerHTML +=` <div class="d-flex flex-row justify-content-start mb-4">
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
      alt="avatar 1" style="width: 45px; height: 100%;">
    <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
      <p class="small mb-0" >msg['content']</p>
    </div>
  </div>`
    
    
    
}


sendmessage.addEventListener("click", function (){
    mymessage = chatmessage.value
    chatmessage.value = ''
    console.log(mymessage)
    originmessage= {
        type: "chat",
        username: username,
        body: mymessage+"\n"

    }

    originmessage = JSON.stringify(originmessage)
    mysocket.send(originmessage)

})
