const numberBtn = [
    {
        id: 'one',
        key: '1',
        keyCode: 97
    },
    {
        id: 'two',
        key: '2',
        keyCode: 98
    },
    {
        id: 'three',
        key: '3',
        keyCode: 99 
    },
    {
        id: 'four',
        key: '4',
        keyCode: 100
    },
    {
        id: 'five',
        key: '5',
        keyCode: 101
    },
    {
        id: 'six',
        key: '6',
        keyCode: 102
    },
    {
        id: 'seven',
        key: '7',
        keyCode: 103
    },
    {
        id: 'eight',
        key: '8',
        keyCode: 104
    },
    {
        id: 'nine',
        key: '9',
        keyCode: 105
    },
    {
        id: 'zero',
        key: '0',
        keyCode: 96
    }
];

const operatorBtn = [
    {
        id: 'add',
        key: '+',
        keyCode: 107 
    },
    {
        id: 'subtract',
        key: '-',
        keyCode: 109
    },
    {
        id: 'multiply',
        key: 'x',
        keyCode: 106
    },
    {
        id: 'divide',
        key: '/',
        keyCode: 111
    }
]

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputDisplay : '0'
        }
        this.handleNumber = this.handleNumber.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
    }

    handleNumber(e){
        const value = e.target.value;
        if(value === '0' && this.state.inputDisplay === '0') {
            this.setState({
                inputDisplay : value
            });
        } else if(this.state.inputDisplay === '0') {
            this.setState({
                inputDisplay : value
            });
        } else {
            this.setState({
                inputDisplay : this.state.inputDisplay + value
            });
        }
    }
    handleEqual(){
        let exp = this.state.inputDisplay.replace(/x/g, '*');
        
        let ans = String(eval(exp));
        this.setState({
            inputDisplay : ans
        });
    }
    handleClear(e){
        const value = e.target.value;
        this.setState({
            inputDisplay : '0'
        });
    }
    handleDecimal(e){
        const value = e.target.value;
        let re = /(\.)$|(\d*\.\d+)/;
        let tempArray = this.state.inputDisplay.split(/[\/\x\-\+][\/\x\-\+]?/)
        tempArray.map(items => {
            if(re.test(items) === false){
                this.setState({
                    inputDisplay: this.state.inputDisplay + value
                });
                return;
            }});
    }
    
    handleOperator(e) {
        const value = e.target.value, disp = this.state.inputDisplay;
        let temp = undefined;
        let reDoubleSigns = /(\-\-)$|(\+\+)$/, reMinus = /[x\/]$/;
        if(reMinus.test(disp) && value == '-') {
            temp = disp + value;
        } else if(reDoubleSigns.test(disp)){
            temp = disp.replace(reDoubleSigns, '+');
        } else if(/[\+x\/]$/g.test(disp)) {
            let tempArray = disp.split('');
            tempArray[tempArray.length - 1] = value;
            temp = tempArray.join('');
        }  else if(/[\+\x\/]-$/.test(disp) && value != '-') {
            temp = disp.replace(/[\+\x\/]-$/, value);
        }   else {
            temp = disp + value;
        }
        this.setState({
            inputDisplay: temp
        });
    }

    render(){
        return (
            <>
                <Display 
                    inputDisplay={this.state.inputDisplay}
                />
                <Button 
                    number={this.handleNumber}
                    equal={this.handleEqual}
                    clear={this.handleClear}
                    decimal={this.handleDecimal}
                    operator={this.handleOperator}
                />
            </>
        )
    }
};

class Display extends React.Component {
    render(){
        return (
            <>
            <div id="display">{this.props.inputDisplay}</div>
            </>
            
        )
    }
}

class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <>
                <div>
                    {numberBtn.map(elem => <button id={elem.id} value={elem.key} onClick={this.props.number}>{elem.key}</button>)}
                </div>

                <div>
                    {operatorBtn.map(elem => <button id={elem.id} value={elem.key} onClick={this.props.operator}>{elem.key}</button>)}
                </div>

                <div>
                    <button id="equals" value="=" onClick={this.props.equal}>=</button>
                    <button id="clear" value="AC" onClick={this.props.clear}>AC</button>
                    <button id="decimal" value="." onClick={this.props.decimal}>.</button>
                </div>
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));