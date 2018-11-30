//este archivo arranca la interfaz, webpack y su magia 
import React,{Component} from 'react';
import {render} from 'react-dom';

class App extends Component{
    render(){
        return(
            <h1>hellow worl con React</h1>
        )
    }
}
render(<App/>,document.getElementById('app'))

