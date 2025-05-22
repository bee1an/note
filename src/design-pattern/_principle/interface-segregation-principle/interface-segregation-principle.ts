export {}

interface AntitheftDoor {
	antitheft(): void
}

interface FireproofDoor {
	fireproof(): void
}

interface WaterproofDoor {
	waterproof(): void
}

/**
 * 功能齐全的防盗门
 */
class SecurityDoorImpl implements AntitheftDoor, FireproofDoor, WaterproofDoor {
	antitheft() {
		console.log('防盗')
	}

	fireproof() {
		console.log('防火')
	}

	waterproof() {
		console.log('防水')
	}
}

/**
 * 只有防盗功能的防盗门
 */
class OnlyAntitheftDoorImpl implements AntitheftDoor {
	antitheft() {
		console.log('防盗')
	}
}
