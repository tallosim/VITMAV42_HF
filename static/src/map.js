/// <reference path='./../../typings/index.d.ts' />

var tile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGFsbG9zaW0iLCJhIjoiY2s5MXRrY3l4MDE0YjNtbzN2bzFheG1kOSJ9.lIaNhU10l-a4t6qTDh_HzQ', { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, })
var map = L.map('map', { center: [47.497798, 19.040324], zoom: 13, layers: [tile], zoomControl: false })

var layerGroup = L.layerGroup().addTo(map)

fetch('https://picsum.photos/v2/list').then(res => res.text().then(text => JSON.parse(text)).then(data => addPics(data)))

function addPics(pics) {
    const markers = pics.map(pic => {
        const marker = new L.Marker([getRandomInRange(47.4, 47.6, 6), getRandomInRange(18.939, 19.233, 6)])
        const popup = new L.Popup({ closeButton: false, minWidth: 300 }).setContent(`
        <div class='popup-container'>
            <img src='https://picsum.photos/id/${pic.id}/300/200' />
            <p class='img-name'>${'Amazing location'}</p>
            <p class='img-date'>${'2020/09/30'}</p>
            <p class='img-author'>Author: <b>${pic.author}</b></p>
        </div>`)
        marker.bindPopup(popup)
        return marker
    })
    markers.map(marker => marker.addTo(layerGroup))
}


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1
}