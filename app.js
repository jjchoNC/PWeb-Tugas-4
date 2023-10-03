function createCard(title, temperature, humidity, windSpeed, windDirection, weather) {
    var date = new Date(title.slice(4,6) + " / " + title.slice(6, 8) + " / " + title.slice(0,4) + " " + title.slice(8,10) + ":" + title.slice(10,12) + " UTC")
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" };
    return `
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Kota Surabaya</h5>
                <p class="card-text">
                    Waktu : ${date.toLocaleDateString('id-ID', options)}<br>
                    Temperature : ${temperature}&deg;C<br>
                    Humidity : ${humidity}%<br>
                    Wind speed : ${windSpeed} kph (${windDirection}&deg)<br>
                </p>
            </div>
        </div>
    </div>
            `;
}

function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var isiHTML = ``;
            var xmlDoc = this.responseXML;
            var temp = xmlDoc.getElementsByTagName("area")[34].getElementsByTagName("parameter")[5];
            var humidity = xmlDoc.getElementsByTagName("area")[34].getElementsByTagName("parameter")[0];
            var windSpeed = xmlDoc.getElementsByTagName("area")[34].getElementsByTagName("parameter")[8];
            var windDirection = xmlDoc.getElementsByTagName("area")[34].getElementsByTagName("parameter")[7];   
            var weather = xmlDoc.getElementsByTagName("area")[34].getElementsByTagName("parameter")[6];
            for (let index = 0; index < 11; index++) {
                isiHTML += createCard(temp.getElementsByTagName("timerange")[index].getAttribute("datetime"), 
                                      temp.getElementsByTagName("timerange")[index].getElementsByTagName("value")[0].textContent, 
                                      humidity.getElementsByTagName("timerange")[index].getElementsByTagName("value")[0].textContent,
                                      windSpeed.getElementsByTagName("timerange")[index].getElementsByTagName("value")[2].textContent,
                                      windDirection.getElementsByTagName("timerange")[index].getElementsByTagName("value")[0].textContent,
                                      weather.getElementsByTagName("timerange")[index].getElementsByTagName("value").textContent
                                     )
            }
            document.getElementById("hasil").innerHTML = isiHTML;
        }
    };
    xhttp.open("GET", "https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTimur.xml", true);
    xhttp.send();
}
loadXMLDoc();