examplejs = {
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
	],
	bars: [
		{
			id: 'peeler',
			where: 'peelerDiv'
		},
		{
			id: 'juicer',
			where: 'useJuicersDiv'
		}
	],
	gameDataBase: {
		juicers: 0,
		juicerBar: 0
	},
	update: function () {
		checkShow(gameData.bitterSpeedSkillLevel, 'eatGoldenLime')
		checkShow(gameData.peelers, 'peelerDiv')
	},
	onLoad: function () {
		for (let i = 0; i < fieldPlacementOptions.length; i++) {
			document.getElementById('fieldPlacementOptions').innerHTML += '<button class="specialButton" style="background-color:gray;width:168px" id="' + fieldPlacementOptions[i].id + 'SelectedWheatItem" onclick="selectedWheatItem(&#39' + fieldPlacementOptions[i].id + '&#39)">' + fieldPlacementOptions[i].text + '</button>'
		}
	},
	mainGameLoop: function () {
		loopNumberBasket += 1	
		
		if (gameData.basketBar < 100 && loopNumberBasket >= 24) {
			gameData.basketBar += 0.2;
			loopNumberBasket = 0
			
			if (beckyRandom(100) == 1 && gameData.forestTreeType == 2)
				gameData.goldenLimesInBaskets += 1
		}
	},
	mainGameLoopSlow: function () {
		if(gameData.bachelorsDegreeFinance) {
			if(beckyRandom(2) == 1 && gameData.alphaCoinsExchangeRate < 200)
				gameData.alphaCoinsExchangeRate += 1
			else if (gameData.alphaCoinsExchangeRate > 50)
				gameData.alphaCoinsExchangeRate -= 1
		}
	}
}

goldenLimeBar = {
	granularity: function () {
		return 7.5 / gameData.bitterSpeedSkillLevel
	},
	direction: 'reverse',
	start: function () {
		if (gameData.goldenLimes > 0) {
			gameData.goldenLimes -= 1
			gameData.eatGoldenLimeBar = 100
			gameData.bitterSpeeding = 1
			runBarNew('goldenLime')
		}
	},
	end: function () {
		gameData.bitterSpeeding = 0
	}
}