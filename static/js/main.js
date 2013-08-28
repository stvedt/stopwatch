// App is a class (denoted by it's uppercase name) definition that will later be instantiated in the document ready. 
var Stopwatch = function($){
    console.log("-> App::new()");

    // Save reference to App object scope
    var _this = this;
    _this.startTime = null;
    _this.updateInterval = null;
    _this.clock = null;
    _this.pausedTime = 0;

    _this.elapsedTime = 0;
    _this.paused = false;
    _this.laps = $('ol#laps').empty();
    _this.time = $('#time');
    //_this.time.text('00:00:00.0');

    //Dom Elements
    _this.startBtn = $('#start');
    _this.stopBtn = $('#stop');
    _this.lapBtn = $('#lap');
    _this.pauseBtn = $('#pause');
    _this.resetBtn = $('#reset');

    _this.startBtn.click(function(){ _this.start(); });
    _this.stopBtn.click(function(){ _this.stop(); });
    _this.pauseBtn.click(function(){ _this.pause(); });
    _this.lapBtn.click(function(){ _this.lap(); });
    _this.resetBtn.click(function(){ _this.reset(); });
    // Single point of entry - called immediately after instantiation
    var _init = function(){
        console.log("-> App::init()");
    }

    // Application methods

    _this.updateTime = function(){

        //scope of set interval throws this.  This is an instance/public function.

        //this loses scope of object
        var clock = new Date();
        var currentTime = clock.getTime();
        _this.elapsedTime = _this.pausedTime + ( currentTime - _this.startTime );

        var seconds = _this.elapsedTime/1000;
        var minutes = seconds/60;
        var hours = minutes/60;

        seconds = (seconds%60).toFixed(1); //just seconds not totol seconds  Format: ##.#
        if(seconds < 10) seconds = _this.zeros(seconds);

        minutes = (minutes%60); //just minutes not total minutes    Format: ##
        minutes =  (minutes >= 1) ? parseInt(minutes) : 0;
        if(minutes < 10) minutes = _this.zeros(minutes);

        hours = (hours >= 1) ? parseInt(hours): 0;
        if(hours < 10) hours = _this.zeros(hours);

        //console.log(_this.time);
        $(_this.time).text(hours + ":" + minutes + ":" + seconds);

    };

    /* ************************************************************************** */
    /* At the end of App instantiation, call the init function of the App object. */
    /* ************************************************************************** */
    _init.call(this);
};

//static variables go here (public)

// Application functions/procedures

Stopwatch.prototype.btnAble= function(able){

    if(able === 'enable'){
        for (var i = 1; i < arguments.length; i++){
            arguments[i].removeAttr('disabled');
            arguments[i].attr('enabled','enabled');
        }   
        
    }else if (able ==='disable'){
        for (var i = 1; i < arguments.length; i++){
            arguments[i].removeAttr('enabled');
            arguments[i].attr('disabled','disabled');
        }   
    }
    
};
Stopwatch.prototype.zeros = function(num){
    num = '0'+num;
    return num;
};

Stopwatch.prototype.start = function(){
    var _this = this;
    _this.btnAble('disable' , _this.startBtn, _this.resetBtn );
    _this.btnAble('enable', _this.stopBtn, _this.lapBtn, _this.pauseBtn );

    _this.clock = new Date();
    _this.startTime = _this.clock.getTime();
    _this.updateInterval = setInterval(_this.updateTime,50);
    return _this.startTime;
};

Stopwatch.prototype.stop = function(){
    var _this = this;
    clearInterval(_this.updateInterval);
    _this.btnAble('enable' , _this.startBtn, _this.resetBtn );
    _this.btnAble('disable', _this.stopBtn, _this.lapBtn, _this.pauseBtn );

    //clearInterval(updateInterval);
    _this.startTime, _this.elapsedTime, _this.updateInterval, _this.pausedTime = 0;
    _this.paused = false;
    _this.pauseBtn.text('Pause');
};

Stopwatch.prototype.pause = function(){
    var _this = this;
    if (_this.paused === false){
        _this.paused = true;
        _this.pauseBtn.text('Resume');
        _this.btnAble('disable', _this.lapBtn);
        _this.pausedTime = _this.elapsedTime;
        clearInterval(_this.updateInterval);
    }else{
        _this.paused = false;
        _this.start();
        _this.pauseBtn.text('Pause');
        _this.btnAble('enable', _this.lapBtn);
    }
};

Stopwatch.prototype.lap = function (){
    var _this = this;
    var lapTime = $('#time').html();
    lapTime = $('<li />').text(lapTime);
    _this.laps.append(lapTime)
};

Stopwatch.prototype.reset = function(){
    var _this = this;;
    _this.time.text('00:00:00.0');
    _this.laps.empty();
};

Stopwatch.prototype.toString = function(){
    return '[object App]';
};

// Instantiate application in $(document).ready()
$(function(jquery){
    window.stopwatch = new Stopwatch(jquery);
});
