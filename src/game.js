var textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
let state = {}
let intro = document.querySelector('.intro');
let newGameButton = document.getElementById('splash');
let localSavedButton = document.getElementById('splash2');

function slideUpIntro() {
    setTimeout(() => {
        intro.style.top = '-100vh';
    }, 500);
}

const loadSaveButton = document.querySelector('.localSaved');
loadSaveButton.addEventListener('click', function() {
    const savedState = JSON.parse(localStorage.getItem('savedGameState'));
    console.log(savedState); // This will log the saved game data to the console
        if (savedState) {
            var textNode = textNodes.find(textNode => textNode.id === savedState);
            if (textNode) {
                textElement.innerHTML = textNode.text;
                    while (optionButtonsElement.firstChild) { // removes buttons
                        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
                    }
                    textNode.options.forEach(option => {
                        if (showOption(option)) {
                            const button = document.createElement('button')
                            button.innerText = option.text
                            button.classList.add('button')
                            button.addEventListener('click', () => selectOption(option))
                            optionButtonsElement.appendChild(button)
                        }
                    })
                console.log('save found');
            } else {
                console.log('save not found');
            }
        }
});

window.addEventListener('DOMContentLoaded', () => {

        const savedState = (localStorage.getItem('savedGameState'));
        console.log(savedState); // This will log the saved game data to the console

/*     function selectOption(option) {
        const nextTextNodeId = option.nextText;
        state = Object.assign(state, option.setState);
        state.textNodeIndex = nextTextNodeId; //
        saveGame(state); //
        showTextNode(nextTextNodeId);
    } */

    function startGame() {
        state = []
        showTextNode(1);
    }
    
    newGameButton.addEventListener('click', () => {
        startGame();
        slideUpIntro();
        showTextNode(1);
    });
    
    localSavedButton.addEventListener('click', () => {
        slideUpIntro();
    });

    startGame();

});

// ==== GLOBAL  ==== //

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) { // removes buttons
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('button');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    })
}

/* Takes current state, add everything from `option.setState` to it
and over-rides everything thats there. So if "Whatever item" is true, but false in `option.setState`
its going to set it to false in `state` and it will return a brand new object which we will set
to the current state. */
function selectOption(option) {
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState);
    state.textNodeIndex = nextTextNodeId;
    if (option.saveGame) {
        saveGame(state);
    } else {    // Auto Save
        saveGame(state);
    }
    showTextNode(nextTextNodeId);
}

function saveGame(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('savedGameState', state[`textNodeIndex`]); // Saves textNodeIndex as state
        console.log('Game saved:', state);
        console.log('Serialized state:', serializedState);
    } catch (error) {
        console.error('Error while saving the game:', error);
    }
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

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
            },
            {
                text: 'Save Game',
                setState: {},
                saveGame: true,
                nextText: 2,
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