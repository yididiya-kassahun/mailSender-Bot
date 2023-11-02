# mailSender-Bot
this is a test bot that sends gmail from the telegram bot

Let's send email without leaving telegram!
<img width="936" alt="nodemailer_gmail" src="https://github.com/yididiya-kassahun/mailSender-Bot/assets/57259174/63fe806c-2208-4b25-b448-80b52a72a39f">



# Email Sender Telegram Bot

An Email Sender Telegram Bot developed using the `node-telegram-bot-api` library for creating a Telegram bot and `nodemailer` for sending emails directly from the Telegram platform.

## Overview

This Telegram bot allows users to send emails without leaving the Telegram app. It offers a seamless way to compose and send emails using Telegram commands. This README provides instructions on setting up and using the bot.

## Features

- Compose and send emails via Telegram.
- Specify the subject and message content for your email.

## Setup

Follow these steps to set up the Email Sender Telegram Bot:

1. Clone this repository to your local machine.

2. Install the required dependencies:
   ```bash
   npm install

1. Create a Telegram bot and get the API token. You can follow the official BotFather documentation for instructions.

2. Create a Gmail account or use an existing one to send emails through the bot.

3. Set up your Gmail account by allowing "Less secure apps" to access your account. This is required for nodemailer to send emails. Follow the instructions in your Gmail account settings.

4. Create a .env file in the project root directory and add the following variables:

```bash
TELEGRAM_BOT_TOKEN=<Your Telegram Bot API Token>
GMAIL_USER=<Your Gmail email address>
GMAIL_PASS=<Your Gmail password>
```

```bash
   npm start
```
# Usage
1. Start a chat with your bot on Telegram.

2. Use the following commands to interact with the bot:

/start: Initialize the bot.
/send: Compose and send an email.
/developer: Get developer information

# Contributions
Contributions to this project are welcome. Feel free to open issues, submit pull requests, or provide suggestions for improvements.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgments
node-telegram-bot-api
nodemailer
Telegram Bot API

# Disclaimer
Please use this bot responsibly and follow any applicable laws and guidelines when sending emails. The developers of this bot are not responsible for any misuse or abuse of the service.

Happy emailing via Telegram! 🎉

Make sure to replace `<Your Telegram Bot API Token>`, `<Your Gmail email address>`, and `<Your Gmail password>` with your actual bot token and Gmail credentials.
