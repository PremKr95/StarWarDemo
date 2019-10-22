export const USER_DATA = 'USER_DATA'

export default(action={
    FETCH_USER_DATA:"FETCH_USER_DATA",
    FETCH_USER_DATA_SAGA:"FETCH_USER_DATA_SAGA",
    fetchUserData:(payloadUserName,payloadPassword)=>({
        type:action.FETCH_USER_DATA_SAGA,
        userName:payloadUserName,
        password:payloadPassword
    }),

    PLANET_LIST:"PLANET_LIST",
    PLANET_LIST_SAGA:"PLANET_LIST_SAGA",
    fetchSearchData:(data)=>({
        type:action.PLANET_LIST_SAGA,
        data:data
    }),
})
