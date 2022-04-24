import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as marked from "https://cdn.skypack.dev/marked@4.0.12";

marked.setOptions({
  breaks: true
});

let defJSX = `# heading1
  ## heading2
  this is an inline code \`<div></div>\`
  \`\`\`
  //this is a multi line code block
  let x = 1
  x += 1
  \`\`\`
  - list1
    - list2
      - list3
        - list4
        
  > this is a block quote
  
  **this is a bolded sentence**
  
  ![place holder image](https://via.placeholder.com/150)
  
  [this is a link for google](https://www.google.com/)
  
  adding br<space><space>
  asdf\
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      JSX: defJSX
    };
    this.handleChange = this.handleChange.bind(this);
    this.getMarkdownText = this.getMarkdownText.bind(this);
  }
  
  handleChange(event){
      this.setState({
        JSX: event.target.value
      });
    }
  
  getMarkdownText() {
    return {__html: marked.parse(this.state.JSX)};
  }
  
  render() {
    return (
      <>
        <textarea id="editor" onChange={this.handleChange} value={this.state.JSX} />
        <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()} />
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));