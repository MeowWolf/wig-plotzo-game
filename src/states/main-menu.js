// main-menu.js
// Game main menu options screen.

import Audio from '../audio';
import Globals from '../globals';
import Controls from '../controls';

import Renderer from './renderer';

const MainMenuConsts = {
  options: [
    'PLAY',
    'CONTROLS',
   // 'AUDIO',
  //  'CREDITS',
  ],
};

class MainMenu extends Renderer {
  down(item) {

    console.log(item)

  }
  
  create() {
    super.create();

    const screenCenterX = this.game.world.centerX;
    const screenCenterY = this.game.world.centerY;
   // console.log("!"+this.game.world.centerX)
    //console.log(Phaser.Mouse.start());
    
    this.playIntro(screenCenterX);

    // create a text for each option
    this.selectedOption = 0;
    this.optionTexts = [];
    let ypos = this.game.world.height / MainMenuConsts.options.length + 40;
    for(const [i, option] of MainMenuConsts.options.entries()) {
      const text = this.game.add.bitmapText(screenCenterX, ypos + 22 * i, Globals.bitmapFont, option, 14);
      text.anchor.setTo(0.5);
      
      text.inputEnabled = true;
       
      text.events.onInputDown.add(this.down, this);
      
      this.optionTexts.push(text);
    }
    
   // game.input.onDown.add(function() { alert("down") });
    
    // stop all sfx in menu
    this.audio = new Audio(this.game);
    this.audio.stop();

    this.controls = new Controls(this.game, true);
  }

  shakeScreen() {
     this.game.camera.shake(0.01, 250);
   
  }

  playIntro(screenCenterX) {
    const SPEED = 1200;
    
    this.game.add.image(0,0, 'background'); 
    this.game.add.image((240-142)/2, 2, 'undermaller'); 
    
    this.game.add.image(0, 20, 'titlearrow'); 
    
    
    const brawler = this.game.add.image(screenCenterX+8,84, 'brawler');
    brawler.anchor.setTo(0.5);
    brawler.scale.setTo(10,10);
    brawler.angle=-140;
    brawler.alpha=0;
    this.game.add.tween(brawler.scale).to({ x: 1, y:1}, SPEED, Phaser.Easing.Sinusoidal.In, true);
    this.game.add.tween(brawler).to({ angle:0}, SPEED, Phaser.Easing.Quadratic.In, true);
    this.game.add.tween(brawler).to({ alpha:1}, SPEED, Phaser.Easing.Quadratic.In, true);
    
     this.game.time.events.add(SPEED, this.shakeScreen, this);
      this.game.time.events.start();
      
      
   /* const menuTitleLeft = this.game.add.bitmapText(screenCenterX, 30, 
      Globals.bitmapFont, 'Kick', 30);
    menuTitleLeft.anchor.setTo(0.5);
    menuTitleLeft.right = 0;
    this.game.add.tween(menuTitleLeft).to({ x: screenCenterX - 50}, SPEED, 
      Phaser.Easing.Bounce.Out, true);

    const menuTitleRight = this.game.add.bitmapText(screenCenterX, 30, 
      Globals.bitmapFont, 'Punch', 30);
    menuTitleRight.anchor.setTo(0.5);
    menuTitleRight.left = this.game.width;
    this.game.add.tween(menuTitleRight).to({ x: screenCenterX + 50}, SPEED, 
      Phaser.Easing.Bounce.Out, true);*/
      
  }

  update() {
    super.update();

    for(const [i, option] of this.optionTexts.entries()) {
      if(i == this.selectedOption)
        option.tint = 0x000000;
      else
        option.tint = 0x666666;
    }

    this.handleInput();
  }

  handleInput() {
    if(this.controls.up) {
      this.selectedOption--;
      this.audio.play(this.audio.sfx.hero.punch, 2);
    }
    else if(this.controls.down) {
      this.selectedOption++;
      this.audio.play(this.audio.sfx.hero.punch, 1);
    }
    else if(this.controls.punch || this.controls.jump || this.controls.kick)
      this.chooseOption();

    if(this.selectedOption < 0)
      this.selectedOption = 0;
    if(this.selectedOption >= MainMenuConsts.options.length)
      this.selectedOption = MainMenuConsts.options.length - 1;
  }

  chooseOption() {
    // start play state
    if(this.selectedOption == 0) {
      // play sfx
      this.audio.play(this.audio.sfx.go);

//      this.state.start('loading', true, false, 'intro');
      this.state.start('act1');
    }

    // start option state
    if(this.selectedOption == 1) {
      this.audio.play(this.audio.sfx.hero.punch, 2);
      this.state.start('options');
    }

    // start audio controls state
    if (this.selectedOption == 2) {
      this.audio.play(this.audio.sfx.hero.punch, 2);
      this.state.start('options-audio');
    }

    // start credits state
    if(this.selectedOption == 3) {
      this.audio.play(this.audio.sfx.hero.punch, 2);
      this.state.start('credits');
    }
  }

}

export { MainMenu };
