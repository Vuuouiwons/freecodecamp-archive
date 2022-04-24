import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ["quote-1", "quote-2", "quote-3"],
      author: ["auth-1", "auth-2", "auth-3"],
      textOnScreen: "Click New Quote to get a quote!",
      authorOnScreen: "",
      number: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit() {
    let rand = Math.floor(Math.random() * (this.state.text.length));
    while(rand === this.state.number) {
      rand = Math.floor(Math.random() * (this.state.text.length));
    }
    this.setState({
      text: this.state.text,
      author: this.state.author,
      textOnScreen: this.state.text[rand],
      authorOnScreen: this.state.author[rand],
      number: rand
    })
  }
  
  render() {
    return (
      <>
        <div id="text">
          <p>{this.state.textOnScreen}</p>
        </div>

        <div id="author">
          <p>{this.state.authorOnScreen}</p>
        </div>
        <button id="new-quote" onClick={this.handleSubmit}>New Quote</button>
        <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">Tweet Quote</a>
      </>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const boxStyle = {
      backgroundColor: "#eee"
    }
    return (
      <div id="quote-box" style={boxStyle}>
        <Text />
      </div>
    )
  }
}
  
ReactDOM.render(<App />, document.getElementById('root'))