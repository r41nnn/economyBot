/**
 * Coded By: Abel Purnwasy
 */
 const { EmbedBuilder } = require("discord.js");
 const db = require("../../models/signup");
 const db2 = require("../../models/economy");
 
 module.exports = {
   name: "balance",
   description: "Show your current balance",
   category: "economy",
 
   run: async (client, interaction) => {
 
     const user = interaction.member.user.id;
 
     const data = await db.findOne({ UserId: user });
     if (!data)
       return interaction.followUp({
         embeds: [
           new EmbedBuilder()
             .setTitle(`${interaction.member.user.tag}`)
             .setColor("Aqua")
             .setDescription(
               "Looks like you're new. Use command `/start` to get started."
             )
             .setTimestamp()
             .setFooter({ text: "© SXM_ABEL" }),
         ],
       });
     const data2 = await db2.findOne({ UserId: user });
     let walletBalance = data2.Wallet;
     if (walletBalance === null) walletBalance = 0;
     const username = interaction.member.user.username;
      interaction.followUp({
       embeds: [
         new EmbedBuilder()
           .setTitle(`${username}'s Balance`)
           .setColor("Aqua")
           .setDescription(`Wallet Balance: \`$${walletBalance}\``)
           .setTimestamp()
           .setFooter({ text: "© SXM_ABEL" }),
       ],
     });
   },
 };
 /**
  * Coded By: Abel Purnwasy
  */
 