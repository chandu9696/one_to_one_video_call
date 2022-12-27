import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import io from 'socket.io-client'
@Component({
  selector: 'app-chatsocket',
  templateUrl: './chatsocket.component.html',
  styleUrls: ['./chatsocket.component.scss']
})
export class ChatsocketComponent implements OnInit {

  constructor() { }
 @Input() socket:any
 @Input() user_name:string='';
 @Input() room_id:string='';
  message:string='';
 @Input() message_list:any=[];
  show_join:boolean=true;
  ngOnInit(): void {
 
    this.socket.on('receive-message',(data:any)=>{
      this.message_list=[...this.message_list,data]
      console.log(data)
    })
    
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   // if(this.socket)
  //   // this.receivemessage()
  //   console.log(changes)
  //   this.socket.on('receive-message',(data:any)=>{
  //     this.message_list=[...this.message_list,data]
  //     console.log(this.message_list)
  //   })

  // }


setmessage(e:any)
{
  this.message=e.target.value;
}
receivemessage()
{
  this.socket.on('receive-message',(data:any)=>{
    this.message_list=[...this.message_list,data]
    console.log(this.message_list)
  })
}
sendmessage()
{
  const message={
    username:this.user_name,
    message:this.message,
    room_id:this.room_id,
    time:new Date(Date.now()).getHours()+":"+ new Date(Date.now()).getMinutes()
  }
  if(this.message!='')
  {
  this.socket.emit('send-message',message)
  this.message_list=[...this.message_list,message];
  // this.receivemessage()
  }
}
}
