var Game = function() {
	this.elem = undefined
}

Game.prototype.createGameElement = function(parent_node = document.body) {
	if (this.elem === undefined) {
		var game_element = document.createElement('div')
		game_element.className = 'game-box'
		parent_node.appendChild(game_element)
		this.elem = game_element
	} else {
		this.removeGameElement()
		this.createGameElement(parent_node)
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

var Menu = function(head) {
	this.head = head
	this.tree = {}
	this.order = []
	this.elements = []
}

Menu.prototype.createMenuElement = function(parent_node) {
	var element = document.createElement('div')
	element.className = 'menu'
	parent_node.appendChild(element)
	this.elements.push(element)
	
	var heading = document.createElement('h1')
	heading.className = 'menu-heading'
	heading.innerHTML = this.head
	element.appendChild(heading)
	
	for (var i = 0; i < this.order.length; i++) {
		var option = this.tree[this.order[i]]
		if (!option.hidden) {
			var option_element = document.createElement('h2')
			option_element.className = 'menu-option'
			option_element.innerHTML = option.label
			if (option.type = 'Function') {
				option_element.onclick = option.result
			} else if (option.type = 'Menu') {
				option_element.onclick = console.log('Implement menu switching')
			}
			element.appendChild(option_element)
			if (i != this.order.length) {
				element.appendChild(document.createElement('br'))
			}
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
	position == undefined ? this.order.push(key) : this.order.splice(position, 0, key)
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

