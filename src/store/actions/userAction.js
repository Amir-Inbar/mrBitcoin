import { userService } from "../../services/userService";

export function getUser(name) {
    return async (dispatch) => {
        try{
            const user = await userService.getUser(name)
            dispatch({type:'GET_USER',user})
        }catch(err){
            console.log(err);
        }
    }
}
export function signOut() {
    return  (dispatch) => {
        try{
             userService.signout()
            dispatch({type:'SIGN_OUT'})
        }catch(err){
            console.log(err);
        }
    }
}
export function addMove(contact,amount) {
    return async (dispatch) => {
        try{
            const user = userService.addMove(contact,amount)
            dispatch({type:'GET_USER',user})
        }catch(err){
            console.log(err);
        }
    }
}
