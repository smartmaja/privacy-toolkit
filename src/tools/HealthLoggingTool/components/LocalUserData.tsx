// Import the UserData.json file as a JSON object
import UserData from '../data/UserData.json';

let LocalUserData = UserData;

const setLocalUserData = (data: any) => {
    LocalUserData = data;
    console.log("Local user data updated:", LocalUserData);
}

const getLocalUserData = () => {
    console.log("Local user data accessed:", LocalUserData);
    return LocalUserData;
}

export { setLocalUserData, getLocalUserData };
