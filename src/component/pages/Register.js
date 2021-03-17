import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Api from '../../inc/Api';
import DisplayMessage from '../DisplayMessages';
import Loader from '../Loader';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            message:[],
            isRegisted:false,
            messageType:'success'
        }
    }
    onSubmitHandler(e){
        e.preventDefault();
        const formData = new FormData(document.getElementById('frm_register'));
        this.setState({
            isLoading:true,
            message:[]
        })
        const api = Api;
        const that = this;
        api.post('/auth/register',formData,function(res){
            const data = res.data;
            if(data.type === "error"){
                const msg = [];
                for (const key in data.message) {
                    msg.push(data.message[key]);
                }
                that.setState({
                    isLoading:false,
                    message: msg,
                    messageType: data.type
                })
            }else{
                that.setState({
                    isLoading:false,
                    isRegisted:true,
                    message: ['Registraion Success!'],
                    messageType: data.type
                })
            }
        });
    }
    displayForm(){
        return (
            <form className="login_register_box" id="frm_register" onSubmit={ e=> this.onSubmitHandler(e)}>
                <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                <label htmlFor="input_name" className="sr-only">Full Name</label>
                <input type="text" name="name" id="input_name" className="form-control" placeholder="Full Name" autoFocus required/>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" autoFocus required/>
                
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required />
                
                <label htmlFor="inputPasswordConf" className="sr-only">Password Confirm</label>
                <input type="password" id="inputPasswordConf" name="password_confirmation" className="form-control" placeholder="Password" required />
                
                { this.state.message.map( (message,key) => { return( <p key={key} className={this.state.messageType ==="error" ? 'alert alert-danger mt-1 mb-1': 'alert alert-success  mt-1 mb-1'}>{message}</p>)} )}
                <div className="d-flex justify-content-between">
                    { this.state.isLoading ? <Loader/> : <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Creact Account</button> }
                    <Link to="/login" className="btn btn-lg btn-info btn-block mt-4" >All Have an account?</Link>
                </div>
            </form>
        )
    }
    displaySuccess(){
        return(
            <div className="login_register_box">
                <DisplayMessage messages = {this.state.message} messageType = {this.state.messageType} />
                <p>Please login.</p>
                <Link to="/login" className="btn btn-success">Login Here</Link>
            </div>
        )
    }
    render() {
        
        return (
            <div className="login_register register_page">
                <Helmet>
                    <title>Regiser</title>
                </Helmet>
                <div className="container">
                   { this.state.isRegisted ? this.displaySuccess() : this.displayForm() }
                </div>
            </div>
        );
    }
}

export default Register;