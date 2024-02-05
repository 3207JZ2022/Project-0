

const initState={
    value: "default value"
}

const reducer = (state=initState, action)=>{
    console.log("");
    console.log("reducer", state);
    console.log("reducer value", state.value);
    console.log("reducer action", action);
    switch(action.type){
        case 'send_type':
            return Object.assign({}, state, action);
            break;

        default:
            return state;
            break;

    }

}

module.exports={
    reducer
}