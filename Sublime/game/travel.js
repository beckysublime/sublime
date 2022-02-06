traveljs = {
	mainTab: {
		id: 'megaCoinUpgrades',
		text: 'Upgrades',
		color1: 'FF999A',
		color2: 'FF4D4D'
	},
	variables: [
		{
			id: 'megaCoins',
			name: 'Mega Coins',
			color1: 'B40001',
			color2: 'FE0000',
		},	
	],
	update: function () {
		checkShow(gameData.megaCoinsInBankMax <= 20, 'increaseCreditScore')
		checkShow(!gameData.nutritionists, 'hireANutritionist')
		checkShow(gameData.respectMilestone10000 && !gameData.bachelorsDegreeFinance, 'earnBachelorFinance')
		checkShow(gameData.respectMilestone10000, 'buyABiggerWallet')
		checkShow(gameData.respectMilestone10000, 'upgradeMoreStorage')
		checkShow(!gameData.bigGloves, 'buyBigGloves')
		checkShow(gameData.creditScore2 && !gameData.creditScore3, 'increaseCreditScore3')
		checkShow(!gameData.creditScore2 && gameData.respectMilestone10000, 'increaseCreditScore2', 'inline')

		update('textForMegaCoinsInBank', gameData.megaCoinsInBank.toLocaleString() + ' / ' + gameData.megaCoinsInBankMax.toLocaleString() + ' Mega Coins In Bank')
		update('buyMegaCoinsTimes', 'Transfer times: ' + gameData.buyMegaCoinsTimes + ' / ' + gameData.buyMegaCoinsTimesMax)

		if (gameData.megaCoinsInBank > gameData.megaCoinsInBankMax)
			gameData.megaCoinsInBank = gameData.megaCoinsInBankMax
		
		checkShow(!gameData.nationalJuiceMarketing, 'juiceMarketing')
		
		update('descriptionbetterTraining2', 'Price: ' + gameData.betterTraining.toLocaleString() + ' Mega Coins')
		update('descriptionupgradeMoreStorage2', 'Price: ' + (Math.pow(2, gameData.upgradeMoreStorage) * 50).toLocaleString() + ' Mega Coins')
		
		for (let i = 0; i < permanentUpgrades.length; i++) {
			checkShow(eval(permanentUpgrades[i].requirement), 'upgrade' + permanentUpgrades[i].id)
		}
	},
	onLoad: function () {
		for (let i = 0; i < permanentUpgrades.length; i++) {
			document.getElementById('megaCoinUpgrades').innerHTML += `
			<div class="basicDiv" id="upgrade` + permanentUpgrades[i].id + `">
				<p class="basicText" style="background-color:#FF999A;" >` + permanentUpgrades[i].text + `</p>
				<p class="basicText">` + permanentUpgrades[i].description + `</p>
			</div>
			`
			store = permanentUpgrades[i].store
			
			document.getElementById('travel').innerHTML += `
			<div class="basicDiv" id="` + store.id + `">
                <button class="specialButtonTravel" onclick="` + store.onClick + `">` + store.text + `</button>
            </div>
			`
			for (let j = 0; j < permanentUpgrades[i].store.description.length; j++) {
				
				document.getElementById(store.id).innerHTML += `
					<p class="basicText" id="description` + store.id + j + `">` + store.description[j] + `</p>
				`
			}
		}
	}
}

permanentUpgrades = [
	{
		id: 'Nutritionist',
		text: 'Nutritionist',
		description: 'Doubles food points from eating',
		requirement: 'gameData.nutritionists',
		store: {
			id: 'hireANutritionist',
			onClick: "universalBuy('nutritionists', 5, 'megaCoins')",
			text: 'Hire A Nutritionist',
			description: [
				'Get double the nutrition from eating',
				'Price: 5 Mega Coins'
			]
			
		}
	},
	{
		id: 'JuicePricePermanance',
		text: 'Juice Price Permanance',
		description: 'Juice price is saved after travelling',
		requirement: 'gameData.increaseJuicePricePermanance',
		store: {
			id: 'increaseJuicePricePermanance',
			onClick: "basicBuy('increaseJuicePricePermanance', 5e5)",
			text: 'Unlock Permanance',
			description: [
				'Make your increased juice price stay after travelling!',
				'Price: 500,000 Coins'
			]
			
		}
	},
	{
		id: 'CreditScore',
		text: 'Credit Score',
		description: 'Increases max Mega Coins in the bank',
		requirement: 'gameData.megaCoinsInBankMax > 20',
		store: {
			id: 'increaseCreditScore',
			onClick: 'if (gameData.megaCoins >= 2) {gameData.megaCoins -= 2; gameData.megaCoinsInBankMax += 30}',
			text: 'Increase Credit Score',
			description: [
				'Store up to 50 Mega Coins in your bank account',
				'Price: 2 Mega Coins'
			]
			
		}
	},
	{
		id: 'BigGloves',
		text: 'Big Gloves',
		description: 'Helps you pick up double limes!',
		requirement: 'gameData.bigGloves',
		store: {
			id: 'buyBigGloves',
			onClick: "universalBuy('bigGloves', 5, 'megaCoins')",
			text: 'Buy Big Gloves',
			description: [
				'Helps you pick up double limes!',
				'Price: 5 Mega Coins'
			]
			
		}
	},
	{
		id: 'Manuscripts',
		text: 'Manuscripts',
		description: 'Keep 1,000 respect milestone after travelling',
		requirement: 'gameData.manuscripts',
		store: {
			id: 'buyManuscriptsDiv',
			onClick: "basicBuy('manuscripts', 5e5)",
			text: 'Buy Manuscripts',
			description: [
				'Keep 1,000 respect milestone after travelling',
				'Price: 500,000 Coins'
			]
			
		}
	},	
	{
		id: 'BetterTraining',
		text: 'Better Training',
		description: 'Increases maximum applicant speed',
		requirement: 'gameData.betterTraining',
		store: {
			id: 'betterTraining',
			onClick: 'if (gameData.megaCoins >= gameData.betterTraining) {gameData.megaCoins -= gameData.betterTraining;gameData.betterTraining += 1}',
			text: 'Search For Specialised Workers',
			description: [
				'Increases maximum applicant speed by 100%',
				'The search gets more difficult the more you find',
				''
			]
			
		}
	},
	{
		id: 'JuiceMarketing',
		text: 'National Juice Marketing',
		description: 'Doubles juice sale price',
		requirement: 'gameData.nationalJuiceMarketing',
		store: {
			id: 'juiceMarketing',
			onClick: "universalBuy('nationalJuiceMarketing', 10, 'megaCoins')",
			text: 'National Juice Marketing',
			description: [
				'Convince the country that juice can be added to anything!',
				'Doubles juice sale price',
				'Price: 10 Mega Coins'
			]
			
		}
	},
	{
		id: 'Wallet',
		text: 'Wallet',
		description: 'Increases maximum coin storage',
		requirement: 'gameData.coinsMax > 1e6',
		store: {
			id: 'buyABiggerWallet',
			onClick: 'if (gameData.megaCoins >= 50) {gameData.megaCoins -= 50;gameData.coinsMax += 1e6}',
			text: 'Buy A Bigger Wallet',
			description: [
				'Store up to +1,000,000 coins',
				'Price: 50 Mega Coins'
			]
			
		}
	},
	{
		id: 'MoreLand',
		text: 'More Land',
		description: 'Increases maximum juicers and peelers',
		requirement: 'gameData.upgradeMoreStorage',
		store: {
			id: 'upgradeMoreStorage',
			onClick: 'upgradeMoreStorage()',
			text: 'Buy More Land',
			description: [
				'Increases maximum juicers by 500',
				'Increases maximum peelers by 2,500',
				''
			]
			
		}
	},
	{
		id: 'HighTechSurveillance',
		text: 'High Tech Surveillance Camera',
		description: 'Makes sure researchers are working while you&#39re away',
		requirement: 'gameData.surveillanceCamera2',
		store: {
			id: 'offlineScience',
			onClick: "basicBuy('surveillanceCamera2', 2e5)",
			text: 'Buy A High Tech Surveillance Camera',
			description: [
				'Make sure researchers are working while you&#39re away (offline)',
				'Price: 200,000 Coins'
			]
			
		}
	},
	{
		id: 'ChangeResearchersBy10',
		text: 'Bulk Researcher Transfer',
		description: 'Cart researchers around rather than giving them any special attention',
		requirement: 'gameData.changeResearchersBy10Unlock',
		store: {
			id: 'changeResearchersBy10Unlock',
			onClick: "universalBuy('changeResearchersBy10Unlock', 100, 'alphaCoins')",
			text: 'Unlock Bulk Researcher Transfer',
			description: [
				'Cart researchers around rather than giving them any special attention',
				'Price: 100 Alpha Coins'
			]
			
		}
	},
	{
		id: 'SaveAlphaCoinsUnlock',
		text: 'A Safe On Wheels',
		description: 'Keep alpha coins after travelling',
		requirement: 'gameData.saveAlphaCoinsUnlock',
		store: {
			id: 'saveAlphaCoinsUnlock',
			onClick: "universalBuy('saveAlphaCoinsUnlock', 1000, 'alphaCoins')",
			text: 'Buy A Safe On Wheels',
			description: [
				'Bring your alpha coins with you during your travels without pesky plebians stealing them',
				"Price: 1,000 Alpha Coins"
			]
			
		}
	},
	{
		id: 'RottenActualWisdomUnlock',
		text: 'Rotten (Actual) Wisdom',
		description: 'Lowers the max skill level of Rotten Wisdom from 50 to 25',
		requirement: 'gameData.rottenActualWisdom',
		store: {
			id: 'rottenActualWisdom',
			onClick: 'if (gameData.megaCoins >= 50) {gameData.megaCoins -= 50;gameData.rottenActualWisdom += 1;gameData.rottenWisdomSkillLevelMax = 25}',
			text: 'Rotten (Actual) Wisdom',
			description: [
				'Lowers the max skill level of Rotten Wisdom from 50 to 25, but doubles it&#39s effectiveness',
				'Price: 50 Mega Coins'
			]
			
		}
	}
]	

bars.push('convertCoinsNow')
convertCoinsNowBar = {
	where: 'travelCoins',
	granularity: function () {
		return 0.075 / Math.pow(2, gameData.convertedCoinsSinceTravel)
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.coins >= 1e5 && (gameData.convertCoinsNowBar == 0)) {
			gameData.coins -= 1e5
			gameData.convertedCoinsSinceTravel += 1
			runBar('convertCoinsNow')
		}
	},
	end: function () {
		gameData.megaCoins += 1
	}
}

function travelToNextVillage() {
    if (window.prompt("Are you sure? Type 'yes' if you are") == "yes") {
		
		if (gameData.increaseJuicePricePermanance == 1)
		    saveBeforeWipe('juicePriceCents')
		
		if (gameData.manuscripts > 0)
			saveBeforeWipe('respectMilestone1000')
		
		if (gameData.saveAlphaCoinsUnlock)
			saveBeforeWipe('alphaCoins')
		
		
		saveBeforeWipe('saveAlphaCoinsUnlock')
        saveBeforeWipe('manuscripts')
        saveBeforeWipe('lightRobe')
        saveBeforeWipe('increaseJuicePricePermanance')

		
        megaCoinsNow = gameData.megaCoinsInBank

		
		saveWipeValues = [
		'surveillanceCamera2', 
		'versionNumber', 
		'nationalJuiceMarketing', 
		'creditScore2', 
		'creditScore3', 
		'coinsMax', 
		'respectMilestone10000', 
		'unlockBenevolence', 
		'nationalTradeCert', 
		'bigGloves', 
		'nutritionists', 
		'megaCoinsInBankMax', 
		'betterTraining', 
		'showBarPercent', 
		'hideCompletedSkills', 
		'hideMaxedPurchases', 
		'researchers', 
		'upgradeMoreStorage', 
		'changeResearchersBy10Unlock', 
		'rottenActualWisdom', 
		'tickspeed',
		'timePlayed'];

		for (let i = 0; i < saveWipeValues.length; i++) {
			saveBeforeWipe(saveWipeValues[i])		
		}

		function saveBeforeWipe(id) {
			eval(id + 'Now = gameData.' + id)
		}



		//Before Travel
			Object.assign(gameData, gameDataBase)
        //After Travel



		saveAfterWipe('saveAlphaCoinsUnlock')
		saveAfterWipe('megaCoins')	

		if (gameData.saveAlphaCoinsUnlock)
			saveAfterWipe('alphaCoins')
		
		
		if (increaseJuicePricePermananceNow) {
			saveAfterWipe('juicePriceCents')
			saveAfterWipe('increaseJuicePricePermanance')
		} 
		
		
        saveAfterWipe('manuscripts')
		if (gameData.manuscripts > 0) {
			saveAfterWipe('respectMilestone1000')
		} 
		
		
		for (let i = 0; i < saveWipeValues.length; i++) {
			saveAfterWipe(saveWipeValues[i])		
		}
		
		function saveAfterWipe(id) {
			eval('gameData.' + id + '=' + id + 'Now')
		}

		gameData.juicersMax = 100 + gameData.upgradeMoreStorage * 500
		gameData.peelersMax = 500 + gameData.upgradeMoreStorage * 2500
		
		if (lightRobeNow)
			gameData.respect += 50
		
		if(rottenActualWisdomNow)
			gameData.rottenWisdomSkillLevelMax = 25


        gameData.villageNumber = 2
        saveGame()
        location.reload()
    }
}

function increaseCreditScore2() {
    if (gameData.megaCoins >= 5) {
        gameData.megaCoins -= 5
        gameData.megaCoinsInBankMax += 150
        gameData.creditScore2 = 1
    }
}

function increaseCreditScore3() {
    if (gameData.megaCoins >= 50) {
        gameData.megaCoins -= 50
        gameData.megaCoinsInBankMax += 800
        gameData.creditScore3 = 1
    }
}

function buyMegaCoins() {
    if (gameData.coins >= 10000 && gameData.megaCoinsInBank < gameData.megaCoinsInBankMax && gameData.buyMegaCoinsTimes < gameData.buyMegaCoinsTimesMax) {
        gameData.coins -= 10000
        gameData.megaCoinsInBank += 5
		gameData.buyMegaCoinsTimes += 1
    }
}

function buyMegaCoinsWithAlphaCoins(amount) {
	if (amount == 1) {
		if (gameData.alphaCoins >= 10 && gameData.megaCoinsInBank < gameData.megaCoinsInBankMax) {
			gameData.alphaCoins -= 10
			gameData.megaCoinsInBank += 1
		}
	}
	else {
		if (gameData.alphaCoins >= 100 && gameData.megaCoinsInBank + 10 <= gameData.megaCoinsInBankMax) {
			gameData.alphaCoins -= 100
			gameData.megaCoinsInBank += 10
		}
	}
}

function upgradeMoreStorage() {
    if (gameData.megaCoins >= Math.pow(2, gameData.upgradeMoreStorage) * 50) {
        gameData.megaCoins -= Math.pow(2, gameData.upgradeMoreStorage) * 50
		gameData.juicersMax +=  500
		gameData.peelersMax +=  2500
		gameData.upgradeMoreStorage += 1
    }
}