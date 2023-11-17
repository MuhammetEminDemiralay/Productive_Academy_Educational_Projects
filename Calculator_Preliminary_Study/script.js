const result = document.querySelector(".result"),
    buttons = document.querySelectorAll("button");

    const specialChars = ["%", "*", "/", "+", "-", "="];
    let output = "";
    buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => calculate(e.target.value))
    })

    const calculate = (btnValue) => {
        if(btnValue === "=" && output !== ""){
            output = eval(output.replace("%", "/100"));
        }else if(btnValue === "AC"){
            output = "";
        }else if(btnValue === "DEL"){
            output = output.toString().slice(0, -1)
        }else{
            if(output === "" && specialChars.includes(btnValue)) return;
            output += btnValue;
        }
        result.value = output;
    }

