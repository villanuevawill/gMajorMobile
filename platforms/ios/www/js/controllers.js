angular.module('gmajor.controllers', [])

.controller('MenuController', function ($scope, $location, MenuService) {
    // "MenuService" is a service returning mock data (services.js)
    $scope.list = MenuService.all();

    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $location.url('/' + page);
    };
})

.controller('OneController', function ($scope) {
    $scope.navTitle = "Page One Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];

    $scope.buttonClick = function(){
        alert('button clicked');
        
        var SoundProfile = {
  name: 'piano',
  attack: function() { return 0.002; },
  dampen: function(sampleRate, frequency, volume) {
    return Math.pow(0.5*Math.log((frequency*volume)/sampleRate),2);
  },
  wave: function(i, sampleRate, frequency, volume) {
    var base = Modules[0];
    return Modules[1](
      i,
      sampleRate,
      frequency,
      Math.pow(base(i, sampleRate, frequency, 0), 2) +
        (0.75 * base(i, sampleRate, frequency, 0.25)) +
        (0.1 * base(i, sampleRate, frequency, 0.5))
    );  
  }
};

// I have no idea what these do
Modules = [
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 1 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
  },
  function(i, sampleRate, frequency, x) {
    return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
  }
];

// // too many params for an interative function
// // intsrument should have this as a method
// var playSounds = function(SoundProfile, Modules, frequency, volume, sampleRate, duration, start){
//   var attackLen = sampleRate * SoundProfile.attack();
//   var buffer = context.createBuffer(1, duration * sampleRate, sampleRate);
//   var data = buffer.getChannelData(0);

//   for (i = 0; i < data.length; i++){
//     if ( i < attackLen){
//       amplitude = volume * (i/(sampleRate * SoundProfile.attack()))
//     }else{
//       amplitude = volume * Math.pow((1-((i-(sampleRate*SoundProfile.attack()))/(sampleRate*(duration-SoundProfile.attack())))),SoundProfile.dampen(sampleRate, frequency, volume))
//     }
//     data[i] = amplitude * SoundProfile.wave(i, sampleRate, frequency, volume)
//   }

//   var osc = context.createBufferSource();
//   var gainNode = context.createGain();

//   // fancy word for volume
//   gainNode.gain.value = 1;

//   osc.buffer = buffer;
//   // turn off to call once // turn off the 's' from the function (see below)
//   osc.loop = true;
//   osc.connect(context.destination);

//   //play sound after start time
//   osc.noteOn(start);
// };

// var playOnce = function(SoundProfile, Modules, frequency, volume, sampleRate, duration, start){
//   var attackLen = sampleRate * SoundProfile.attack();
//   var buffer = context.createBuffer(1, duration * sampleRate, sampleRate);
//   var data = buffer.getChannelData(0);

//   for (i = 0; i < data.length; i++){
//     if ( i < attackLen){
//       amplitude = volume * (i/(sampleRate * SoundProfile.attack()))
//     }else{
//       amplitude = volume * Math.pow((1-((i-(sampleRate*SoundProfile.attack()))/(sampleRate*(duration-SoundProfile.attack())))),SoundProfile.dampen(sampleRate, frequency, volume))
//     }
//     data[i] = amplitude * SoundProfile.wave(i, sampleRate, frequency, volume)
//   }

//   var osc = context.createBufferSource();
//   var gainNode = context.createGain();
//   gainNode.gain.value = 1;
//   osc.buffer = buffer;
//   osc.loop = false;
//   osc.connect(context.destination);
//   osc.noteOn(start);

// };

playSounds(SoundProfile, Modules, 100, 1, 44100, 1, 0 );
// playSounds(SoundProfile, Modules, 200, 1, 44100, 1, startTime );
// playSounds(SoundProfile, Modules, 300, 1, 44100, 1, startTime + .2);
// playSounds(SoundProfile, Modules, 400, 1, 44100, 1, startTime + .3);
// playSounds(SoundProfile, Modules, 500, 1, 44100, 1, startTime + .4);
playSounds(SoundProfile, Modules, 600, 1, 44100, 1, 0 + .5);
// playSounds(SoundProfile, Modules, 700, 1, 44100, 1, startTime + .6);
// playSounds(SoundProfile, Modules, 800, 1, 44100, 1, startTime + .7);

// playSounds(SoundProfile, Modules, 100, 1, 44100, 1, startTime + .05);
// playSounds(SoundProfile, Modules, 200, 1, 44100, 1, startTime + .15);
// playSounds(SoundProfile, Modules, 300, 1, 44100, 1, startTime + .25);
// playSounds(SoundProfile, Modules, 400, 1, 44100, 1, startTime + .35);
// playSounds(SoundProfile, Modules, 500, 1, 44100, 1, startTime + .45);
// playSounds(SoundProfile, Modules, 600, 1, 44100, 1, startTime + .55);
// playSounds(SoundProfile, Modules, 700, 1, 44100, 1, startTime + .65);
// playSounds(SoundProfile, Modules, 800, 1, 44100, 1, startTime + .75);

    }
})

.controller('TwoController', function ($scope) {
    $scope.navTitle = "Page Two Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
})

.controller('ThreeController', function ($scope) {
    $scope.navTitle = "Page Three Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
});
