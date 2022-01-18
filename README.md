## What is this?
This is a Slack bot, based on Zapier.

## What is it for?
By using commands, which can be observed in App Manifest.yml it takes your entered data to googlesheet then sends it back to the specified slack channel. Then it separates it according to the prefixes. Finally it checks whether it got a checked reaction or not. If it does, it deletes it from second and third sheets, but keeps it in the first just in case.

## Slack Configuration
To enable this bot, you must first create a slack application and manage it's manifest file, please check the link below to understan basic principles.
Link: https://api.slack.com/scopes
You also need to copy paste App Manifest.yml content to your own slack applications app manifest section. These are the authorizations you need to give to your own bot. Basically you need slack bot token, web hook link and the channel ID (which can be obtained from your desktop slack app). You can see how they should look from this project. But make sure you change every link and token, else it won't work.

## Google Sheet Configuration
You need to enter name of each sheet and id of the spreadsheet, which is the number after /d/ as it you can see from the example below:
Example Link: https://docs.google.com/spreadsheets/d/1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0/edit#gid=592609085
The ID: 1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0/edit#gid=592609085

## Google App Script Configuration
Google app script is a free development environment and essential for our hosting to code. This is where you need to create your project and distribute it. Each distribution gives you a link to run your script. You need to copy paste it as it is shown in example App Manifest.yml; for furthermore reading and documentation, please check the links below:
1. https://script.google.com/home/start
2. https://medium.com/maverislabs/build-a-free-slack-app-using-google-apps-scripts-and-some-fun-features-to-make-you-look-cool-to-6afb1b91a1c7
3. https://davidwalsh.name/using-slack-slash-commands-to-send-data-from-slack-into-google-sheets
4. https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
5. https://www.youtube.com/watch?v=tnek1Rx6MKA
6. https://www.youtube.com/watch?v=i19EjYZ7qbk

## Final Touchs
Make sure you invite your bot to yout channel by using this command: /invite @BOT_NAME