const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = []
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) { // removes buttons
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('button')
            button.addEventListener('click', () => selectOptions(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}


// What this does, it takes current state, its going to add everything from option.setState to it
// and over-ride everything thats already there. So if blueGoo is true, but false in option.setState
// is going to set it to false in `state` and it will return a brand new object which we will set
// to our current state.

function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}


/* In the lines below, we use [] and {}, with the curly braces being inside the brackets to create Objects inside an array which will serve as elements for dialogue and options */
const textNodes = [
    {
        id: 1,
        text: 'You suddenly woke up and looked at the window to see the skies were dark. You thought to yourself "Huh? Must still be night time"... ',
        options: [
            {
                text: 'Grab your phone and stand up',
                setState: { phone: true },
                nextText: 2
            },
            {
                text: 'Go back to sleep',
                nextText: 2.1
            }
        ]
    },
    {
        id: 2.1,
        text: 'You woke up once again.. You looked to the window and saw that it was still dark outside... You found it strange so you sat uup on your bed.',
        options: [
            {
                text: 'Grab your phone and stand up',
                setState: { phone: true },
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You checked your phone to see the time and to your surprise, you saw that it was already 8 in the morning...',
        options: [
            {
                text: 'go to the window',
                nextText: 3
            },
            {
                text: 'User your phone to contact your friend',
                nextText: 3.1
            }
    ]
    }
]

startGame();

/* 
 This code contains "requiredState" used for checking if a state condition has been met.
 Can be used as a sort of Lock/Key mechanism to be able to do something.

    {
        id: 0,
        text: 'lorem ipsum dolor ben sal am',
        options: [
            {
                text: 'trade for sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: False, sword: true}
            },
            {
                text: 'trade for shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: False, shield: true}
            },
            {
                text: 'Keep the good and ignore',
                nextText: 00
            }
    ]
    }

*/