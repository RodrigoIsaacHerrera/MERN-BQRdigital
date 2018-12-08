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
            Tarifa:"",
            Boletos:[]
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
                Cod_QR:'',
                Tarifa:''
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
    deleteBoleto(id){
        //console.log('boleto eliminado',id)
        if(confirm('Deseas proceder con Eliminacion?')){
            fetch(`/api/boletos/${id}`,{
                method:'DELETE',
                headers:{'Accept':'application/json',
                        'Content-Type':'application/json'
                }
            })
            .then(data=>{
                console.log(data);
                M.toast({html:'Boleto BQRdigital Eliminado Satisfactoriamente'});
                this.getBoletos();
            })
            .then(res=>res.json())
        }
    }
    handleChange(e){
        const { name, value } = e.target;
        this.setState({[name]:value})
    }
    render(){
        return(
            <div className="8bc34a light-green">  
                     
                    <nav style={{backgroundColor:'#546e7a'}}> 
                        <div className="nav-wraper">
                                <a href="/" className="brand-logo center-align"style={{marginLeft:'20px'}}>BQRdigital</a>
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a href="https://www.github.com">GitHub</a></li>
                                    <li><a href="https://reactjs.org">ReactJS</a></li>
                                    <li><a href="https://mongoose.org">Mongoose</a></li>
                                    <li><a href="https://react-materialize.github.io/#/">React-Materialize</a></li>
                                </ul>  
                        </div>
                    </nav>
                    
                    <div id="descripcion" className="container">
                        
                        <div className="row">
                            <div className="col s12">
                                <h1>Tu Boleto puede SER DIGITAL con código QR</h1>
                                <h2>Atrevete a cambiar el mundo y unete a este proyecto</h2>
                            </div>
                        </div>
                    </div>
                    <div id="aplicacion" className="container">
                        <div className="row">
                            <div className="col s7">
                                <div className="card">
                                    <div className="card-content">
                                            <h4>Boleto</h4>
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
                                                    <div className="input field col s12">
                                                        <label>Tarifa</label>
                                                        <input type="text" name="Tarifa" value={this.state.Tarifa} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12" >
                                                        <label>Condiciones Legales Boleto</label>
                                                        <textarea  name="Condiciones_Legales" value={this.state.Condiciones_Legales} onChange={this.handleChange} placeholder="(*)" className="materialize-textarea"></textarea>
                                                    </div>
                                                    
                                                   
                                                </div>
                                                <button type="submit" className="btn btn-light darken-4 pulse">
                                                    <b>Simular</b>&nbsp;<sub><i className='material-icons'>save</i></sub>
                                                </button>
                                            </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12">
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
                            <div>
                                {
                                    this.state.Boletos.map(BQRdigital =>{
                                        return(
                                            <div className="col s12" key={BQRdigital._id}>
                                                <div className="card blue-grey darken-1">
                                                <div className="card-content white-text">
                                                    <span className="card-title" style={{color:'yellow'}} ><b>BQRdigital</b></span>
                                                    <br></br>
                                                    <p>
                                                        ID boleto:&nbsp;&nbsp; {BQRdigital._id}                                           
                                                    </p>
                                                    <br></br>
                                                    <p>
                                                        Fecha:&nbsp;&nbsp; {BQRdigital.Fecha}                                           
                                                    </p>
                                                    <br></br>
                                                    <p>
                                                     <b>Horario Abordaje:</b> &nbsp;&nbsp; {BQRdigital.Abordaje}                                           
                                                    </p>
                                                    <br></br>
                                                    <p>
                                                        Origen:&nbsp;&nbsp; {BQRdigital.Origen}                                           
                                                    </p>
                                                    <br></br>
                                                    <p>
                                                        Destino:&nbsp;&nbsp; {BQRdigital.Destino}                                           
                                                    </p>
                                                    <br></br>
                                                    <p>
                                                        Salida:&nbsp;&nbsp; {BQRdigital.Salida}                                           
                                                    </p>
                                                    <br></br>
                                                    <p>
                                                        Tarifa:&nbsp;&nbsp; {BQRdigital.Tarifa}                                           
                                                    </p>
                                                    <br></br>  
                                                    <p style={{color:'#40ff00'}}> 
                                                        <b >Coondicones Legales<br></br><br></br>{BQRdigital.Condiciones_Legales}</b>
                                                    </p>                                                   
                                                </div>
                                                <div className="card-action">
                                                    <button className='btn btn-light darken-4 pulse'onClick={()=>this.deleteBoleto(BQRdigital._id)}><b>Eliminar</b> &nbsp;<sub><i className='material-icons'>delete</i></sub></button>           
                                                    {/*<button className='btn btn-light darken-4 pulse' onClick={}><b>Actualizar</b> &nbsp;<sub><i className='material-icons'>edit</i></sub></button>} */}
                                                </div>
                                            </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>                 
                    <footer className="page-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col l6 s12">
                                    <h5 className="white-text">Footer Content</h5>
                                    <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                                </div>
                                <div className="col l4 offset-l2 s12">
                                    <h5 className="white-text">Links</h5>
                                    <ul>
                                        <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                                        <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                                        <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                                        <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="footer-copyright">
                            <div className="container">
                                 © 2014 Copyright Text
                                <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                            </div>
                        </div>
                    </footer>
            </div>    
        )
    }
}
export default App;
