const Loader = (props) => {
    const style = {
        width: props.width ? props.width : "80px",
        display:'inline-block'
    }
    return <div className="loader" style={style}><img style={{maxWidth:'100%',margin:0, padding:0, display:'block'}} alt="Loading.." src='/images/Spinner.gif'/></div>
}
export default Loader;