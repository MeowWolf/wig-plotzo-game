// audio.js - handles all user input

import Globals from './globals';

const DEFAULT_FADEOUT = 2500;

class Audio {

  static loadSfx(game) {
    game.load.audio('hero-dive', require('./assets/sfx/BrianDive.m4a'));
    game.load.audio('hero-jump', require('./assets/sfx/BrianJump.m4a'));
    game.load.audio('hero-kick1', require('./assets/sfx/BrianKick1.m4a'));
    game.load.audio('hero-kick2', require('./assets/sfx/BrianKick2.m4a'));
    game.load.audio('hero-kick3', require('./assets/sfx/BrianKick3.m4a'));
    game.load.audio('hero-punch1', require('./assets/sfx/BrianPunch1.m4a'));
    game.load.audio('hero-punch2', require('./assets/sfx/BrianPunch2.m4a'));
    game.load.audio('hero-punch3', require('./assets/sfx/BrianPunch3.m4a'));
    game.load.audio('death1', require('./assets/sfx/Death1.m4a'));
    game.load.audio('death2', require('./assets/sfx/Death2.m4a'));
    game.load.audio('death3', require('./assets/sfx/Death3.m4a'));
    game.load.audio('death4', require('./assets/sfx/Death4.m4a'));
    game.load.audio('door1', require('./assets/sfx/Door1.m4a'));
    game.load.audio('door2', require('./assets/sfx/Door2.m4a'));
    game.load.audio('door3', require('./assets/sfx/Door3.m4a'));
    game.load.audio('foodpickup', require('./assets/sfx/FoodPickup.m4a'));
    game.load.audio('gameover', require('./assets/sfx/GameOver.m4a'));
    game.load.audio('go', require('./assets/sfx/Go.m4a'));
    game.load.audio('npcdespawn', require('./assets/sfx/NPCDespawn.m4a'));
    game.load.audio('npc-hit1', require('./assets/sfx/NPCHit1.m4a'));
    game.load.audio('npc-hit2', require('./assets/sfx/NPCHit3.m4a'));
    game.load.audio('npc-hit3', require('./assets/sfx/NPCHit2.m4a'));
    game.load.audio('breakglass1', require('./assets/sfx/PropBreakGlass1.m4a'));
    game.load.audio('breakglass2', require('./assets/sfx/PropBreakGlass2.m4a'));
    game.load.audio('breakglass3', require('./assets/sfx/PropBreakGlass3.m4a'));
    game.load.audio('breakmetal1', require('./assets/sfx/PropBreakMetal1.m4a'));
    game.load.audio('breakmetal2', require('./assets/sfx/PropBreakMetal2.m4a'));
    game.load.audio('breakmetal3', require('./assets/sfx/PropBreakMetal3.m4a'));
    game.load.audio('ready', require('./assets/sfx/Ready.m4a'));
    game.load.audio('thisway', require('./assets/sfx/ThisWayMix.m4a'));
    game.load.audio('dog1', require('./assets/sfx/Dog1.m4a'));
    game.load.audio('dog2', require('./assets/sfx/Dog2.m4a'));
    game.load.audio('dog3', require('./assets/sfx/Dog3.m4a'));
    game.load.audio('grunt1', require('./assets/sfx/Pain1.m4a'));
    game.load.audio('grunt2', require('./assets/sfx/Pain2.m4a'));
    game.load.audio('grunt3', require('./assets/sfx/Pain3.m4a'));
    game.load.audio('grunt4', require('./assets/sfx/Pain4.m4a'));
    game.load.audio('grunt5', require('./assets/sfx/Pain5.m4a'));
    game.load.audio('bossgrunt1', require('./assets/sfx/BossPain1.m4a'));
    game.load.audio('bossgrunt2', require('./assets/sfx/BossPain2.m4a'));
    game.load.audio('bossgrunt3', require('./assets/sfx/BossPain3.m4a'));
    game.load.audio('bosssight', require('./assets/sfx/BossSight.m4a'));
    game.load.audio('gloriacheer', require('./assets/sfx/GloriaCheer.m4a'));
    game.load.audio('gloriawin', require('./assets/sfx/GloriaWin.m4a'));
  }

  static loadMusic(game, level) {
      const path = './assets/musics/';
      const musics = {
        act2: 'GO17-Act2_aac.m4a',
        act3: 'GO17-Act3_aac.m4a',
        boss: 'GO17-Boss_aac.m4a',
        maintheme: 'GO17-MainTheme_aac.m4a',
        fanfare: 'GO17-Fanfare_aac.m4a'
      };

      game.load.audio(level, require('./assets/musics/' + musics[level]));
  }

  constructor(game) {
    this.game = game;

    this._soundsOn = Globals.noSounds == false;
    this._musicOn = Globals.noMusic == false;

    this._current = null;

    // add all possible musics
    this.musics = {
        maintheme: game.add.audio('maintheme', 1, true),
        act2: game.add.audio('act2', 1, true),
        act3: game.add.audio('act3', 1, true),
        boss: game.add.audio('boss', 1, true),
        fanfare: game.add.audio('fanfare', 1, false),
    };

    // add all possible sfx
    this.sfx = {
      hero: {
        dive: game.add.audio('hero-dive'),
        kick: [
          game.add.audio('hero-kick1'),
          game.add.audio('hero-kick2'),
          game.add.audio('hero-kick3')
        ],
        jump: game.add.audio('hero-jump'),
        punch: [
          game.add.audio('hero-punch1'),
          game.add.audio('hero-punch2'),
          game.add.audio('hero-punch3')
        ],
        death: game.add.audio('death1')
      },
      door: [
        game.add.audio('door1'),
        game.add.audio('door2'),
        game.add.audio('door3')
      ],
      foodpickup: [
        game.add.audio('foodpickup')
      ],
      gameover: [
        game.add.audio('gameover')
      ],
      go: [
        game.add.audio('go')
      ],
      npcdespawn: [
        game.add.audio('npcdespawn')
      ],
      npc: {
        hit: [
          game.add.audio('npc-hit1'),
          game.add.audio('npc-hit2'),
          game.add.audio('npc-hit3')
        ],
        death: [
          game.add.audio('death2'),
          game.add.audio('death3'),
          game.add.audio('death4')
        ],
        grunts: [
          game.add.audio('grunt1'),
          game.add.audio('grunt2'),
          game.add.audio('grunt3'),
          game.add.audio('grunt4'),
          game.add.audio('grunt5'),
        ],
        boss: {
          grunts: [
            game.add.audio('bossgrunt1'),
            game.add.audio('bossgrunt2'),
            game.add.audio('bossgrunt3'),
          ],
          mock: game.add.audio('bosssight')
        },
        gloria: {
          cheer: game.add.audio('gloriacheer'),
          win: game.add.audio('gloriawin'),
        }
      },
      breakglass: [
        game.add.audio('breakglass1'),
        game.add.audio('breakglass2'),
        game.add.audio('breakglass3')
      ],
      breakmetal: [
        game.add.audio('breakmetal1'),
        game.add.audio('breakmetal2'),
        game.add.audio('breakmetal3')
      ],
      ready: [
        game.add.audio('ready')
      ],
      thisway: [
        game.add.audio('thisway')
      ],
      dog: {
        bark: [ 
          game.add.audio('dog1'),
          game.add.audio('dog2')
        ],
        goodboy: game.add.audio('dog3')
      }
    };
  }

  _canPlay(audio) {
    if (!audio) 
      return true;

    if (audio && audio.name in this.musics) {
      return this._musicOn;
    }

    return this._soundsOn;
  }

  play(audio, key = 0) {
    if (!this._canPlay(audio)) {
      return;
    }

    if(Array.isArray(audio)) {
      if (key === true) {
        const idx = this.game.rnd.integerInRange(0, audio.length - 1);
        this._current = audio[idx];
      } else {
        this._current = audio[key];
      }
    }
    else {
      this._current = audio;
    }

    this._current.play();
  }

  stop(audio = null, key = 0) {
    if (!this._canPlay(audio)) {
      return;
    }

    if(audio) {
      if(Array.isArray(audio))
        audio[key].stop();
      else
        audio.stop();
    }
    else if(this._current)
      this._current.stop();
    else
      this.game.sound.stopAll();
  }

  fadeOut(audio, key = 0) {
    if (!this._canPlay(audio)) {
      return;
    }

    if(audio) {
      if(Array.isArray(audio))
        audio[key].stop();
      else
        audio.fadeOut(DEFAULT_FADEOUT);
    }
    else if(this._current) {
      this._current.fadeOut(DEFAULT_FADEOUT);
    }
  }

  set soundsOn(value) {
    this._soundsOn = value;
    localStorage.setItem(`noSounds`, !value);
  }
  get soundsOn() {
    return this._soundsOn;
  }
  set musicOn(value) {
    this._musicOn = value;
    localStorage.setItem(`noMusic`, !value);
  }
  get musicOn() {
    return this._musicOn;
  }
}

export default Audio;
