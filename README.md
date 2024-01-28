Server based on NodeJS for song downloads through Youtube, the songs are downloaded to your server where you have this hosted and can be accessed from http://url:port/mp3/file.mp3

This can be used for SA:MP/OpenMP servers based on "Zone Gamemode", you just need to include the base code for it to work.


Different URLs where you should point:
http://url:port/search?limit=10&song_title=%s (Will show the ID, name of the song so the player can choose from SA:MP)
http://url:port/download?id=%s (You must point your SA:MP server to download the corresponding ID of the song)
