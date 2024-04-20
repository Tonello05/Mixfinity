import { SampleLibrary } from "./tonejs-instruments-master/tonejs-instruments-master/Tonejs-Instruments.js";

const music_buttons = document.getElementById("music_buttons")
const table_sound = document.getElementById("table_sound")
const start_song = document.getElementById("start_song")
const play_from_file = document.getElementById("play_from_file")

//synthesizer initialization
const synth = new Tone.Synth().toDestination();
const metalSynth = new Tone.MetalSynth().toDestination();
const AMSynth = new Tone.AMSynth().toDestination();
const duoSynth = new Tone.DuoSynth().toDestination();
const FMSynth = new Tone.FMSynth().toDestination();
const guitarSynth = SampleLibrary.load({
    instruments:"piano"
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
    guitarSynth.triggerAttackRelease(note,"2n")

})


start_song.addEventListener("click", () =>{

    synth.triggerAttackRelease("A3" , "4n")
    synth.triggerAttackRelease("A2" , "4n", "+0.5")
    synth.triggerAttackRelease("A1" , "4n", "+1")
})

play_from_file.addEventListener("click", () =>{
    
    let txt_json = '{ "tracks": ' +
         '[' +
            '{' +
                '"instrument": "piano",' +
                '"notes": [' +
                    '"A1;4n;0",' +
                    '"A2;4n;1",' +
                    '"A3;4n;2"'  +
                ']' +
            '},' +
            '{' +
                '"instrument": "flute",' +
                '"notes": [' +
                    '"A1;2n;0",' +
                    '"A2;2n;0.5",' +
                    '"A3;2n;1"' +
                ']' +
    
            '}' +
        ']' +
    '}'

    const json_obs = JSON.parse(txt_json)

    readAndPlaySong(json_obs)

})


//play music from JSON file
function readAndPlaySong(obj) {

    //TODO: fix this code (it try to start playng notes before the samplelibrary is loaded)

    for (let index = 0; index < obj.tracks.length; index++) {
        const track = obj.tracks[index];
        const player = SampleLibrary.load({
            instruments: track.instrument
        })

        obj.tracks[index].notes.forEach(element => {
            console.log("prova")
            const arr = element.split(";")
            player.triggerAttackRelease(arr[0],arr[1],arr[2])
        
        });
        
    }


}

