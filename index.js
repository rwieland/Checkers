var Game = function() {
	this.elem = undefined
}

Game.prototype.createGameElement = function(parent_node) {
	if (this.elem === undefined) {
		var game_element = document.createElement('div')
		game_element.className = 'game-box'
		parent_node.appendChild(game_element)
		this.elem = game_element
	} else {
		this.removeGameElement()
		this.createGameElement()
	}	
}

Game.prototype.removeGameElement = function() {
	this.elem.remove()
	this.elem = undefined
}

Game.prototype.toggleHidden = function() {
	this.elem.classList.toggle('hidden')
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

