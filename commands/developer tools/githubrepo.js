const { MessageEmbed } = require("discord.js");
const { plugin } = require("mongoose");
const fetch = require("node-fetch");

module.exports = {
name: "githubrepo",
usage: "<repoName>",
aliases: ["repo"],
cooldown: 1,
description: "search up a github repo",
run: async(client, message, args) => {
    const name = args.slice(0).join('');
    if (!name) return message.inlineReply("Please specify a github username"); // if no github username lul
    const url = `https://api.github.com/search/repositories?q=${name}`; // Uh the api

    let response;
    try {
      response = await fetch(url).then((res) => res.json());
    } catch (e) {
      return message.reply("Error", e);
    }

    const pkg = response.items[0]
    const embed = new MessageEmbed()
    .setTitle(pkg.name)
    .setColor('#37393e')
    .setURL(pkg.html_url)
    .setDescription(pkg.description)
    .addField("❯ License", pkg.license ? pkg.license : 'No License', true)
    .addField("❯ Stars", pkg.stargazers_count ? pkg.stargazers_count : 'None', true)
    .addField("❯ Watchers", pkg.watchers_count ? pkg.watchers_count : 'None', true)
    .addField("❯ Forks", pkg.forks ? pkg.forks : 'None', true)
    .addField("❯ Language", pkg.language, true)
    .setFooter('This command was made by awoken.')

    message.inlineReply(embed)

}
}