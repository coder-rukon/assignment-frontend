import { Link } from 'react-router-dom';
const AdminNav = (props) => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="btn btn-outline-success" to="/admin/products">All Products</Link>
            </li>
            <li className="nav-item"><span style={{display:"block",width:'15px'}}></span></li>
            <li className="nav-item">
                <Link className="btn btn-outline-info" to="/admin/product/add">Add Product</Link>
            </li>
        </ul>
    )
}

export default  AdminNav;