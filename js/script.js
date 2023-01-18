const myUsers = users
const USER_PER_PAGE = 10

populateHTML()
displayTotal()
createPagination()
displayUsers(1)

function populateHTML() {
    let contactList = document.getElementsByClassName('contact-list')[0]
    for (const currUser of myUsers) {
        let newElementStr = `<div class="contact-details">
        <img class="avatar" src="${currUser.picture.thumbnail}">
        <h3>${currUser.name.first} ${currUser.name.last}</h3>
        <span class="email">${currUser.email}</span>
        </div>
        <div class="joined-details">
        <span class="date">Joined ${currUser.registered.date.substring(
            0,
            10
        )}</span>
        </div>`

        let newListItem = document.createElement('li')
        newListItem.innerHTML = newElementStr.trim()
        newListItem.className += 'contact-item cf'
        newListItem.style.display = 'none'
        contactList.appendChild(newListItem)
    }
}

function createPagination() {
    let paginationEle = document.querySelector('.pagination')
    let qtyPages = Math.ceil(myUsers.length / 10)
    for (let i = 1; i <= qtyPages; i++) {
        let newButton = document.createElement('li')
        let newElementStr = `<a href="#">${i}</a>`
        newButton.innerHTML = newElementStr.trim()
        newButton.addEventListener('click', goToPage)
        paginationEle.appendChild(newButton)
        if (i == 1) {
            link = newButton.children
            link[0].className += 'active'
        }
    }
}

function displayTotal() {
    let totalContactsEle = document.querySelector('.page-header h3')
    totalContactsEle.innerHTML = `Total: ${myUsers.length}`
}

function goToPage(e) {
    e.preventDefault()
    let clickedEle = e.target
    let selectedPage = clickedEle.innerHTML
    resetPages()
    setPageActive(clickedEle)
    displayUsers(selectedPage)
}

function displayUsers(pageNumber) {
    let listContacts = document.getElementsByClassName('contact-item')
    hideUsers(listContacts)
    minUser = (pageNumber - 1) * 10
    maxUser = (pageNumber - 1) * 10 + 10
    if (maxUser > listContacts.length) {
        maxUser = listContacts.length
    }
    for (let i = minUser; i < maxUser; i++) {
        listContacts[i].style.display = ''
    }
}

function hideUsers(listElements) {
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].style.display = 'none'
    }
}

function resetPages() {
    let paginationEle = document.querySelector('.pagination')
    let pages = paginationEle.children
    for (let i = 0; i < pages.length; i++) {
        page = pages[i].firstChild
        page.classList.remove('active')
    }
}

function setPageActive(page) {
    page.className += 'active'
}
