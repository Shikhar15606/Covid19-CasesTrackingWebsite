function updateMap() {
    console.log("Updating map with realtime data")
    fetch("https://corona-api.com/countries")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.coordinates.latitude;
                longitude = element.coordinates.longitude;
                cases = element.latest_data.confirmed;
                country = element.name;
                population = element.population;
                updated_at = element.updated_at;
                cases_today = element.today.confirmed;
                deaths_today = element.today.deaths;
                deaths = element.latest_data.deaths;
                critical = element.latest_data.critical;
                recovered = element.latest_data.recovered;
                death_rate = element.latest_data.calculated.death_rate;
                recovery_rate=element.latest_data.calculated.recovery_rate
                if (cases>50000){
                    color = "rgb(255, 0, 0)";
                }
                if (cases>10000 && cases<=50000){
                    color = "rgb(200, 0, 0)";
                }
                if (cases>5000 && cases<=10000){
                    color = "rgb(150, 0, 0)";
                }
                if (cases>1000 && cases<=5000){
                    color = "rgb(100, 0, 0)";
                }
                if(cases>100 && cases<=1000)
                {
                    color = "yellow";
                }
                else if(cases<=100)
                {
                    color = "green";
                }

                // else{
                //     color = `rgb(${cases/4}, 0, 0)`;
                // }

                // var markerHeight = 50, markerRadius = 10, linearOffset = 25;
                // var popupOffsets = {
                //     'top': [0, 0],
                //     'top-left': [0,0],
                //     'top-right': [0,0],
                //     'bottom': [0, -markerHeight],
                //     'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                //     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                //     'left': [markerRadius, (markerHeight - markerRadius) * -1],
                //     'right': [-markerRadius, (markerHeight - markerRadius) * -1]
                //     };
                    var popup = new mapboxgl.Popup({
                        // offset:[, -50],
                        closeButton:false,
                        className:"test"
                        }
                    )
                    .setHTML(
                        "<div>" +"<h3>" + country +"</h3>" + "<h5>" +"Today Cases:" +
                        cases_today+ "</h5>" + "<h5>Today Death:" + deaths_today  + "</h5>"+
                        "<h5>Total Cases:" + cases+ "</h5>" + "<h5>Total Death:" +    
                        deaths+ "</h5>" + "<h5>Total Recovered:" +recovered+ "</h5>" +
                        "<h5> Death Rate:" + (deaths*100/cases).toFixed(2) + "</h5>" +
                        "<h5> Recovery Rate:" + (recovered*100/cases).toFixed(2) + "</h5>" +
                        "<h5> Updated At:" + updated_at.substring(0, 10)+
                        "</div>"
        
                    );
        
        
                    let marker = new mapboxgl.Marker({
                        draggable: false,
                        color: color
                        })
                        .setLngLat([longitude, latitude])
                        .addTo(map)
                        marker.setPopup(popup);
                        
                    // get the marker element
                    const myelement = marker.getElement();
                    myelement.id = 'marker'
                    // hover event listener
                    myelement.addEventListener('mouseenter', () => popup.addTo(map));
                    myelement.addEventListener('mouseleave', () => popup.remove());
            });
        })
}

updateMap();
let interval = 1000*60*60;
setInterval( updateMap, interval); 