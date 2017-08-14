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

Menu.prototype.addSubMenus = function() {
	for (var i = 0; i < arguments.length; i++) {
		var x = new Menu(this.pn, arguments[i])
		this.addMenuOption(x.head, x)
	}
}

var Board = function(pn, str){
	this.dims = str.split('x').map(function(x) {return parseInt(x)}); 
	// An array with the absolute lengths of each dimension
	this.barr = new Array(this.dims.reduce(function(a, b) {return a*b}, 1)).fill(' '); 
	// An one dimensional array of the board
	this.disp = ['x', 'y'].concat(new Array(this.dims.length - 2).fill(0))
	// An array of dimensions to display
	this.setDiml()
	// An array of dimension lengths within this.barr
	this.setPoss() 
	// An array of positions on the board as arrays
	this.disp = ['x', 'y'].concat(new Array(this.dims.length - 2).fill(0))
	// An array of dimensions for two-dimensional display
	this.options = document.getElementById('game-options')
	// The options menu
	this.game = pn
	// The game element
}

Board.prototype.setDiml = function() { 
	// Sets this.diml to an array with the lengths of each dimension within this.barr
	var that = this
	this.diml = this.dims.map(function(x, i) {
		return that.dims.slice(0, i + 1).reduce(
			function(a, b) {return a/b}, that.barr.length)
	})
}

Board.prototype.setPoss = function() {
	// Sets this.poss to an array of all positions in this.barr
	var that = this
	this.poss = this.barr.map(function(x, i) {return that.toPos(i)})
}

Board.prototype.toPos = function(ind) { 
	// Converts an index in this.barr to a position array
	return 0 > ind || ind > this.barr.length ? undefined 
		: this.diml.map(function(x) {
			var i = Math.floor(ind / x)
			ind %= x
			return i
		})
}
	
Board.prototype.toInd = function(pos) { 
	// Converts a position arry into an index in this.barr
	var that = this
	if (pos.length != this.dims.length || pos.some(function(x, i) {return x < 0 || x >= that.dims[i]})) {
		return undefined
	} else {
		return pos.reduce(function(a, b, i) {
			return a + b * that.diml[i]
		}, 0)
	}
}

Board.prototype.next = function(pos, dct) {
	// Returns the next tile in a specified direction
	var nxt = pos.map(function(x,i) {return x + dct[i]})
	return this.read(nxt) !== undefined ? nxt : false
}
	
Board.prototype.read = function(pos) { // Reads a position in this.barr
	return this.barr[this.toInd(pos)]
}
	
Board.prototype.write = function(pos, value) { 
	// Writes a value to a position in this.barr
	var i = this.toInd(pos)
	return this.barr[i] ? this.barr[i] = value : undefined
}

Board.prototype.copy = function(arr) { // Returns a shallow copy of an array
	return arr.map(function(x) {return x})
}

var RectangularBoard = function(pn, str) {
	Board.call(this, pn, str)
	this.setDcts()
	// An array of directions on the board
	this.setCrns()
	// An array of corners on the board
	this.isCheckered = false
}

RectangularBoard.prototype = Object.create(Board.prototype)
RectangularBoard.prototype.constructor = Board

RectangularBoard.prototype.setDcts = function() {
	// Sets this.dcts to an array of directions on the board
	var str = '3x'.repeat(this.dims.length).slice(0, -1)
	var a = new Board(null, str)
	this.dcts = 
		a.poss.filter(function(x) {
			return !x.every(function(y) {return y == 1})
		}).map(function(x) {
			return x.map(function(y) {return y - 1})
		})
}

RectangularBoard.prototype.setCrns = function() {
	// Sets this.crns to an array of corner positions on the board
	var that = this
	this.crns = this.poss.filter(function(pos) {
		return pos.every(function(x, i) {
			return x == 0 || x == that.dims[i] - 1
		})
	})
}

RectangularBoard.prototype.to2D = function() {
	// Returns a 2D array which is a subset of the board array based on this.disp
	var row_index = this.disp.indexOf('y')
	var column_index = this.disp.indexOf('x')
	var that = this
	var filtered_indices = this.poss.filter(function(x) { 
		// Filters indices into desired dimensions
		return x.every(function(y, i) {
			return !Number.isInteger(that.disp[i]) || y == that.disp[i]
		})
	})
	
	var result = []
	for (var i = 0; i < this.dims[row_index]; i++) { // Sorts filtered indices into a 2d array.
		var row = filtered_indices.filter(function(x) {
			return x[row_index] == i
		})
		row.sort(function(a, b) {return a[column_index] - b[column_index]})
		result.push(row)
	}
	return result
}

RectangularBoard.prototype.log = function() {
	// Logs a 2D selection of the board to the console
	var that = this
	var arr = this.to2D().map(function(x) {return x.map(function(y) {
		return that.read(y)
	})}) 
	// Translates index to value
	var label = new Array(this.dims[this.disp.indexOf('x')]).fill('')
	label = label.map(function(x, i) {return i})
	console.log('  ' + label.join(' '))
	arr.map(function(x, i) {console.log(i + '|' + x.join('|') + '|')})
}

RectangularBoard.prototype.createBoardElement = function() {
	this.bord = document.createElement('div')
	this.bord.classList.add('board-container', 'double-border')
	this.game.appendChild(this.bord)	
	
	this.elem = document.createElement('div')
	this.elem.className = 'board'
	this.bord.appendChild(this.elem)
	
	var b = this.to2D()
	var that = this
	b.forEach(function(x, i) {
		var row = document.createElement('div')
		row.className = 'board-row'
		x.forEach(function(y, j) {
			var tile_border = document.createElement('div')
			var tile = document.createElement('div')
			tile_border.className = 'tile-border'
			tile.className = 'tile'
			tile.id = 't' + y.join('.')
			if (that.isCheckered) {
				if (i % 2 == j % 2) {
					tile.classList.add('white-tile')
				} else {
					tile.classList.add('black-tile')
				}			
			} else {
				tile.classList.add('white-tile')
			}
			tile_border.appendChild(tile)
			row.appendChild(tile_border)	
		})
		that.elem.appendChild(row)
	})
}

RectangularBoard.prototype.removeBoardElement = function() {
	this.elem.remove()
	this.bord.remove()
	this.elem = undefined
	this.elem = undefined	
}

RectangularBoard.prototype.updateBoardElement = function() {
	if (this.elem) {
		this.removeBoardElement()
		this.createBoardElement()
	} else {
		this.createBoardElement()
	}
}

RectangularBoard.prototype.changeViewPlane = function(dim) {
	var container = document.createElement('div')
	var menu = document.createElement('ul')
	var go_button = document.createElement('button')
	container.appendChild(menu)
	container.appendChild(go_button)
	document.body.appendChild(container)
	
	container.id = 'plane-navigation'
	
	for (var i = 0; i < this.dims.length; i++) {
		var list_element = document.createElement('li')
		var box = document.createElement('textarea')
		var x = this.disp[i]
		console.log(x)
		
		box.value = isNaN(parseInt(x)) ? x : parseInt(x) + 1
		box.id = 'd' + (i + 1)
		box.rows = 1
		box.cols = 3
		list_element.innerHTML = 'D' + (i + 1) + ': '
		
		list_element.appendChild(box)
		menu.appendChild(list_element)
	}

	go_button.innerHTML = 'Go'
	var that = this
	go_button.addEventListener('click', function(event) {
		var input_plane = []
		var text_areas = menu.querySelectorAll('textarea')
		text_areas.forEach(function(x) {input_plane.push(x.value)})
		
		var x_found = false
		var y_found = false
		var valid_input = true
		input_plane.forEach(function(i) {
			if (i == 'x') {
				x_found ? valid_input = false : x_found = true
			} else if (i == 'y') {
				y_found ? valid_input = false : y_found = true
			} else if (isNaN(parseInt(i)) || parseInt(i) > 8 || parseInt(i) < 1) {
				valid_input = false 
			}
		})	
		
		if (valid_input) {
			that.disp = input_plane.map(function(x) {
				return isNaN(parseInt(x)) ? x : parseInt(x) - 1
			})
			that.draw()
			that.play()
			if (opt('players') == 1) {
				highlightLastAIMoves()
			}
		} else {
			alert('Invalid Input: One value should be "x". One value shoud be "y". The rest should be between 1 and 8')
			that.disp.map(function(x, i) {
				isNaN(parseInt(x)) ? text_areas[i].value = x : text_areas[i].value = parseInt(x) + 1
			})
		}
	})
}

var Checkers = function() {
	this.game = new Game(document.body)
	this.board = new RectangularBoard(this.game.elem, '8x8')
	this.board.isCheckered = true
	this.menu = new Menu(this.game.elem, 'Main Menu')
	this.menu.addSubMenus('New Game', 'Load Game', 'Options', 'Statistics')
	this.menu.options[0].result.addMenuOption('Start', this.startGame.bind(this))
}

Checkers.prototype.startGame = function() {
	this.menu.options[0].result.removeMenuElement()
	this.board.createBoardElement()
	
}

