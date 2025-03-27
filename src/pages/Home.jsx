import React, { useEffect, useState } from "react"
import L from 'leaflet';
// 自訂義hook
import { useToilets } from "../hooks/useToilets";
import { useUserLocation } from "../hooks/useUserLocation";

export default function Home() {

    const { location, status, error } = useUserLocation();
    const { toilets, toiletsStatus, toiletsError } = useToilets();
    const [suggestionToilets, setSuggestionToilets] = useState([]);

    // 篩選附近站點10筆
    useEffect(() => {
        if (!location || toilets.length === 0) return; // 資料還沒來，不做事
        countDistance();
    }, [toilets, location])

    const countDistance = () => {
        const allDistance = toilets.map((item) => ({
            ...item,
            distance: L.latLng(location.latitude, location.longitude).distanceTo(
                L.latLng(item.latitude, item.longitude),
            ),
        }));

        setSuggestionToilets(
            allDistance.sort((a, b) => a.distance - b.distance).slice(0, 20),
        );
    };

    return (
        <div className="container">
            <h2 className="mt-3">在你附近的公共廁所</h2>
            {location && <p>你的位置是：{location.latitude},{location.longitude}</p>}
            <div className="row justify-content-between">
                {suggestionToilets.map((item) => (
                    <div className="col-3"  key={item.number}>
                        <div className="card mb-3">
                            <div className="card-body">
                                <p className="card-text">廁所名稱：{item.name}</p>
                                <p className="card-text">廁所地址：{item.address}</p>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}