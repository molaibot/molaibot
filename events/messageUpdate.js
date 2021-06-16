module.exports = (client, oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    
    client.msgLogs({
        Member: `${newMessage.author.tag}`,
        Action: `Message Editted`,
        OldContent: `${oldMessage}`,
        NewContent: `${newMessage}`
    }, newMessage);
}