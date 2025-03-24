import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import mapMark from './assets/toilet-bowl.png'

function App() {

  const [toilets, setToilets] = useState([]);//儲存公共廁所資料

  useEffect(() => {
    // 執行取得公共廁所資料
    getToilet()
  }, [])

  // 打公共廁所API
  const getToilet = async () => {
    try {
      const response = await axios.get('https://data.moenv.gov.tw/api/v2/fac_p_07?api_key=9e565f9a-84dd-4e79-9097-d403cae1ea75&limit=1000&sort=ImportDate%20desc&format=JSON')
      setToilets(response.data.records);
    } catch (error) {
      console.log(error)
    }
  }

  const createCustomIcon = () => {
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="text-align: center;width:max-content">
                <img src=${mapMark} style='margin:0 auto' />
             </div>`,
      iconSize: [40, 41], // 調整圖標大小
      iconAnchor: [20, 41], // 調整圖標的錨點
      popupAnchor: [0, -41], // 調整彈出視窗位置
    });
  };

  return (
    <>
      <div className='container'>
        <h1>廁所地圖</h1>
        <MapContainer center={[25.03755867226239, 121.51723448899627]} zoom={13} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution="Positron">
          </TileLayer>

          {toilets.length > 1 && toilets.map((item) => (
            <Marker position={[item.latitude, item.longitude]} key={item.number} icon={createCustomIcon()}>

              <Popup>
                {item.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  )
}

export default App
