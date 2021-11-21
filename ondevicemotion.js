var accel = 0;
var prevaccel = 0;
var time = 0;

function getMotion(event) {
	// We only care about Z here, that's the screen
	var z = event.acceleration.y;

	// Ignore random gaussian noise
	if (Math.abs(z) < 0.5) return;

	accel += z;

	if (Math.abs(accel) > 10) {
		if (prevaccel == 0) {
			// Up is negative, down is positive?
			if (accel < 0) {
				elevatorApp.setState('up');
			}
			else if (accel > 0) {
				elevatorApp.setState('down');
			}
			prevaccel = accel;
			accel = 0;
		} else if ((prevaccel < 0 && accel > 0) || (prevaccel > 0 && accel < 0)) {
			elevatorApp.setState('still');
			prevaccel = 0;
			accel = 0;
		}
	}
	time += event.interval;
	if (time > 500) {
		accel = 0;
		time = 0;
	}
}

// Device Motion request must come from a user-generated event
function requestMotion() {
	try {
		DeviceMotionEvent.requestPermission().then(response => {
		  if (response == 'granted') {
			  window.addEventListener("devicemotion", getMotion);
		  } else {
			  elevatorApp.$data.hasAccelerometer = false;
		  }
		});
	}
	// Fallback to just trying to get device motion events without permission
	catch(error) {
		try {
			window.addEventListener("devicemotion", getMotion);
		}
		// Fallback to old API
		catch (err) {
			try {
				window.ondevicemotion = getMotion;
			}
			// Give up
			catch (e) {
				elevatorApp.$data.hasAccelerometer = false;
			}
		}
	}
}
