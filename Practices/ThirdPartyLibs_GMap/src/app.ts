// Code goes here!

// Because of, GOOGLE API needs a CREDIT CARD to link. We used OPEN SOURCE API (openlayer). But, it seems like not working here.

var mapElement = document.querySelector("#map")! as HTMLDivElement;

var form =document.querySelector("form")! as HTMLFormElement;
var addressElement = document.querySelector("#address")! as HTMLInputElement;

declare var ol: any;

function loadmap (event: Event) {
    event.preventDefault();
    var address = addressElement.value;
    console.log("Address : " + address);

    new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([37.41, 8.82]),
            zoom: 16
        })
    })
}

form.addEventListener("submit", loadmap);