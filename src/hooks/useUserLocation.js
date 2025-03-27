import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import {setUserLocation,setLocationError,setLocationLoading} from '../slices/locationSlice'; //使用者定位

export const useUserLocation =  ()=>{
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location.userLocation);
    const status = useSelector((state) => state.location.status);
    const error = useSelector((state)=>state.location.error);

        useEffect(()=>{
            
            // 尚未開始
            if(status !== 'idle') return;

            // 載入中
            dispatch(setLocationLoading());

            // 沒有geolocation這個API的話
            if(!navigator.geolocation) {
                dispatch(setLocationError('瀏覽器不支援定位'));
                return
            }

            // 有geolocation這個API的話
            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    dispatch(setUserLocation({
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude,
                    }))
                },
                (error)=>{
                    dispatch(setLocationError(error.message));
                }
            );



        },[dispatch,status])

    return {location,status,error}
}