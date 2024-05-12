const searchBar = document.getElementById("search-bar")
const sortsContainer = document.getElementById("sorts-container")
const songContainer = document.getElementById("scroll-container")

const remixButtons = document.querySelectorAll(".remix-button")
let songs = document.querySelectorAll(".song")

function fillSongContainer(jsonSongs) {
	songContainer.innerHTML = ""

	for (const songId in jsonSongs) {
		let song = jsonSongs[songId]

		let songDiv = document.createElement("div")

		let leftDiv = document.createElement("div")
		let titleDiv = document.createElement("div")
		let titleH3 = document.createElement("h3")
		let title = document.createElement("p")
		let authorDiv = document.createElement("div")
		let authorH3 = document.createElement("h3")
		let author = document.createElement("p")
		let genreDiv = document.createElement("div")
		let genreH3 = document.createElement("h3")
		let genre = document.createElement("p")
		let releaseDateDiv = document.createElement("div")
		let releaseDateH3 = document.createElement("h3")
		let releaseDate = document.createElement("p")

		let rightDiv = document.createElement("div")
		let topDiv = document.createElement("div")
		let ratingContainerDiv = document.createElement("div")
		// star buttons
		let buttonsDiv = document.createElement("div")
		let playButton = document.createElement("button")
		let remixButton = document.createElement("button")

		songDiv.classList.add("song")

		leftDiv.classList.add("left")
		titleDiv.classList.add("title")
		titleH3.innerText = "Title: "
		title.innerText = song.title
		titleDiv.appendChild(titleH3)
		titleDiv.appendChild(title)

		authorDiv.classList.add("author")
		authorH3.innerText = "Author: "
		author.innerText = song.author
		authorDiv.appendChild(authorH3)
		authorDiv.appendChild(author)
		
		genreDiv.classList.add("genre")
		genreH3.innerText = "Genre: "
		genre.innerText = song.genre
		genreDiv.appendChild(genreH3)
		genreDiv.appendChild(genre)

		releaseDateDiv.classList.add("release-date")
		releaseDateH3.innerText = "Release date: "
		releaseDate.innerText = song.releaseDate
		releaseDateDiv.appendChild(releaseDateH3)
		releaseDateDiv.appendChild(releaseDate)

		leftDiv.appendChild(titleDiv)
		leftDiv.appendChild(authorDiv)
		leftDiv.appendChild(genreDiv)
		leftDiv.appendChild(releaseDateDiv)

		rightDiv.classList.add("right")
		topDiv.classList.add("top")

		if (song.remixTitle != "") {
			let mixDiv = document.createElement("div")
			let mixH3 = document.createElement("h3")
			let mix = document.createElement("p")
			
			mixDiv.classList.add("mix")
			mixH3.innerText = "Remix of: "
			mix.innerText = song.remixTitle
			
			mixDiv.appendChild(mixH3)
			mixDiv.appendChild(mix)
			topDiv.appendChild(mixDiv)
		}

		ratingContainerDiv.classList.add("rating-container")
		let activeStars = Math.round(song.rating / 2)

		// Active stars
		for (let i = 0; i < activeStars; i++) {
			let starButton = document.createElement("button")
			let starSpan = document.createElement("span")
			starSpan.classList.add("interactable", "material-symbols-rounded")
			starSpan.innerText = "star"

			starButton.appendChild(starSpan)
			ratingContainerDiv.appendChild(starButton)
		}
		// Unactive stars
		for (let i = 0; i < 5 - activeStars; i++) {
			let starButton = document.createElement("button")
			let starSpan = document.createElement("span")
			starSpan.classList.add("interactable", "material-symbols-rounded", "unactive")
			starSpan.innerText = "star"

			starButton.appendChild(starSpan)
			ratingContainerDiv.appendChild(starButton)
		}

		topDiv.appendChild(ratingContainerDiv)
		
		buttonsDiv.classList.add("buttons")
		playButton.classList.add("interactable", "play-button")
		playButton.innerText = "Play"
		remixButton.classList.add("remix-button", "interactable")
		remixButton.setAttribute("song-id", jsonSongs.id)
		remixButton.innerText = "Remix"

		buttonsDiv.appendChild(playButton)
		buttonsDiv.appendChild(remixButton)

		rightDiv.appendChild(topDiv)
		rightDiv.appendChild(buttonsDiv)

		songDiv.appendChild(leftDiv)
		songDiv.appendChild(rightDiv)
		songContainer.appendChild(songDiv)
	}

	songs = document.querySelectorAll(".song")
}

function changeSort(sortType, button) {
	const xhr = new XMLHttpRequest()
	xhr.open("POST", "../../php/sortExplore.php")
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
	xhr.onload = function () {
		if (xhr.status === 200) {
			let jsonData
			try {
				jsonData = JSON.parse(xhr.responseText)
			} catch (error) {
				console.log("Sort error: " + error);
				return
			}

			fillSongContainer(jsonData)
			if (button != null) {
				sortsContainer.querySelectorAll("button").forEach(button => {
					button.classList.remove("selected")
				})
				button.classList.add("selected")
			}
		} else {
			console.error('Error while saving song:', xhr.statusText);
		}
	}

	const formData = `sortType=${sortType}`;
	xhr.send(formData)
}

searchBar.addEventListener("input", () => {
	let value = searchBar.value.toLowerCase()

	songs.forEach(song => {
		let title = song.querySelector(".title").querySelector("p").innerText.toLowerCase()
		// console.log(title);
		if (title.includes(value)) {
			song.classList.remove("hidden")
		} else {
			song.classList.add("hidden")
		}
	});
})

remixButtons.forEach(button => {
	button.addEventListener("click", () => {
		location.href = "../editor/?id_song=" + button.getAttribute("song-id")
	})
});

sortsContainer.querySelectorAll("button").forEach(button => {
	button.addEventListener("click", () => {
		let res = changeSort(button.getAttribute("sort-type"), button)
	})
});

document.getElementById("user-button").addEventListener("click", () => {
	location.href = "../user/"
})

changeSort("release_date")