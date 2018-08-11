function Game(){
    kontra.init();
    var sprite = kontra.sprite({
        x: 100,        // starting x,y position of the sprite
        y: 80,
        color: 'blue',  // fill color of the sprite rectangle
        width: 20,     // width and height of the sprite rectangle
        height: 40,
        dx: 2          // move the sprite 2px to the right every frame
      });
      
      var loop = kontra.gameLoop({  // create the main game loop
        update: function() {        // update the game state
          sprite.update();
      
          // wrap the sprites position when it reaches
          // the edge of the screen
          if (sprite.x > kontra.canvas.width) {
            sprite.x = -sprite.width;
          }
        },
        render: function() {        // render the game state
          sprite.render();
        }
      });
      
      loop.start();    // start the game
}

window.Game = Game;