import { Link } from "react-router-dom";
import Settings from "../../../inc/Settings";

const ProductIitem = (props) => {
    let product = props.product;
    return (
        <tr>
            <td>{product.id}</td>
            <td><img src={Settings.apiBaseUrl + '/storage/' + product.image} alt={product.title} style={{ width: "100px" }} /></td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>
                <Link className="btn btn-info" to={'/admin/product/edit/' + product.id}>Edit</Link>
                <button type="button" className="btn btn-danger" style = { {float:'right'}}  onClick = { e => props.deleteProduct(product)}>Delete</button>
            </td>
        </tr>
    )
}
export default ProductIitem;