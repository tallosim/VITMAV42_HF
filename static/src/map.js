/// <reference path='./../../typings/index.d.ts' />

var tile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGFsbG9zaW0iLCJhIjoiY2s5MXRrY3l4MDE0YjNtbzN2bzFheG1kOSJ9.lIaNhU10l-a4t6qTDh_HzQ', { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, })
var map = L.map('map', { center: [47.497798, 19.040324], zoom: 13, layers: [tile], zoomControl: false })

var layerGroup = L.layerGroup().addTo(map)

fetch('/location').then(res => res.text().then(text => JSON.parse(text)).then(data => addPics(data)))

map.on('contextmenu', e => {
    window.location.assign(`/location/new?lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
})


function addPics(response) {
    const markers = response.locations.map(pic => {
        const marker = new L.Marker([pic.lat, pic.lon], {title: pic.name})
        const popup = new L.Popup({ closeButton: false}).setContent(`
        <div class='popup-container'>
            <a href='${pic.url}'><img class='img' src='${pic.url}' /></a>
            <p class='img-name'>${pic.name}</p>
            <p class='img-date'>${new Date(pic.captureDate).toLocaleDateString()}</p>
            <p class='img-author'>Author: <b>${pic._author.name}</b></p>
            <span><i>${pic.desc}</i></span>
            ${response.loggedUserID == pic._author._id ? `</br><a class='btn btn-edit' href='/location/edit/${pic._id}'><i class='fa fa-edit'></i> Edit</a>` : ''}
        </div>`)
        marker.bindPopup(popup)
        return marker
    })
    markers.map(marker => marker.addTo(layerGroup))
}