bakeryjs = {
	mainTab: {
		id: 'bakery',
		text: 'Bakery',
		color1: 'BBBBBB',
		color2: '898989'
	},
	variables: [
		{
			id: 'pies',
			name: 'Pies',
			color1: '964D1A',
			color2: 'C67848',
		},	
		{
			id: 'pieCoins',
			name: 'Pie Coins',
			color1: '964D1A',
			color2: 'C67848',
		},
	],
	gameDataBase: {
		pieEmployee: 0,
		pieEmployeeSalesLeft: 0,
		
		pieApplicantPieCoinPrice: 0,
		pieApplicantBetaCoinPrice: 0,
		pieApplicantMaxPay: 0,
		pieApplicantCharm: 0,

		pieMerchantPieCoinPrice: 5,
		pieMerchantBetaCoinPrice: 0,
		pieMerchantMaxPay: 10,
		pieMerchantCharm: 0,
		
		pieApplicantPrice: 0,
		doesHavePieMerchant: 0,
		usingBetaCoinWage: 0,
		pieMerchantInfoToggle: 0,
		
		hasGottenPies: 0,
		piePrice: 1,
		isThereACustomer: false,
		customerWaitTime: 0,
		hasSoldPie: 0,
		pieConveyorBelt : 0,
		pieConveyorBeltOn: 0,
		
		pieBucket: 0,
		pieFlourBucket: 0,

		juiceInPieBucket: 0,
		flourInPieBucket: 0,
		
		pieBucketNozzle: 0,	
		pieFlourBucketNozzle: 0,
		
		bucketThinSteelPlating: 0,

		juiceBucketHoleSize: 10,
		flourBucketHoleSize: 10,
		
		bellowsCurrentlyBlowing: 0,
		
		upgradeNozzles: 0,
	},
	update: function () {
		height = gameData.bucketThinSteelPlating * 5 + 20
		
		var elem = document.getElementById("juiceBucketBar")
		elem.style.height = Math.floor((gameData.juiceInPieBucket * 100) / height)  + "%"
		elem.innerHTML = Math.floor((gameData.juiceInPieBucket * 100) / height) + "%"
		
		var elem = document.getElementById("flourBucketBar")
		elem.style.height = Math.floor((gameData.flourInPieBucket * 100) / height)  + "%"
		elem.innerHTML = Math.floor((gameData.flourInPieBucket * 100) / height) + "%"
		
		var elem = document.getElementById("juiceHoleBar")
		elem.style.width = gameData.juiceBucketHoleSize * 5 + "%"
		elem.style.right = 50 - (gameData.juiceBucketHoleSize * 2.5) + "%"	

		var elem = document.getElementById("flourHoleBar")
		elem.style.width = gameData.flourBucketHoleSize * 5 + "%"
		elem.style.right = 50 - (gameData.flourBucketHoleSize * 2.5) + "%"	

		if(gameData.pies > 0)
			gameData.hasGottenPies = 1
		
		checkShow(gameData.hasGottenPies, 'bakeryButton')


		if (juiceInPieBucketLeak > 100 / gameData.juiceBucketHoleSize) {
			if (gameData.juiceInPieBucket > 0) {
				gameData.juiceInPieBucket -= 1
				gameData.juiceAsPieIngredient += 1
			}
			juiceInPieBucketLeak = 0
		}
		juiceInPieBucketLeak += 1

		if (flourInPieBucketLeak > 400 / gameData.flourBucketHoleSize) {
			if (gameData.flourInPieBucket > 0) {
				gameData.flourInPieBucket -= 1
				gameData.flourAsPieIngredient += 1
			}
			
			flourInPieBucketLeak = 0
		}
		flourInPieBucketLeak += 1
			
		checkShow(gameData.pieBucket, 'pieBuckets')
		checkShow(!gameData.pieFlourBucket && gameData.pieBucket, 'buyAPieFlourBucket')
		checkShow(gameData.pieBucket && !gameData.pieBucketNozzle, 'buyAPieBucketNozzle')
		checkShow(gameData.mortarAndPestle, 'grindFlour', 'inline')
		checkShow(gameData.hasSoldPie && !gameData.wheatField, 'buyWheatField')
		checkShow(gameData.hasSoldPie && !gameData.pieEmployee, 'buyPieEmployee')
		checkShow(gameData.doesHavePieMerchant, 'pieMerchant')
		checkShow(gameData.pieFlourBucket && !gameData.pieFlourBucketNozzle, 'buyAPieFlourBucketNozzle')
		checkShow(gameData.pieBucketNozzle, 'bucketHoleChanger')
		checkShow(gameData.pieBucketNozzle && gameData.pieFlourBucketNozzle && !gameData.upgradeNozzles, 'upgradeNozzles')
		
		checkShow(gameData.pieOven && !gameData.pieConveyorBelt, 'buyAPieConveyorBelt')
		checkShow(gameData.pieOven && !gameData.pieBucket, 'buyAPieBucket')
		checkShow(gameData.pieOven && !gameData.bellows, 'buyBellows')

		checkShow(gameData.bellows, 'bellowsDiv')
		
		checkShow(gameData.wheatField, 'fieldButton')
		checkShow(gameData.wheatField, 'buyWheatSeeds')
		checkShow(gameData.wheatField, 'buyAWheatHarvester')
		checkShow(gameData.wheatField, 'buyASeedDrill')
		checkShow(gameData.wheatField && !gameData.pieOven, 'buyPieOven')
		checkShow(gameData.wheatField && !gameData.mortarAndPestle, 'buyMortarAndPestle')
		
		checkShow(gameData.seedDrills || gameData.wheatHarvesters, 'wheatMachines')

		checkShow(gameData.pieEmployee, 'payPieEmployeeDiv')
		checkShow(gameData.pieEmployee && !gameData.advancedPieHiring, 'advancedPieHiring')
		checkShow(gameData.pieEmployee && gameData.advancedPieHiring, 'hirePieMerchantToggleButton')
		checkShow(gameData.pieFlourBucket, 'flourBucketProgress', 'visible')
		checkShow(gameData.pieFlourBucket, 'addToPieFlourBucket', 'visible')
		checkShow(gameData.pieFlourBucketNozzle, 'flourMinusNozzle', 'visible')
		checkShow(gameData.pieFlourBucketNozzle, 'flourPlusNozzle', 'visible')

		
		checkShow(gameData.pieOven, 'pieOvenDiv', 'inline')

		
		if(gameData.bakePieBar !== 100) {
			if(beckyRandom(2) == 1)
				pieOvenColor += 10
			else
				pieOvenColor -= 10
			
			if(pieOvenColor > 255)
				pieOvenColor = 200
		
			if(pieOvenColor < 0)
				pieOvenColor = 0
		}
		
		colorChanger('bakePieBar', 'rgba(345, ' + pieOvenColor + ', 0)')
		colorChanger('bellowsBar', '#99DEFF')


		
		if(gameData.wheatHarvesters || gameData.seedDrills)
			gameData.hasGottenFieldTools = 1
		


		checkShow(gameData.hasGottenFieldTools, 'fieldPlacementOptions')
		checkShow(gameData.pieConveyorBelt, 'pieConveyorBeltOnButton', 'inline')

		update("currentPieIngredients", "Current Ingredients: " + gameData.juiceAsPieIngredient.toLocaleString() + " Juice + " + gameData.flourAsPieIngredient.toLocaleString() + " Flour")
		update("pieEmployeeSalesLeft", "Employee Sales Left: " + gameData.pieEmployeeSalesLeft.toLocaleString() + " / " + gameData.pieMerchantMaxPay.toLocaleString())
		update("payPieEmployee", "Pay Employee " + gameData.pieMerchantPieCoinPrice.toLocaleString() + " Pie Coins & " + gameData.pieMerchantBetaCoinPrice.toLocaleString() + " Beta Coins" )
		update("pieMerchantPieCoinPrice"     , "Pie Coin Wages: "    + gameData.pieMerchantPieCoinPrice.toLocaleString() + ".")
		update("pieMerchantBetaCoinPrice"    , "Beta Coin Wages: "   + gameData.pieMerchantBetaCoinPrice.toLocaleString() + ".")
		update("pieMerchantMaxPay"           , "Max Wage Advances: " + gameData.pieMerchantMaxPay.toLocaleString() + ".")
		update("pieMerchantCharm"            , "Charm: "             + gameData.pieMerchantCharm.toLocaleString() + ".")
		update('piePrice', 'Current Price: ' + gameData.piePrice.toLocaleString() + ' Pie Coins')
		update('bucketHeight', 'Current heights: ' + (gameData.bucketThinSteelPlating * 5 + 20).toLocaleString() + ' Units')
		update('bucketThinSteelPlatingPrice', 'Price: ' + (gameData.bucketThinSteelPlating * 5 + 20).toLocaleString() + ' Pie Coins')
		
		basicToggle("sellingPieInfo")
		basicToggle("pieMerchantInfo")
		toggleAesthetic("pieConveyorBeltOn")
		currentTaskAesthetic('findPieCustomersBar.start')
	},
	mainGameLoopSlow: function () {
		updateFieldTileAesthetic()
		for (var x = 0; x < 5; x++) {
			for (var y = 0; y < 5; y++) {
				
				var tileType = gameData.wheatFieldArray[x][y]

				if(tileType >= 1 && tileType < 50)
					gameData.wheatFieldArray[x][y] += 1
				
				if (tileType == 53 || tileType == 55) {
					xWhere = x
					yWhere = y - 1
				}
				else if(tileType == 54 || tileType == 56) {
					xWhere = x + 1
					yWhere = y
				}
				else if(tileType == 51 || tileType == 57) {
					xWhere = x
					yWhere = y + 1
				}
				else if(tileType == 52 || tileType == 58) {
					xWhere = x - 1
					yWhere = y
				}

				
				if (tileType >= 51 && tileType <= 54) {
					if (gameData.wheatFieldArray[xWhere][yWhere] == 0 && gameData.wheatSeeds > 0) {
						gameData.wheatFieldArray[xWhere][yWhere] = 1
						gameData.wheatSeeds -= 1
					}
				}
				
				if (tileType >= 55 && tileType <= 58) {
					if (gameData.wheatFieldArray[xWhere][yWhere] == 50) {
						gameData.wheatFieldArray[xWhere][yWhere] = 0
						gameData.wheat += 1
					}
				}
			}
		}
		
		if(gameData.flourAsPieIngredient > 0 && gameData.juiceAsPieIngredient > 0 && gameData.pieConveyorBeltOn)
			bakePieBar.start()
		
		if(gameData.wheatSeeds > 30)
			gameData.wheatSeeds -= 1
		if(gameData.wheat > 30)
			gameData.wheat -= 1
		if(gameData.flour > 30)
			gameData.flour -= 1
		
		updateCustomerButton()
		gameData.customerWaitTime += 1
	}
}

function updateCustomerButton() {
	if (gameData.isThereACustomer) {
		if (gameData.customerWaitTime < 5)
			update("customerButton", ":)")
		else if (gameData.customerWaitTime >= 5 && gameData.customerWaitTime < 10)
			update("customerButton", ":l")
		else if (gameData.customerWaitTime >= 10 && gameData.customerWaitTime < 15)
			update("customerButton", ":(")
		else if (gameData.customerWaitTime == 15) {
			gameData.isThereACustomer = false
			gameData.customerWaitTime = 0
			update("customerButton", "  ")
		}
	}
	else
		update("customerButton", "  ")
}


pieOvenColor = 0
juiceInPieBucketLeak = 0
flourInPieBucketLeak = 0

function changePiePrice() {
	gameData.findPieCustomersBar = 0.1
	gameData.isThereACustomer = false
}

function sellPieToCustomer() {
	if (gameData.isThereACustomer && gameData.pies > 0) {
		gameData.isThereACustomer = false
		gameData.pies -= 1
		gameData.pieCoins += gameData.piePrice
		gameData.hasSoldPie = 1
		updateCustomerButton()
	}
}

function addPieIngredient(ingredient) {
	if (gameData[ingredient] > 0) {
		gameData[ingredient + 'AsPieIngredient'] += 1
		gameData[ingredient] -= 1
	}
}

function addToPieBucket(ingredient) {
	if (gameData[ingredient] > 0 && gameData[ingredient + 'InPieBucket'] < (gameData.bucketThinSteelPlating * 5 + 20)) {
		gameData[ingredient + 'InPieBucket'] += 1
		gameData[ingredient] -= 1
	}
}

function bucketHoleSize(amount, id) {
	size = id + 'BucketHoleSize'
	change =  (2 - gameData.upgradeNozzles) * amount
	
	if (gameData[size] + change >= 0 && gameData[size] + change <= 20)
		gameData[size] += change

}

function payPieEmployee() {
	if (gameData.pieCoins >= gameData.pieMerchantPieCoinPrice && gameData.betaCoins >= gameData.pieMerchantBetaCoinPrice && gameData.pieEmployeeSalesLeft < gameData.pieMerchantMaxPay) {
		gameData.pieCoins -= gameData.pieMerchantPieCoinPrice
		gameData.betaCoins -= gameData.pieMerchantBetaCoinPrice
		gameData.pieEmployeeSalesLeft += 1
	}
}

bars.push('bellows')
bellowsBar = {
	where: 'bellowsDiv',
	granularity: function () {
		return 0.2
	},
	direction: 'backward',
	runOnLoad: true,
	start: function () {
		if (gameData.bellowsBar == 0)
			runBar('bellows')
		gameData.bellowsBar = 0
		gameData.bellowsCurrentlyBlowing = 1
	},
	end: function () {
		gameData.bellowsCurrentlyBlowing = 0
	}
}

bars.push('bakePie')
bakePieBar = {
	where: 'bakePieBarDiv',
	granularity: function () {
		return 0.1 * (gameData.bellowsCurrentlyBlowing + 1)
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.bakePieBar == 0 && gameData.juiceAsPieIngredient > 0 && gameData.flourAsPieIngredient > 0)
			runBar('bakePie')
	},
	end: function () {
		gameData.bakePieBar = 0
		gameData.pies += 1
		gameData.juiceAsPieIngredient = 0
		gameData.flourAsPieIngredient = 0
	}
}

bars.push('findPieCustomers')
findPieCustomersBar = {
	where: 'findPieCustomersDiv',
	granularity: function () {
		return 7.5 / (Math.pow(2 - gameData.pieMerchantCharm / 20, gameData.piePrice) + 10)
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.findPieCustomersBar == 0)		
			runBar('findPieCustomers')
	},
	end: function () {
		gameData.isThereACustomer = true
		gameData.customerWaitTime = 0
		updateCustomerButton()
		
		if (gameData.pieEmployeeSalesLeft > 0) {
			gameData.pieEmployeeSalesLeft -= 1
			sellPieToCustomer()
		}
		gameData.findPieCustomersBar = 0
	}
}