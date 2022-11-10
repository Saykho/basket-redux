import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ShopCreators from "../store/action-creators"

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ShopCreators, dispatch);
}