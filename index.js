var Game = function() {
	this.games = []
}

Game.prototype.createGameElement = function(parent_node) {
	var game_element = document.createElement('div')
	game_element.className = 'game-box'
	parent_node.appendChild(game_element)	
	this.games.push(game_element)
}

Game.prototype.removeGameElement = function(index) {
	if (index !== undefined) {
		this.games[index].remove()
		this.games.splice(index, 1)
	} else {
		for (var i = 0; i < this.games.length; i++) {
			this.games[i].remove()
		}
		this.games = []
	}
}

Game.prototype.toggleGameElement = function(index) {
	if (index !== undefined) {
		this.games[index].classList.toggle('hidden')
	} else {
		for (var i = 0; i < this.games.length; i++) {
			this.games[i].classList.toggle('hidden')
		}
	}
}

Game.prototype.resizeGameElement = function() {
	
}

Game.prototype.recolorGameElement = function() {
	
}

var Menu = function() {
	this.head = ''
	this.tree = {}
}

Menu.prototype.createMenuElement = function() {
	
}

Menu.prototype.removeMenuElement = function() {
	
}

Menu.prototype.updateMenuElement = function() {
	
}

Menu.prototype.hideMenuElement = function() {
	
}

Menu.prototype.addOption = function(key, label, result) {
	
}

Menu.prototype.deleteOption = function(key) {
	
}

Menu.prototype.hideOption = function(key) {
	
}

