// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class CharacterSelectionScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelection');
  }

  create() {
    this.backButton = new UiButton(
      this,
      this.scale.width / 6,
      this.scale.height * 0.1,
      'button1',
      'button2',
      'Back',
      this.startScene.bind(this, 'Option'),
    );
    this.backButton.setScale(0.8);

    this.titleText = this.add.bitmapText(this.scale.width / 2, this.scale.height * 0.1, 'arcade', 'Select Avatar').setTint(0xffffff);
    this.titleText.setOrigin(0.5);
    this.titleText.setFontSize(28);

    this.createCharacters();

    this.scale.on('resize', this.resize, this);
    this.resize({ height: this.scale.height, width: this.scale.width });
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }

  createCharacters() {
    this.group = this.add.group();

    for (let j = 0; j < 3; j += 1) {
      let x = this.scale.width / 3.5;
      const y = (this.scale.height / 6) * (j + 2);

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
    this.selectionAudio = this.sound.add('goldSound', { loop: false, volume: 0.5 });
    this.selectionAudio.play();
    this.scene.start('Game', { selectedCharacter: character.characterId });
  }

  resize(gameSize) {
    const { width, height } = gameSize;

    this.cameras.resize(width, height);

    if (width < 1000) {
      this.titleText.setFontSize(28);
    } else {
      this.titleText.setFontSize(48);
    }

    let yDiff = 0;
    let xDiff = 0;
    let charactersPerRow = 8;
    let heightDiff = 6;

    if (width < 1200) {
      charactersPerRow = 6;
      heightDiff = 8;
    }

    if (width < 780) {
      charactersPerRow = 4;
      heightDiff = 8;
    }

    this.group.getChildren().forEach((child, index) => {
      if (index !== 0) {
        yDiff = parseInt(index / charactersPerRow, 10);
        xDiff = index % charactersPerRow;
      }

      const x = (width / 3.5) + (96 * xDiff);
      const y = (height / heightDiff) * (yDiff + 2);
      child.setPosition(x, y);

      if (height < 600) {
        child.setScale(1.5);
      } else {
        child.setScale(2.5);
      }
    });

    this.titleText.setPosition(width / 2, height * 0.1);
  }
}
