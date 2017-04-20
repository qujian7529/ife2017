const aInput = document.querySelectorAll('input');
function cssRevise(){
    let unit = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`,this.value + unit);
    document.getElementById(`code-${this.name}`).innerText = this.value;
}
aInput.forEach( (input) => {
    input.addEventListener('change',cssRevise);
    input.addEventListener('mousemove',cssRevise);
}) 