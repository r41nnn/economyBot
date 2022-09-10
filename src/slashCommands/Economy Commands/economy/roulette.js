/**
 * Coded By: Abel Purnwasy
 */
 const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
 const db = require("../../models/signup");
 const db2 = require("../../models/economy");
 
 module.exports = {
   name: "roulette",
   description: "Gambling",
   category: "economy",
   options: [
     {
       name: "color",
       description: "Choose a color.",
       required: true,
       type: 3,
       choices: [
         {
           name: "Black",
           value: "black",
         },
         {
           name: "Red",
           value: "red",
         },
         {
           name: "Green",
           value: "green",
         },
       ],
     },
     {
       name: "amount",
       description: "Amount of money you want to bet.",
       required: true,
       type: ApplicationCommandOptionType.Number,
     },
   ],
 
   run: async (client, interaction) => {
 
     const user = interaction.member.user.id;
     const data = await db.findOne({ UserId: user });
     const data2 = await db2.findOne({ UserId: user });
     if (!data)
       return interaction.followUp({
         embeds: [
           new EmbedBuilder()
             .setTitle(`${interaction.member.user.username}`)
             .setColor("Aqua")
             .setDescription(
               "Looks like you're new. Use command `/start` to get started."
             )
             .setTimestamp()
             .setFooter({ text: "© SXM_ABEL" }),
         ],
       });
 
     function isOdd(num) {
       if (num % 2 == 0) return false;
       else if (num % 2 == 1) return false;
     }
 
     let color = interaction.options.getString("color");
     let amount = interaction.options.getNumber("amount");
     const userBal = data2.Wallet;
     let random = Math.floor(Math.random() * 37);
 
     const notEnough = new EmbedBuilder()
       .setTitle(`${interaction.member.user.username}`)
       .setColor("Aqua")
       .setDescription(
         `You don't have that much money in your wallet\n Your Wallet Balance is \`${userBal}\``
       )
       .setTimestamp()
       .setFooter({ text: "© SXM_ABEL" });
     if (amount > userBal)
       return interaction.followUp({ embeds: [notEnough] });
 
     const minimumLimit = new EmbedBuilder()
       .setTitle(`${interaction.member.user.username}`)
       .setColor('Aqua')
       .setDescription("Bet amount must be greater than `$50`")
       .setTimestamp()
       .setFooter({ text: "© SXM_ABEL" });
     if (amount < 50)
       return interaction.followUp({ embeds: [minimumLimit] });
 
     const maximumLimit = new EmbedBuilder()
       .setTitle(`${interaction.member.user.username}`)
       .setColor("Aqua")
       .setDescription("You must leave atleast `$10` in your wallet")
       .setTimestamp()
       .setFooter({ text: "© SXM_ABEL" });
     if (amount === userBal)
       return interaction.followUp({ embeds: [maximumLimit] });
 
     if (color == "black") color = 0;
     else if (color == "red") color = 1;
     else if (color == "green") color = 2;
     /**
      * Coded By: Abel Purnwasy
      */
     //green
     if (random == 0 && color == 2) {
       amount *= 15;
       data2.Wallet = data2.Wallet + amount;
       await data2.save();
 
       const userNewBal = data2.Wallet;
 
       const moneyEmbed1 = new EmbedBuilder()
         .setTitle(`${interaction.member.user.username} Congrats!`)
         .setColor("Aqua")
         .setDescription(
           `You Won \`$${amount}\`\n Multiplier: 15x\n\n Your Wallet Balance is now \`${userNewBal}\``
         )
         .setTimestamp()
         .setFooter({ text: "© SXM_ABEL" });
        interaction.followUp({ embeds: [moneyEmbed1] });
       /**
        * Coded By: Abel Purnwasy
        */
       // red
     } else if (isOdd(random) && color == 1) {
       money = money * 1.5;
       data2.Wallet = data2.Wallet + amount;
       await data2.save();
 
       const userNewBal = data2.Wallet;
 
       const moneyEmbed2 = new EmbedBuilder()
         .setTitle(`${interaction.member.user.username} Congrats!`)
         .setColor("Aqua")
         .setDescription(
           `You Won \`$${amount}\`\n Multiplier: 1.5x\n\n Your Wallet Balance is now  \`${userNewBal}\``
         )
         .setTimestamp()
         .setFooter({ text: "© SXM_ABEL" });
        interaction.followUp({ embeds: [moneyEmbed2] });
       /**
        * Coded By: Abel Purnwasy
        */
       // black
     } else if (!isOdd(random) && color == 0) {
       amount = amount * 2;
       data2.Wallet = data2.Wallet + amount;
       await data2.save();
 
       const userNewBal = data2.Wallet;
 
       const moneyEmbed3 = new EmbedBuilder()
         .setTitle(`${interaction.member.user.username} Congrats!`)
         .setColor("Aqua")
         .setDescription(
           `You Won \`$${amount}\`\n Multiplier: 2x\n\n Your Wallet Balance is now \`${userNewBal}\``
         )
         .setTimestamp()
         .setFooter({ text: "© SXM_ABEL" });
        interaction.followUp({ embeds: [moneyEmbed3] });
     } else {
       data2.Wallet = data2.Wallet - amount;
       await data2.save();
 
       const userNewBal = data2.Wallet;
 
       const moneyEmbed4 = new EmbedBuilder()
         .setTitle(`${interaction.member.user.username} Unlucky!`)
         .setColor('Aqua')
         .setDescription(
           `You lost \`$${amount}\`\n Multiplier: 0x\n\n Your Wallet Balance is now \`${userNewBal}\``
         )
         .setTimestamp()
         .setFooter({ text: "© SXM_ABEL" });
        interaction.followUp({ embeds: [moneyEmbed4] });
     }
   },
 };
 /**
  * Coded By: Abel Purnwasy
  */
 