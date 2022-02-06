jsfiles = ['base', 'inventory', 'skills', 'delivery', 'forest', 'company', 'travel', 'brokers', 'tasks', 'science', 'bakery', 'field']
bars = []

function gameStart() {
	
	for (let i = 0; i < jsfiles.length; i++) {
		id = eval(jsfiles[i] + 'js')
		
		if (exists(id.mainTab)) {
			mainTabs.push(id.mainTab)
		}
		if (exists(id.variables)) {
			for (let j = 0; j < id.variables.length; j++) {
				baseVariables.push(id.variables[j])
			}
		}
		
		if (exists(id.gameDataBase)) {
			Object.assign (gameDataBase, id.gameDataBase)
		}
	}
	
	for (let i = 0; i < baseVariables.length; i++) {	
		id = baseVariables[i].id
		gameDataBase[id] = 0
		gameDataBase[id + 'ShowVariable'] = true
		gameDataBase[id + 'UnlockedVariable'] = false
	}

	gameDataBase.limes = 1
	
	for (let j = 0; j < bars.length; j++) {
		document.getElementById(window[bars[j] + 'Bar'].where).innerHTML += `
			<div class="skillProgress" id="` + bars[j] + `Progress">
				<div class="skillBar" id="` + bars[j] + `Bar">0%</div>
			</div>
		`
		
		gameDataBase[bars[j] + 'Bar'] = 0
	}
	
	onLoadTasks ()	
	
    loadStuff(JSON.parse(localStorage.getItem("mathAdventureSave")))
	secondsOffline = Math.floor((Date.now() - gameData.lastSaveTime) / 1000)
	
	
	for (let i = 0; i < jsfiles.length; i++) {
		id = eval(jsfiles[i] + 'js')
		
		if (exists(id.onLoad)) {
			id.onLoad()
		}
	}

	for (let j = 0; j < bars.length; j++) {
		if (window[bars[j] + 'Bar'].runOnLoad && gameData[bars[j] + 'Bar'] > 0)
			runBar(bars[j])
	}

    mainGameLoop()
    mainGameLoopSlow()
	updateValues()
	
	function mainGameLoop() {		
		for (let i = 0; i < jsfiles.length; i++) {
			id = eval(jsfiles[i] + 'js')
			
			if (exists(id.mainGameLoop)) {
				id.mainGameLoop()
			}
		}
		setTimeout(mainGameLoop, 50)
	}

	function mainGameLoopSlow() {
		for (let i = 0; i < jsfiles.length; i++) {
			id = eval(jsfiles[i] + 'js')
			
			if (exists(id.mainGameLoopSlow)) {
				id.mainGameLoopSlow()
			}
		}
		setTimeout(mainGameLoopSlow, 500)
	}
	
	function updateValues() {
		for (let i = 0; i < jsfiles.length; i++) {
			id = eval(jsfiles[i] + 'js')
			
			if (exists(id.update)) {
				id.update()
			}
		}

		setTimeout(updateValues, 15)
	}
}

function exists (id) {
	return (typeof id !== 'undefined')
}

function runBar(id) {	
	if (gameData[id + 'Bar'] < 100) {
		gameData[id + 'Bar'] += window[id + 'Bar'].granularity()
		setTimeout(runBar, 15 / gameData.tickspeed, id)
	}
	else {
		gameData[id + 'Bar'] = 0
		window[id + 'Bar'].end()
	}
	updateBar(id)
}

function updateBar(x) {
    i = x + "Bar"
    var elem = document.getElementById(i)
	
	if(gameData[i] > 100)
		gameData[i] = 100
	
	if (eval(x + 'Bar.direction') == 'backward') {
		if (gameData[i] == 0)
			elem.style.width = '0%'
		else
			elem.style.width = (100 - gameData[i]) + "%"

		elem.innerHTML = "" + (100 - Math.ceil(gameData[i])) + "%"
	}
	else {
		elem.style.width = gameData[i] + "%"
		elem.innerHTML = "" + Math.ceil(gameData[i]) + "%"
	}
}

function hide(id) {
	if (!gameData.showEverything)
		document.getElementById(id).style.display = 'none'
}

function pin(x) {
	if (gameData.pin == x && gameData.pin !== "none") {
		gameData.pin = "none"
	} else
		gameData.pin = x
	normalizeButtons()
	pinButton()
}

function normalizeButtons() {
	var x = document.getElementById("deliveryBar.startButton")
	$(".juiceMarket").prepend(x)
	x.style.width = "120px"
	x.style.margin = "5px"

	x = document.getElementById("autoCollectingButton")
	$(".autoCollectingDiv").prepend(x)
	x.style.width = "150px"
	x.style.margin = "5px"
}

function pinButton() {
	var x = document.getElementById(gameData.pin)
	
	if (x == undefined)
		gameData.pin = 'none'

	if (gameData.pin !== "none") {
		$(".navigateButtons").append(x)
		

		x.style.width = "120px"
		x.style.margin = "0px"
		x.style.padding = "0px"
	}
}

function pickCurrentTask(x) {
	taskOne = gameData.currentTask
	taskTwo = gameData.currentTask2

	if (!event.shiftKey && gameData.toggleActions) {

		if (gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax) {
			if (taskOne == x && taskOne !== "none" && taskTwo !== x)
				gameData.currentTask = "none"
			else if (taskOne == "none" && taskTwo !== x) {
				if (!((taskTwo == 'makeJuice' && x == 'makeMaxJuice') || (taskTwo == 'makeMaxJuice' && x == 'makeJuice') || (taskTwo == 'usePeelers' && x == 'useMaxPeelers') || (taskTwo == 'useMaxPeelers' && x == 'usePeelers')))
					gameData.currentTask = x
			} else if (taskTwo == x && taskTwo !== "none")
				gameData.currentTask2 = "none"
			else if (taskTwo == "none") {
				if (!((taskOne == 'makeJuice' && x == 'makeMaxJuice') || (taskOne == 'makeMaxJuice' && x == 'makeJuice') || (taskOne == 'usePeelers' && x == 'useMaxPeelers') || (taskOne == 'useMaxPeelers' && x == 'usePeelers')))
					gameData.currentTask2 = x
			}
		} 
		else {
			if (taskOne == x && taskOne !== "none")
				gameData.currentTask = "none"
			else
				gameData.currentTask = x
		}
	} 
	else
		startCurrentTask(x)
}

function pickCurrentSkill(x) {
	if (gameData.toggleActions && !event.shiftKey && gameData.multitasking) {
		if (gameData.currentSkill == x && gameData.currentSkill !== "none")
			gameData.currentSkill = "none"
		else
			gameData.currentSkill = x
	} else
		tryToStartSkill(x, true)
}

function startCurrentTask(x) {
	if(x !== 'none')
		eval(x + '()')
}

function toggle(x) {
	if (gameData[x] == 0)
		gameData[x] = 1
	else
		gameData[x] = 0
}

function basicBuy(id, price) {
	if (gameData.coins >= price) {
		gameData.coins -= price
		gameData[id] += 1
	}
}

function universalBuy(id, price, currency) {
	if (gameData[currency] >= price) {
		gameData[currency] -= price
		gameData[id] += 1
	}
}

function bulkableBuyMax(x, price) {
	max = gameData[x + 'Max']
	if (gameData[x + 'BulkToggle'] == 0)
		amount = 1
	else {
		if (gameData.bulkBuyUnlock2)
			amount = 100
		else
			amount = 10
	}
	if (gameData.coins >= price * amount) {
		if (gameData[x] <= max - amount) {
			gameData.coins -= price * amount
			gameData[x] += amount
		} else {
			gameData.coins -= price * (max - gameData[x])
			gameData[x] = max
		}
	}
}

// returns a random integer from 1 to X
function beckyRandom(max) {
	return Math.floor(Math.random() * max) + 1;
}

// returns a random integer from X to Y
function beckyRandomMinMax(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

hasUpdatedObj = {}

function update(id, content) {
	stringy = id.replace(/[()-]/g, 'uwu')

	if (typeof hasUpdatedObj[stringy] == undefined)
		hasUpdatedObj[stringy] = 'noneOwO'
	
	if (hasUpdatedObj[stringy] != content) {
		document.getElementById(id).innerHTML = content
		hasUpdatedObj[stringy] = content
	}
}

function currencyDisplay(id) {
	variable = baseVariables[id].id + 'ShowVariable'
	if (gameData[variable])
		gameData[variable] = false
	else
		gameData[variable] = true
}

function upperFirstChar(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function colorChanger(id, content) {
	document.getElementById(id).style.backgroundColor = content
}

function checkColor (x, id, colorTrue, colorFalse) {
	if (x)
		colorChanger(id, colorTrue)
	else
		colorChanger(id, colorFalse)
	
}

function decreaseValue(id) {
	if (gameData[id] >= 1)
		gameData[id] -= 1
}

function checkShow (x, id, style) {
	thing = document.getElementById(id).style
	
	if (style == 'visible') {
		if (x) {
			thing.visibility = 'visible'
		}
		else
			thing.visibility = 'hidden'
	}
	else {
		if (x) {
			if (style == 'inline')
				thing.display = 'inline-block'
			else
				thing.display = 'block'
		}
		else
			hide(id)
	}
}

function basicToggle(input) {
	x = document.getElementsByClassName(input)

	if (gameData[input + 'Toggle']) {
		color = "#4DFE89"
		display = 'block'
	} else {
		color = "gray"
		display = 'none'
	}
	
	colorChanger(input + "Button", color)
	for (i = 0; i < x.length; i++) {
		x[i].style.display = display
	}
}

function currentTaskAesthetic(x) {
	if (gameData.currentTask == x || gameData.currentTask2 == x)
		colorChanger(x + "Button", "#C67848")
	else
		colorChanger(x + "Button", "#DEAD85")
}

function toggleAesthetic(input) {
	checkColor(gameData[input] == 1, input + 'Button', '#4DFE89', 'gray')
}

function tabManager(id, color) {
	hide(id)

	if (color == undefined)
		color = '#BBBBBB'

	colorChanger(id + "Button", color)
}