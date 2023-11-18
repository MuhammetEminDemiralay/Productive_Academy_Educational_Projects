const result = document.querySelector(".result"),
    buttons = document.querySelectorAll("button");

let operator = ["=", "*", "/", "%", "+", "-"];    
let output = "";    

buttons.forEach(btn =>{
    btn.addEventListener("click", (e) => {


        if(e.target.value === "+"){
            output
        }

        console.log(operator[2])
        output += e.target.value;
        console.log(output);
        result.value = output;


    })
})
