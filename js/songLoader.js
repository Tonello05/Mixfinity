import { SampleLibrary } from "../prova_tone_js/tonejs-instruments-master/tonejs-instruments-master/Tonejs-Instruments.js"

var player = []
var parts = []

export var SongLoader = {
	loadInstruments: function (songJson) {
		player = []

		for (const trackId in songJson.tracks) {
			let track = songJson.tracks[trackId]

			player[trackId] = SampleLibrary.load({
				instruments: track.instrument
			})

			player[trackId].volume.value = -15
			player[trackId].toDestination()
		}

		// for (let i = 0; i < songJson.tracks.length; i++) {
		// 	let track = songJson.tracks[i]

		// 	player[i] = SampleLibrary.load({
		// 		instruments: track.instrument
		// 	})

		// 	player[i].volume.value = -15
		// 	player[i].toDestination()
		// }
	},

	loadNotes: function (songJson) {
		parts = []

		for (const trackId in songJson.tracks) {
			let track = songJson.tracks[trackId]
			let noteCounter = 0
			let arrayNotes = []

			for (const notePosition in track.notes) {
				let note = track.notes[notePosition]
				let noteData = note.split(",")

				arrayNotes[noteCounter] = {note: noteData[0], duration: noteData[1], time: noteData[2]}
				noteCounter++
			}

			parts[trackId] = new Tone.Part(((time, value) => {
				player[trackId].triggerAttackRelease(value.note, value.duration, time)
			}), arrayNotes)
		}

		// for (let i = 0; i < songJson.tracks.length; i++) {
		// 	let arrayNotes = []

		// 	for (let i1 = 0; i1 < songJson.tracks[i].notes.length; i1++) {
		// 		let element = songJson.tracks[i].notes[i1]
		// 		let tmpArr = element.split(",")

		// 		arrayNotes[i1] = {note : tmpArr[0], duration : tmpArr[1], time: tmpArr[2]}
		// 	}
			
		// 	parts[i] = new Tone.Part(((time, value) =>{
		// 		player[i].triggerAttackRelease(value.note, value.duration, time)
		// 	}), arrayNotes)
		// } 
	},

	playSong: function (songJson) {
		for (const trackId in songJson.tracks) {
			parts[trackId].start(0)
			Tone.Transport.start()
		}

		// for (let i = 0; i < songJson.tracks.length; i++) {
		// 	parts[i].start(0)
		// 	Tone.Transport.start()
		// }
	}
}