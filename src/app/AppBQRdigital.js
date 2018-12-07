import React,{ Component } from 'react';


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            Empresa:"",
            Asiento:"",
            Origen:"",
            Destino:"",
            Fecha:"",
            Abordaje:"",
            Salida:"",
            Condiciones_Legales:"",
            Cod_QR:"",
            Boletos:[],
        }
        this.handleChange =this.handleChange.bind(this);
        this.addBoleto = this.addBoleto.bind(this);
    }
    addBoleto(e){
        fetch('/api/boletos',{
               method:'POST',
               body:JSON.stringify(this.state),
               headers:{
                   'Accept':'application/json',
                   'Content-Type':'application/json',
               }
            }
        )
        .then(res=>res.json())
        .catch(err=>console.error(err))
        .then(data=>{
            console.log(data)
            M.toast({html:'BOLETO REGISTRADO'})
            this.setState({
                Empresa:'',
                Asiento:'',
                Origen:'',
                Destino:'',
                Fecha:'',
                Abordaje:'',
                Salida:'',
                Condiciones_Legales:'',
                Cod_QR:''
            })
            this.getBoletos()
        })
        e.preventDefault();
    }
    componentDidMount(){
        this.getBoletos();
    }
    getBoletos(){
        fetch('/api/boletos')
            .then(res => res.json())
            .then((data) =>{ 
                this.setState({Boletos:data}),
                console.log(this.state.Boletos)
            })
            .catch((e)=>{console.error(e)})
    }
    handleChange(e){
        const { name, value } = e.target;
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
                                <li><a href="https://mongoose.org">Mongoose</a></li>
                                <li><a href="https://react-materialize.github.io/#/">React-Materialize</a></li>
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
                    <div id="aplicacion" className="container">
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
                                                        <input type="text" name="Empresa" value={this.state.Empresa} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Asiento</label>
                                                        <input type="text" name="Asiento" value={this.state.Asiento} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Origen</label>
                                                        <input type="text" name="Origen"  value={this.state.Origen} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Destino</label>
                                                        <input type="text" name="Destino" value={this.state.Destino} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Fecha</label>
                                                        <input type="text" name="Fecha" value={this.state.Fecha} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Abordaje</label>
                                                        <input type="text" name="Abordaje" value={this.state.Abordaje} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Salida</label>
                                                        <input type="text" name="Salida" value={this.state.Salida} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12" >
                                                        <label>Condiciones Legales Boleto</label>
                                                        <textarea  name="Condiciones_Legales" value={this.state.Condiciones_Legales} onChange={this.handleChange} placeholder="(*)" className="materialize-textarea"></textarea>
                                                    </div>
                                                    <br></br>
                                                </div>
                                                <button type="submit" className="btn btn-light darken-4 pulse" /*onPress={()=>{this.addBoleto}}*/>
                                                    Simular
                                                </button>
                                            </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col s6">
                                <table>
                                    <thead>
                                        <tr>
                                            <th><h3>Listado BQRdigital Boletos</h3></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                           <tr>
                                               <td><p>hola querido 1</p></td>
                                           </tr>
                                           <tr>
                                               <td><p>hola querido 2</p></td>
                                           </tr>
                                           <tr>
                                               <td><p></p>hola querido 3</td>
                                           </tr>
                                    </tbody>
                                </table>
                            </div>
                            {
                                this.state.Boletos.map(BQRdigital =>{
                                    return(
                                        <div className="col s7 " key={BQRdigital._id}>
                                            <div className="card blue-grey darken-1">
                                                <div className="card-content white-text">
                                                    <span className="card-title" >BQRdigital</span>
                                                    <p>
                                                        ID boleto: {BQRdigital._id}                                           
                                                    </p>
                                                    <p>
                                                        Fecha: {BQRdigital.Fecha}                                           
                                                    </p>
                                                    <p>
                                                        Horario Abordaje: {BQRdigital.Abordaje}                                           
                                                    </p>
                                                    <p>
                                                        Origen: {BQRdigital.Origen}                                           
                                                    </p>
                                                    <p>
                                                        Destino: {BQRdigital.Destino}                                           
                                                    </p>
                                                    <p>
                                                        Salida: {BQRdigital.Salida}                                           
                                                    </p>
                                                </div>
                                                <div className="card-action">
                                                    <button className='btn btn-light darken-4 pulse' >Eliminar</button>
                                                    <a href="#">Actualizar</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            </div>    
        )
    }
}
export default App;
