/// <reference path='./../../typings/index.d.ts' />

var tile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGFsbG9zaW0iLCJhIjoiY2s5MXRrY3l4MDE0YjNtbzN2bzFheG1kOSJ9.lIaNhU10l-a4t6qTDh_HzQ', { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, })
var map = L.map('map', { center: [47.497798, 19.040324], zoom: 13, layers: [tile], zoomControl: false })

var layerGroup = L.layerGroup().addTo(map)

fetch('/location').then(res => res.text().then(text => JSON.parse(text)).then(data => addPics(data)))

map.on('contextmenu', e => {
    const modal = document.getElementById('_popover')
    fetch('/location/new').then(res => res.text().then(text => {
        modal.innerHTML += text
        modal.style.display = 'block'
    }))
})


function addPics(pics) {
    const markers = pics.map(pic => {
        const marker = new L.Marker([pic.lat, pic.lon])
        const popup = new L.Popup({ closeButton: false, minWidth: 300 }).setContent(`
        <div class='popup-container'>
            <img class='img' src='${pic.url}' />
            <p class='img-name'>${pic.name}</p>
            <p class='img-date'>${new Date(pic.captureDate).toLocaleDateString()}</p>
            <p class='img-author'>Author: <b>${pic._author.name}</b></p>
        </div>`)
        marker.bindPopup(popup)
        return marker
    })
    markers.map(marker => marker.addTo(layerGroup))
}