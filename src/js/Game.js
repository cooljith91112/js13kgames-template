export default class Game{
    constructor(){
        this.url =  window.URL || window.webkitURL;
        this.soundUrl = jsfxr([3,,0.3469,0.6652,0.2097,0.0671,,0.0916,,,,0.3062,0.8509,,,0.5633,0.0985,-0.0068,1,,,,,0.5]);
        this.player = new Audio();
        this.player.on
        this.init();
    }

    init(){
        kontra.init();
        this.main();
    }

    main(){
        let sprite = kontra.sprite({
            x: 100,        // starting x,y position of the sprite
            y: 80,
            color: 'blue',  // fill color of the sprite rectangle
            width: 20,     // width and height of the sprite rectangle
            height: 40,
            dx: 2          // move the sprite 2px to the right every frame
          });
          
          let loop = kontra.gameLoop({  // create the main game loop
            update: ()=> {        // update the game state
              sprite.update();
          
              // wrap the sprites position when it reaches
              // the edge of the screen
              if (sprite.x > kontra.canvas.width) {
                sprite.x = -sprite.width;
              }
    
              if(kontra.keys.pressed('space')){

                this.player.addEventListener('error', (e)=> {
                  console.log("Error: " + player.error.code);
                }, false);
                this.player.addEventListener('ended', (e)=> {
                  this.url.revokeObjectURL(this.soundURL);
                }, false);
                this.player.pause();
                this.player.src = this.soundUrl;
                let play = this.player.play();
                console.log(play)
              }
            },
            render: ()=> {        // render the game state
              sprite.render();
            }
          }); 

          loop.start();
    }
}