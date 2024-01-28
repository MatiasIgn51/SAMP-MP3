const express = require('express');
const router = express.Router();
require('../log');
const fs = require('fs');
const utf8 = require('utf8');
const ytdl = require('ytdl-core');
//const usetube = require('usetube');
const ytsr = require('ytsr');



/*router.get('/search', async (req, res) => {
    
    let limit = req.query.limit, song = req.query.song_title, videoInfo = [], objeto;
    if (!limit || !song) return res.send('Missing parameters.');
    
    try {
        const filters1 = await ytsr.getFilters(req.query.song_title);
        const filter1 = filters1.get('Type').get('Video');
        const searchResults = await ytsr(filter1.url);

        if (!searchResults) {
            return res.send('NO OK');
        }

        for (let i = 0;i < limit;i++) {
            const videoItem = searchResults.items[i];
            const uniqueIds = new Set();
            if (videoItem.id) {
                objeto = {
                    videoId: videoItem.id,
                    Title: utf8.encode(videoItem.title)
                };
                videoInfo.push(objeto);
            }
            videoInfo.push(objeto);
        }

        res.render('main/index', {
            videos: videoInfo
        });
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        return res.status(500).send('Se produjo un error en la búsqueda.');
    }
});*/

router.get('/search', async (req, res) => {
    let limit = req.query.limit, song = req.query.song_title, videoInfo = [], objeto;
    if (!limit || !song) return res.send('Missing parameters.');
    
    try {
        const filters1 = await ytsr.getFilters(req.query.song_title);
        const filter1 = filters1.get('Type').get('Video');
        const searchResults = await ytsr(filter1.url);

        if (!searchResults) {
            return res.send('NO OK');
        }

        for (let i = 0; i < limit; i++) {
            const videoItem = searchResults.items[i];
            
            if (videoItem.id) {
                objeto = {
                    videoId: videoItem.id,
                    Title: utf8.encode(videoItem.title)
                };
                videoInfo.push(objeto);
            }
        }

        // Filtrar los elementos que tienen 'videoId' y 'Title' definidos
        videoInfo = videoInfo.filter(item => item.videoId && item.Title);

        res.render('main/index', {
            videos: videoInfo
        });
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        return res.status(500).send('Se produjo un error en la búsqueda.');
    }
});

router.get('/searcsdh', async (req, res)  => {
    let limit = req.query.limit,song = req.query.song_title, videoInfo = [], objeto;
    if(!limit || !song) return res.send('Missing parameters.');
    await ytsr(req.query.song_title).then(a => {
        if(!a) return res.send('NO OK');
        for(let i = 0;i < limit;i++)
        {
            if(a) return console.log(a);
            /*if(a.items[i] == undefined) continue;
            objeto = {
                videoId: a.items[i].id,
                Title: utf8.encode(a.items[i].title)
            };
            videoInfo.push(objeto);*/
        }
        res.render('main/index', {
            videos: videoInfo
        })
    })
    .catch(error => {
        // Maneja errores si los hay
        console.error(error);
      });
});

router.get('.env', async(req, res) => {
  res.send('Bobito');
});

router.get('/download', async(req, res) => {
    let videoId = req.query.id, existe = false;
    console.log(videoId)
    if(!videoId) return res.send('missing parameters.');
    ytdl.getInfo(`http://www.youtube.com/watch?v=${videoId}`).then(async a => {
        fs.readdirSync('public/mp3').forEach(music => {
            if(music.replace('.mp3', '') == videoId) existe = true; 
        });
        if(existe) return res.send('OK');
        let duration = Math.round(a.formats[0].approxDurationMs/1000);
        if(duration > 560) return res.send('NO OK');
        else {
            try {
                const yt = require("yt-converter");
                yt.convertAudio({
                    url: `http://www.youtube.com/watch?v=${videoId}`,
                    itag: 140,
                    directoryDownload: `public/mp3/`,
                    title: videoId
                },'',OnClose)
                //ytdl(`http://www.youtube.com/watch?v=${videoId}`).pipe(fs.createWriteStream(`public/mp3/${videoId}.mp3`));
            }
            catch(e)
            {
                console.log(e);
                res.send('NO OK');
            }
        }
    })
    const OnClose = function() {
        return res.send('OK');
    }
});

module.exports = router;