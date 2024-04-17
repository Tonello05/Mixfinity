const synth = new Tone.Synth().toDestination()
const instument1 = document.getElementById("instument1")
const instument2 = document.getElementById("instument2")

synth.volume.value = -13

instument1.addEventListener("click", () => {
	if (Tone.context.state != "running") {
		Tone.start()
	}

	synth.triggerAttackRelease("C4", .25)
})

instument2.addEventListener("click", () => {
	if (Tone.context.state != "running") {
		Tone.start()
	}

	synth.triggerAttackRelease("B5", .25)
})