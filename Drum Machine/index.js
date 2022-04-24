const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

let displayKey = '';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <>
        <div id="drum-machine">
          {bankOne.map(item => <Pad key={item.id} x={item} />)}
          <div id="display">
            <h1 id="display-text">default</h1>
          </div>
        </div>
      </>
    );
  }
}

class Pad extends React.Component {
  constructor(props){
    super(props);
    this.playAudio = this.playAudio.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event){
    if(event.keyCode === this.props.x.keyCode)  {
      this.playAudio();
    }
  }

  handleDisplayChange(text) {
    document.getElementById("display").innerHTML = text;
  }

  playAudio() {
    const audioObj = document.getElementById(this.props.x.keyTrigger);
    audioObj.currentTime = 0;
    audioObj.play();
    this.handleDisplayChange(this.props.x.id);
  }

  render(){
    return (
      <>
        <button className="drum-pad" id={this.props.x.id} onClick={this.playAudio}>
          {this.props.x.keyTrigger}
          <audio id={this.props.x.keyTrigger} src={this.props.x.url} className="clip"/>
        </button>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));