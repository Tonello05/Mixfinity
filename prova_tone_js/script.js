import { SampleLibrary } from "./tonejs-instruments-master/tonejs-instruments-master/Tonejs-Instruments.js";
import { SongLoader } from "../js/songLoader.js";

const music_buttons = document.getElementById("music_buttons")
const table_sound = document.getElementById("table_sound")
const start_song = document.getElementById("start_song")
const play_from_file = document.getElementById("play_from_file")
const download_music = document.getElementById("download_music")

var player = []
var parts = []

//synthesizers initialization
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

download_music.addEventListener("click", () => {
    
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
               '"A4;1n;3",' +
               '"A2;1n;4",' +
               '"A3;1n;5"' +
           ']' +

       '}' +
   ']' +
'}'

const json_obj = JSON.parse(txt_json)

    
    fromJsonToWebm(json_obj)
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
    const json_obj = {
        "tracks": {
            "1": {
                "instrument": "piano",
                "notes": {
                    "1;1": "A2,4n,0",
                    "2;2": "A3,4n,.25",
                    "3;3": "A4,4n,.5"
                }
            }
        },
        "tempo": 160,
        "duration": 3000
    }

    SongLoader.loadInstruments(json_obj)
    SongLoader.loadNotes(json_obj)

    setTimeout(() => {
        SongLoader.playSong(json_obj)
    }, 1000)

    // loadInstruments(json_obj)
    // loadNotes(json_obj)
    // setTimeout(() => {
    //     playSong(json_obj)
    // }, 1000);


})

function loadInstruments(obj){
    for (let index = 0; index < obj.tracks.length; index++) {
        let track = obj.tracks[index]
        player[index] = SampleLibrary.load({
            instruments: track.instrument
        })
        player[index].toDestination()
    }
}
//play music from JSON file
function playSong(obj) {
    for (let index = 0; index < obj.tracks.length; index++) {
        parts[index].start(0)
        Tone.Transport.start()
    }   
    
}

function loadNotes(obj){

    for (let index = 0; index < obj.tracks.length; index++) {

        let arrayNotes = []
        for (let index1 = 0; index1 < obj.tracks[index].notes.length; index1++) {
            let element = obj.tracks[index].notes[index1]
            let tmpArr = element.split(",")
            arrayNotes[index1] = {note : tmpArr[0], duration : tmpArr[1], time: tmpArr[2]}
            
        }
        
        parts[index] = new Tone.Part(((time, value) =>{

            player[index].triggerAttackRelease(value.note, value.duration, time)

        }), arrayNotes
    )

    console.log(arrayNotes)

    }  


}



function fromJsonToWebm(obj) {
    
    let recorder = new Tone.Recorder();
    recorder.start()
    loadInstruments(obj)
    setTimeout(() => {
        connectInstrumentsToRecorder(obj, recorder)
        for (let index = 0; index < obj.tracks.length; index++) {

            let arrayNotes = []
            for (let index1 = 0; index1 < obj.tracks[index].notes.length; index1++) {
                let element = obj.tracks[index].notes[index1]
                let tmpArr = element.split(";")
                player[index].triggerAttackRelease(tmpArr[0], tmpArr[1], tmpArr[2])
            }
        }
    }, 1000);

    // wait for the notes to end and stop the recording
    setTimeout(async () => {
        // the recorded audio is returned as a blob
        console.log("prova");
        let recording = await recorder.stop();
        
        convertWebmToMp3AndDownload(recording)

    }, 4000);




}

function connectInstrumentsToRecorder(obj, recorder){
    for (let index = 0; index < obj.tracks.length; index++) {
        
        player[index].connect(recorder)
    }
}


async function convertWebmToMp3AndDownload(webmBlob) {
    const { createWorker } = FFmpeg;
    const ffmpeg = createWorker({ logger: console });

    // Load ffmpeg
    await ffmpeg.load();

    // Input and output file names
    const inputName = 'input.webm';
    const outputName = 'output.mp3';

    try {
        // Write WebM file to virtual file system
        await ffmpeg.write(inputName, await (await fetch(webmBlob)).arrayBuffer());

        // Run ffmpeg command to convert WebM to MP3
        await ffmpeg.run('-i', inputName, outputName);

        // Read the output MP3 file from virtual file system
        const mp3Data = await ffmpeg.read(outputName);
        const mp3Blob = new Blob([mp3Data.buffer], { type: 'audio/mp3' });

        // Create a temporary link to trigger the download
        const url = URL.createObjectURL(mp3Blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'converted.mp3';
        document.body.appendChild(link);
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error converting file:', error);
    } finally {
        // Terminate ffmpeg worker
        await ffmpeg.terminate();
    }
}

  