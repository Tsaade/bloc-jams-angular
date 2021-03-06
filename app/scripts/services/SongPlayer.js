(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /**
        * @desc Album information stored in a new variable
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function (song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            /**
            * @function Autoplay next song
            * @desc Plays the next song when one is completed.
            * @param {Object} song
            */
            currentBuzzObject.bind('ended', function(event) {
                SongPlayer.next();
            });
            
            
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function getSongIndex
        * @desc Gets the index of a song from the songs array
        * @param [array]
        */      
        var getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @desc Current volume (a number) for currently playing song
        * @type {Number}
        */
        SongPlayer.volume = 50;
        
        /**
        * @function playSong
        * @desc plays a song from the album object
        * @param {Object} song
        */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
        * @function stopSong
        * @desc Stop playing a song from the album object
        * @param {Object} song
        */
        var stopSong = function (song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if ( song == null ) {
                currentSongIndex = currentAlbum.songs[0]; 
            } else if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function previous song
        * @desc returns to the revious song when clicked.
        */        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function next song
        * @desc Jumps ahead to the next song when clicked.
        */        
        SongPlayer.next = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length - 1) { //I needto go to the other end here!!!!
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc Set current volume for currently playing song
        * @param {Number}
        */
        SongPlayer.volume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer',['$rootScope', 'Fixtures', SongPlayer]);
})();