import React,{Component} from 'react';

class App extends Component{

    addBoleto(){
        
    }
    render(){
        return(
            <div className="8bc34a light-green">
                
                    <nav> 

                            <div className="nav-wraper-fixed">
                            
                                <a href="/" className="brand-logo center-align"><span></span>BQRdigital</a>
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a>GitHub</a></li>
                                    <li><a linkrel="react.com">React JS</a></li>
                                    <li><a href="mongoose.org">MongoDB</a></li>
                                    <li></li> 
                                </ul>
                            
                            </div>
                        </nav>
                    
                    <br></br>
                    <div id="descripcion" className="container">
                    <br></br>
                        <div className="row">
                            <div className="col s12">
                                <h1>Tu Boleto puede ser SER DIGITAL con código QR</h1>
                                <p>Aca esta el parrafo que expliaca este proyecto de prototipo aplicacion web</p>
                            </div>
                        </div>
                    </div>
                    <div id="app" className="container">
                        <div className="row">
                            <div className="col s6">
                                <div className="card">
                                    <div className="card-content">
                                            <form onSubmit={this.addBoleto}>
                                                <label>HAZ LA PRUEBA</label>
                                                <div className="row">
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <input type="text" name="txtEmpresa" placeholder="Empresa"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <input type="text" name="txtOrigen" placeholder="Origen"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <input type="text" name="txtDestino" placeholder="Destino"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <input type="text" name="txtFecha" placeholder="Fecha"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <input type="text" name="txtAbordaje" placeholder="Abordaje"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <input type="text" name="txtSalida" placeholder="Salida"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12" >
                                                        <textarea  name="txtCondiciones_Legales" placeholder="Condiciones Legales Boleto" className="materialize-textarea"></textarea>
                                                    </div>
                                                    <br></br>
                                                </div>
                                                <button type="submit" className="btn-light darken-4 large pulse">
                                                    Crear copia 
                                                </button>
                                            </form>
                                    </div>
                                </div>
                            </div>
                            <div clasName="col s6">

                            </div>
                        </div>
                    </div>
            </div>    
        )
    }
}
export default App;
