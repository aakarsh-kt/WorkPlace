import { Scene } from "phaser";
import Phaser from "phaser";
import { EventBus } from "../EventBus";
import useUserStore from '../../components/useUserStore';

export class WorkStation extends Scene {

    constructor() {
        super("WorkStation");
        this.player = null;
        this.previousPosition = { x: 0, y: 0 };
        this.otherPlayers = new Map(); // Store other player sprites by their IDs
    }

    preload() {
        this.load.image("star", "assets/star.png");
        this.load.image("logo", "assets/logo.png");
        this.load.image("background", "assets/bg.png");
        this.load.spritesheet('dude', '/assets/image.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('dude3', '/assets/sprite3.png', { frameWidth: 400, frameHeight:620 });
        this.load.spritesheet('dude2', '/assets/sprite2.jpg', { frameWidth: 32, frameHeight: 48 });
        this.load.image('desk','/assets/desk.png');
        this.load.image("carpet",'/assets/carpet.jpg');
    }

    create() {
        // Background
        this.add.image(512, 420, "background").setScale(1);
            this.add.image(200, 150, "desk").setScale(0.05);
            this.add.image(100, 200, "desk").setScale(0.05);
            this.add.image(600, 400, "desk").setScale(0.05);
            this.add.image(700, 450, "desk").setScale(0.05);
            this.add.image(800, 700, "desk").setScale(0.05);
            for(let i=0;i<50;i++){
            this.add.image(i*25,500,'carpet').setScale(0.005);    
            }
            for(let i=0;i<50;i++){
            this.add.image(i*25,525,'carpet').setScale(0.005);    
            }
        // Main player sprite
        this.dude = this.physics.add.sprite(200, 400, "dude");
        this.dude.setCollideWorldBounds(true);

        // Animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left3',
            frames: this.anims.generateFrameNumbers('dude3', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn3',
            frames: [{ key: 'dude3', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right3',
            frames: this.anims.generateFrameNumbers('dude3', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Controls
        this.cursors = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Retrieve user ID from store
        const userState = useUserStore.getState();
        this.uid = userState?.user?.uid || 'default_id';

        // Event handling
        EventBus.emit('current-scene-ready', this);

        this.socket = this.game.socket;
        if (this.socket) {
            this.socket.addEventListener('message', (event) => this.handleSocketMessage(event));
        }
    }

    handleSocketMessage(event) {
        const data = JSON.parse(event.data);

        if (data.type === 'position_update') {
            Object.entries(data.map).forEach(([playerId, position]) => {
                if (playerId !== this.uid) { // Skip the local player
                    // Check if player already exists
                    if (this.otherPlayers.has(playerId)) {
                        // Update position of the existing player sprite
                        const otherPlayer = this.otherPlayers.get(playerId);
                        otherPlayer.setPosition(position.x, position.y);
                    } else {
                        // Create new sprite for a new player
                        const newPlayer = this.add.sprite(position.x, position.y, "dude").setTint(0x3333ff);
                        newPlayer.anims.play("turn",true);
                        this.otherPlayers.set(playerId, newPlayer);
                    }
                }
            });
        }
    }

    update() {
        // Player movement
        if (this.cursors.a.isDown) {
            this.dude.x -= 2;
            this.dude.anims.play('left', true);
        } else if (this.cursors.d.isDown) {
            this.dude.x += 2;
            this.dude.anims.play('right', true);
        } else if (this.cursors.w.isDown) {
            this.dude.y -= 2;
        } else if (this.cursors.s.isDown) {
            this.dude.y += 2;
        } else {
            this.dude.anims.play('turn', true);
        }

        // Position update for server
        const { x, y } = this.dude || { x: 0, y: 0 };
        if (x !== this.previousPosition.x || y !== this.previousPosition.y) {
            this.previousPosition = { x, y };

            if (this.socket) {
                const message = JSON.stringify({
                    type: 'position_update',
                    playerId: this.uid,
                    x: x,
                    y: y,
                });

                this.socket.send(message);
            }
        }
    }
}
