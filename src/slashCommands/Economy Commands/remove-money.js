/**
 * Coded By: Abel Purnwasy
 */
 const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
 const db = require("../../models/economy");
 
 module.exports = {
   name: "remove-money",
   description: "Remove money from a users's balance",
   category: "economy",
   options: [
     {
       name: "amount",
       description: "amount of money to remove from user",
       required: true,
       type: ApplicationCommandOptionType.Number,
     },
     {
       name: "user",
       description: "user to remove money from",
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
             .setColor("Aqua")
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
 
     data.Wallet = data.Wallet - amount;
     await data.save();
     const targetUserBalance = data.Wallet;
     return interaction.followUp({
       embeds: [
         new EmbedBuilder()
           .setColor("Aqua")
           .setDescription(
             `\`$${amount}\` has been removed from <@${user}>'s wallet.\n <@${user}> current balance is now \`$${targetUserBalance}\`.`
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
 