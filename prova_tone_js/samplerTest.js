const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const availableSounds = [
	"C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
	"C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
	"C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
	"C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
	"C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
	"C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
	"C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7"
]

function loadSampler(samplesFolderUrl, availableSounds) {
	let sounds = {}
	availableSounds.forEach(sound => {
		if (sound.includes("#")) {
			let values = sound.split("#")
			sounds[sound] = values[0] + "s" + values[1] + ".mp3"
		} else {
			sounds[sound] = sound + ".mp3"
		}
	});

	console.log(sounds);

	const sampler = new Tone.Sampler({
		urls: sounds,
		baseUrl: samplesFolderUrl
	}).toDestination()

	return sampler
}

function playSong(sampler, notes) {
	for (const notePos in notes) {
		let noteData = notes[notePos].split(",")
		console.log(noteData);
		sampler.triggerAttackRelease(noteData[0], noteData[1], noteData[2])
	}
}

let songData = {
	"tracks": {
		"2": {
			"instrument": "piano",
			"notes": {
				"1;1": "A1,.25,+0",
				"2;2": "A#1,.25,+.25",
				"3;3": "A3,1,+.5"
			}
		}
	},
	"tempo": 160,
	"duration": 3000
}

const sampler = loadSampler("./tonejs-instruments-master/tonejs-instruments-master/samples/piano/", availableSounds)
sampler.volume.value = -10

document.getElementById("button").addEventListener("click", () => {
	// playSong(sampler, songData.tracks[2].notes)
	let count = 0
	availableSounds.forEach(note => {
		sampler.triggerAttackRelease(note, .25, "+" + (.25 * count))
		count++
	});
})

document.getElementById("button2").addEventListener("click", () => {
	sampler.triggerAttackRelease("A4", 1)
})