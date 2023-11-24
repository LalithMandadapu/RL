// Relay button(power supply)
document.addEventListener('DOMContentLoaded', function () {

    let btn = document.getElementById('On');
    const slider = document.getElementById("myRange");
    
    if(btn) {
        btn.addEventListener('click', function() {
            slider.disabled=false;
            btn.style.backgroundColor = 'lightgreen';
            btn.disabled=true;
            const authToken = "Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh";
            const virtualpin  = "v2";
            
            const url = `https://blynk.cloud/external/api/update?token=${authToken}&${virtualpin}=1`;
            
            fetch(url)
            .then(response => {
                if (response.ok) {
                    console.log('Supply ON');                 

                } else {
                    console.log('Supply ON Failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});


// Variac Position
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById("myRange");
    const resetButton = document.getElementById("reset");
    const recalButton = document.getElementById("recal")

    slider.addEventListener('input', function () {
        slider.disabled=true;
        const sliderValue = slider.value;
        updateBlynkSliderValue(sliderValue);
    });

    if (resetButton && recalButton) {
        resetButton.addEventListener('click', function () {
            slider.value = 0;
            console.log('Resetdone');
        });

        recalButton.addEventListener('click', function () {
            slider.disabled=false;
            slider.value = 0;
            console.log('Recalibrated');
        });
    }
    recalButton.disabled=true;

    function updateBlynkSliderValue(newValue) {
        recalButton.disabled=false;
        const authToken = "Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh";
        const virtualpin = "v0";

        const url = `https://blynk.cloud/external/api/update?token=${authToken}&${virtualpin}=${newValue}`;

        fetch(url)
            .then(response => response.text())
            .then(data => {
                console.log(`variac position changed note the observations from table-1.`);
            })
            .catch(error => {
                console.error('Error Updating Variac Position', error);
            });
    }
});



//Table1 (Observations)
document.addEventListener('DOMContentLoaded', function() {
    function fetchDataAndUpdate(){
    fetch("https://blynk.cloud/external/api/get?token=Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh&v3")
    .then(response => response.json())
    .then(data => {
       
        const table = document.getElementById('table1');

        // Update the table cells
        const rows = table.getElementsByTagName('tr');
        if (rows.length > 1) { 
            let secondRow = rows[1];
            secondRow.cells[0].textContent = data;
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });

    fetch("https://blynk.cloud/external/api/get?token=Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh&v6")
    .then(response => response.json())
    .then(data => {
       
        const table = document.getElementById('table1');

        // Update the table cells
        const rows = table.getElementsByTagName('tr');
        if (rows.length > 1) { 
            let secondRow = rows[1];
            secondRow.cells[1].textContent = data;
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });

    fetch("https://blynk.cloud/external/api/get?token=Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh&v4")
    .then(response => response.json())
    .then(data => {
        
        const table = document.getElementById('table1');

        
        const rows = table.getElementsByTagName('tr');
        if (rows.length > 1) { 
            let secondRow = rows[1];
            secondRow.cells[2].textContent = data;
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}
fetchDataAndUpdate();
    setInterval(fetchDataAndUpdate, 1000);
});


//Table2 calculations

document.addEventListener('DOMContentLoaded', function() {
    
    
    function computeWsc(Isc, R02) {
        return Isc * Isc * R02;
    }

    function computeR02(Wsc, Isc) {
        if (Isc === 0) return 0;
        return Wsc / (Isc * Isc);
    }

    function computeZ02(Vsc, Isc) {
        if (Isc === 0) return 0;
        return Vsc / Isc;
    }

    function computeX02(Z02, R02) {
        const value = Z02 * Z02 - R02 * R02;
        return value >= 0 ? Math.sqrt(value) : 0;
    }

    function transformerRatio(primaryVoltage, secondaryVoltage) {
        if (secondaryVoltage === 0) return 0;
        return primaryVoltage / secondaryVoltage;
    }

    function computeR01(R02, K) {
        if (K === 0) return 0;
        return R02 / (K * K);
    }

    function computeX01(X02, K) {
        if (K === 0) return 0;
        return X02 / (K * K);
    }

    function computeZ01(R01, X01) {
        return Math.sqrt(R01 * R01 + X01 * X01);
    }


    const outputTable = document.getElementById('table2');

    if (!outputTable) {
        console.error("Output table is missing!");
        return;
    }

    function performCalculationsAndAppend() {
        Promise.all([
            fetch("https://blynk.cloud/external/api/get?token=Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh&v3").then(response => response.json()),
            fetch("https://blynk.cloud/external/api/get?token=Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh&v6").then(response => response.json()),
            fetch("https://blynk.cloud/external/api/get?token=Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh&v4").then(response => response.json())
        ]).then(([Vsc, Isc, Wsc]) => {
            console.log('Fetched values:', Vsc, Isc, Wsc);
        
            const R02 = computeR02(Wsc, Isc);
            const Z02 = computeZ02(Vsc, Isc);
            const X02 = computeX02(Z02, R02);
        
            Wsc = computeWsc(Isc, R02);  
            const primaryVoltage = 230;  
            const secondaryVoltage = 115; 
            const K = transformerRatio(primaryVoltage, secondaryVoltage);
        
            const R01 = computeR01(R02, K);
            const X01 = computeX01(X02, K);
            const Z01 = computeZ01(R01, X01);
            

            const outputRows = outputTable.rows;

            if (outputRows.length < 3) {
                console.error("Not enough rows in output table!");
                return;
            }

            outputRows[2].cells[0].textContent = R02.toFixed(2);
            outputRows[2].cells[1].textContent = X02.toFixed(2);
            outputRows[2].cells[2].textContent = Z02.toFixed(2);
            outputRows[2].cells[3].textContent = R01.toFixed(2);
            outputRows[2].cells[4].textContent = X01.toFixed(2);
            outputRows[2].cells[5].textContent = Z01.toFixed(2);

            console.log('Computed values:', R02, X02, Z02, R01, X01, Z01, K);
        });
    }

    performCalculationsAndAppend();
    setInterval(performCalculationsAndAppend, 2000);
});

//Exit
document.addEventListener('DOMContentLoaded', function () {

    let btn = document.getElementById('reset');
    
    if(btn) {
        btn.addEventListener('click', function() {
            const authToken = "Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh";
            var virtualpin = "v2";
            
            const url = `https://blynk.cloud/external/api/update?token=${authToken}&${virtualpin}=1`;
            
            fetch(url)
            .then(response => {
                if (response.ok) {
                    console.log('EXITING...');
                    location.replace("home.html");
                    const url = `https://blynk.cloud/external/api/update?token=${authToken}&${virtualpin}=0`;
                    return fetch(url)
                } else {
                    console.error('FAILED TO EXIT');
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log('SUPPLY OFF');
                } else {
                    console.log('SUPPLY OFF FAILED');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});

//RECALIBRATE
document.addEventListener('DOMContentLoaded', function () {
    let recalButton = document.getElementById('recal');

    if (recalButton) {
        recalButton.addEventListener('click', function () {
            const authToken = "Ww-Kf8XJeNW2Aqspihvw3KxPLs0A2xDh";
            var virtualpin = "v1";

            const url = `https://blynk.cloud/external/api/update?token=${authToken}&${virtualpin}=1`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        console.log('RECALIBRATED');
                        setTimeout(function () {
                            const resetUrl = `https://blynk.cloud/external/api/update?token=${authToken}&${virtualpin}=0`;
                            fetch(resetUrl)
                                .then(response => {
                                    if (response.ok) {
                                        console.log('Variac Updated');
                                    } else {
                                        console.error('Error Updating Variac');
                                    }
                                })
                        }, 200);
                    } else {
                        console.log('Error RECALIBRATION');
                    }
                });
        });
    }
});


