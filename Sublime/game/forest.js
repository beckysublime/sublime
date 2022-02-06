loopNumberBasket = 0

forestjs = {
	mainTab: {
		id: 'forest',
		text: 'Forest',
		color1: 'BBBBBB',
		color2: '898989'
	},
	gameDataBase: {
		forestTree2: 0,
		forestTreeType: 1,
	},
	update: function () {
		basicToggle("basketInfo")
		gameData.limesInBaskets = Math.floor(gameData.baskets * (gameData.basketBar / 4))
		update('basketsAmount', gameData.baskets.toLocaleString() + ' / ' + gameData.basketsMax.toLocaleString() + ' Baskets')
		update('maxBaskets', gameData.basketsMax.toLocaleString() + ' baskets fit under the current tree.')
		
		if (gameData.forestTreeType == 1)
			update('limesInBaskets', gameData.limesInBaskets.toLocaleString() + ' Limes')
		else
			update('limesInBaskets', gameData.limesInBaskets.toLocaleString() + ' Limes + ' + gameData.goldenLimesInBaskets.toLocaleString() + ' Golden Limes')

		var elem = document.getElementById("basketBar")
		elem.style.height = gameData.basketBar + "%"
		elem.innerHTML = Math.floor(gameData.basketBar) + "%"
		
		checkColor(gameData.baskets == gameData.basketsMax, 'buyABasketButton', '#50514F', '#DEAD85')

		checkShow(gameData.baskets && !gameData.basketScarecrow, 'offlineBasket')
		checkShow(gameData.pieCoinsInWell == 200, 'enterTheWell', 'inline')
		checkShow(gameData.forestWell, 'forestWellDiv', 'inline')

		
		if (gameData.forestWell)
			document.getElementById('forest').style.width = '760px'
		else
			document.getElementById('forest').style.width = '380px'
		
		checkShow(!gameData.forestTree2 && gameData.maps > 3, 'buyANewTree')
		checkShow(gameData.forestTree2, 'treeTypeDiv')
		basicToggle("basketsBulk")
		
		checkColor(gameData.forestTreeType == 1, 'forestTree1', '#4DFE89', 'gray')
		checkColor(gameData.forestTreeType == 2, 'forestTree2', '#4DFE89', 'gray')

		
		checkShow(gameData.baskets, 'forestButton')
		
		checkShow(gameData.forestTreeType == 2, 'goldenLimesInfo')


		var elem = document.getElementById("wellBar")
		elem.style.height = (gameData.pieCoinsInWell / 2) + "%"
		elem.innerHTML = Math.floor(gameData.pieCoinsInWell / 2) + "%"
	},
	onLoad: function () {
		if (gameData.basketScarecrow) {
			if (gameData.basketBar + Math.floor(secondsOffline / 3) < 100)
				gameData.basketBar += Math.floor(secondsOffline / 3)
			else
				gameData.basketBar = 100
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
	}
}

function throwPieCoinsWell() {
	if (gameData.pieCoinsInWell + gameData.pieCoins <= 200) {
		gameData.pieCoinsInWell += gameData.pieCoins
		gameData.pieCoins = 0
	}
	else {
		gameData.pieCoinsInWell = 200
		gameData.pieCoins -= (200 - gameData.pieCoinsInWell)
	}
}

function basket() {
    gameData.basketBar = 0
    gameData.limes += gameData.limesInBaskets
	gameData.goldenLimes += gameData.goldenLimesInBaskets
    gameData.limesInBaskets = 0
    gameData.goldenLimesInBaskets = 0
}