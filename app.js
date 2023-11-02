const nodemailer = require('nodemailer');
const TelegramBot = require("node-telegram-bot-api");
const TOKEN =
  process.env.TELEGRAM_TOKEN || "";


const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "",
          pass: "", 
        },
    //   auth: { pjby qlox pmyv qfyq
    //     api_key:
    //       "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",
    //   },
    });

// ************* Bot
const bot = new TelegramBot(TOKEN, { polling: true });

// Define a conversation state object to store user inputs
const conversationState = {};

function startMenu(msg) {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "✉️ send mail " }, { text: "👨🏽‍💻 developer" }],
          [{ text: "Back" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }),
    };
    bot.sendMessage(msg.chat.id, " start menu ", opts);
  }
  
  bot.onText(/start/, (msg) => {
    startMenu(msg);
  });

bot.onText(/send mail/, (msg) => {
    startConversation(msg);
});

function startConversation(msg) {
    // Initialize the conversation state for the user
    conversationState[msg.chat.id] = {
        step: 1, // Current step in the conversation
        receiverMail: "",
        subject: "",
        body: "",
    };

    askReceiverMail(msg.chat.id);
}

function askReceiverMail(chatId) {
    bot.sendMessage(chatId, "Enter the receiver mail:", {
        reply_markup: { force_reply: true },
    });
}

function askSubject(chatId) {
    bot.sendMessage(chatId, "Enter the mail subject:", {
        reply_markup: { force_reply: true },
    });
}

function askBody(chatId) {
    bot.sendMessage(chatId, "Enter the mail body:", {
        reply_markup: { force_reply: true },
    });
}

// Handle user replies
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userState = conversationState[chatId];

    if (userState) {
        switch (userState.step) {
            case 1:
                userState.receiverMail = msg.text;
                userState.step++;
                askSubject(chatId);
                break;
            case 2:
                userState.subject = msg.text;
                userState.step++;
                askBody(chatId);
                break;
            case 3:
                userState.body = msg.text;

                // You now have all the user inputs in userState
                const { receiverMail, subject, body } = userState;
                // Do something with the inputs, e.g., send the email

               confrimData(msg,chatId,receiverMail,subject,body,(result) => {
                console.log("Result: " + result);

                if(result){
                    const mailResult = sendMail(receiverMail,subject,body);
                    bot.sendMessage(chatId,'Loading ... ');
     
                    setTimeout(()=>{
                        bot.sendMessage(chatId, mailResult);
                    },4000);
 
                }else{
 
                 bot.sendMessage(chatId,'Email calceled');
                 //bot.stopPolling();
                }
              });
                
                // Clear the conversation state
                delete conversationState[chatId];

                break;
        }
    }
   
});

function sendMail(receiverMail,subject,body){
   // console.log(receiverMail,subject,body);  
    try{
        transporter.sendMail({
            to: receiverMail,
            from: "yididiya.tech@gmail.com",
            subject: subject,
            text: body
          });
         return "Email sent successfuly";
   
    }catch(err){
        throw err;
    }
}

function confrimData(msg,chatId,receiverMail,subject,body,callback){

    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
        inline_keyboard: 
        [
            [{ text: 'Cancel',callback_data: 'Cancel' }, { text: 'Send',callback_data: 'Send' }]
        ]
    })
  };

  bot.sendMessage(chatId,'Receiver Email: \n'+receiverMail +'\n\n Subject:\n'+subject+'\n\n Message: \n'+body,opts);

  bot.on('callback_query', (query) => {
    if (query.data === 'Cancel') {
      callback(false);
    } else if (query.data === 'Send') {
      callback(true);
    }
  });
}

bot.onText(/developer/, (msg) => {
    bot.sendMessage(msg.chat.id, "Developed By: Yididiya Kassahun\n\n ");
  });
  
  bot.onText(/back/, (msg) => {
    startMenu(msg);
  });
