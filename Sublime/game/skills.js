skillsjs = {
	mainTab: {
		id: 'skills',
		text: 'Skills',
		color1: 'BBBBBB',
		color2: '898989'
	},
	variables: [
		{
			id: 'rottenLimes',
			name: 'Rotten Limes',
			color1: '00B300',
			color2: '00FF01',
		},
	],
	gameDataBase: {
		foodTypeToggle: 1,
		eat: 0,
		autoCollectingBar: 0,
		skillInfoToggle: 1,
		nourishmentPrice: 1,
		foodNutritionValue: 1,
		eatFoodLearnt: false,
		autoCollectLearnt: false
	},
	update: function () {
		basicToggle("skillInfo")

		var x = document.getElementsByClassName("skillButton")
		if (gameData.multitasking) {
			for (i = 0; i < x.length; i++) {
				x[i].style['padding'] = "1px 10px 1px 10px"
				x[i].style['border-radius'] = "12px"
			}
			for (let i = 0; i < skills.length; i++) {
				button = skills[i].id  + "Button"
				checkColor(gameData.currentSkill == skills[i].id, button, '#C67848', '#DEAD85')
			}
		} else {
			for (i = 0; i < x.length; i++) {
				x[i].style.backgroundColor = "#DEAD85"
			}
		}

		
		var elem = document.getElementById("autoCollectingBar")
		x = gameData.autoCollectingBar / (gameData.nourishment + 1)

		elem.style.width = x + "%"
		elem.innerHTML = Math.floor(x) + "%"

		update('infokeenEye1', gameData.keenEyeSkillLevel * 5 + '% Chance')
		update('inforottenWisdom1', 100 * gameData.rottenWisdomSkillLevel / gameData.rottenWisdomSkillLevelMax + '% Chance')
		update('infolimebidextrous1', gameData.limebidextrousSkillLevel * 2 + '% Chance')
		update('infointelligence1', Math.floor(((gameData.intelligenceSkillLevel * 2) / gameData.intelligenceSkillLevelMax) * 100) + '% Faster')
		update('infoknifebidextrous1', gameData.knifebidextrousSkillLevel * 5 + '% Chance')
		update('eat', gameData.eat + ' / 100')
		update('textForAutomaticallyCollectsLimes', 'Automatically collects limes at ' + (gameData.shoes + 1) + '/s')
		update('textForNourishmentPrice', 'You Need: ' + gameData.nourishmentPrice.toLocaleString() + ' Limes')

		currentTaskAesthetic('eatBar.start')
		
		
		checkColor(gameData.autoCollectingBar, 'autoCollectingButton', '#50514F', '#DEAD85')
		
		if (gameData.hideCompletedSkills == 0)
			update('hideCompletedSkillsButton', 'Completed Skills Shown')
		else
			update('hideCompletedSkillsButton', 'Completed Skills Hidden')
		
		if(gameData.currentSkill !== 'none')
			tryToStartSkill(gameData.currentSkill, false)
		
		checkShow(gameData.ambidextrousSkillLevel == gameData.ambidextrousSkillLevelMax, 'stopActionsButton', 'inline')
		checkShow(gameData.motivationLearnt, 'motivateEmployeeButton')
		checkShow(!gameData.skillTrainer, 'skillTrainer')
		checkShow(gameData.eatFoodLearnt, 'eatFoodDiv')
		checkShow(gameData.autoCollectLearnt, 'autoCollectingDiv')
		checkShow(gameData.autoCollectLearnt, 'nourishment')


		for (let i = 0; i < skills.length; i++) {
			level = skills[i].id  + 'SkillLevel'
			update(level, gameData[level] + ' / ' + gameData[level + 'Max'])
			checkShow(gameData[skills[i].id + 'Learnt'] && !(gameData.hideCompletedSkills && gameData[level] == gameData[level + 'Max']), skills[i].id + "Div")
			checkShow(!gameData[skills[i].id + 'Tome'] && skills[i].tome.requirement(), skills[i].id + 'BuyTome')
		}
		
		checkColor(canLearnANewSkill(), 'learnANewSkillButton', '#FFBB9A', 'darkgray')

	},
	onLoad: function () {
		
		if (gameData.autoCollectingBar > 0)
			autoCollectingBar()
		
		for (let i = 0; i < skills.length; i++) {
			name = skills[i].id 
	
			document.getElementById('skillsSection2').innerHTML += '<div class="basicDiv" id="' + name + 'Div"></div>'
			
			document.getElementById(name + "Div").innerHTML += '<button class="skillButton" id="' + name + "Button" + '" onclick="pickCurrentSkill(&apos;' + name + '&apos;)">' + skills[i].name  + '</button><div class="skillProgress" id="' + name + 'Progress"><div class="skillBar" id="' + name + 'Bar"></div></div><p id="' + name + 'SkillLevel" class="basicText"></p>'
			
			if (gameData[name + 'Bar'] != 0)
				runSkill(name)
			
			
			for (let j = 0; j < skills[i].info.length; j++) {
				document.getElementById(name + 'Div').innerHTML += '<p class="basicText skillInfo" id="info' + name + j + '">' + skills[i].info[j] + '</p>'
				
			}
			
			for (let j = 0; j < baseVariables.length; j++) {
				if (skills[i].tome.price.currency == baseVariables[j].id)
					currencyName = baseVariables[j].name
			}
			
			document.getElementById('baseMarketArea').innerHTML += `
			    <div id="` + name + `BuyTome" class="basicDiv">
                    <button class="specialButton" onclick="universalBuy('` + skills[i].id + `Tome', ` + skills[i].tome.price.amount + `, '` + skills[i].tome.price.currency + `')">` + skills[i].tome.text + `</button>
                    <p class="basicText">` + skills[i].tome.description + `</p>
                    <p class="basicText">Price: ` + skills[i].tome.price.amount + ` ` + currencyName + `</p>
                </div>
			`
		}
	}
}

skills = [
	{
		id: 'keenEye',
		name: 'Keen Eye',
		maxSkillLevel: 20,
		info: [
			'Increase the chance of finding something rather than nothing when collecting limes',
			''
		],
		tome: {
			price: {
				amount: '0',
				currency: 'limes'
			},
			requirement: function () {
				return true
			},
			text: 'Steal From An Op&#39tome&#39trist',
			description: 'Don&#39t worry, they won&#39t see you' //Them being an optometrist ofc, but also you're stealing it from them to unlock keen eye, a sight based skill
		}
	},
	{
		id: 'rottenWisdom',
		name: 'Rotten Wisdom',
		maxSkillLevel: 50,
		info: [
			'Increase the chance of finding limes rather than rotten limes',
			''
		],
		tome: {
			price: {
				amount: '1',
				currency: 'rottenLimes'
			},
			requirement: function () {
				return true
			},
			text: 'Study An Old Tome About Senescence',
			description: 'Eating healthier will increase your lifespan!' //Senescence, a term used for rotting fruit, but also avoiding that rotten fruit avoiding *you* getting senesced
		}
	},	
	{
		id: 'limebidextrous',
		name: 'Limebidextrous',
		maxSkillLevel: 50,
		info: [
			'Increase the chance of picking up double limes',
			''
		],
		tome: {
			price: {
				amount: '2',
				currency: 'limes'
			},
			requirement: function () {
				return true
			},
			text: 'Search The Trash For Tomes',
			description: 'Use both hands to search faster'
		}
	},	
	{
		id: 'intelligence',
		name: 'Intelligence',
		maxSkillLevel: 20,
		info: [
			'Increase skilling speed',
			''
		],
		tome: {
			price: {
				amount: '2',
				currency: 'limes'
			},
			requirement: function () {
				return true
			},
			text: 'Look For A Tome At The Library',
			description: 'Principia Limetica should help with the fundamentals'
		}
	},	
	{
		id: 'knifebidextrous',
		name: 'Knifebidextrous',
		maxSkillLevel: 20,
		info: [
			'Chance to peel 2 limes rather than 1: +5%',
			'Unlock something special for completing this!',
			''
		],
		tome: {
			price: {
				amount: '10',
				currency: 'coins'
			},
			requirement: function () {
				return gameData.maps > 0
			},
			text: 'Buy A Tome',
			description: 'Tomes can teach you new skills!'
		}
	},	
	{
		id: 'motivation',
		name: 'Motivation',
		maxSkillLevel: 100,
		info: [
			'Make your employees as passionate about limes as you are',
			'Increases the amount that motivation affects employees'
		],
		tome: {
			price: {
				amount: '200000',
				currency: 'coins'
			},
			requirement: function () {
				return gameData.maps > 4
			},
			text: 'Buy A Tome',
			description: 'This tome will save you time on limes, 5 stars'
		}
	},	
	{
		id: 'ambidextrous',
		name: 'Ambidextrous',
		maxSkillLevel: 20,
		info: [
			'Yes, i made a skill without a lime pun',
			'Reach level 20 to be able to toggle two actions at once'
		],
		tome: {
			price: {
				amount: '50',
				currency: 'alphaCoins'
			},
			requirement: function () {
				return gameData.bachelorsDegreeFinance
			},
			text: 'Buy A Tome',
			description: 'Read with one hand while taking notes with the other'
		}
	},	
	{
		id: 'bitterSpeed',
		name: 'Bitter Speed',
		maxSkillLevel: 200,
		info: [
			'The bitterness of the golden limes increases your abilities!',
			'Specifically lime peeling and juicing.',
			'Every level increases that effect&#39s length.'
		],
		tome: {
			price: {
				amount: '100',
				currency: 'alphaCoins'
			},
			requirement: function () {
				return gameData.bachelorsDegreeFinance
			},
			text: 'Buy A Golden Tome',
			description: 'The orchardist says those limes are useful for something...'
		}
	},
]

for (let i = 0; i < skills.length; i++) {
	name = skills[i].id
	skillsjs.gameDataBase[name + 'Bar'] = 0
	skillsjs.gameDataBase[name + 'SkillLevel'] = 0
	skillsjs.gameDataBase[name + 'SkillLevelMax'] = skills[i].maxSkillLevel
	skillsjs.gameDataBase[name + 'Tome'] = 0
	skillsjs.gameDataBase[name + 'Learnt'] = false
}

bars.push('eat')
eatBar = {
	where: 'eatBarDiv',
	granularity: function () {
		return 0.75 * (gameData.fork + 1)
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.eatBar == 0 && gameData.eat < 100) {
			if (gameData.foodTypeToggle == 0)
				startEating ('limes', 5)
			else if (gameData.foodTypeToggle == 1)
				startEating ('rottenLimes', 1)
		}
		function startEating (type, amount) {
			if (gameData[type] > 0) {
				gameData[type] -= 1
				gameData.foodNutritionValue = amount
				runBar('eat')
			}
		}
	},
	end: function () {
		gameData.eat += gameData.foodNutritionValue * (gameData.nutritionists + 1)
		if (gameData.eat > 100)
			gameData.eat = 100
	}
}

function autoCollecting() {
    if (gameData.autoCollectingBar == 0)
        autoCollectingBar()
}

function collectingUpgrade() {
    if (gameData.limes >= gameData.nourishmentPrice) {
        gameData.limes -= gameData.nourishmentPrice
        gameData.nourishment += 1
        gameData.autoCollectingBar = 0
    }
}

function buyAFork() {
    if (gameData.coins >= 1) {
        gameData.coins -= 1
        gameData.fork = 1
        gameData.eatBar = 0
    }
}

function autoCollectingBar() {
    if (gameData.autoCollectingBar <= (((gameData.nourishment + 1) * 100) - 0.5)) {
        gameData.autoCollectingBar += 0.5
        setTimeout(autoCollectingBar, 50)
    }
	else
		gameData.autoCollectingBar = 0
	
    if (gameData.autoCollectingBar % (10 / (gameData.shoes + 1)) == 0)
        getLimes()
}

bars.push('learnANewSkill')
learnANewSkillBar = {
	where: 'learnANewSkillDiv',
	granularity: function () {
		return 0.5
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (canLearnANewSkill ())
			runBar('learnANewSkill')
	},
	end: function () {
		if (!gameData.eatFoodLearnt)
			gameData.eatFoodLearnt = true
		else if (!gameData.autoCollectLearnt)
			gameData.autoCollectLearnt = true
		else {
			keepGoing = true
			for (let i = 0; i < skills.length && keepGoing; i++) {
				if (gameData[skills[i].id + 'Tome'] && !gameData[skills[i].id + 'Learnt']) {
					keepGoing = false
					gameData[skills[i].id + 'Learnt'] = true
				}
			}
		}
	}
}

function canLearnANewSkill () {
	if (!gameData.eatFoodLearnt || !gameData.autoCollectLearnt)
		return true
	
	for (let i = 0; i < skills.length; i++) {
		if (gameData[skills[i].id + 'Tome'] && !gameData[skills[i].id + 'Learnt'])
			return true
	}
}



function tryToStartSkill(variable, useSkillTrainer) {
	level = variable + 'SkillLevel'
	bar = variable + 'Bar'
	if (gameData[bar] == 0 && gameData[level] < gameData[level + 'Max'] && gameData.eat >= gameData[level]) {
		gameData.eat -= gameData[level]
		
		if (gameData.skillTrainer && useSkillTrainer)
			gameData[bar] = 100
		
		runSkill(variable)
	}
}

function runSkill(variable) {
	if (gameData[variable + "Bar"] < 100) {
		gameData[variable + 'Bar'] += (gameData.intelligenceSkillLevel + 10) / (((variable == 'ambidextrous') * 9 + 1) * 150)
		setTimeout(runSkill, 15 / gameData.tickspeed, variable)
	}
	else {
		gameData[variable + 'Bar'] = 0
		gameData[variable + "SkillLevel"] += 1
	}
	updateBar(variable)
}