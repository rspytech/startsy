const sendNotification = async (token, tittle, message) => {
    console.log(token);
    console.log(tittle);
    console.log(message);

    var response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            // to: `${receiverIdToken.notificationToken}`,
            to: token,
            sound: "default",
            title: tittle,
            body: message,
            data: { someData: "goes here" },
            priority: "high",
            image: "https://res.cloudinary.com/dwr0lvk84/image/upload/v1742321914/pfbgdsl5r34m0cj1akoq.jpg",

            android: {
                channelId: "preview", // Make sure this matches the channel you've created
                priority: "high", // Ensure it's a high priority notification
                visibility: "public", // Adjust visibility to show more content
                vibrate: [500, 500],
            },
        }),
    });
    var data = await response.json();
    return data;
};

export default sendNotification;
