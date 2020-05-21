const joke = document.querySelector('#joke-text')
const jokeBtn = document.querySelector('#get-joke')
const jokeList = document.querySelector('#joke-list')
const saveBtn = document.querySelector('#save-joke')
// addClearAll function
const listElement = document.querySelector('.list')
const clearAll = document.createElement('button')

//get a joke button
jokeBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random')
        const {
            value
        } = await response.json()
        joke.innerText = value
    } catch {
        alert('Something went wrong ! ! !')
    }
})

//add the joke to the list 
saveBtn.addEventListener('click', () => {
    if (joke.value.length) {
        const newLi = createListItem(joke.value)
        jokeList.append(newLi)
        joke.innerText = ''

        addClearAll()
    } else {
        alert('The field with a joke is empty')
    }
})

// delete the joke
jokeList.addEventListener('click', ({
    target
}) => {
    if (target.classList.contains('x-mark')) target.closest('li').remove()
    
    // edit joke
    if (target.classList.contains('edit')) {
        const currentEditing = target.closest('.new-li')

        currentEditing.classList.add('editing')

        currentEditing.querySelector('.joke-actions').classList.add('save-actions')
        currentEditing.querySelector('.joke-in-list').removeAttribute('disabled')
        currentEditing.querySelector('.joke-in-list').focus()
    }

    //save joke
    if (target.classList.contains('save')) {
        const currentEditing = target.closest('.new-li')
        const currentText = currentEditing.querySelector('.joke-in-list')

        if (currentText.value.length) {
            currentEditing.querySelector('.joke-actions').classList.remove('save-actions')
            currentText.setAttribute('disabled', true)
            currentEditing.classList.remove('editing')
        } else {
            currentEditing.remove()
        }
    } 
        
    //delete btn all jokes
    const currentListElements = document.querySelectorAll('#joke-list > li')
    if (!currentListElements.length) deleteBtnJokes()
})

//clear list
clearAll.addEventListener('click', () => deleteAllJokes())

//create button clear all jokes
const addClearAll = () => {
    const clearAllBtn = document.querySelector('.clear-all')
    const jokesLength = jokeList.querySelectorAll('li')

    if (jokesLength.length && !clearAllBtn) {
        clearAll.classList.add('clear-all')
        clearAll.setAttribute('type', 'button')
        clearAll.innerText = 'Delete all jokes'

        listElement.prepend(clearAll)
    }
}

const deleteAllJokes = () => {

    const currentListElements = document.querySelectorAll('#joke-list > li')
    currentListElements.forEach(elem => elem.remove())

    deleteBtnJokes()
}

const deleteBtnJokes = () => {
    const clearAllBtn = document.querySelector('.clear-all')
    if (clearAllBtn) clearAllBtn.remove()
}

//create list item
const createListItem = jokeText => {
    const newLi = document.createElement('li'),
        newJokeText = document.createElement('input'),
        newActionsContainer = document.createElement('div'),
        newEditJoke = document.createElement('button'),
        newSavejoke = document.createElement('button'),
        newDeleteJoke = document.createElement('button')

    newJokeText.classList.add('joke-in-list')
    newJokeText.setAttribute('type', 'text')
    newJokeText.setAttribute('disabled', true)
    newJokeText.value = jokeText

    newActionsContainer.classList.add('joke-actions')

    newEditJoke.classList.add('edit')
    newEditJoke.setAttribute('type', 'button')
    newEditJoke.innerText = 'E'

    newSavejoke.classList.add('save')
    newSavejoke.setAttribute('type', 'button')
    newSavejoke.innerText = 'S'

    newDeleteJoke.classList.add('x-mark')
    newDeleteJoke.setAttribute('type', 'button')
    newDeleteJoke.innerText = 'X'

    newActionsContainer.append(newEditJoke)
    newActionsContainer.append(newSavejoke)
    newActionsContainer.append(newDeleteJoke)

    newLi.classList.add('new-li')

    newLi.append(newJokeText)
    newLi.append(newActionsContainer)

    return newLi
}

