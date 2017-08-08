var Game = function(pn) {
	this.pn = pn
	this.elem = undefined
	this.bord = undefined
	this.createGameElement()
}

Game.prototype.createGameElement = function() {
	if (this.elem === undefined) {
		this.bord = document.createElement('div')
		this.bord.classList.add('game-container', 'double-border')
		this.elem = document.createElement('div')
		this.elem.className = 'game'
		this.pn.appendChild(this.bord)
		this.bord.appendChild(this.elem)
	} else {
		this.removeGameElement()
		this.createGameElement()
	}	
}

Game.prototype.removeGameElement = function() {
	this.elem.remove()
	this.bord.remove()
	this.elem = undefined
	this.bord = undefined
}

Game.prototype.toggleHidden = function() {
	this.bord.classList.toggle('hidden')
}

Game.prototype.resizeGameElement = function() {
	
}

Game.prototype.recolorGameElement = function() {
	
}

var Menu = function(pn, head, options) {
	this.pn = pn
	this.head = head
	this.options = []
	this.elem = undefined
	this.pm = undefined
}

Menu.prototype.createMenuElement = function() {
	this.bord = document.createElement('div')
	this.bord.classList.add('menu-container', 'double-border')
	this.pn.appendChild(this.bord)	
	
	this.elem = document.createElement('div')
	this.elem.className = 'menu'
	this.bord.appendChild(this.elem)
	
	var heading = document.createElement('h1')
	heading.className = 'menu-heading'
	heading.innerHTML = this.head
	this.elem.appendChild(heading)
	
	if (this.pm && this.labels().indexOf('Back') == -1) {
		this.addMenuOption('Back', this.pm)
	}
	
	for (var i = 0; i < this.options.length; i++) {
		var option = this.options[i]
		if (!option.hidden) {
			this.createOptionElement(option)
			if (i != this.options.length) {
				this.elem.appendChild(document.createElement('br'))
			}
		}
	}
}

Menu.prototype.createOptionElement = function(option) {
	var option_element = document.createElement('h2')
	option_element.className = 'menu-option'
	option_element.innerHTML = option.label
	if (option.type == 'Function') {
		option_element.onclick = option.result
	} else if (option.type == 'Menu') {
		var that = this
		option_element.onclick = function() {
			that.removeMenuElement()
			
			if (option.label == 'Back') {
				var back = that.labels().indexOf('Back')
				that.options.splice(back, 1)
			} else {
				option.result.pm = that
			}
			
			option.result.updateMenuElement()
		}
	}
	this.elem.appendChild(option_element)
}

Menu.prototype.removeMenuElement = function(index) {
	this.elem.remove()
	this.bord.remove()
	this.elem = undefined
	this.elem = undefined
}

Menu.prototype.updateMenuElement = function() {
	if (this.elem) {
		this.removeMenuElement()
		this.createMenuElement()
	} else {
		this.createMenuElement()
	}
}

Menu.prototype.addMenuOption = function(label, result, position) {
	var option = {
		'label' : label, 
		'result' : result,
		'type' : result.constructor.name,
		'hidden' : false,
	}
	position == undefined ? 
		this.options.push(option) : 
		this.options.splice(position, 0, option)
}

Menu.prototype.deleteMenuOption = function(i) {
	this.options.splice(index, 1)
	
}

Menu.prototype.toggleMenuOption = function(i) {
	this.options[i].hidden ? 
		this.options[i].hidden = false : 
		this.options[i].hidden = true
}

Menu.prototype.labels = function() {
	return this.options.map(function(x) {return x.label})
}
