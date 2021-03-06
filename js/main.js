;(function (Phaser) {
  var GameState = {
    init: function () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

      this.scale.pageAlignHorizontally = true
      this.scale.pageAlignVertically = true
    },

    preload: function () {
      this.load.image('backyard', 'assets/images/backyard.png')
      this.load.image('apple', 'assets/images/apple.png')
      this.load.image('candy', 'assets/images/candy.png')
      this.load.image('rotate', 'assets/images/rotate.png')
      this.load.image('toy', 'assets/images/rubber_duck.png')
      this.load.image('arrow', 'assets/images/arrow.png')
      this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1)
    },

    create: function () {
      this.background = this.game.add.sprite(0, 0, 'backyard')

      this.apple = this.game.add.sprite(72, 570, 'apple')
      this.apple.anchor.setTo(0.5, 0.5)
      this.apple.inputEnabled = true
      this.apple.params = { health: 20 }
      this.apple.events.onInputDown.add(this.pickItem, this)

      this.candy = this.game.add.sprite(144, 570, 'candy')
      this.candy.anchor.setTo(0.5, 0.5)
      this.candy.inputEnabled = true
      this.candy.params = { health: -10, fun: 10 }
      this.candy.events.onInputDown.add(this.pickItem, this)

      this.toy = this.game.add.sprite(216, 570, 'toy')
      this.toy.anchor.setTo(0.5, 0.5)
      this.toy.inputEnabled = true
      this.toy.params = { fun: 10 }
      this.toy.events.onInputDown.add(this.pickItem, this)

      this.rotate = this.game.add.sprite(288, 570, 'rotate')
      this.rotate.anchor.setTo(0.5, 0.5)
      this.rotate.inputEnabled = true
      this.rotate.events.onInputDown.add(this.rotatePet, this)

      this.pet = this.game.add.sprite(100, 400, 'pet')
      this.pet.anchor.setTo(0.5, 0.5)
      this.pet.params = { health: 100, fun: 100 }
      this.pet.inputEnabled = true
      this.pet.input.enableDrag()

      this.buttons = [this.apple, this.candy, this.pet, this.rotate]

      this.selectedItem = null
      this.uiBlocked = false
    },

    update: function () {},

    pickItem: function (sprite, event) {
      if (!this.uiBlocked) {
        console.log('pick item')
        this.clearSelection()
        sprite.alpha = 0.4
        this.selectedItem = sprite
        this.uiBlocked = true
      }
    },

    rotatePet: function (sprite, event) {
      if (!this.uiBlocked) {
        console.log('rotating')
        this.clearSelection()
        sprite.alpha = 0.4
        this.uiBlocked = true
      }
    },

    clearSelection: function () {
      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].alpha = 1.0
      }
      this.selectedItem = null
    }
  }

  // initialize Phaser framework
  var game = new Phaser.Game(360, 640, Phaser.AUTO)

  game.state.add('GameState', GameState)
  game.state.start('GameState')
})(window.Phaser)
