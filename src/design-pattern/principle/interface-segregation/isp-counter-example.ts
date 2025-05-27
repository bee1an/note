interface SecurityDoor {
	antitheft(): void
	fireproof(): void
	waterproof(): void
}

class SecurityDoorImpl implements SecurityDoor {
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
