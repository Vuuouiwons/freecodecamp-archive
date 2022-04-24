class TimeAdjustment extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <>
                <div id={this.props.label}>{this.props.labelType}</div>
                <div id={this.props.length}>{this.props.time}</div>
                <button id={this.props.decrement} onClick={this.props.handleClick} value={this.props.valueDec}>decrement</button>
                <button id={this.props.increment} onClick={this.props.handleClick} value={this.props.valueInc}>increment</button>
            </>
        )
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            breakTime: 5,
            sessionTime: 25,
            time: 1500,
            session: 'Session',
            timerState: 'stopped'
        }
        this.timer = 0;
        this.secToTime = this.secToTime.bind(this);
        this.setTime = this.setTime.bind(this);
        this.updateLength = this.updateLength.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.countDown = this.countDown.bind(this);
        this.playAudio = this.playAudio.bind(this);
    }

    secToTime(secs){
        let minutes = Math.floor(this.state.time / 60);
        let seconds = this.state.time - minutes * 60;
        const fillZero = time => (time < 10) ? '0' + String(time) : String(time);

        return `${fillZero(minutes)}:${fillZero(seconds)}`;
    }

    setTime(pasTime) {
        this.setState = {
            time: pasTime * 60
        }
    }

    updateLength(e){
        let value = e.target.value;

        if(this.state.timerState == 'running') { 
            return;
        }

        switch(value){
            case 'dec-break':
                if(this.state.breakTime-1 < 1) { break; }
                this.setState({
                    breakTime: this.state.breakTime - 1
                });
                break;
            case 'inc-break':
                if(this.state.breakTime+1 > 60) { break; }
                this.setState({
                    breakTime: this.state.breakTime + 1
                });
                break;
            case 'dec-session':
                if(this.state.sessionTime-1 < 1) { break; }
                this.setState({
                    sessionTime: this.state.sessionTime - 1,
                    time: (this.state.sessionTime - 1) * 60
                });
                break;
            case 'inc-session':
                if(this.state.sessionTime+1 > 60) { break; }
                this.setState({
                    sessionTime: this.state.sessionTime + 1,
                    time: (this.state.sessionTime + 1) * 60
                });
                break;
        }
    }

    handleStart() {
        if(this.timer == 0 && this.state.time > 0 && this.state.timerState == 'stopped') {
            this.setState({ timerState: 'running' });
            this.timer = setInterval(this.countDown, 1);
        }
        if(this.state.timerState == 'running') {
            this.setState({ timerState: 'stopped' });
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    handleReset() {
        clearInterval(this.timer);
        this.timer = 0;

        let audioObj = document.getElementById('beep');
        audioObj.currentTime = 0;
        audioObj.pause();

        this.setState({ 
            time: 1500,
            sessionTime: 25,
            breakTime: 5,
            session: 'Session',
            timerState: 'stopped'
        });
    }

    countDown(){
        let newSec = this.state.time - 1;
        this.setState({ time: newSec });

        if(newSec < 0) {
            if(this.state.session == 'Session') {
                this.setState({ time: this.state.breakTime * 60 });
            }
            if(this.state.session == 'Break') {
                this.setState({ time: this.state.sessionTime * 60 });
            }
            this.playAudio();
            this.state.session == 'Session' ? this.setState({ session: 'Break' }): this.setState({ session: 'Session' });
        }
    }

    playAudio(){
        let audioObj = document.getElementById('beep');
        audioObj.currentTime = 0;
        audioObj.play();
        setTimeout(()=>{}, 1000);
    }

    render() {
        return (
            <>
                <div id="timer-label">{this.state.session}</div>
                <div id="time-left">{this.secToTime(this.state.time)}</div>
                
                <TimeAdjustment 
                    label = 'break-label'
                    length = 'break-length'
                    decrement = 'break-decrement'
                    increment = 'break-increment'
                    valueDec = 'dec-break'
                    valueInc = 'inc-break'
                    labelType = 'Break Length'
                    handleClick = {this.updateLength}
                    time = {this.state.breakTime}
                />

                <TimeAdjustment 
                    label = 'session-label'
                    length = 'session-length'
                    decrement = 'session-decrement'
                    increment = 'session-increment'
                    valueDec = 'dec-session'
                    valueInc = 'inc-session'
                    labelType = 'Session Length'
                    handleClick = {this.updateLength}
                    time = {this.state.sessionTime}
                />

                <div>
                    <button id="start_stop" onClick={this.handleStart}>Start/Stop</button>
                    <button id="reset" onClick={this.handleReset}>Reset</button>
                    <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
                </div>
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));