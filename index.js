
document.addEventListener('click', e => {
    if (e.target.id === 'get-color-btn'){
        handleGetColorScheme()
    }
})

function handleGetColorScheme() {
    const mode = document.getElementById('scheme').value
    const colorInpt = document.getElementById('color-inpt').value 
    const mainColor = (colorInpt === '')? 'F55A5A' : colorInpt

    fetch(`https://www.thecolorapi.com/scheme?hex=${mainColor}&mode=${mode}&count=5`, {
        headers: {"Content-Type": "application/json"}}
    ).then(res => res.json()).then(data => {
        data.colors.forEach((color, index) => {
            document.getElementById(`color-${index+1}`).style.backgroundColor = color.hex.value
            document.getElementById(`text-${index+1}`).textContent = color.hex.value
        })
    })
}