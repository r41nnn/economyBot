/**
 * Coded By: Abel Purnwasy
 */
 const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
 const db = require("../../models/signup");
 
 module.exports = {
   name: "set-money",
   description: "Overrides a user balance to the amount you are stating",
   category: "economy",
   options: [
     {
       name: "amount",
       description: "amount of money to set to a user balance",
       required: true,
       type: ApplicationCommandOptionType.Number,
     },
     {
       name: "user",
       description: "user to set balance",
       required: true,
       type: ApplicationCommandOptionType.User,
     },
   ],
 
   run: async (client, interaction) => {
 
     const ownerID = process.env.ownerID;
     if (interaction.member.user.id !== ownerID)
       return interaction.followUp({
         embeds: [
           new EmbedBuilder()
             .setColor('Aqua')
             .setDescription(`Only <@${ownerID}> can use this command.`)
             .setTimestamp()
             .setFooter({ text: "© SXM_ABEL" }),
         ],
       });
     const targetUser = interaction.options.getUser("user");
     const user = targetUser.id;
     const amount = interaction.options.getNumber("amount");
 
     const data = await db.findOne({ UserId: user });
     if (!data) {
       return interaction.followUp({
         embeds: [
           new EmbedBuilder()
             .setColor("Aqua")
             .setDescription("User isn't signup for economy.")
             .setTimestamp()
             .setFooter({ text: "© SXM_ABEL" }),
         ],
       });
     }
 
     data.Wallet = amount;
     await data.save();
     const targetUserBalance = data.Wallet;
     return interaction.followUp({
       embeds: [
         new EmbedBuilder()
           .setColor("Aqua")
           .setDescription(
             `<@${user}>'s current balance has been set to \`$${amount}\`.\n <@${user}> balance is now \`$${targetUserBalance}\`.`
           )
           .setTimestamp()
           .setFooter({ text: "© SXM_ABEL" }),
       ],
     });
   },
 };
 /**
  * Coded By: Abel Purnwasy
  */
 