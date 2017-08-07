var g = new Game(document.body)

var mm = new Menu(g.elem, 'Main Menu')
var ng = new Menu(g.elem, 'New Game')
var lg = new Menu(g.elem, 'Load Game')
var om = new Menu(g.elem, 'Options')
var sm = new Menu(g.elem, 'Statistics')
mm.addMenuOption(ng.head, ng)
mm.addMenuOption(lg.head, lg)
mm.addMenuOption(om.head, om)
mm.addMenuOption(sm.head, sm)
mm.updateMenuElement()

