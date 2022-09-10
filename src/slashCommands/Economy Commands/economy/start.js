/**
 * Coded By: Abel Purnwasy
 */
 const { EmbedBuilder } = require("discord.js");
 const db = require("../../models/signup");
 const db2 = require("../../models/economy");
 const newUserBalance = 5000;
 
 module.exports = {
   name: "start",
   description: "Register to use economy commands",
   category: "economy",
 
   run: async (client, interaction) => {
 
     const user = interaction.member.user.id;
 
     const data = await db.findOne({ UserId: user });
     if (data)
       return interaction.followUp({
         embeds: [
           new EmbedBuilder()
             .setTitle(`${interaction.member.user.username}`)
             .setColor('Aqua')
             .setDescription("You are already registered lol.")
             .setTimestamp()
             .setFooter({ text: "© SXM_ABEL" }),
         ],
       });
     /**
      * Coded By: Abel Purnwasy
      */
     if (!data) {
       const Ndata1 = new db({
         UserId: user,
         UserObject: interaction.member.user,
       });
       await Ndata1.save();
 
       const Ndata2 = new db2({
         UserId: user,
         Wallet: 5000,
       });
       await Ndata2.save();
 
       return interaction.followUp({
         embeds: [
           new EmbedBuilder()
             .setTitle(
               `${interaction.member.user.username} Registered for Economy!`
             )
             .setColor('Aqua')
             .setDescription(
               `Hi, Welcome ${interaction.member.user.username}\n \`$${newUserBalance}\` has been added to your wallet.\n\n For a list of Economy commands do \`/help\` then select the economy category in the dropdown menu.`
             )
             .setTimestamp()
             .setFooter({ text: "© SXM_ABEL" }),
         ],
       });
     }
   },
 };
 /**
  * Coded By: Abel Purnwasy
  */
 