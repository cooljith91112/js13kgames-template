export default class AudioPlayer{
    constructor(){
        this.audioPlayer = new Audio();
        this.url =  window.URL || window.webkitURL;
        this.soundURL = null;
        this.attachEventListeners();
    }

    attachEventListeners(){
        this.audioPlayer.addEventListener('error', (e)=> {
            console.log("Error: " + e);
          }, false);
          this.audioPlayer.addEventListener('ended', (e)=> {
            this.audioPlayer = null;
            this.url.revokeObjectURL(this.soundURL);
          }, false);
    }

    play(soundUrl){
        this.soundURL = soundUrl;        
        this.audioPlayer.src = this.soundURL;
        this.audioPlayer.play();

    }
}