/**
 * Coded By: Abel Purnwasy
 */
 const { EmbedBuilder } = require("discord.js");
 const ms = require("parse-ms");
 const db = require("../../models/signup");
 const db2 = require("../../models/economy");
 
 module.exports = {
   name: "work",
   description: "Work and get money, you can go to work every hour",
   category: "economy",
 
   run: async (client, interaction) => {
 
     const user = interaction.member.user.id;
 
     const data = await db.findOne({ UserId: user });
     if (!data)
       return interaction.followUp({
         embeds: [
           new EmbedBuilder()
             .setTitle(`${interaction.member.user.username}`)
             .setColor("Aqua")
             .setDescription(
               "**Looks like you're new. Use command `/start` to get started.**"
             )
             .setTimestamp()
             .setFooter({ text: "© SXM_ABEL" }),
         ],
       });
     const data2 = await db2.findOne({ UserId: user });
     let workCooldown = 3600000;
     let workCooldownUser = data2?.Work;
 
     if (
       workCooldownUser !== null &&
       workCooldown - (Date.now() - workCooldownUser) > 0
     ) {
       let time = ms(workCooldown - (Date.now() - workCooldownUser));
 
       let timeEmbed = new EmbedBuilder()
         .setTitle(`${interaction.member.user.username}`)
         .setDescription(
           `You recently worked aren't you tired? \nYou can work again in \`${time.minutes}m\` \`${time.seconds}s\` `
         )
         .setColor("Aqua")
         .setTimestamp()
         .setFooter({ text: "© SXM_ABEL" });
        interaction.followUp({ embeds: [timeEmbed] });
     } else {
       let jobs = [
         "Real Estate Agent",
         "Engineer",
         "Pilot",
         "Scientist",
         "Programmer",
         "Chef",
         "Construstion Worker",
         "Mechanic",
         "Waiter",
         "Bartender",
         "Police Officer",
         "Uber Driver",
         "Taxi Driver",
         "Bus Driver",
         "Doctor",
         "Pharmacist",
       ];
       let jobResult = Math.floor(Math.random() * jobs.length);
       let payAmount = Math.floor(Math.random() * 1000) + 1;
       const oldWalletBal = data2.Wallet;
 
       data2.Wallet = data2.Wallet + payAmount;
       data2.Work = Date.now();
       await data2.save();
 
       const newWalletBal = data2.Wallet;
 
       const workEmbed = new EmbedBuilder()
         .setTitle(`${interaction.member.user.username}`)
         .setColor("Aqua")
         .setDescription(
           `You worked as a \`${jobs[jobResult]}\` and earned \`$${payAmount}\`\nYour Wallet Balance was \`$${oldWalletBal}\`\n Your Wallet Balance is now \`$${newWalletBal}\``
         )
         .setTimestamp()
         .setFooter({ text: "© SXM_ABEL" });
        interaction.followUp({ embeds: [workEmbed] });
     }
   },
 };
 /**
  * Coded By: Abel Purnwasy
  */
 