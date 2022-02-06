loopNumberGoldenLimes = 0

inventoryjs = {
	mainTab: {
		id: 'inventory',
		text: 'Inventory',
		color1: 'BBBBBB',
		color2: '898989'
	},
	variables: [
		{
			id: 'goldenLimes',
			name: 'Golden Limes',
			color1: 'AEB301',
			color2: 'F8FF01',
		},
		{
			id: 'peeledLimes',
			name: 'Peeled Limes',
			color1: '72B301',
			color2: 'A0FF01',
		},	
		{
			id: 'juice',
			name: 'Juice',
			color1: '00B33D',
			color2: '00FF55',
		},
	],
	gameDataBase: {
		juicers: 0,
		howMuchJuice: 0,
		knife: 0,
		limeTypeToJuice: 0,
		limeTypeToJuiceToggle: 0,
		limesInBaskets: 0,
		limesPerJuice: 10,
		peeledLimesPerJuice: 5,
		peelers: 0,
		howManyPeeledLimes: 0,
		hasGottenPeeledLimes: false,
		storageJuicersUnlock: 0,
		storagePeelersUnlock: 0,
		peelersBulkToggle: 0,
		juicersBulkToggle: 0,
	},
	update: function () {
		twoToggleButtons('foodToggleRottenLimesButton', 'foodToggleLimesButton', gameData.foodTypeToggle)
		twoToggleButtons('juicePeeledLimesToggleButton', 'juiceLimesToggleButton', gameData.limeTypeToJuice)

		function twoToggleButtons(button1, button2, value) {
			checkColor(value == 1, button1, '#4DFE89', 'gray')
			checkColor(value == 0, button2, '#4DFE89', 'gray')
		}
		
		basicToggle("peelersBulk")
		basicToggle("juicersBulk")

		currentTaskAesthetic('juicerBar.start')
		currentTaskAesthetic('juicerBar.start2')
		currentTaskAesthetic('peelerBar.start')
		currentTaskAesthetic('peelerBar.start2')
		
		
		checkColor(gameData.juicers == gameData.juicersMax, 'buyAJuicerButton', '#50514F', '#DEAD85')
		checkColor(gameData.peelers == gameData.peelersMax, 'buyAPeelerButton', '#50514F', '#DEAD85')
		
		
		
		checkShow(gameData.deliveryManager, 'sellMaxJuiceButton', 'inline')

		checkShow(gameData.maps > 0 && !gameData.knife, 'buyKnifeDiv')
		checkShow(gameData.knife && gameData.knifebidextrousSkillLevel == gameData.knifebidextrousSkillLevelMax && gameData.maps > 1 && !gameData.sharperPeelers, 'sharperPeelerDiv')
		checkShow(gameData.knife && gameData.knifebidextrousSkillLevel == gameData.knifebidextrousSkillLevelMax && !(gameData.hideMaxedPurchases == 1 && gameData.peelers == gameData.peelersMax), 'buyAPeelerDiv')
		checkShow(gameData.knife, 'knifeDiv')
		
		update('juicersAmount', gameData.juicers.toLocaleString() + ' / ' + gameData.juicersMax.toLocaleString() + ' Juicers')
		update('peelersAmount', gameData.peelers.toLocaleString() + ' / ' + gameData.peelersMax.toLocaleString() + ' Peelers')
		checkShow(gameData.bulkBuyUnlock, 'peelersBulkButton', 'inline')
		checkShow(gameData.bulkBuyUnlock, 'juicersBulkButton', 'inline')
		checkShow(gameData.hasGottenPeeledLimes, 'juiceLimesToggleButton', 'inline')
		checkShow(gameData.hasGottenPeeledLimes, 'juicePeeledLimesToggleButton', 'inline')
		checkShow(gameData.bitterSpeedSkillLevel, 'goldenLimeProgress')
		checkShow(gameData.bitterSpeedSkillLevel, 'eatGoldenLime')
		checkShow(gameData.peelers, 'peelerDiv')
		checkShow(gameData.peelers > 1, 'peelerBar.start2Button', 'inline')
		checkShow(gameData.juicers > 1, 'juicerBar.start2Button', 'visible')
		
		colorChanger('goldenLimeBar', '#F8FF01')

		
		if (gameData.limeTypeToJuice == 0)
			update('juicerInfo', gameData.limesPerJuice + ' Limes -> 1 Juice')
		else
			update('juicerInfo', gameData.peeledLimesPerJuice + ' Peeled Limes -> 1 Juice')

		if (gameData.peeledLimes >= 1)
			gameData.hasGottenPeeledLimes = true
		
		checkShow(gameData.juicers, 'inventoryButton')
	},
	mainGameLoop: function () {
		loopNumberGoldenLimes += 1	

		if (loopNumberGoldenLimes >= 200) {
			if (gameData.goldenLimes > 0)
				gameData.goldenLimes -= 1
			loopNumberGoldenLimes = 0
		}
	}
}

bars.push('peeler')
peelerBar = {
	where: 'peelerDiv',
	granularity: function () {
		return (0.3 + gameData.bitterSpeeding * 6) * (gameData.sharperPeelers + 1)
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.peelerBar == 0 && gameData.limes > 0) {
			gameData.howManyPeeledLimes = 1
			gameData.limes -= 1
			gameData.peelerBar = 0
			runBar('peeler')
		}
	},
	start2: function () {
		if (gameData.peelerBar == 0) {
			gameData.howManyPeeledLimes = gameData.limes
			if (gameData.howManyPeeledLimes > gameData.peelers) 
				gameData.howManyPeeledLimes = gameData.peelers
			gameData.limes -= gameData.howManyPeeledLimes
			if (gameData.howManyPeeledLimes > 0) {
				gameData.peelerBar = 0
				runBar('peeler')
			}
		}
	},
	end: function () {
		gameData.peeledLimes += gameData.howManyPeeledLimes
	}
}

bars.push('juicer')
juicerBar = {
	where: 'useJuicersDiv',
	granularity: function () {
		return (0.15 + gameData.bitterSpeeding * 3) * (gameData.limeTypeToJuiceToggle * 3 + 1)
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.limeTypeToJuice == 0)
		   setJuice ('limes')
		
		else if (gameData.limeTypeToJuice == 1)
		   setJuice ('peeledLimes')
		
		function setJuice (id) {
			if (gameData[id] >= gameData[id + 'PerJuice'] && gameData.juicerBar == 0) {
				gameData[id] -= gameData[id + 'PerJuice']
				gameData.howMuchJuice = 1
				gameData.limeTypeToJuiceToggle = gameData.limeTypeToJuice
				runBar('juicer')
			}
		}
	},
	start2: function () {
		if (gameData.juicerBar == 0) {
			if (gameData.limeTypeToJuice == 0)
				setJuice('limes')
			else
				setJuice('peeledLimes')
			
			if (gameData.howMuchJuice > 0)
				runBar('juicer')
		}
		
		function setJuice (id) {
			gameData.howMuchJuice = Math.floor(gameData[id] / gameData[id + 'PerJuice'])
				
			if (gameData.howMuchJuice > gameData.juicers)
				gameData.howMuchJuice = gameData.juicers
			gameData.limeTypeToJuiceToggle = gameData.limeTypeToJuice
			
			gameData[id] -= gameData.howMuchJuice * gameData[id + 'PerJuice']
		}
	},
	end: function () {
		gameData.juice += gameData.howMuchJuice
		gameData.hasGottenJuice = 1
	}
}

bars.push('goldenLime')
goldenLimeBar = {
	where: 'goldenBarDiv',
	granularity: function () {
		return 7.5 / gameData.bitterSpeedSkillLevel
	},
	direction: 'backward',
	runOnLoad: true,
	start: function () {
		if (gameData.goldenLimes > 0 && gameData.goldenLimeBar == 0) {
			gameData.goldenLimes -= 1
			gameData.bitterSpeeding = 1
			runBar('goldenLime')
		}
	},
	end: function () {
		gameData.bitterSpeeding = 0
	}
}

function peelLime() {
    if (gameData.limes >= 1) {
        collect ()
        if (Math.floor((Math.random() * 20) / gameData.knifebidextrousSkillLevel) == 0)
            collect ()
    }
	function collect () {
		gameData.peeledLimes += 1
		gameData.limes -= 1
	}
}