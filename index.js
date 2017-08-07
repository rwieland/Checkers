var Game = function() {
	
}

Game.prototype.createGameElement = function() {
	
}

Game.prototype.removeGameElement = function() {
	
}

Game.prototype.hideGameElement = function() {
	
}

Game.prototype.resizeGameElement = function() {
	
}

Game.prototype.recolorGameElement = function() {
	
}

var Menu = function(head) {
	this.head = head
	this.tree = {}
	this.order = []
	this.elements = []
}

Menu.prototype.createMenuElement = function(parent) {
	var element = document.createElement('div')
	element.className = 'menu'
	parent.appendChild(element)
	this.elements.push(element)
	
	var heading = document.createElement('h2')
	heading.className = 'menu-heading'
	heading.innerHTML = this.head
	element.appendChild(heading)
	
	for (var i = 0; i < this.order.length; i++) {
		var option = this.tree[this.order[i]]
		if (!option.hidden) {
			var option_element = document.createElement('div')
			option_element.className = 'menu-option'
			option_element.innerHTML = option.label			
			element.appendChild(option_element)
		}
	}
}

Menu.prototype.removeMenuElement = function(index) {
	
}

Menu.prototype.updateMenuElement = function(index) {
	
}

Menu.prototype.hideMenuElement = function(index) {
	
}

Menu.prototype.addMenuOption = function(key, label, result, position) {
	this.tree[key] = {
		'label' : label, 
		'result' : result,
		'type' : result.constructor.name,
		'hidden' : false,
		'position' : function() {return this.order.indexOf(key)}
	}
	this.order.splice(position, 0, key)
}

Menu.prototype.deleteMenuOption = function(key) {
	tree.delete(key)
	var index = this.order.indexOf(key)
	index > -1 ? this.order.splice(index, 1) : null
	
}

Menu.prototype.toggleMenuOption = function(key) {
	this.tree[key].hidden ? 
		this.tree[key].hidden = false : 
		this.tree[key].hidden = true
}

