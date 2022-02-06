deliveryjs = {
	gameDataBase: {
		deliveryType: 0,
		deliveryTypeToggle: 0,
		deliveryPrice: 2,
		juiceBulkAmountToggle: 1,
	},
	update: function () {
		checkColor(gameData.deliveryTypeToggle == 0 || gameData.deliveryTypeToggle == 2, 'deliveryToggleStandardButton', '#4DFE89', 'gray')
		checkColor(gameData.deliveryTypeToggle == 1, 'deliveryToggleExpressButton', '#4DFE89', 'gray')
		checkColor(gameData.deliveryTypeToggle == 3, 'deliveryToggleTrainButton', '#4DFE89', 'gray')

		
		if (gameData.juiceBulkAmountToggle > 100 && gameData.deliveryTypeToggle < 2)
			gameData.juiceBulkAmountToggle = 100

		if (gameData.juiceBulkAmountToggle > gameData.juiceBulkAmountMax)
			gameData.juiceBulkAmountToggle = gameData.juiceBulkAmountMax
		
		currentTaskAesthetic('deliveryBar.start')


		checkColor(gameData.juiceBulkAmountToggle == 100 && gameData.deliveryTypeToggle < 2, 'increaseJuiceSoldButton', '#50514F', '#BBBBBB')
		checkColor(gameData.juiceBulkAmountToggle == 0, 'decreaseJuiceSoldButton', '#50514F', '#BBBBBB')

		
		if (gameData.deliveryTypeToggle == 2 && gameData.fasterTransport > 0)
			gameData.juiceBulkAmountMax = 500
		else if (gameData.deliveryTypeToggle == 3)
			gameData.juiceBulkAmountMax = 2000
		else
			gameData.juiceBulkAmountMax = 100
		
		if (gameData.fasterTransport == 0)
			update('deliveryToggleStandardButton', 'Standard Delivery')
		else
			update('deliveryToggleStandardButton', 'Hyper Delivery')
		
		checkShow(!gameData.increaseJuicePricePermanance, 'increaseJuicePricePermanance')
		checkShow(gameData.deliveryManager, 'sellMaxJuiceButton', 'inline')
		checkShow(!gameData.deliveryManager, 'decreaseJuiceSoldButton', 'inline')
		checkShow(!gameData.deliveryManager, 'increaseJuiceSoldButton', 'inline')
		checkShow(gameData.deliveryManager == 0 && gameData.maps >= 3, 'buyADeliveryManager')
		checkShow(gameData.trainTransport, 'deliveryToggleTrainButton', 'inline')
		checkShow(gameData.hasSoldPie && !gameData.trainTransport, 'trainTransportDiv')
		
		checkShow(gameData.hasGottenJuice, 'juiceMarket')
		
		update('sellYourJuiceAmount','You Will Deliver ' + gameData.juiceBulkAmountToggle.toLocaleString() + ' / ' + gameData.juiceBulkAmountMax.toLocaleString() + ' Juice' )
		update('sellYourJuiceReward', 'You Will Get ' + ((gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmountToggle * (1 + (gameData.juicePriceCents / 100)))).toLocaleString() + ' Coins')
		update('sellYourJuicePrice', 'You Need ' + gameData.deliveryPrice.toLocaleString() + ' Coins For Delivery')
		update('textForJuicePricePrice', 'Price: ' + (gameData.juicePricePrice + gameData.increaseJuicePricex10 * (gameData.juicePricePrice * 9 + 45)).toLocaleString() + ' Coins')
		toggleAesthetic("increaseJuicePricex10")

		checkColor(gameData.increaseJuicePricePermanance < 1, 'increaseJuicePriceButton', '#DEAD85', '#FF999A')
	},
}

bars.push('delivery')
deliveryBar = {
	where: 'juiceMarket',
	granularity: function () {
		if (gameData.deliveryType == 0)
			return 0.02
		else if (gameData.deliveryType == 1)
			return 0.5
		else
			return 1
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.deliveryBar == 0 && gameData.coins >= gameData.deliveryPrice && gameData.juice >= gameData.juiceBulkAmountToggle) {
			gameData.deliveryType = gameData.deliveryTypeToggle
			gameData.juiceBulkAmount = gameData.juiceBulkAmountToggle
			gameData.coins -= gameData.deliveryPrice
			gameData.juice -= gameData.juiceBulkAmount
			runBar('delivery')
		}
	},
	end: function () {
		gameData.coins += (gameData.nationalJuiceMarketing + 1) * Math.floor(gameData.juiceBulkAmount * (1 + gameData.juicePriceCents / 100))
	}
}

function increaseJuicePrice() {
	if (gameData.increaseJuicePricex10) {
		for (i = 0; i < 10; i++) {
			if (gameData.coins >= gameData.juicePricePrice) {
				gameData.coins -= gameData.juicePricePrice
				gameData.juicePriceCents += 1
				gameData.juicePricePrice = gameData.juicePriceCents + 1
			}
		}
	}
	else {
		if (gameData.coins >= gameData.juicePricePrice) {
			gameData.coins -= gameData.juicePricePrice
			gameData.juicePriceCents += 1
		}
	}
}


function decreaseJuiceSold() {
    if (gameData.juiceBulkAmountToggle >= 1) {
        if (gameData.juiceBulkAmountToggle > 100)
            gameData.juiceBulkAmountToggle -= 10
        else
            gameData.juiceBulkAmountToggle -= 1
    }
}

function increaseJuiceSold() {
    if (gameData.juiceBulkAmountToggle < 100)
        gameData.juiceBulkAmountToggle += 1
    else if (gameData.juiceBulkAmountToggle < 500 && gameData.deliveryTypeToggle == 2 && gameData.fasterTransport > 0)
        gameData.juiceBulkAmountToggle += 10
    else if (gameData.juiceBulkAmountToggle < 2000 && gameData.deliveryTypeToggle == 3)
        gameData.juiceBulkAmountToggle += 10
}