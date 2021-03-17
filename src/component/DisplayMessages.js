const DisplayMessage = (props) => {
    if(props.messages){
        let messageType = props.messageType ? props.messageType : 'success'
        return props.messages.map( (message,key) => { return( <p key={key} className={messageType ==="error" ? 'alert alert-danger mt-1 mb-1': 'alert alert-success  mt-1 mb-1'}>{message}</p>)} );
    }
    return <></>
}
export default DisplayMessage;