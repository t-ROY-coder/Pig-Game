/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var score, roundScore, activePlayer, isGameOn, winningScore
newGame()

function togglePlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
    document.querySelector('.dice1').style.display = 'none'
    document.querySelector('.dice2').style.display = 'none'

}

function newGame() {
    score = [0, 0]
    roundScore = 0
    activePlayer = 0
    document.querySelector('.dice1').style.display = 'none'
    document.querySelector('.dice2').style.display = 'none'
    isGameOn = true

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('#name-0').textContent = 'Player-1'
    document.querySelector('#name-1').textContent = 'Player-2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    winningScore = prompt('Enter the Winning Score', '50')
}

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isGameOn) {

        var dice1 = Math.floor(Math.random() * 6) + 1
        var dice2 = Math.floor(Math.random() * 6) + 1
        var dice1DOM = document.querySelector('.dice1')
        var dice2DOM = document.querySelector('.dice2')
        dice1DOM.style.display = 'block'
        dice2DOM.style.display = 'block'
        dice1DOM.src = 'dice-' + dice1 + '.png'
        dice2DOM.src = 'dice-' + dice2 + '.png'
        if (dice1 > 1 && dice2 > 1) {
            roundScore += dice1 + dice2
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            roundScore = 0
            document.querySelector('#current-' + activePlayer).textContent = roundScore
            togglePlayer()
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isGameOn) {
        score[activePlayer] += roundScore
        roundScore = 0
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer]
        document.querySelector('#current-' + activePlayer).textContent = roundScore
        if (score[activePlayer] >= winningScore) {
            isGameOn = false
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            document.querySelector('.dice1').style.display = 'none'
            document.querySelector('.dice2').style.display = 'none'
        } else {
            togglePlayer()
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', newGame)