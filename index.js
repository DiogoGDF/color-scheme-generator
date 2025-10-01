const modal = document.getElementById('modal')
handleGetColorScheme()

document.addEventListener('click', e => {
    if (e.target.id === 'get-color-btn'){
        handleGetColorScheme()
    }
    else if (e.target.id === 'main-color'){
        handleMainColorClick()
    }
    else if (e.target.id === 'modal-btn'){
        handleModalClick()
    } 
    else if (e.target.id.startsWith('color-')) {
        handleColorClick(e.target.id)
    } 
    else if (e.target.id.startsWith('text-')) {
        handleTextClick(e.target.id)
    }
})

function handleGetColorScheme() {
    const mode = document.getElementById('scheme').value
    let colorInpt = document.getElementById('inpt').value 

    if(colorInpt.startsWith('#')){
        colorInpt = colorInpt.slice(1)
    }

    const mainColor = (colorInpt === '')? 'F55A5A' : colorInpt

    fetch(`https://www.thecolorapi.com/scheme?hex=${mainColor}&mode=${mode}&count=8`, {
        headers: {"Content-Type": "application/json"}}
    ).then(res => res.json()).then(data => {
        data.colors.forEach((color, index) => {
            document.getElementById(`color-${index+1}`).style.backgroundColor = color.hex.value
            document.getElementById(`text-${index+1}`).textContent = color.hex.value
        })
    })
}

function handleMainColorClick(){
    modal.style.display = 'flex'
}

function handleModalClick(){
    modal.style.display = 'none'
    handleGetColorScheme()
    document.getElementById('main-color').style.backgroundColor = document.getElementById('inpt').value
}

function handleColorClick(id){
    const color = rgbToHex(document.getElementById(id).style.backgroundColor)
    navigator.clipboard.writeText(color)
}

function handleTextClick(id){
    const color = document.getElementById(id).textContent
    navigator.clipboard.writeText(color)
}

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g).map(Number)
    return '#' + result
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()
}