var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player,cursors,slime,platform,scoreText,score=0;

function preload (){
    this.load.image("cat", "../assets/images/cat.png");
    this.load.image("bg", "../assets/images/bg.png");
    this.load.image("ground", "../assets/images/platform.png");
    this.load.spritesheet("catcher", "../assets/images/catcher.png", {frameWidth: 500, frameHeight: 500});
}

function create (){


//Background & Platform

    platform = this.physics.add.staticGroup();
    platform.create(640,645, 'ground').setScale(4).refreshBody();
    this.add.image(640,360, "bg");

//Knight

    player = this.physics.add.sprite(1180, 450, 'catcher').setScale(0.5);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platform);

//Score Text

    scoreText = this.add.text(16, 16, 'Slimes Killed: 0', { fontSize: '32px', fill: '#000' });    

//Slime
   
    slime = this.physics.add.group();   
    slime.create(250,400, 'cat').setScale(0.5)

    this.physics.add.collider(slime, platform);
    this.physics.add.overlap(player, slime, endSlime, null, this);

    function endSlime (player, slime)
    {
        slime.disableBody(true, true);
        score += 1;
        scoreText.setText("Slimes Killed: " + score);

        if(score == 1) {
            return alert("YOU WIN!")
        }

    }

//Keybinds

    cursors = this.input.keyboard.createCursorKeys();

}

function update () {

//Setting Keybinds

    if (cursors.left.isDown) {   
    player.setVelocityX(-160);
    
    }

    else if (cursors.right.isDown) {
    player.setVelocityX(160);
    }

    else {
    player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
    }

}