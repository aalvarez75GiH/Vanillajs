
const emptyValue = (id) => {
    document.getElementById(id).value = ''
}

const emptyText = (id) => {
    document.getElementById(id).innerText = ''
}

const cleaningMessages = () => {
    const successMessage = document.getElementById('match')
    const failMatch = document.getElementById('unMatch')
    const tryContent = document.getElementById('tryContent')
    successMessage.style.display = 'none'
    failMatch.style.display = 'none'
    tryContent.style.display = 'block'

}


// Generate Random Number / PIN

const randomNumFunc = () => {   
    const randomNumber = Math.floor(1000 + Math.random() * 9000)
    document.getElementById('generateNum').value = randomNumber
    emptyValue('inputPIN')
    const tryContent = document.getElementById('tryContent')
    const successMessage = document.getElementById('match')
    const failMatch = document.getElementById('unMatch')
    failMatch.style.display = 'none'
    successMessage.style.display = 'none'

    const initialAttempts = document.getElementById('tryLeft')
    initialAttempts.innerHTML = '3' 
    enableBtn('submit')

    
}

// Input Number Value

const btnKey = (id) => {
    let prevValue = document.getElementById('inputPIN').value
    let key = document.getElementById(id).innerHTML
    document.getElementById('inputPIN').value = prevValue + key
}

//  Clean - Clear inputPUN

const clean = () => {
    document.getElementById('inputPIN').value = ''
    cleaningMessages()
}

// Clean last digit - Backspace

const cleanLast = () => {
    let inputResult = document.getElementById('inputPIN').value
    let removeValue = inputResult.slice(0, inputResult.length - 1 )
    document.getElementById('inputPIN').value = removeValue
    cleaningMessages()
}

// Submit Button (PIN matching or not)

const submitBtn = () => {
    const randomNum = document.getElementById('generateNum').value
    const PINEntered = document.getElementById('inputPIN').value
    const successMessage = document.getElementById('match')
    const failMatch = document.getElementById('unMatch')
    const tryContent = document.getElementById('tryContent')

    console.log(randomNum, PINEntered)
    if (randomNum === PINEntered) {
        successMessage.style.display = 'block'
        failMatch.style.display = 'none'
        tryContent.style.display = 'none'
    }
    if(randomNum != PINEntered){
        successMessage.style.display = 'none'
        failMatch.style.display = 'block'
        tryContent.style.display = 'block'
        tryLeft('tryLeft')
    }
} 

//  Try 3 left

const tryLeft = (id) => {
    const tryAgain = document.getElementById(id).innerHTML 
    document.getElementById(id).innerHTML -= 1
    if(tryAgain === '1') {    
        disableBtn('submit')
    }
}

// Try left expired - submit button disabled

const disableBtn = (id) => {
    const button = document.getElementById(id)
    button.setAttribute('disabled', 'true')
    button.style.cursor = 'not-allowed'
    button.title = 'Please reload page'
}

const enableBtn = (id) => {
    const button = document.getElementById(id)
    // button.setAttribute('enable', 'true')
    button.removeAttribute('disabled', 'true')
    button.style.cursor = 'pointer'
}








