/*

中介者模式： 中介者模式的作用就是接触对象与对象之间的紧密耦合关系
现实： 机场指挥塔
*/

var solution = function () {
    function Player(name, teamColor) {
        this.name = name;
        this.teamColor = teamColor;
        this.state = 'alive';
    };
    Player.prototype.win = function () {
        console.log(this.name + 'won');
    };
    Player.prototype.lose = function () {
        console.log(this.name + 'lose');
    };
    Player.prototype.die = function () {
        this.state = 'die';
        playerDirector.ReceiveMessage('playerDead', this);
    };
    Player.prototype.remove = function () {
        playerDirector.ReceiveMessage('removePlayer', this);
    };
    Player.prototype.changeTeam = function (color) {
        playerDirector.ReceiveMessage('changeTeam', this, color);
    };

    var playerFactory = function (name, teamColor) {
        var newPlayer = new Player(name, teamColor);
        playerDirector.ReceiveMessage('addPlayer', newPlayer);
        return newPlayer;
    };

    var playerDirector = (function () {
        var players = {},
            operations = {};
        operations.addPlayer = function (player) {
            var teamColor = player.teamColor;
            players[teamColor] = players[teamColor] || [];
            players[teamColor].push(player);
        };
        operations.removePlayer = function (player) {
            var teamColor = player.teamColor,
                teamPlayers = players[teamColor] || [];
            for (var i = teamPlayers.length - 1; i >= 0; i--) {
                if (teamPlayers[i] === player) {
                    teamPlayers.splice(i, 1);
                }
            }
        };
        operations.changeTeam = function (player, newTeamColor) {
            operations.removePlayer(player);
            player.teamColor = newTeamColor;
            operations.addPlayer(player);
        };
        operations.playerDead = function (player) {
            var teamColor = player.teamColor,
                teamPlayers = players[teamColor];
            var all_dead = true;
            for (var i = 0, player; player = teamPlayers[i++];) {
                if (player.state !== 'dead') {
                    all_dead = false;
                    break;
                }
            }
            if (all_dead) {
                for (var i = 0, player; player = teamPlayers[i++];) {
                    player.lose();
                }
                for (var color in players) {
                    if (color !== teamColor) {
                        var teamPlayers = players[color];
                        for (var i = 0, player; player = teamPlayers[i++];) {
                            player.win();
                        }
                    }
                }
            }
        }
        var ReceiveMessage = function () {
            var message = Array.prototype.shift.call(arguments);
            operations[message].apply(this, arguments);
        };
        return {
            ReceiveMessage,
        };
    })();
}