import { SampleLibrary } from "../prova_tone_js/tonejs-instruments-master/tonejs-instruments-master/Tonejs-Instruments.js";
import { SongLoader } from "./songLoader.js"

const synth = new Tone.Synth().toDestination()

const trackModeSelect = document.getElementById("track-mode-select")
const trackModeAdd = document.getElementById("track-mode-add")
const trackModeResize = document.getElementById("track-mode-resize")
const trackModeRemove = document.getElementById("track-mode-remove")

const timeLine = document.getElementById("timeline")
const tempoBox = document.getElementById("tempo")

const trackEditorContainer = document.getElementById("track-editor-container")

// Track variables
const MIN_TEMPO = 30
const MAX_TEMPO = 300
const NOTE_NAMES = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"]

let volume = -19
let tempo = 120
let songDuration = 3000 // 1590
let noteNumber = 84
let noteHeightPx = 17
let noteWidthPx = 20
let trackMode = "track-mode-add"
let timelineM1Down = false
let tempoBoxSelected = false
let timelineX = 0

let instruments = document.querySelectorAll('.instrument');
let tracks = document.querySelectorAll('.track');
let playheads = document.querySelectorAll(".playhead")
let notes = document.querySelectorAll(".note")

// Note
let note
let noteWidth = 1
let notePosX = 0, notePosY = 0
let resizePosX = 0

// Instruments
let selectedInstrument
let samplers = {"a":"b"}	// key-value array of all instruments and their name
let trackIdCounter = 0		// Incremental value for track IDs
let song = {"tracks": {}, "tempo": tempo, "duration": songDuration}

function clamp(value, min, max) {
	return Math.max(Math.min(value, max), min)
}

function getNoteSound(yPos) {
	let currentNote

	if(yPos <= 11){
		currentNote = NOTE_NAMES[yPos] + "7"
	}else if(yPos > 11 && yPos <= 23){
		currentNote = NOTE_NAMES[yPos - 12] + "6"
	}else if(yPos > 23 && yPos <= 35){
		currentNote = NOTE_NAMES[yPos - 24] + "5"
	}else if(yPos > 35 && yPos <= 47){
		currentNote = NOTE_NAMES[yPos - 36] + "4"
	}else if(yPos > 47 && yPos <= 59){
		currentNote = NOTE_NAMES[yPos - 48] + "3"
	}else if(yPos > 59 && yPos <= 71){
		currentNote = NOTE_NAMES[yPos - 60] + "2"
	}else{
		currentNote = NOTE_NAMES[yPos - 72] + "1"
	}

	return currentNote
}

function mouseMovement(event) {
	let track = event.target
	if (track.classList.contains("note")) {
		track = track.parentElement
	}

	// Check if track is is edit mode
	if (!track.parentElement.parentElement.classList.contains("edit")) {
		return
	}

	let trackWidth = track.clientWidth
	let trackHeight= track.clientHeight
	let divRect = track.getBoundingClientRect()

	// let oldNotePosX = notePosX
	let oldNotePosY = notePosY

	// Calculate note position
	notePosX =  Math.floor(clamp((event.clientX - divRect.left) / noteWidthPx, 0, trackWidth))
	notePosY = Math.floor(clamp((event.clientY - divRect.top) / noteHeightPx, 0, trackHeight))

	// console.log(event.clientX - divRect.left);
	// console.log(notePosX + " " + notePosY);

	// Apply note position
	if (note == null) {
		return
	}

	if (trackMode == "track-mode-add" || trackMode == "track-mode-select") {
		note.style.left = (notePosX * noteWidthPx) + "px"
		note.style.top = (notePosY * noteHeightPx) + "px"

		// Return if note has not changed key
		if (oldNotePosY == notePosY) {
			return
		}

		let noteSound = getNoteSound(notePosY)

		// Play the notes
		samplers[selectedInstrument].triggerAttackRelease(noteSound, noteWidth + "n")

	} else if (trackMode == "track-mode-resize") {
		let newNoteWidth = Math.max(Number.parseInt(note.getAttribute("noteWidth")) + (notePosX - resizePosX), 1)

		note.style.width = (newNoteWidth * noteWidthPx) + "px"
		noteWidth = newNoteWidth
	}
}

function noteClick(event) {
	if (!event.target.parentElement.parentElement.parentElement.classList.contains("edit")) {
		return
	}

	if (trackMode == "track-mode-select") {
		let noteSound = getNoteSound(notePosY)
		samplers[selectedInstrument].triggerAttackRelease(noteSound, noteWidth + "n")
	} else if (trackMode == "track-mode-remove") {
		let note = event.target
		let track = note.parentElement
		let trackEditor = track.parentElement.parentElement

		// Remove note from song data
		delete song.tracks[trackEditor.getAttribute("track-id")].notes[notePosX + ";" + notePosY]

		track.removeChild(note)
	}
}

function noteMouseDown(event) {
	if (!event.target.parentElement.parentElement.parentElement.classList.contains("edit")) {
		return
	}

	if (trackMode == "track-mode-select") {
		note = event.target
	} else if (trackMode == "track-mode-resize") {
		note = event.target
		noteWidth = note.getAttribute("notewidth")
		resizePosX = notePosX
		note.style.pointerEvents = "none"
	}
}

function mouseUp() {
	if (note == null) {
		return
	}

	let track = note.parentElement
	let trackEditor = track.parentElement.parentElement
	if (trackMode != "track-mode-resize") {
		note.style.top = ((notePosY * noteHeightPx) / track.clientHeight) * 100 + "%"
	}

	note.style.pointerEvents = "all"
	note.setAttribute("notePos", notePosX + ";" + notePosY)
	note.setAttribute("noteWidth", noteWidth)

	// Add note to song data
	// TODO: when note is moved, remove old note data from song
	song.tracks[trackEditor.getAttribute("track-id")].notes[notePosX + ";" + notePosY] = getNoteSound(notePosY) + "," + noteWidth + "n," + notePosX * (1 / (tempo / 60))

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
	note.style.left = (notePosX * noteWidthPx) + "px"
	note.style.top = (notePosY * noteHeightPx) + "px"
	note.style.backgroundColor = "rgb(" + track.getAttribute("note-color") + ")"
	note.style.pointerEvents = "none"
	note.style.width = (noteWidth * noteWidthPx) + "px"
	note.setAttribute("noteWidth", noteWidth)
	note.addEventListener("click", noteClick)
	note.addEventListener("mousedown", noteMouseDown)

	let noteSound = getNoteSound(notePosY)

	// Play the notes
	samplers[selectedInstrument].triggerAttackRelease(noteSound, noteWidth + "n")

	// Insert note into track
	track.appendChild(note)
	notes = document.querySelectorAll(".note")
}

function toggleEditMode(event) {
	let trackEditor = event.target.parentElement.parentElement
	let toEdit = !trackEditor.classList.contains("edit")

	// Set track to edit mode
	if (toEdit) {
		trackEditor.classList.add("edit")
		trackEditor.querySelector(".track").style.height = ((noteNumber + 2) * noteHeightPx) + "px"
		trackEditor.querySelector(".line-container").style.height = ((noteNumber + 2) * noteHeightPx) + "px"
		trackEditor.querySelector(".keys-container").style.height = ((noteNumber + 2) * noteHeightPx) + "px"

		selectedInstrument = trackEditor.querySelector("h3").innerText
	} else {
		trackEditor.classList.remove("edit")
		trackEditor.querySelector(".track-container").scrollTop = 0
		trackEditor.querySelector(".track").style.height = 170 + "px"
		trackEditor.querySelector(".line-container").style.height = 170 + "px"
		trackEditor.querySelector(".keys-container").style.height = 170 + "px"

		selectedInstrument = null
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

	// Remove track from song data
	delete song.tracks[trackEditor.getAttribute("track-id")]
}

function createTrack(event) {
	let instrumentName
	if (event.target.tagName != "DIV") {
		instrumentName = event.target.parentElement.id
	} else {
		instrumentName = event.target.id
	}

	// Add the sampler for the instrument of the track
	samplers[instrumentName] = loadSampler(instrumentName)
	samplers[instrumentName].toDestination()
	samplers[instrumentName].volume.value = volume

	// Add track object to song data
	trackIdCounter++;
	song.tracks[trackIdCounter] = {"instrument": instrumentName, "notes": {}}

	// Create track
	let trackEditor = document.createElement("div")
	let trackEditorTop = document.createElement("div")
	let trackContainer = document.createElement("div")
	let h3 = document.createElement("h3")
	let editTrack = document.createElement("button")
	let editTrackSpan = document.createElement("span")
	let closeTrack = document.createElement("button")
	let closeTrackSpan = document.createElement("span")
	let lineContainer = document.createElement("div")
	let hSeperator = document.createElement("div")
	let playHead = document.createElement("div")
	let line = document.createElement("div")
	let keysContainer = document.createElement("div")
	let track = document.createElement("div")

	trackEditor.classList.add("track-editor")
	trackEditorTop.classList.add("track-editor-top")
	trackContainer.classList.add("track-container")
	h3.innerText = instrumentName
	editTrack.classList.add("edit-track", "interactable")
	editTrackSpan.classList.add("material-symbols-rounded")
	editTrackSpan.innerText = "edit"
	closeTrack.classList.add("close-track", "interactable")
	closeTrackSpan.classList.add("material-symbols-rounded")
	closeTrackSpan.innerText = "close"
	lineContainer.classList.add("line-container")
	hSeperator.classList.add("hseparator")
	playHead.classList.add("playhead")
	line.classList.add("line")
	keysContainer.classList.add("keys-container")
	track.classList.add("track")

	trackEditor.setAttribute("track-id", trackIdCounter)
	let r = Math.round((Math.random() * (255 - 150)) + 150)
	let g = Math.round((Math.random() * (255 - 150)) + 150)
	let b = Math.round((Math.random() * (255 - 150)) + 150)
	track.setAttribute("note-color", r + "," + g + "," + b)
	track.style.width = songDuration + "px"
	lineContainer.style.width = songDuration + "px"
	playHead.style.transform = "translateX(" + timelineX + "px"

	editTrack.addEventListener("click", toggleEditMode)
	closeTrack.addEventListener("click", removeTrack)
	track.addEventListener("mousemove", mouseMovement)
	track.addEventListener("mousedown", trackMouseDown)
	track.addEventListener("mouseup", mouseUp)

	editTrack.appendChild(editTrackSpan)
	closeTrack.appendChild(closeTrackSpan)

	trackEditorTop.appendChild(h3)
	trackEditorTop.appendChild(editTrack)
	trackEditorTop.appendChild(closeTrack)

	playHead.appendChild(line)
	lineContainer.appendChild(playHead)

	trackContainer.appendChild(lineContainer)
	trackContainer.appendChild(keysContainer)
	trackContainer.appendChild(track)

	trackEditor.appendChild(trackEditorTop)
	trackEditor.appendChild(trackContainer)

	// Vertical lines
	for (let i = 0; i < songDuration / noteWidthPx; i++) {
		let vSeparator = document.createElement("div")
		vSeparator.classList.add("vseparator")
		vSeparator.style.left = ((i + 1) * noteWidthPx) + "px"
		
		lineContainer.appendChild(vSeparator)
	}

	// Keys
	let notePitch = noteNumber / 12
	for (let index = 1; index <= noteNumber; index++) {
		let keyDiv = document.createElement("div")
		keyDiv.classList.add("key")
		keyDiv.setAttribute("pitch", notePitch)

		let noteIndex = index % 12
		if (noteIndex == 0) {
			noteIndex = 12
		}
		let noteName = NOTE_NAMES[noteIndex - 1]

		keyDiv.addEventListener("click", (event) => {
			samplers[instrumentName].triggerAttackRelease(noteName + event.target.getAttribute("pitch"), "4n")
		})

		if (noteName == "C") {
			keyDiv.innerHTML = noteName + (notePitch - 1)
			notePitch--
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
	playheads = document.querySelectorAll(".playhead")

	// console.log(song);
}

function timelineScroll() {
	tracks.forEach(element => {
		element.parentElement.scrollLeft = timeLine.scrollLeft
	});
}

function timeLineMouseMove(event) {
	if (!timelineM1Down) {
		return
	}

	let divRect = timeLine.getBoundingClientRect()

	// Calculate mouse position
	timelineX = Math.max(0, event.clientX - divRect.left + timeLine.scrollLeft)

	playheads.forEach(playhead => {
		playhead.style.transition = null
		playhead.style.transform = "translateX(" + timelineX + "px"
	});
}

function tempoChanged() {
	let value = clamp(tempoBox.value, MIN_TEMPO, MAX_TEMPO)
	tempo = value
	tempoBox.value = tempo
	Tone.Transport.bpm.value = tempo
}

function timelineToStart() {
	timelineX = 0
	playheads.forEach(playhead => {
		playhead.style.transform = "translateX(" + timelineX + "px"
	});
}

function timelineToEnd() {
	timelineX = timeLine.scrollWidth
	playheads.forEach(playhead => {
		playhead.style.transform = "translateX(" + timelineX + "px"
	});
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

// Track mode keybinds
function onKeyPress(event) {
	if (tempoBoxSelected) {
		return
	}

	switch (event.key) {
		case "1":
			changeTrackMode({target: trackModeSelect})
			break;
		case "2":
			changeTrackMode({target: trackModeAdd})
			break;
		case "3":
			changeTrackMode({target: trackModeResize})
			break;
		case "4":
			changeTrackMode({target: trackModeRemove})
			break;
	}
}

function playSong() {
	SongLoader.loadInstruments(song)
	SongLoader.loadNotes(song)

	setTimeout(() => {
		SongLoader.playSong(song)

		let seconds = ((1 / (tempo / 60)) * 4)
		playheads.forEach(playhead => {
			playhead.style.transform = "translateX(" + (noteWidthPx * 4) + "px"
			playhead.style.transition = "transform " + seconds + "s linear 0s"
		});
	}, 1000);
}

// Load instrument's sampler
function loadSampler(instrumentName) {
	return SampleLibrary.load({instruments:instrumentName})
}

Tone.Transport.bpm.value = tempo

instruments.forEach(instrument => {
	instrument.addEventListener("click", createTrack)
});

// Timeline vertical lines
let noteCounter = 1
for (let i = 0; i < songDuration / noteWidthPx; i++) {
	let vSeparator = document.createElement("div")
	vSeparator.classList.add("timeline-separator")

	if ((i + 1) % 4 == 1) {
		vSeparator.classList.add("timeline-separator-note")

		let numberDiv = document.createElement("div")
		numberDiv.innerText = noteCounter
		noteCounter++

		vSeparator.appendChild(numberDiv)
	}

	vSeparator.style.left = (i * noteWidthPx) + "px"

	timeLine.appendChild(vSeparator)
}

tempoBox.addEventListener("change", tempoChanged)
tempoBox.addEventListener("focusin", () => {tempoBoxSelected = true})
tempoBox.addEventListener("focusout", () => {tempoBoxSelected = false})

timeLine.addEventListener("scroll", timelineScroll)
timeLine.addEventListener("mousedown", () => {timelineM1Down = true})
timeLine.addEventListener("mouseup", (event) => {timeLineMouseMove(event); timelineM1Down = false})
timeLine.addEventListener("mousemove", timeLineMouseMove)

trackModeSelect.addEventListener("click", changeTrackMode)
trackModeAdd.addEventListener("click", changeTrackMode)
trackModeResize.addEventListener("click", changeTrackMode)
trackModeRemove.addEventListener("click", changeTrackMode)

document.getElementById("toStart").addEventListener("click", timelineToStart)
document.getElementById("play").addEventListener("click", playSong)
document.getElementById("toEnd").addEventListener("click", timelineToEnd)

document.addEventListener("keypress", onKeyPress)