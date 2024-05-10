import { SamplerController } from "./samplerController.js"

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

// Note
let note
let currentNoteWidth = 1
let notePosX = 0, notePosY = 0
let resizePosX = 0
let noteMoved = false

// Instruments
let samplers = {"a":"b"}	// key-value array of all instruments and their name
let trackIdCounter = 0		// Incremental value for track IDs
let song = {"tracks": {}, "tempo": tempo, "duration": songDuration}

let playheadsId

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
	let trackEditor = track.parentElement.parentElement
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

	// Disable mouse movement and keep note at it's position when in remove mode
	if (trackMode == "track-mode-remove") {
		let notePos = note.getAttribute("notepos").split(";")
		notePosX = notePos[0]
		notePosY = notePos[1]
		return
	}

	note.style.pointerEvents = "none"

	if (trackMode == "track-mode-add" || trackMode == "track-mode-select") {
		note.style.left = (notePosX * noteWidthPx) + "px"
		note.style.top = (notePosY * noteHeightPx) + "px"

		if (note.getAttribute("notepos").split(";")[0] == notePosX) {
			noteMoved = false
		} else {
			noteMoved = true
		}

		// Return if note has not changed key
		if (oldNotePosY == notePosY) {
			return
		}

		// Play the notes
		samplers[trackEditor.getAttribute("track-id")].triggerAttackRelease(getNoteSound(notePosY), currentNoteWidth + "n")

	} else if (trackMode == "track-mode-resize") {
		let newNoteWidth = Math.max(Number.parseInt(note.getAttribute("noteWidth")) + (notePosX - resizePosX), 1)

		note.style.width = (newNoteWidth * noteWidthPx) + "px"
		currentNoteWidth = newNoteWidth
	}
}

function noteClick(event) {
	let trackContainer = event.target.parentElement.parentElement.parentElement
	if (!trackContainer.classList.contains("edit")) {
		return
	}

	if (trackMode == "track-mode-select") {
		samplers[trackContainer.getAttribute("track-id")].triggerAttackRelease(getNoteSound(notePosY), currentNoteWidth + "n")
	} else if (trackMode == "track-mode-remove") {
		let note = event.target
		let track = note.parentElement
		let trackEditor = track.parentElement.parentElement

		// Remove note from song data
		delete song.tracks[trackEditor.getAttribute("track-id")].notes[note.getAttribute("notepos")]

		track.removeChild(note)
	}
}

function noteMouseDown(event) {
	let trackEditor = event.target.parentElement.parentElement.parentElement
	if (!trackEditor.classList.contains("edit")) {
		return
	}

	if (trackMode == "track-mode-select") {
		note = event.target
		delete song.tracks[trackEditor.getAttribute("track-id")].notes[note.getAttribute("notepos")]
	} else if (trackMode == "track-mode-resize") {
		note = event.target
		currentNoteWidth = note.getAttribute("notewidth")
		resizePosX = notePosX
		delete song.tracks[trackEditor.getAttribute("track-id")].notes[note.getAttribute("notepos")]
	}
}

function mouseUp(event) {
	let target = event.target
	if (note == null) {
		return
	}

	note.style.pointerEvents = "all"
	if (target == note) {
		note = null;
		return
	}

	// Get current notePos
	let noteX = notePosX, noteY = notePosY

	let track = note.parentElement
	let trackEditor = track.parentElement.parentElement
	if (trackMode != "track-mode-resize") {
		note.style.top = ((notePosY * noteHeightPx) / track.clientHeight) * 100 + "%"
		note.setAttribute("notePos", notePosX + ";" + notePosY)
	} else {
		// Use previous notePosition if is resizing note
		let notePos = note.getAttribute("notePos").split(";")
		noteX = notePos[0]
		noteY = notePos[1]
	}

	note.setAttribute("noteWidth", currentNoteWidth)

	// Add note to song data

	// TODO (((tempo / 60) / 4) * currentNoteWidth) ?
	song.tracks[trackEditor.getAttribute("track-id")].notes[noteX + ";" + noteY] = getNoteSound(noteY) + "," + (((tempo / 60) / 4) * currentNoteWidth) + "," + noteX * (60 / tempo)
	note = null;
}

function trackMouseDown(event) {
	let track = event.target
	let trackEditor = track.parentElement.parentElement

	// Check if track is is edit mode
	if (!trackEditor.classList.contains("edit")) {
		return
	}
	if (trackMode != "track-mode-add") {
		return
	}

	// Create note
	note = newNote(notePosX, notePosY, currentNoteWidth, track.getAttribute("note-color"))

	// Play the notes
	samplers[trackEditor.getAttribute("track-id")].triggerAttackRelease(getNoteSound(notePosY), currentNoteWidth + "n")

	// Insert note into track
	track.appendChild(note)
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
	} else {
		trackEditor.classList.remove("edit")
		trackEditor.querySelector(".track-container").scrollTop = 0
		trackEditor.querySelector(".track").style.height = 170 + "px"
		trackEditor.querySelector(".line-container").style.height = 170 + "px"
		trackEditor.querySelector(".keys-container").style.height = 170 + "px"
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

function newNote(noteX, noteY, noteWidth, noteColor) {
	let createdNote = document.createElement("div")
	createdNote.classList.add("note")
	createdNote.style.left = (noteX * noteWidthPx) + "px"
	createdNote.style.top = (noteY * noteHeightPx) + "px"
	createdNote.style.backgroundColor = "rgb(" + noteColor + ")"
	createdNote.style.pointerEvents = "none"
	createdNote.style.width = (noteWidth * noteWidthPx) + "px"
	createdNote.setAttribute("noteWidth", noteWidth)
	createdNote.setAttribute("notepos", noteX + ";" + noteY)
	createdNote.addEventListener("click", noteClick)
	createdNote.addEventListener("mousedown", noteMouseDown)

	return createdNote
}

function removeTrack(event) {
	let trackEditor = event.target.parentElement.parentElement
	let trackId = trackEditor.getAttribute("track-id")
	trackEditorContainer.removeChild(trackEditor)

	// Remove track from song data
	delete song.tracks[trackId]
	delete samplers[trackId]
}

function newTrackDiv(instrumentName) {
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
			samplers[trackIdCounter].triggerAttackRelease(noteName + event.target.getAttribute("pitch"), "4n")
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
	return trackEditor
}

function createTrack(event) {
	let instrumentDiv = event.target
	let instrumentName = instrumentDiv.id
	let folderUrl = instrumentDiv.getAttribute("folder_url")
	let notes = instrumentDiv.getAttribute("notes")

	trackIdCounter++;

	// Add the sampler for the instrument of the track
	samplers[trackIdCounter] = SamplerController.loadSampler(folderUrl, notes)
	samplers[trackIdCounter].volume.value = volume

	// Add track object to song data
	song.tracks[trackIdCounter] = {"instrument": instrumentName, "notes": {}}

	// Create track
	let trackEditor = newTrackDiv(instrumentName)

	// Add trackEditor to trackEditorContainer
	trackEditorContainer.appendChild(trackEditor)
	tracks = document.querySelectorAll('.track');
	playheads = document.querySelectorAll(".playhead")
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

	if (playheadsId) {
		clearInterval(playheadsId)
		playheadsId = null
		SamplerController.stop(samplers)
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
	song.tempo = tempo
	Tone.start()
	Tone.getTransport().bpm.value = tempo
	// TODO: fix bpm not changing after sampler are created
}

function timelineToStart() {
	pauseSong()

	timelineX = 0
	playheads.forEach(playhead => {
		playhead.style.transform = "translateX(" + timelineX + "px"
	});
}

function timelineToEnd() {
	pauseSong()

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

function animatePlayheads() {
	let seconds = ((60 / tempo) * 4)
	let pos = new WebKitCSSMatrix(window.getComputedStyle(playheads[0]).transform).m41
	let gridPos = Math.round(clamp(pos / noteWidthPx, 0, (songDuration / currentNoteWidth)))

	timelineX = pos
	playheads.forEach(playhead => {
		let newPos = gridPos * noteWidthPx
		playhead.style.transition = "transform " + seconds + "s linear 0s"
		playhead.style.transform = "translateX(" + (newPos + (noteWidthPx * 4)) + "px"
	});
}

function playSong() {
	if (playheadsId) {
		return
	}

	animatePlayheads()
	SamplerController.playSong(song, samplers, /* Playhead position*/)
	playheadsId = setInterval(animatePlayheads, 500)
}

function pauseSong() {
	clearInterval(playheadsId)
	playheadsId = null

	SamplerController.stop(samplers)
	playheads.forEach(playhead => {
		playhead.style.transition = null
		playhead.style.transform = "translateX(" + timelineX + "px"
	});
}

function stopSong() {
	pauseSong()
	timelineToStart()
}

Tone.getTransport().bpm.value = tempo

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

export var SongLoader = {
	loadSong: function(songJson) {
		console.log(songJson);

		tempo = songJson.tempo
		songDuration = songJson.duration
		tempoBox.value = tempo

		for (const trackId in songJson.tracks) {
			let trackData = songJson.tracks[trackId]
			let instrumentName = trackData.instrument
			let instrumentDiv = document.getElementById(instrumentName)
			let folderUrl = instrumentDiv.getAttribute("folder_url")
			let instrumentNotes = instrumentDiv.getAttribute("notes")

			trackIdCounter++

			// Add the sampler for the instrument of the track
			samplers[trackIdCounter] = SamplerController.loadSampler(folderUrl, instrumentNotes)
			samplers[trackIdCounter].volume.value = volume

			// Add track object to song data
			song.tracks[trackIdCounter] = {"instrument": instrumentName, "notes": {}}

			// Add trackEditor to trackEditorContainer
			let trackEditor = newTrackDiv(instrumentName)
			trackEditorContainer.appendChild(trackEditor)
			tracks = document.querySelectorAll('.track');
			playheads = document.querySelectorAll(".playhead")

			let track = trackEditor.querySelector(".track")
			for (const noteId in trackData.notes) {
				let noteData = trackData.notes[noteId]
				let noteWidth = noteData.split(",")[1]
				let notePos = noteId.split(";")

				let songNote = newNote(notePos[0], notePos[1], noteWidth, track.getAttribute("note-color"))
				songNote.style.pointerEvents = "all"

				// Add note to song data
				song.tracks[trackEditor.getAttribute("track-id")].notes[notePos[0] + ";" + notePos[1]] = getNoteSound(notePos[1]) + "," + (noteWidth) + "," + notePos[0] * (60 / tempo)

				// Insert note into track
				track.appendChild(songNote)
			}
		}
	}
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
document.getElementById("pause").addEventListener("click", pauseSong)
document.getElementById("stop").addEventListener("click", stopSong)
document.getElementById("toEnd").addEventListener("click", timelineToEnd)

document.addEventListener("keypress", onKeyPress)