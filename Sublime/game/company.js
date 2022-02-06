companyjs = {
	mainTab: {
		id: 'company',
		text: 'Lime Inc.',
		color1: 'BBBBBB',
		color2: '898989'
	},
	gameDataBase: {
		applicantSpeed: 20,
		applicantPrice: 10,
		applicantWage: 10,
		applicantHunger: 5,
		employeeSpeed: 20,
		employeeHunger: 5,
		employeePrice: 10,
		employeeWage: 10,
		employeeCurrentSpeed: 0,
		employees: 0,
		maxEmployees: 1,
		employeeWorking: 0,
		employeeWorkingMax: 10,
		advertisingLevel1: 0,
		advertisingLevel2: 0,
		advertisingLevel3: 0,
	},
	update: function () {
		
		checkColor(gameData.typeToHireToggle == 'basic', 'hireEmployeeToggleButton', '#4DFE89', 'gray')
		checkColor(gameData.typeToHireToggle == 'broker', 'hireBrokerToggleButton', '#4DFE89', 'gray')
		checkColor(gameData.typeToHireToggle == 'pie', 'hirePieMerchantToggleButton', '#4DFE89', 'gray')
		
		if (gameData.applicationReady)
			employeeTypes[gameData.applicationType].textFormat()
		else
			update('application', 'Pin applications here')
		
		checkShow(gameData.applicationReady, 'applicationInfo')
		checkShow(!gameData.advertisingLevel2, 'advertisingLeaflets')
		checkShow(!gameData.advertisingLevel3, 'advertisingBillboard')
		
		update('currentSpeedEmployee', 'Current speed: ' + gameData.employeeCurrentSpeed.toLocaleString() + ' limes per minute.')
		update('speedEmployee', 'Speed: ' + gameData.employeeSpeed.toLocaleString() + '% Of What I&#39m Taught.')
		
		basicToggle("teachInfo")
		basicToggle("employeeStatsInfo")
		toggleAesthetic("autoAdvertiseBroker")


		if (gameData.employeeWorking > gameData.employeeWorkingMax)
			gameData.employeeWorking = gameData.employeeWorkingMax
		
		
		checkShow(gameData.employees, 'companyButton')
	},
	onLoad: function () {
		if (gameData.surveillanceCamera && secondsOffline > 60 && gameData.employeeWorking > 0) {
			for (i = 0; i < Math.floor(secondsOffline / 60) && gameData.employeeWorking > 0; i++) {
				gameData.employeeWorking -= 1
				gameData.limes += gameData.employeeCurrentSpeed
			}
			gameData.workingBar = 0
		}

		gameData.teachBar = 0
	}
}


employeeTypes = {
	basic : {
		applicationRandomisation: function () {
			if (gameData.firstApplicant) {
				gameData.applicantSpeed = 100
				gameData.applicantPrice = 0
				gameData.applicantWage = 5
				gameData.applicantHunger = 1
				gameData.firstApplicant = 0
			} else {
				gameData.applicantSpeed = (Math.floor(Math.random() * (10 + gameData.betterTraining) + 1) * 100)
				gameData.applicantPrice = Math.floor(Math.random() * 200)
				gameData.applicantWage = Math.floor(Math.random() * 16) + 5
				gameData.applicantHunger = Math.floor(Math.random() * 20) + 1
			}
		},
		onHire: function () {
			if (gameData.coins >= gameData.applicantPrice && gameData.applicationReady == 1) {
				gameData.applicationReady = 0
				gameData.employeeWorking = 0
				gameData.workingBar = 0
				gameData.coins -= gameData.applicantPrice
				gameData.employeeHunger = gameData.applicantHunger
				gameData.employeeSpeed = gameData.applicantSpeed
				gameData.employeePrice = gameData.applicantPrice
				gameData.employeeWage = gameData.applicantWage
				gameData.employeeCurrentSpeed = -(gameData.employeeHunger * 60)
				gameData.employees = 1
				gameData.isEmployeeWorking = false
				gameData.workingBar = 0
				update('speedEmployee', 'Speed: ' + gameData.employeeSpeed.toLocaleString() + '% of what I&#39m taught.')
				update('wageEmployee', 'Wages: ' + gameData.employeeWage.toLocaleString() + ' Coins per minute.')
				update('hungerEmployee', 'Hunger: ' + gameData.employeeHunger.toLocaleString() + ' Limes per second.')
			}
		},
		price: 10,
		priceType: 'coins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Skills: Can Collect Limes.' + '<br>' +
				'Speed: ' + gameData.applicantSpeed.toLocaleString() + '% Of What I&#39m Taught.<br>' +
				'Price: ' + gameData.applicantPrice.toLocaleString() + ' Coins.<br>' +
				'Wages: ' + gameData.applicantWage.toLocaleString() + ' Coins Per Minute.<br>' +
				'Hunger: ' + gameData.applicantHunger.toLocaleString() + ' Limes Per Second.<br>' +
				'<br>'
			)
		}
	},
	broker : {
		applicationRandomisation: function () {
			gameData.currencyApplicantFee = beckyRandomMinMax(gameData.minBrokerApplicantFee, gameData.maxBrokerApplicantFee)
			gameData.currencyApplicantSpeed = beckyRandomMinMax(gameData.minBrokerApplicantSpeed, gameData.maxBrokerApplicantSpeed)
			gameData.currencyApplicantPrice = (Math.floor(Math.random() * 20) + 1) * 10000
			gameData.currencyApplicantTransferAmount = beckyRandomMinMax(gameData.minBrokerApplicantAmount, gameData.maxBrokerApplicantAmount)
		},
		onHire: function () {
			if (gameData.coins >= gameData.currencyApplicantPrice && gameData.applicationReady == 1) {
				gameData.applicationReady = 0
				gameData.doesHaveCurrencyBroker = 1
				gameData.coins -= gameData.currencyApplicantPrice
				gameData.currencyBrokerFee = gameData.currencyApplicantFee
				gameData.currencyBrokerSpeed = gameData.currencyApplicantSpeed
				gameData.currencyBrokerPrice = gameData.currencyApplicantPrice
				gameData.currencyBrokerTransferAmount = gameData.currencyApplicantTransferAmount
				gameData.coinsToAlphaBar = 0
			}
		},
		price: 10000,
		priceType: 'coins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Speed: ' + gameData.currencyApplicantSpeed.toLocaleString() + ' Seconds.' + '<br>' +
				'Transfer Fee: ' + gameData.currencyApplicantFee.toLocaleString() + ' Coins.' + '<br>' +
				'Alpha Coins Per Transfer: ' + gameData.currencyApplicantTransferAmount.toLocaleString() + '.' + '<br>' +
				'Hire Price: ' + gameData.currencyApplicantPrice.toLocaleString() + ' Coins.' + '<br>' +
				'<br>'
			)
		}		
	},
	pie : {
		applicationRandomisation: function () {
			gameData.pieApplicantPieCoinPrice = beckyRandomMinMax(5, 20)
			if(gameData.usingBetaCoinWage == 1)
				gameData.pieApplicantBetaCoinPrice = beckyRandomMinMax(200, 1000)
			else
				gameData.pieApplicantBetaCoinPrice = 0
			gameData.pieApplicantMaxPay = beckyRandomMinMax(1, 20)
			gameData.pieApplicantCharm = beckyRandomMinMax(0, 10)
			gameData.pieApplicantPrice = beckyRandomMinMax(1, 20) * 10
		},
		onHire: function () {
			if (gameData.betaCoins >= gameData.pieApplicantPrice && gameData.applicationReady == 1) {
				gameData.applicationReady = 0
				gameData.doesHavePieMerchant = 1
				gameData.betaCoins -= gameData.pieApplicantPrice
				gameData.pieMerchantPieCoinPrice = gameData.pieApplicantPieCoinPrice
				gameData.pieMerchantBetaCoinPrice = gameData.pieApplicantBetaCoinPrice
				gameData.pieMerchantMaxPay = gameData.pieApplicantMaxPay
				gameData.pieMerchantCharm = gameData.pieApplicantCharm
			}
		},
		price: 10,
		priceType: 'betaCoins',
		textFormat: function () {
			update('application',
				'<br>' +
				'Pie Coin Wage: '    + gameData.pieApplicantPieCoinPrice.toLocaleString()   + '<br>' +
				'Beta Coin Wage: '   + gameData.pieApplicantBetaCoinPrice.toLocaleString()  + '<br>' +
				'Charm: '            + gameData.pieApplicantCharm.toLocaleString()          + '<br>' +
				'Max Wage Advances: ' + gameData.pieApplicantMaxPay.toLocaleString()         + '<br>' +
				'Hire Price: '       + gameData.pieApplicantPrice.toLocaleString()          + ' Beta Coins.' + '<br>' +
				'<br>'
			)
		}	
	}	
}


bars.push('working')
workingBar = {
	where: 'workingBarDiv',
	granularity: function () {
		return 0.025
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.coins >= gameData.employeeWage && gameData.employeeWorking < gameData.employeeWorkingMax) {
			gameData.employeeWorking += 1
			gameData.coins -= gameData.employeeWage
			if (gameData.workingBar == 0)
				runBar('working')
		}
	},
	end: function () {
		gameData.limes += gameData.employeeCurrentSpeed
		gameData.employeeWorking -= 1
		
		if (gameData.employeeWorking > 0)
			runBar('working')
	}
}

bars.push('teach')
teachBar = {
	where: 'teachBarDiv',
	granularity: function () {
		return 0.75
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.teachBar == 0) {
			gameData.teachBar = 0.1
			gameData.employeeCurrentSpeed = -(gameData.employeeHunger * 60)
			setTimeout(runBar, 1000, 'teach')
		}
	},
	end: function () {
	}
}

bars.push('advertise')
advertiseBar = {
	where: 'advertiseBarDiv',
	granularity: function () {
		return (7.5 * (gameData.advertisingLevel2 * 2 * gameData.advertisingLevel3 + gameData.advertisingLevel2 + 2 * gameData.advertisingLevel3 + 1)) / 100
	},
	direction: 'forward',
	runOnLoad: true,
	start: function () {
		if (gameData.advertiseBar == 0 && gameData[employeeTypes[gameData.typeToHireToggle].priceType] >= employeeTypes[gameData.typeToHireToggle].price) {
			gameData[employeeTypes[gameData.typeToHireToggle].priceType] -= employeeTypes[gameData.typeToHireToggle].price
			gameData.typeToHire = gameData.typeToHireToggle
			runBar('advertise')
		}
	},
	end: function () {
		gameData.applicationReady = 1
		gameData.hasAdvertised = 1
		employeeTypes[gameData.typeToHire].applicationRandomisation()
		gameData.applicationType = gameData.typeToHire
	}
}