new Vue({
    el: "#app",
    data: {
        isGameRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        damages: []
    },
    methods: {
        newGame: function () {
            this.isGameRunning = !this.isGameRunning;
            this.playerHealth = this.monsterHealth = 100;
            this.damages = [];
        },
        attack: function () {
            let damage = Math.max(Math.floor(Math.random() * 10) + 1, 3);
            this.monsterHealth -= damage;

            if (this.playerAttack(damage)) {
                return
            }

            this.monsterAttack()
        },
        specialAttack: function () {
            let damage = Math.max(Math.floor(Math.random() * 20) + 1, 10);
            this.monsterHealth -= damage;

            if (this.playerAttack(damage)) {
                return
            }

            this.monsterAttack()
        },
        heal: function () {
            if (this.playerHealth < 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.damages.unshift({
                isPlayer: true,
                damage: 'Player Heals for 10'
            })
            this.monsterAttack()
        },
        giveUp: function () {
            this.isGameRunning = !this.isGameRunning
            this.playerHealth = this.monsterHealth = 100;
            this.damages = [];
        },
        monsterAttack: function () {
            let damage = Math.max(Math.floor(Math.random() * 12) + 1, 5);
            this.playerHealth -= damage;
            this.damages.unshift({
                isPlayer: false,
                damage: 'Monster hits Player for ' + damage
            })
            if (this.playerHealth <= 0) {
                if (confirm('You Loose, Restart ?')) {
                    this.isGameRunning = true;
                    this.playerHealth = this.monsterHealth = 100;
                    this.damages = [];
                } else {
                    this.newGame()
                }
            }
        },
        playerAttack: function (damage) {
            this.damages.unshift({
                isPlayer: true,
                damage: 'Player Hits Monster for ' + damage
            });
            if (this.monsterHealth <= 0) {
                if (confirm('You Won!!, Restart ?')) {
                    this.isGameRunning = true;
                    this.playerHealth = this.monsterHealth = 100;
                    this.damages = [];
                    return true
                } else {
                    this.newGame()
                    return true
                }
            }
        }
    }
})