import auth from "../../config/firebase.js";

export const getAllUsers = async (req, res) => {

    const maxResults = 10;
    const users = [];

    try {
        const listUsersResult = await auth.listUsers(maxResults)
        console.log(listUsersResult.users[0]);
        listUsersResult.users.forEach((userRecord) => {
            const { uid, email, displayName, photoURL } = userRecord;
            users.push({ uid, email, displayName, photoURL });
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
        console.log('Error listing users:', error);
    }

}

export const getUser = async (req, res) => {
    try {
        const userRecord = await auth.getUser(req.params.userId);
        const { uid, email, displayName, photoURL } = userRecord;
        res.status(200).json({ uid, email, displayName, photoURL });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};