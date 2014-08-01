define(function(require, exports, module) {
    // import dependencies
    var Easing = require('famous/transitions/Easing');
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Modifier = require('famous/core/Modifier');
    var Surface = require('famous/core/Surface');
    var Transitionable = require('famous/transitions/Transitionable');
    var Transform = require('famous/core/Transform');
    var Scrollview = require('famous/views/Scrollview');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ViewSequence = require('famous/core/ViewSequence');

    var mainContext = Engine.createContext();
    mainContext.setPerspective(500);

    var PI = 3.14159265359;

    var transitonable = new Transitionable(0);

    function degToRad(degrees) {
        return degrees * PI / 180;
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        navigator.camera.getPicture(onSuccess, onFail, {
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }

    var surfaces = [];
    //img = 'blank';

    function onSuccess(imageURI) {
        var i = 0;
        console.log(imageURI);
        while (i < 20) {
            var imageSurface = new ImageSurface({
                size: size,
                content: imageURI,
                properties: {
                    textAlign: 'center',
                    lineHeight: '100px',
                    color: 'white',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
                }
            });

            imageSurface.on('click', function(){
                console.log('click detected!');
            });

            surfaces.push(imageSurface);
            i = i + 1;
        }
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    var scrollview = new Scrollview({
    });

    Engine.pipe(scrollview);

    var viewSequence = new ViewSequence({
        array: surfaces,
        loop: true
    });
    scrollview.sequenceFrom(viewSequence);

    var size = [180, 240];

    var centerModifier = new StateModifier({
        size: size,
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    mainContext.add(centerModifier).add(scrollview);

    scrollview.outputFrom(function(offset) {
        return Transform.moveThen([0, -50, 350], Transform.rotateX(-0.004 * offset));
    });

});

