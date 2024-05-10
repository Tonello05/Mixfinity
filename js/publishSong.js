// Top bar publish button
const publishTopBar = document.getElementById("publish")

// Containers
const header = document.getElementById("header")
const container = document.getElementById("container")
const publishContainer = document.getElementById("publish-container")

// Publish panel
const cancelButton = document.getElementById("cancel-submit")

// Publish panel genre
const selectForm = document.getElementById("select-form");
const genreSelect = document.getElementById("genre-select")
const genreArrow = document.getElementById("genre-arrow")
const genreButtons = document.getElementById("genre-buttons")
const genreHeader = document.getElementById("genre-header")
const genreList = document.querySelectorAll(".genre-item")

let publishPanelEnabled = false
let selectedGenre

function toggleGenreSelect() {
	let isHidden = genreSelect.hidden

	genreSelect.hidden = !isHidden
	if (isHidden) {
		genreArrow.innerText = "expand_less"
		genreButtons.classList.add("hidden-button")
	} else {
		genreArrow.innerText = "expand_more"
		genreButtons.classList.remove("hidden-button")
	}
}

function selectGenre(event) {
	if (selectedGenre != null) {
		selectedGenre.classList.remove("selected")
	}
	selectedGenre = event.target
	selectedGenre.classList.add("selected")

	let genreId = selectedGenre.getAttribute("genre-id")
	selectForm.value = genreId
	genreHeader.querySelector(".select-text").innerHTML = selectedGenre.innerText
	toggleGenreSelect()
}

function togglePublishPannel(params) {
	if (!publishPanelEnabled) {
		header.classList.add("blurred")
		container.classList.add("blurred")
		publishContainer.hidden = false
	} else {
		header.classList.remove("blurred")
		container.classList.remove("blurred")
		publishContainer.hidden = true
	}

	publishPanelEnabled = !publishPanelEnabled
}

publishTopBar.addEventListener("click", togglePublishPannel)
cancelButton.addEventListener("click", togglePublishPannel)

genreHeader.addEventListener("click", toggleGenreSelect)
genreList.forEach(genreItem => {
	genreItem.addEventListener("click", selectGenre)
});