var accel = 0;
var prevaccel = 0;
var time = 0;

state = 0;
// Not moving, up, down
var audio = [null, new Audio(), new Audio()];

function getMotion(event) {
	// We only care about Z here, that's the screen
	var z = event.acceleration.z;

	// Ignore random gaussian noise
	if (Math.abs(z) < 0.5) return;

	accel += z;

	if (Math.abs(accel) > 10) {
		var docstate = document.getElementById("state");
		if (prevaccel == 0) {
			// Up is negative, down is positive?
			if (accel < 0) {
				docstate.innerHTML = "Going Up!";
				state = 1;
			}
			else if (accel > 0) {
				docstate.innerHTML = "Going Down!";
				state = 2;
			}
			audio[state].play();
			prevaccel = accel;
			accel = 0;
		} else if ((prevaccel < 0 && accel > 0) || (prevaccel > 0 && accel < 0)) {
			docstate.innerHTML = "";
			audio[state].pause();
			state = 0;
			prevaccel = 0;
			accel = 0;
		}
	}
	time += event.interval;
	if (time > 500) accel = 0;
}

// Device Motion request must come from a user-generated event
function requestMotion() {
	resetMotion();
	try {
		DeviceMotionEvent.requestPermission().then(response => {
		  if (response == 'granted') {
			  window.addEventListener("devicemotion", getMotion);
		  } else {
			  document.getElementById("state").innerHTML = "Need Device Motion!";
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
				document.getElementById("state").innerHTML = "No Access to device motion!";
				return;
			}
		}
	}
	let req = document.getElementById("request");
	req.innerHTML = "End";
	req.onclick = endMotion;
}

function endMotion() {
	try {
		window.removeEventListener("devicemotion", getMotion);
	} catch(e) {
		window.ondevicemotion = null;
	}
	let req = document.getElementById("request");
	req.onclick = requestMotion;
	req.innerHTML = "Begin";
}

window.onload = function () {
	document.getElementById("request").onclick = requestMotion;
}
