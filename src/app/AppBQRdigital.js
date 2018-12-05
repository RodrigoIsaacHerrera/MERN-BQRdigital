import React,{Component} from 'react';
//import {Alert, AppRegistri, Button,StyleSheet, View} from 'react-native';
class App extends Component{
    constructor(){
        super();
        this.state = {
            txtEmpresa:'',
            txtAsiento:'',
            txtOrigen:'',
            txtDestino:'',
            txtFecha:'',
            txtAbordaje:'',
            txtSalida:'',
            txtCondiciones_Legales:'',
            txtCod_QR:''
        }
        this.handleChange =this.handleChange.bind(this);
        this.addBoleto = this.addBoleto.bind(this);
    }
    addBoleto(e){
        fetch('/api/boletos',{
               method:"POST",
               body:JSON.stringify(this.state),
               headers:{
                   "Accept":"application/json",
                   "Content-Type":"application/json"
               }
            }
        )
        
        e.preventDefault();
    }
    handleChange(e){
        const { name, value} = e.target;
        this.setState({[name]:value})
    }
    render(){
        return(
            <div className="8bc34a light-green">    
                    <nav> 
                        <div className="nav-wraper-fixed">
                            <a href="/" className="brand-logo center-align"><span></span>BQRdigital</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="https://www.github.com">GitHub</a></li>
                                <li><a href="https://reactjs.org">ReactJS</a></li>
                                <li><a href="https://mongoose.org">mongoose</a></li>
                                <li></li> 
                            </ul>  
                        </div>
                    </nav>
                    <br></br>
                    <div id="descripcion" className="container">
                    <br></br>
                        <div className="row">
                            <div className="col s12">
                                <h1>Tu Boleto puede SER DIGITAL con código QR</h1>
                                <h2>Atrevete a cambiar el mundo y unete a este proyecto</h2>
                            </div>
                        </div>
                    </div>
                    <div id="app" className="container">
                        <div className="row">
                            <div className="col s6">
                                <div className="card">
                                    <div className="card-content">
                                            <h3>Boleto</h3>
                                            <form onSubmit={this.addBoleto}>
                                                <p></p>
                                                <div className="row">
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Empresa</label>
                                                        <input type="text" name="txtEmpresa" onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Asiento</label>
                                                        <input type="text" name="txtAsiento" onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Origen</label>
                                                        <input type="text" name="txtOrigen" onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Destino</label>
                                                        <input type="text" name="txtDestino" onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Fecha</label>
                                                        <input type="text" name="txtFecha" onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Abordaje</label>
                                                        <input type="text" name="txtAbordaje" onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Salida</label>
                                                        <input type="text" name="txtSalida" onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12" >
                                                        <label>Condiciones Legales Boleto</label>
                                                        <textarea  name="txtCondiciones_Legales" onChange={this.handleChange} placeholder="(*)" className="materialize-textarea"></textarea>
                                                    </div>
                                                    <br></br>
                                                </div>
                                                <button type="Submit" className="btn btn-light darken-4 pulse" /*onPress={()=>{this.addBoleto}}*/>
                                                    Simular
                                                </button>
                                            </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col s6">

                            </div>
                        </div>
                    </div>
            </div>    
        )
    }
}
export default App;
