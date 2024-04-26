const synth = new Tone.Synth().toDestination()

const trackModeSelect = document.getElementById("track-mode-select")
const trackModeAdd = document.getElementById("track-mode-add")
const trackModeResize = document.getElementById("track-mode-resize")
const trackModeRemove = document.getElementById("track-mode-remove")

const timeLine = document.getElementById("timeline")

const trackEditorContainer = document.getElementById("track-editor-container")

synth.volume.value = -13

// Track variables
const MIN_TEMPO = 30
const MAX_TEMPO = 300
const NOTE_NAMES = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"]

let tempo = 60
let songDuration = 3000 // 1590
let noteNumber = 84
let noteHeight = 17
let noteWidth = 30
let trackMode = "track-mode-add"

let instruments = document.querySelectorAll('.instrument');
let tracks = document.querySelectorAll('.track');
let notes = document.querySelectorAll(".note")

// Note
let note
let noteBaseWidth = 2
let notePosX = 0, notePosY = 0
let resizePosX = 0

function clamp(value, min, max) {
	return Math.max(Math.min(value, max), min)
}

function mouseMovement(event) {
	let track = event.target

	// Check if track is is edit mode
	if (!track.parentElement.parentElement.classList.contains("edit")) {
		return
	}

	let trackWidth = track.clientWidth
	let trackHeight= track.clientHeight
	let divRect = track.getBoundingClientRect()

	// Calculate note position
	notePosX =  Math.floor(clamp((event.clientX - divRect.left) / noteWidth, 0, trackWidth))
	notePosY = Math.floor(clamp((event.clientY - divRect.top) / noteHeight, 0, trackHeight))

	// console.log(notePosX + " " + notePosY);

	// Apply note position
	if (note == null) {
		return
	}

	// TODO finish note resize
	if (trackMode == "track-mode-add") {
		note.style.left = (notePosX * noteWidth) + "px"
		note.style.top = (notePosY * noteHeight) + "px"
	} else if (trackMode == "track-mode-resize") {
		let newNoteWidth = Number.parseInt(note.getAttribute("noteWidth")) + (notePosX - resizePosX)

		console.log(newNoteWidth);

		note.style.width = (newNoteWidth * noteWidth) + "px"
	}
}

function removeNote(event) {
	if (!event.target.parentElement.parentElement.parentElement.classList.contains("edit")) {
		return
	}

	if (trackMode != "track-mode-remove") {
		return
	}

	let note = event.target
	let track = note.parentElement

	track.removeChild(note)
}

function resizeMouseDown(event) {
	if (trackMode != "track-mode-resize") {
		return
	}

	note = event.target.parentElement
	note.style.pointerEvents = "none"

	resizePosX = notePosX
	let noteSide = event.target

	// if (noteSide.classList.contains("note-right")) {
		
	// }
}

function mouseUp(event) {
	if (note == null) {
		return
	}

	let track = note.parentElement
	note.style.top = ((notePosY * noteHeight) / track.clientHeight) * 100 + "%"
	note.style.pointerEvents = "all"
	note = null;
}

function trackMouseDown(event) {
	let track = event.target

	// Check if track is is edit mode
	if (!track.parentElement.parentElement.classList.contains("edit")) {
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
	note.style.pointerEvents = "none"
	note.setAttribute("noteWidth", noteBaseWidth)
	note.addEventListener("click", removeNote)

	// Resize note
	let noteLeft = document.createElement("div")
	let noteRight = document.createElement("div")

	noteLeft.classList.add("note-left")
	noteRight.classList.add("note-right")

	noteLeft.addEventListener("mousedown", resizeMouseDown)
	noteRight.addEventListener("mousedown", resizeMouseDown)

	note.appendChild(noteLeft)
	note.appendChild(noteRight)

	// Insert note into track
	track.appendChild(note)
	notes = document.querySelectorAll(".note")
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
		trackEditor.querySelector(".track").style.height = ((noteNumber + 2) * noteHeight) + "px"
		trackEditor.querySelector(".line-container").style.height = ((noteNumber + 2) * noteHeight) + "px"
		trackEditor.querySelector(".keys-container").style.height = ((noteNumber + 2) * noteHeight) + "px"
	} else {
		trackEditor.classList.remove("edit")
		trackEditor.querySelector(".track").style.height = 100 + "%"
		trackEditor.querySelector(".line-container").style.height = 100 + "%"
		trackEditor.querySelector(".keys-container").style.height = 100 + "%"
	}

	trackEditor.querySelector(".track-editor-top").querySelector(".close-track").hidden = toEdit

	// Hide other tracks
	tracks.forEach(element => {
		if (trackEditor != element.parentElement.parentElement) {
			element.parentElement.parentElement.classList.remove("edit")

			if (toEdit) {
				element.parentElement.parentElement.hidden = true
			} else {
				element.parentElement.parentElement.hidden = false
			}
		}
	});

	timelineScroll()
}

function removeTrack(event) {
	let trackEditor = event.target.parentElement.parentElement
	trackEditorContainer.removeChild(trackEditor)
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
	let trackContainer = document.createElement("div")
	let h3 = document.createElement("h3")
	let editTrack = document.createElement("span")
	let closeTrack = document.createElement("span")
	let lineContainer = document.createElement("div")
	let hSeperator = document.createElement("div")
	let keysContainer = document.createElement("div")
	let track = document.createElement("div")

	trackEditor.classList.add("track-editor")
	trackEditorTop.classList.add("track-editor-top")
	trackContainer.classList.add("track-container")
	h3.classList.add("interactable")
	h3.innerText = instrumentName
	editTrack.classList.add("material-symbols-rounded", "interactable", "edit-track")
	editTrack.innerText = "edit"
	closeTrack.classList.add("material-symbols-rounded", "interactable", "close-track")
	closeTrack.innerText = "close"
	lineContainer.classList.add("line-container")
	hSeperator.classList.add("hseparator")
	keysContainer.classList.add("keys-container")
	track.classList.add("track")

	let r = Math.round((Math.random() * (255 - 150)) + 150)
	let g = Math.round((Math.random() * (255 - 150)) + 150)
	let b = Math.round((Math.random() * (255 - 150)) + 150)
	track.setAttribute("note-color", r + "," + g + "," + b)
	track.style.width = songDuration + "px"
	lineContainer.style.width = songDuration + "px"

	editTrack.addEventListener("click", toggleEditMode)
	closeTrack.addEventListener("click", removeTrack)
	track.addEventListener("mousemove", mouseMovement)
	track.addEventListener("mousedown", trackMouseDown)
	track.addEventListener("mouseup", mouseUp)

	trackEditorTop.appendChild(h3)
	trackEditorTop.appendChild(editTrack)
	trackEditorTop.appendChild(closeTrack)

	trackContainer.appendChild(lineContainer)
	trackContainer.appendChild(keysContainer)
	trackContainer.appendChild(track)

	trackEditor.appendChild(trackEditorTop)
	trackEditor.appendChild(trackContainer)

	// Vertical lines
	for (let i = 0; i < songDuration / noteWidth; i++) {
		let vSeparator = document.createElement("div")
		vSeparator.classList.add("vseparator")
		vSeparator.style.left = ((i + 1) * noteWidth) + "px"
		
		lineContainer.appendChild(vSeparator)
	}

	// Keys
	let notePitch = noteNumber / 12
	for (let index = 1; index <= noteNumber; index++) {
		let keyDiv = document.createElement("div")
		keyDiv.classList.add("key")

		let noteIndex = index % 12
		if (noteIndex == 0) {
			noteIndex = 12
		}
		let noteName = NOTE_NAMES[noteIndex - 1]

		if (noteName == "C") {
			notePitch--
			keyDiv.innerHTML = noteName + notePitch
		} else {
			keyDiv.innerHTML = noteName
		}

		if (noteName.includes("#")) {
			keyDiv.classList.add("black-key")
		}

		keysContainer.appendChild(keyDiv)
	}

	lineContainer.appendChild(hSeperator)

	// Add track to track-editor-container
	trackEditorContainer.appendChild(trackEditor)
	tracks = document.querySelectorAll('.track');
}

function timelineScroll() {
	tracks.forEach(element => {
		element.parentElement.scrollLeft = timeLine.scrollLeft
	});
}

instruments.forEach(instrument => {
	instrument.addEventListener("click", createTrack)
});

// Timeline vertical lines
for (let i = 0; i < songDuration / noteWidth; i++) {
	let vSeparator = document.createElement("div")
	vSeparator.classList.add("timeline-separator")
	vSeparator.style.left = (i * noteWidth) + "px"
	
	timeLine.appendChild(vSeparator)
}

timeLine.addEventListener("scroll", timelineScroll)

trackModeSelect.addEventListener("click", changeTrackMode)
trackModeAdd.addEventListener("click", changeTrackMode)
trackModeResize.addEventListener("click", changeTrackMode)
trackModeRemove.addEventListener("click", changeTrackMode)