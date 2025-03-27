import React from "react"
import { useEffect } from 'react';
// 地圖相關套件
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
// Mark圖示
import mapMark from '../assets/toilet-bowl.png'
// 自訂義hook
import { useToilets } from "../hooks/useToilets";
import { useUserLocation } from "../hooks/useUserLocation";

export default function Map() {
    const { toilets, toiletsStatus , toiletsError } = useToilets();
    const { location , status, error }=useUserLocation();

    // 自訂Icon
    const createCustomIcon = () => {
        return L.icon({
            iconUrl:mapMark,
            iconSize: [40, 41], // 調整圖標大小
            iconAnchor: [20, 41], // 調整圖標的錨點
            popupAnchor: [0, 0], // 調整彈出視窗位置
            className:'custom-marker',
        });
    };

    return (
        <>

            <MapContainer center={location ? [location.latitude,location.longitude] : [25.03755867226239, 121.51723448899627]} zoom={13} scrollWheelZoom={true} style={{ height: "700px", width: "100%" }}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    attribution="Positron">
                </TileLayer>

                {toilets.length > 0 && toilets.map((item) => (
                    <Marker position={[item.latitude, item.longitude]} key={item.number} icon={createCustomIcon()}>

                        <Popup>
                            {item.name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>

    )
}