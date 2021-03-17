import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Api from '../../inc/Api';
import Loader from '../Loader';
import * as T from '../../redux/Types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            message:[],
            messageType:''
        }
    }
    onSubmitHandler(e){
        e.preventDefault();
        const formData = new FormData(document.getElementById('frm_login'));
        this.setState({
            isLoading:true
        })
        let api = Api;
        let that =this;
        api.post('/auth/login',formData,function(res){
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
                    message: ['Login Success. Please wait..'],
                    messageType: data.type
                })
                api.setUserToken(data.access_token);
                if(api.setTokenToHeader()){
                    api.post('/auth/me',{},function(res){
                        if(res.data){
                            that.props.login(res.data)
                        }
                    });
                }
            }
        });
    }
    render() {
        if(this.props.auth.isLogin){
            return <Redirect to ='/admin/dashboard' />
        }
        return (
            <div className="login_register login_page">
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <div className="container">
                    <form className="login_register_box" id="frm_login" onSubmit={ e=> this.onSubmitHandler(e)}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" autoFocus required/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        { this.state.message.map( (message,key) => { return( <p key={key} className={this.state.messageType ==="error" ? 'alert alert-danger mt-1 mb-1': 'alert alert-success  mt-1 mb-1'}>{message}</p>)} )}
                        <div className="d-flex justify-content-between">
                            { this.state.isLoading ? <Loader/> : <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Sign in</button> }
                            <Link to="/register" className="btn btn-lg btn-info btn-block mt-4" >Regiser Here</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth:state.Auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return (
        {
            login: (user) => { dispatch({type:T.LOGIN, user:user}) }
        }
    )
}
export default connect(mapStateToProps,mapDispatchToProps) (Login);