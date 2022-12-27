import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import AgoraRTC from "agora-rtc-sdk-ng"
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @ViewChild('videostreams',{static:true})
  myDiv?: ElementRef<HTMLDivElement>;

  APP_ID = "c0d941ba24454354babe9b1e2711f824"
  TOKEN ="007eJxTYEjcKRpqkxHrwNwnfDNmyer502ZHcjEVeujvKXjOyfq5Y40Cg4V5sqmJQbK5UaqliUmamWWSaXJKsqVlmmVqoqGRhWFizrxVyQ2BjAwxm90YGKEQxGdhyE3MzGNgAACCzh0n"
  CHANNEL = "main"
  UID:any
  prevUID:any;
  remote_id:any
  nativeElement: any;
  localTracks:Array<any>=[]
  meeting_start:boolean=false;
 remoteUsers:any = {}
 mic_on:boolean=true;
 show_chat:boolean=true;
 strameuser:any=[];
 name_participant!:string
 client:any
 socket:any
  user_name:string='';
  room_id:string='';
  show_join:boolean=true;
  show_reaction:boolean=false;
  message_list:any=[]
  gif_play!:string;
  smile:string='http://i.stack.imgur.com/SBv4T.gif';
  sad:string='https://media.tenor.com/08-O0rKckoMAAAAC/emoji-smiley.gif';
  gif_play_flag:boolean=false;
  gif_play_remote_flag=false;
  remote_username_reat!:string;
  remote_user_reatname!:string;
  hash:any={};
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
      // const data=this.http.get('http://localhost:5000/api/v1/product');
      // data.subscribe((data)=>{console.log(data)})
      this.client= AgoraRTC.createClient({mode:'rtc', codec:'vp8'});
      this.socket=io('http://localhost:3000')
      this.socket.on('reaction-receive',(data:any)=>{
   
        console.warn(data)
        this.remote_username_reat=data.id;
        const ele=document.getElementById('user-react-'+data.id)
        const ele1=document.getElementById('user-smile-'+data.id);
        const ele2=document.getElementById('user-sad-'+data.id);
        // console.warn(this.remote_username_reat)
        // console.warn(this.UID)
        ele!.style.display='block';
        ele1!.style.display='none';
        ele2!.style.display='none';
        // console.log(this.remote_username_reat)
        if(data.reactiontype=='smile')
        {
         
          ele1!.style.display='block';
        }
        if(data.reactiontype=='sad')
        {
         
          ele2!.style.display='block';
        }
        // this.gif_play_remote_flag=true;
        // clearTimeout(remote_username_reat)
        // console.warn('Hello'+this.hash[data.id])
        console.log(this.hash)
        // if(this.hash.data.id==='undefined')
        // {
        // this.hash[data.id]=setTimeout(()=>{
        //   ele!.style.display='none';
        // },5000)}
        // else
        // {
         
          clearTimeout(this.hash[data.id])
          this.hash[data.id]=setTimeout(()=>{
            ele!.style.display='none';
          },5000)
        
     
        
  //  unique_id=  setTimeout(()=>{
  //         ele!.style.display='none';
  //       },5000)
        // clearTimeout(this.timeout);
        // this.timeout=setTimeout(()=>{
        //   this.remote_username_reat=''
        // },5000)
      })
  }
  
  async joincall()
  {
    console.log('joincall')
    this.meeting_start=true;
   
    
    this.client.on('user-published', async(user:any,mediaType:any)=>{
      
    // this.remoteUsers[user.uid] = user 
    //push userid and name to backend
  //   const data=this.http.get('http://localhost:5000/api/v1/users');
  //   data.subscribe(async (data)=>{this.strameuser=data;
  //     this.strameuser=this.strameuser.filter((item:any)=>item.uid!=this.UID)
  //     console.warn(this.strameuser)

  //     await client.subscribe(user, mediaType)

  //     if (mediaType === "video"){
  //     user.videoTrack.play('user-'+user.uid)
  //     console.warn('user-'+user.uid)
  
  //      }
  // if (mediaType === 'audio'){
  //     user.audioTrack.play()
  // }
    
  //   })
    this.strameuser.push({id:user.uid,name:this.name_participant});
    this.strameuser=[...this.strameuser,{id:user.uid,name:this.user_name}]
    // let dummy:any=[{id:1,name:'a'},{id:1,name:'a'}]
    // dummy= [...new Set(dummy.map((item:any) => item))];
    // console.warn(dummy)
   
    this.strameuser = [...new Map(this.strameuser.map((item:any )=> [item['id'], item])).values()]
    // this.strameuser=this.strameuser.filter((item:any)=>item.id!=this.UID)
    // this.strameuser = [...new Set(this.strameuser.map((item:any) => item))]; // [ 'A', 'B']
     await this.client.subscribe(user, mediaType)

      if (mediaType === "video"){
      user.videoTrack.play('user-'+user.uid)
      console.warn('user-'+user.uid)
  
       }
  if (mediaType === 'audio'){
      user.audioTrack.play()
  }
   
    })
    this.client.on('user-left', (user:any)=>this.lhandleUserLeft(user))
    this.UID = await this.client.join(this.APP_ID, this.CHANNEL, this.TOKEN, null)
  //   this.http.post<any>('http://localhost:5000/api/v1/users', { "name": this.name_participant,"uid":this.UID}).subscribe(data => {
  //     console.warn(data)
  // })
    this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 
    this.localTracks[1].play(`user-${this.UID}`)
    await this.client.publish([this.localTracks[0], this.localTracks[1]])
}
async previewcall(){
  this.prevUID = await this.client.join(this.APP_ID, this.CHANNEL, this.TOKEN, null)
  this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 
  this.localTracks[1].play(`user-${this.prevUID}`)
  // await this.client.publish([this.localTracks[0], this.localTracks[1]])
  // // this.toggleCamera();
  // this.toggleMic();
}
async joinStream() {
  // await this.localTracks[1].close()
  // await this.localTracks[0].close()
  await this.joincall()

}
  async toggleMic() {
  if (this.localTracks[0].muted){
      await this.localTracks[0].setMuted(false)
      this.mic_on=true;
      
      console.log('one')
  }else{
      await this.localTracks[0].setMuted(true)
      this.mic_on=false;
 
  }
}


  async toggleCamera() {
  if(this.localTracks[1].muted){
 
    await this.localTracks[1].setMuted(false)
    await this.client.publish([this.localTracks[0], this.localTracks[1]])
    // this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 
    // this.localTracks[1].play(`user-${this.UID}`)
 
      
  }else{
      await this.localTracks[1].setMuted(true)
      await this.client.unpublish([this.localTracks[0], this.localTracks[1]])
      // this.localTracks[1].pause(`user-${this.UID}`)
 
      // await this.localTracks[1].close()
 
  }
}
lhandleUserLeft(user:any){
  delete this.remoteUsers[user.uid]
  this.strameuser.pop(user.uid)
  console.warn(this.strameuser)
  this.show_join=true
}
setName(e:any)
{
  this.name_participant=e.target.value;
}

setName1(e:any)
{
  this.user_name=e.target.value

}
setroomid(e:any)
{
  this.room_id=e.target.value

}
joinroom()
{
  if(this.user_name!=''&&this.room_id!='')
  this.socket.emit('join-room',this.room_id)
  this.show_join=false
  this.joinStream()
}
chat_toggle()
{
  this.show_chat=this.show_chat?false:true;
}
reaction_toggle()
{
  this.show_reaction=this.show_reaction?false:true;
}
timeout:any=setTimeout(()=>{
  this.gif_play_flag=false
},5000)
smile_click()
{
  this.gif_play=this.smile;
  clearTimeout(this.timeout)
  this.gif_play_flag=true;
  const obj={
    room_id:this.room_id,
    id:this.UID,
    reactiontype:'smile'
  }

  this.socket.emit('reaction-send',obj)

  this.timeout=setTimeout(()=>{
    this.gif_play_flag=false
  },5000)
}
sad_click()
{
  this.gif_play=this.sad;
  this.gif_play_flag=true;
  clearTimeout(this.timeout);
  const obj={
    room_id:this.room_id,
    id:this.UID,
    reactiontype:'sad'
  }
  this.socket.emit('reaction-send',obj)
  this.timeout=setTimeout(()=>{
    this.gif_play_flag=false
  },5000)
}
receivereaction()
{
  this.socket.on('receive-message',(data:any)=>{
    this.message_list=[...this.message_list,data]
    console.log(this.message_list)
  })
}

}



