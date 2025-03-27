import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux";
import { getToilets } from "../slices/toiletsSlice"; //廁所資料

export const useToilets = () => {
    const dispatch = useDispatch();
    const toilets = useSelector((state) => state.toilets.toilets);
    const toiletsStatus = useSelector((state) => state.toilets.status);
    const toiletsError = useSelector((state) => state.toilets.error);

    // 取得公廁資料
    useEffect(() => {

        if (toiletsStatus === 'idle') {
            dispatch(getToilets())
        }

    }, [dispatch, toiletsStatus])


    return { toilets, toiletsStatus, toiletsError }
}