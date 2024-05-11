export var SamplerController = {
	loadSampler: function (samplesFolderUrl, availableSounds) {
		let sounds = {}
		availableSounds = availableSounds.split(",")
		availableSounds.forEach(sound => {
			if (sound.includes("#")) {
				let values = sound.split("#")
				sounds[sound] = values[0] + "s" + values[1] + ".mp3"
			} else {
				sounds[sound] = sound + ".mp3"
			}
		});

		const sampler = new Tone.Sampler({
			urls: sounds,
			release: .5,
			baseUrl: samplesFolderUrl
		}).toDestination()

		return sampler
	},

	playSong: function (songJson, samplers, playheadPosition, noteWidthPx, bpm) {
		let timelineStart = (playheadPosition / noteWidthPx) * (60 / bpm)

		for (const trackId in songJson.tracks) {
			let sampler = samplers[trackId]
			let notes = songJson.tracks[trackId].notes

			for (const notePos in notes) {
				let noteData = notes[notePos].split(",")
				sampler.triggerAttackRelease(noteData[0], noteData[1], ("+" + (noteData[2] - timelineStart)))
			}
		}
	},

	stop: function (samplers) {
		for (const samplerId in samplers) {
			samplers[samplerId].releaseAll("+0")
		}
	}
}
