// Code - Samanth Annaiah 
let advice_id = document.getElementById("advice_id"); 
let qadvice = document.getElementById("qadvice"); 
let qbutton = document.getElementById("qbutton");
let quot_div = document.querySelector(".quot_div"); 
let qhr = document.querySelector(".qhr"); 

let from_main = 0; 

main();

async function main() {
    from_main = 1;
    getAdviceAPI(); 
    qbutton.addEventListener("click", getAdvice);
}

function getAdvice() {
    getAdviceAPI();
}

async function getAdviceAPI(event) {
    try {
        qadvice.style.opacity = 0; 
        let api_advice = await fetch("https://api.adviceslip.com/advice");
        let api_aresult = await api_advice.json(); 
        if (from_main !== 1) {
            let hue   = (Math.random() * 360).toFixed(2);
            let satur = (Math.random() * 100).toFixed(2);
            let light = (Math.random() * 100).toFixed(2);
            quot_div.style.backgroundColor = `hsla(${hue}, ${satur}%, ${light}%, 0.4)`;
            qhr.style.backgroundColor = `hsla(${hue}, ${satur}%, ${light}%, 0.2)`;
        }
        from_main = 0;
        advice_id.textContent = `ADVICE ID#${api_aresult.slip.id}`;
        qadvice.textContent = `"${api_aresult.slip.advice}"`;

        let opa_count = 0
        let opa_var = setInterval(() => {
            opa_count += 0.1
            qadvice.style.opacity = opa_count
            if (opa_count > 1) {
                clearInterval(opa_var)
            }
        }, 50);
    } catch (error) {
            window.alert("Issue with API", error);  
    }
}