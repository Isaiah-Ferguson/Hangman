const playBtn = document.getElementById('playBtn')
const answerDiv = document.getElementById('answerDiv')
const hangMan = document.getElementById('hangMan')
const guessDiv = document.getElementById('guessDiv')

const arr = []
let count = 0

playBtn.addEventListener('click', function() {
    ApiCall()
})

const ApiCall = async () => {
    const promise = await fetch("https://random-word-api.herokuapp.com/word")
    const data = await promise.json()

    CreateTable(data)
}

const CreateTable = (rndWord) => {
    let word = rndWord[0].split("");
    
word.map( characters => {

        let input = document.createElement("input")
        let span = document.createElement("span")
        span.textContent = characters
        input.maxLength = 1
        input.size = 5
        input.style.marginRight = '10px'
        arr.push(characters)
        guessDiv.appendChild(input)
        answerDiv.appendChild(span)
        input.addEventListener('keydown', function(event){
            if(event.key === "Enter"){
                if(input.value === span.textContent)
                {
                    input.placeholder = span.textContent
                    input.value = span.textContent
                    input.readOnly = true;
                    console.log("Nice!")
                }else{
                    console.log("Wrong answer")
                    count++;
                    if (count == 5) {
                        alert("You lose")
                        inputDiv.removeChild(input)
                    }
                }
            }
        })
})
}