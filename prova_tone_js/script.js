import { SampleLibrary } from "./tonejs-instruments-master/tonejs-instruments-master/Tonejs-Instruments.js";

const music_buttons = document.getElementById("music_buttons")
const table_sound = document.getElementById("table_sound")

//synthesizer initialization
const synth = new Tone.Synth().toDestination();
const metalSynth = new Tone.MetalSynth().toDestination();
const AMSynth = new Tone.AMSynth().toDestination();
const duoSynth = new Tone.DuoSynth().toDestination();
const FMSynth = new Tone.FMSynth().toDestination();
const guitarSynth = SampleLibrary.load({
    instruments:"guitar-acoustic"
})

music_buttons.addEventListener("click", (event) => {

    if(Tone.context.state != "running"){
        Tone.start()
    }

    if(event.target.textContent == "Synth"){
        synth.triggerAttackRelease("A3", "8n")
    }else if(event.target.textContent == "MetalSynth"){
        metalSynth.triggerAttackRelease("A3", "8n")
    }else if(event.target.textContent == "AMSSynth"){
        AMSynth.triggerAttackRelease("A3", "8n")
    }else if(event.target.textContent == "DuoSynth"){
        duoSynth.triggerAttackRelease("A3", "8n")
    }else if(event.target.textContent == "FMSynth"){
        FMSynth.triggerAttackRelease("A3", "8n")
    }else if(event.target.textContent == "Guitar-acoustic"){
        guitarSynth.toMaster()
        guitarSynth.triggerAttack("A2", "2n")

    }


    
})


table_sound.addEventListener("click", (event) => {

    var note = event.target.textContent;

    guitarSynth.toMaster()
    guitarSynth.triggerAttackRelease(note,"8n")

})