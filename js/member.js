var songs = document.getElementsByClassName("music-card")

for (let index = 0; index < songs.length; index++) {

    songs[index].addEventListener("click", (event) => {

        var id = event.target.id;
        window.location = "../src/editor/index.php?id_song=" + id;
    
    })



}




