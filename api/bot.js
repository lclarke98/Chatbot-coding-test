
//object structure
//{'id': '', "messages": [{'sender':'', 'message':'', 'timeStamp':''}]}

let users = []

/**
 * Would create a new chat and save to db
 * @returns {Promise<{messages: [], id: string}>}
 */
async function startChatSession(){
    console.log("test")
    let conversation = {'id': '2', "messages": []}
    users.push(conversation)
    return conversation
}

/**
 * Would validate message sender using the userID and could also use a form of slugID for the chat session
 * @param userID
 * @param message
 * @returns {Promise<boolean>}
 */
async function validateMessage(userID, message){
    console.log('line 15: ' + userID)
    console.log(users)
    for (let i = 0; i < users.length; i++){
        if (users[i].id === userID) {
            console.log(users[i])
            return true
        }
    }
}

/**
 * Used to handle the dataflow of the messages
 * @param userID
 * @param message
 * @returns {Promise<string|*>}
 */
async function handleChatSession(userID, message){
    let verification = await validateMessage(userID, message)
    if (verification === true){
        await storeMessage(userID, userID, message)
        let response = await generateResponse(userID,message)
        await storeMessage(userID, 'BOT', response)
        return getMessages(userID)
    }else{
        let error = "unable to verify chat session"
        return error
    }
}

/**
 * Use to store the messages
 * @param userID
 * @param sender
 * @param message
 * @returns {Promise<void>}
 */
async function storeMessage(userID, sender, message){
    if (sender == null){
        sender = userID
    }
    for (let i = 0; i < users.length; i++){
        if (users[i].id === userID){
            let entry = {'sender': sender, 'message': message, 'timeStamp':''}
            users[i].messages.push(entry)
        }
    }
}

/**
 * Used to generate the response to user message, could also be as an eternal module
 * @param message
 * @returns {Promise<string>}
 */
async function generateResponse(message){
    let response = "next message from bot"
    return response
}

/**
 * Get all messages for a specific chat
 * @param userID
 * @returns {*}
 */
function getMessages(userID){
    for (let i = 0; i < users.length; i++){
        if (users[i].id === userID){
            return users[i]
        }
    }
}

/**
 * removes a selected message
 * @param userId
 * @param message
 * @returns {Promise<void>}
 */
async function removeMessage(userId, message){
    for (let i = 0; i < users.length; i++){
        if (users[i].id === userID){
            if (users[i].messages.contains(message)){
                users[i].messages.pop(message)
            }
        }
    }
}


module.exports = {
    handleChatSession,
    startChatSession,
    removeMessage
}