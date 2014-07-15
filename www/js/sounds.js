window.AudioContext = window.AudioContext||window.webkitAudioContext;
var context = new AudioContext();

//scale needs to be an array of preset notes on the BPM scale.
//single beat is 60/BPM seconds


var SoundBoard = function(instrument, BPM, scale){

  this.sampleRate = 44100;

  this.BPM = BPM;

  this.instrument = instrument;

  this.noteScheduler = [];

  this.interval;

	this.modules = [
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
	this.Instruments = {
	  piano: {
		  attack: function() { return 0.002; },
		  dampen: function(sampleRate, frequency, volume) {
	    return Math.pow(0.5*Math.log((frequency*volume)/this.sampleRate),2);
	  	},
		  wave: function(i, sampleRate, frequency, volume) {

		    var base = this.modules[0];
		    if ( i === 4 )
		    	console.log(base);
		    return this.modules[1].call(this,
	        i,
		      sampleRate,
		      frequency,
		      Math.pow(base(i, this.sampleRate, frequency, 0), 2) +
	        (0.75 * base(i, this.sampleRate, frequency, 0.25)) +
	        (0.1 * base(i, this.sampleRate, frequency, 0.5))
	   		);  
	  	}
	  }}

// These functions shift, add noise, and character to the waveforms.  As a result, the instrument
// sounds more realistic
  this.soundHash = {};

  var attackLen = this.sampleRate * this.Instruments[this.instrument].attack();


  for ( var i = 0; i < scale.length; i++ ){
    var buffer = context.createBuffer(1, duration * this.sampleRate, this.sampleRate);
    data = buffer.getChannelData(0);
    for (var j = 0; j < data.length; j++){
      if ( j < attackLen){
        amplitude = volume * (j/(this.sampleRate * this.Instruments[this.instrument].attack()))
      }else{
        amplitude = volume * Math.pow((1-((j-(this.sampleRate*this.Instruments[this.instrument].attack()))/(this.sampleRate*(duration-this.Instruments[this.instrument].attack())))),this.Instruments[this.instrument].dampen.call(this,this.sampleRate, frequency, volume))
      }
        val = amplitude * this.Instruments[this.instrument].wave.call(this, j, this.sampleRate, frequency, volume);
        data[j<<1] = val;
        data[(j<<1)+1] = val>> 8;

        this.soundHash[ scale[j] ] = buffer;
  }

//the sound hash holds all the notes so we don't have to complete strenous calculations every time.


}
//Sample rate represents the array size that stores the amplitudes of the sound for the web Audio API.
//the this.sampleRate should automatically be set to 44100 since most computer sound cards will be running
//at this spec
//Volume is on a scale from 0 to 1

SoundBoard.prototype.playSounds = function( frequency, volume, start){
  //The web audio API contains buffers that can be evaluated as sound.  Below, we will fill this buffer
  //for the sound card to evaluate
  var duration = this.BPM/60;
  var osc = context.createBufferSource();
  var gainNode = context.createGain();
  gainNode.gain.value = volume;

  //We produce sound in just one channel.  Most soundtracks will hold sound in two channels, hence
  //the fact that you hear two sounds in each ear.

  //The code below represents the attack and decay functions for the wave.  A logarithmic/exponential
  //function is used for the decay. This gives the effect of lower notes lasting longer than
  //higher notes.  Pretty cool!!!
	buffer = this.soundHash[frequency];

  //If you have questions on this function, let me know.  Otherwise, you won't need to alter it at all.
  //Think of the web Audio API as a simple insrument to speaker connection.  The source(buffer source),
  //acts like the guitar.  The context.destination is the speaker (see below).  Otherwise,
  //all the nodes in-between would be like a filter, or pedal you might connect to an electric guitar.
  osc.buffer = buffer;
  osc.loop = false;
  osc.connect(context.destination);
  osc.noteOn(start);
}

SoundBoard.prototype.playInterval = function( MIDI ){
  var startTime = context.currentTime;
  var halfwayPointBetweenNotes = this.BMP/60/2/2;


  var loop = function( MIDI, startTime, halfwayPointBetweenNotes, firstTime ){
    firstTime = firstTime || 0;
    this.interval = setTimeout(function( MIDI, startTime ){
      var currentTime = context.currentTime;
      var currentCol = Math.ceil((currentTime - startTime - 1)) % (8 * this.BPM/60/2); 
      var numberOfCycles = Math.floor((currentTime - startTime - 1)/(this.BPM/60/2))
      var scheduledTime = ((numberOfCycles * ( this.BPM/60/2 + 1 )) + startTime + ((currentCol + 1) * BPM/60/2))
      for (var note in this.noteScheduler[currentCol]){
        if ( this.noteScheduler[currentCol][note] )
        this.playSounds( note, 1, scheduledTime )
      }
      loop( MIDI, startTime, halfwayPointBetweenNotes, (scheduledTime + halfwayPointBetweenNotes));
    }, firstTime )
  }
// first it needs to evaluate the array.  It will need to set up a setTimeout()

}



