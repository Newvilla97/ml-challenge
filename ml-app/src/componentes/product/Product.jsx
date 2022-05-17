import React, { Fragment } from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import shippingLogo from "../../img/ic_shipping.png";
import { useProductDetails } from "../../context/ProductDetailsContext";
const Product = ({ data }) => {
  const { setIdProduct } = useProductDetails();
  const history = useNavigate();
  return (
    <Fragment>
      <div className="container-product">
        <button
          onClick={() => {
            history(`/detalle-producto`);
            setIdProduct(data.id);
          }}
          className="button-product"
        >
          <img className="img-product" src={data.thumbnail} alt="logo" />
        </button>
        <div className="description-product">
          <div>
            {Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: data.prices.presentation.display_currency,
            }).format(data.price)}
            {data.shipping.free_shipping ? (
              <img className="shipping-logo" src={shippingLogo} alt="logo" />
            ) : null}
          </div>
          <div>{data.title}</div>
        </div>
        <div className="breadcrumb-item active ubication-product">
          capital federal
        </div>
      </div>
    </Fragment>
  );
};
export default Product;