(function() {
    function Fixtures() {

        var Fixtures = {};
    
        // album Object #1
        var albumPicasso = {
            title: 'The Colors',
            artist: 'Pablo Picasso',
            label: 'Cubism',
            year: '1881',
            albumArtUrl: '/assets/images/album_covers/01.png',
            songs: [
                { title: 'Blue', duration: 161.71, audioUrl: 'assets/music/blue'},
                { title: 'Green', duration: 103.96, audioUrl: 'assets/music/Green'},
                { title: 'Red', duration: 268.45, audioUrl: 'assets/music/Red'},
                { title: 'Pink', duration: 153.14, audioUrl: 'assets/music/Pink'},
                { title: 'Magenta', duration: 374.22, audioUrl: 'assets/music/Magenta'}
            ]
        };

        // album Object #2 
        var albumMarconi = {
            title: 'The Telephone',
            artist: 'Guglielmo Marconi',
            label: 'EM',
            year: '1909',
            albumArtUrl: '/assets/images/album_covers/20.png',
            songs: [
                { title: 'Hello, Operator?', duration: 161.71 },
                { title: 'Ring, ring, ring', duration: 103.96 },
                { title: 'Fits in your pocket', duration: 268.45},
                { title: 'Can you hear me now?', duration: 153.14},
                { title: 'Wrong phone number', duration: 374.22}
            ]
        };

        // album Object #3
        var albumTarek = {
            title: 'The JS Crew',
            artist: 'T-Rex',
            label: 'Pop Music',
            year: '2016',
            albumArtUrl: '/assets/images/album_covers/02.png',
            songs: [
                { title: 'Write me, write me good', duration: 161.71 },
                { title: 'Functions of Love', duration: 103.96 },
                { title: 'The Objects of my Desire', duration: 268.45},
                { title: 'My light Array', duration: 153.14},
                { title: 'Programing Forever', duration: 374.22}
            ]
        };

        Fixtures.getAlbum = function() {
            return albumPicasso;
        };
        
        Fixtures.getCollection = function(numberOfAlbums) {
            var array = [];
            
            for ( var i = 1; i <= numberOfAlbums; i++ ) {
                    array.push(albumPicasso);   
            }
            
            return array;
        };
        
        return Fixtures;
        
    }

    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures);
})();