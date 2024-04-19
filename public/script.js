const synth = new Tone.Synth().toDestination()
const instument1 = document.getElementById("instument1")
const instument2 = document.getElementById("instument2")

synth.volume.value = -13

// Track variables
let tempo = 60
let noteHeigth = 12

// Track test
let track = document.getElementById("track")
let trackHeight = track.clientHeight
let trackWidth = track.clientWidth

// Note test
let note = document.getElementById("note")

function clamp(value, min, max) {
	return Math.max(Math.min(value, max), min)
}

function handleMouseMovement(event) {
	let divRect = track.getBoundingClientRect()

	let gridX =  Math.floor(clamp((event.clientX - divRect.left) / tempo, 0, trackWidth))
	let gridY = Math.floor(clamp((event.clientY - divRect.top) / noteHeigth, 0, trackHeight))

	console.log(gridX + " | " + gridY);
	note.style.left = (gridX * tempo) + "px"
	note.style.top = (gridY * noteHeigth) + "px"
}

track.addEventListener("mousemove", handleMouseMovement)
console.log("Track dimensions: " + trackWidth + " | " + trackHeight);