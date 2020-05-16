import * as Phaser from 'phaser';

export default class CharacterSelectionScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelection');
  }

  create() {
    // create title text
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height * 0.1, 'Final Fantasy RPG', { fontSize: '64px', fill: '#fff' });
    this.titleText.setOrigin(0.5);

    // create sprites
    this.createCharacters();

    // handle game resize
    this.scale.on('resize', this.resize, this);
    // resize our game
    this.resize({ height: this.scale.height, width: this.scale.width });
  }

  createCharacters() {
    this.group = this.add.group();

    for (let j = 0; j < 3; j += 1) {
      let x = this.scale.width / 3.5;
      const y = this.scale.height / 6 * (j + 2);

      for (let i = 0 + (8 * j); i < 8 + (8 * j); i += 1) {
        const character = this.add.image(x, y, 'characters', i).setInteractive();
        character.characterId = i;
        character.setScale(2.5);
        character.setAlpha(0.4);
        character.on('pointerover', this.pointerover);
        character.on('pointerout', this.pointerout);
        character.on('pointerdown', this.pointerdown.bind(this, character));
        this.group.add(character);
        x += 96;
      }
    }
  }

  pointerover() {
    this.setAlpha(1);
  }

  pointerout() {
    this.setAlpha(0.4);
  }

  pointerdown(character) {
    this.scale.removeListener('resize', this.resize);
    this.scene.start('Game', { selectedCharacter: character.characterId });
  }


}
