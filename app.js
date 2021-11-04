const Telegraf = require('telegraf')
const bot = new Telegraf.Telegraf('2005286376:AAE3DflFq1-eGmk-ww8uK0QbeUTRS6Lj3XA')

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(
        ctx.chat.id,
        'salve',
        {}
    )
})

bot.hears('animals', ctx =>{
    console.log(ctx.from)
    let animalMessage = `A seguir algumas imagens de animais`
    ctx.deleteMessage()
    bot.telegram.sendMessage(
        ctx.chat.id,
        animalMessage,
        {
            reply_markup:{
                inline_keyboard:[
                    [
                        {   
                            text: "pig",
                            callback_data: 'pig'
                        },
                        {
                            text: "owl",
                            callback_data: 'owl'
                        }
                    ],
                ]
            }
        }
    )
})

bot.action('pig', ctx =>{
    bot.telegram.sendPhoto(
        ctx.chat.id,
        {
            source: "res/card_pig.png"
        }
    )
})

bot.action('owl', ctx =>{
    bot.telegram.sendPhoto(
        ctx.chat.id,
        {
            source: "res/card_owl.png"
        }
    )
})

bot.hears('phone', ctx =>{
    console.log(ctx.from.first_name)
    bot.telegram.sendMessage(
        ctx.chat.id,
        'Podemos acessar o seu número de telefone?',
        requestPhoneKeyboard
    )
})

bot.hears('location', ctx =>{
    console.log(ctx.from.first_name)
    bot.telegram.sendMessage(
        ctx.chat.id,
        'Podemos acessar sua localização?',
        requestLocationKeyboard
    )
})

const requestPhoneKeyboard = {
    "reply_markup" : {
        "one_time_keyboard": true,
        "keyboard": [
            [
                {
                    text: "Meu número de telefone",
                    request_contact: true,
                    "one_time_keyboard": true
                }    
        ],
        ["Cancel"]
    ]
    }
}

const requestLocationKeyboard = {
    "reply_markup" : {
        "one_time_keyboard": true,
        "keyboard": [
            [
                {
                    text: "Minha localização",
                    request_location: true,
                    "one_time_keyboard": true
                }    
        ],
        ["Cancel"]
    ]
    }
}

bot.launch()