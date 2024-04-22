const synth = new Tone.Synth().toDestination()
const instument1 = document.getElementById("instument1")
const instument2 = document.getElementById("instument2")

const trackModeSelect = document.getElementById("track-mode-select")
const trackModeAdd = document.getElementById("track-mode-add")
const trackModeResize = document.getElementById("track-mode-resize")
const trackModeRemove = document.getElementById("track-mode-remove")

const trackContainer = document.getElementById("track-container")

synth.volume.value = -13
trackContainer.innerText = ""

// Track variables
let tempo = 60
let noteHeight = 12
let noteWidth = 30
let trackMode = "track-mode-add"

let instruments = document.querySelectorAll('.instrument');
let tracks = document.querySelectorAll('.track');

// Note
let note
let notePosX = 0, notePosY = 0

function clamp(value, min, max) {
	return Math.max(Math.min(value, max), min)
}

function mouseMovement(event) {
	let track = event.target

	// Check if track is is edit mode
	if (!track.parentElement.classList.contains("edit")) {
		return
	}

	let trackWidth = track.clientWidth
	let trackHeight= track.clientHeight
	let divRect = track.getBoundingClientRect()

	// Calculate note position
	notePosX =  Math.floor(clamp((event.clientX - divRect.left) / noteWidth, 0, trackWidth))
	notePosY = Math.floor(clamp((event.clientY - divRect.top) / noteHeight, 0, trackHeight))

	// Apply note position
	if (note != null) {
		note.style.left = (notePosX * noteWidth) + "px"
		note.style.top = (notePosY * noteHeight) + "px"
	}
}

function removeNote(event) {
	if (trackMode != "track-mode-remove") {
		return
	}

	let note = event.target
	let track = note.parentElement

	track.removeChild(note)
}

function mouseDown(event) {
	let track = event.target

	// Check if track is is edit mode
	if (!track.parentElement.classList.contains("edit")) {
		return
	}
	if (trackMode != "track-mode-add") {
		return
	}

	// Create note
	note = document.createElement("div")
	note.classList.add("note")
	note.style.left = (notePosX * noteWidth) + "px"
	note.style.top = (notePosY * noteHeight) + "px"
	note.style.backgroundColor = "rgb(" + track.getAttribute("note-color") + ")"
	note.addEventListener("click", removeNote)

	// Insert note into track
	track.appendChild(note)
}

function mouseUp(event) {
	if (note == null) {
		return
	}

	note = null;
}

function changeTrackMode(event) {
	let button = event.target

	trackModeSelect.classList.remove("selected")
	trackModeAdd.classList.remove("selected")
	trackModeResize.classList.remove("selected")
	trackModeRemove.classList.remove("selected")

	button.classList.add("selected")
	trackMode = button.id
}

function toggleEditMode(event) {
	let trackEditor = event.target.parentElement.parentElement
	let toEdit = !trackEditor.classList.contains("edit")

	// Set track to edit mode
	if (toEdit) {
		trackEditor.classList.add("edit")
	} else {
		trackEditor.classList.remove("edit")
	}

	trackEditor.querySelector(".track-editor-top").querySelector(".close-track").hidden = toEdit

	// Hide other tracks
	tracks.forEach(element => {
		if (trackEditor != element.parentElement) {
			element.parentElement.classList.remove("edit")

			if (toEdit) {
				element.parentElement.hidden = true
			} else {
				element.parentElement.hidden = false
			}
		}
	});
}

function removeTrack(event) {
	let trackEditor = event.target.parentElement.parentElement
	trackContainer.removeChild(trackEditor)
}

function createTrack(event) {
	let instrumentName
	if (event.target.tagName != "DIV") {
		instrumentName = event.target.parentElement.id
	} else {
		instrumentName = event.target.id
	}

	// Create track
	let trackEditor = document.createElement("div")
	let trackEditorTop = document.createElement("div")
	let h3 = document.createElement("h3")
	let editTrack = document.createElement("span")
	let closeTrack = document.createElement("span")
	let track = document.createElement("div")

	trackEditor.classList.add("track-editor")
	trackEditorTop.classList.add("track-editor-top")
	h3.classList.add("interactable")
	h3.innerText = instrumentName
	editTrack.classList.add("material-symbols-rounded", "interactable", "edit-track")
	editTrack.innerText = "edit"
	closeTrack.classList.add("material-symbols-rounded", "interactable", "close-track")
	closeTrack.innerText = "close"
	track.classList.add("track")

	let r = Math.round((Math.random() * (255 - 150)) + 150)
	let g = Math.round((Math.random() * (255 - 150)) + 150)
	let b = Math.round((Math.random() * (255 - 150)) + 150)
	track.setAttribute("note-color", r + "," + g + "," + b)

	editTrack.addEventListener("click", toggleEditMode)
	closeTrack.addEventListener("click", removeTrack)
	track.addEventListener("mousemove", mouseMovement)
	track.addEventListener("mousedown", mouseDown)
	track.addEventListener("mouseup", mouseUp)

	trackEditorTop.appendChild(h3)
	trackEditorTop.appendChild(editTrack)
	trackEditorTop.appendChild(closeTrack)

	trackEditor.appendChild(trackEditorTop)
	trackEditor.appendChild(track)

	// Add track to track-container
	trackContainer.appendChild(trackEditor)
	tracks = document.querySelectorAll('.track');
}

instruments.forEach(instrument => {
	instrument.addEventListener("click", createTrack)
});

trackModeSelect.addEventListener("click", changeTrackMode)
trackModeAdd.addEventListener("click", changeTrackMode)
trackModeResize.addEventListener("click", changeTrackMode)
trackModeRemove.addEventListener("click", changeTrackMode)

// console.log("Track dimensions: " + trackWidth + " | " + trackHeight);