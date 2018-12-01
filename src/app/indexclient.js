import React,{Component} from 'react';
import {render} from 'react-dom';

class App extends Component{
    render(){
        return(
            <h1>hellow world con React + Babel7 + Webpack4</h1>
        )
    }
}
render(<App/>,document.getElementById('app'))

