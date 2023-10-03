function createCard(title, temperature, humidity, windSpeed, windDirection, weather) {
    var date = new Date(title.slice(4, 6) + " / " + title.slice(6, 8) + " / " + title.slice(0, 4) + " " + title.slice(8, 10) + ":" + title.slice(10, 12) + " UTC")
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" };
    var logo;
    if(weather == '0')
    {
        logo = "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-am.png"
    }
    else
    {
        logo = "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah%20berawan-am.png"
    }
    return `
    <div class="col-12 col-sm-4 col-md-3 mb-3">
        <div class="shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center text-left">
                    <div class="col">
                        <div class="font-weight-bold text-primary mb-2 h4">Kota Surabaya</div>
                        <div class="h6 mb-2 font-weight-Fbold text-gray-800">
                            <b>Waktu</b> : ${date.toLocaleDateString('id-ID', options)}
                        </div>
                        <div class="h6 mb-2 font-weight-Fbold text-gray-800">
                            <b>Temperatur</b> : ${temperature}&deg;C<br>
                        </div>
                        <div class="h6 mb-2 font-weight-Fbold text-gray-800">
                            <b>Kelembapan</b> : ${humidity}%
                        </div>
                        <div class="h6 mb-2 font-weight-Fbold text-gray-800">
                            <b>Angin</b> : ${windSpeed} kph (${windDirection}&deg)
                        </div>
                    </div>
                    <div class="col-auto text-right">
                        <img src=${logo} alt="Placeholder Image" class="img-fluid" style="width: 75%;">
                </div>
                </div>
            </div>
        </div>
    </div>
`
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
                    weather.getElementsByTagName("timerange")[index].getElementsByTagName("value")[0].textContent
                )
            }
            document.getElementById("hasil").innerHTML = isiHTML;
        }
    };
    xhttp.open("GET", "https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTimur.xml", true);
    xhttp.send();
}
loadXMLDoc();