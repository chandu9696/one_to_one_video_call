import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import AgoraRTC from "agora-rtc-sdk-ng"

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @ViewChild('videostreams',{static:true})
  myDiv?: ElementRef<HTMLDivElement>;

  APP_ID = "c0d941ba24454354babe9b1e2711f824"
  TOKEN = "007eJxTYLjcdPb0+u2z3vRmdm/SWXN/+3Zr8cDQvxW/a58bv2tX/MqowGBhnmxqYpBsbpRqaWKSZmaZZJqckmxpmWaZmmhoZGGY+EhWPTkxXyP528woBkYoBPFZGHITM/MYGAByAyOp"

  CHANNEL = "main"
  UID:any
  remote_id:any
  nativeElement: any;
  localTracks:Array<any>=[]
  meeting_start:boolean=false;
 remoteUsers:any = {}
 mic_on:boolean=true;
 strameuser:any=[];
 name_participant!:string


  constructor() { }

  ngOnInit(): void {

  }
  async joincall()
  {
    console.log('joincall')
    this.meeting_start=true;
   
    const client= AgoraRTC.createClient({mode:'rtc', codec:'vp8'});
    client.on('user-published', async(user:any,mediaType:any)=>{
      
    this.remoteUsers[user.uid] = user 
    
    this.strameuser.push({id:user.uid,name:this.name_participant});
    this.strameuser = [...new Set(this.strameuser.map((item:any) => item))]; // [ 'A', 'B']

    console.warn(this.strameuser)
     await client.subscribe(user, mediaType)

      if (mediaType === "video"){
      user.videoTrack.play('user-'+user.uid)
      console.warn('user-'+user.uid)

       }
  if (mediaType === 'audio'){
      user.audioTrack.play()
  }
    })
    client.on('user-left', (user:any)=>this.lhandleUserLeft(user))
    this.UID = await client.join(this.APP_ID, this.CHANNEL, this.TOKEN, null)
    this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 
    this.localTracks[1].play(`user-${this.UID}`)
    await client.publish([this.localTracks[0], this.localTracks[1]])
}
async joinStream() {
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
 
      
  }else{
      await this.localTracks[1].setMuted(true)
      // await this.localTracks[1].close()
 
  }
}
lhandleUserLeft(user:any){
  delete this.remoteUsers[user.uid]
  this.strameuser.pop(user.uid)
  console.warn(this.strameuser)
}
setName(e:any)
{
  this.name_participant=e.target.value;
}
}
 


