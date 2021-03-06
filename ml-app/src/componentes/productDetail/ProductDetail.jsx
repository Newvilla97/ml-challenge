import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetail.css";
import { useProductDetails } from "../../context/ProductDetailsContext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState();
  const { idProduct, categoriesContext } = useProductDetails();
  const [categories, setCategories] = useState();
  useEffect(() => {
    if (idProduct) {
      sessionStorage.setItem("idProducto", idProduct);
    }
    if (categoriesContext) {
      sessionStorage.setItem("categories", JSON.stringify(categoriesContext));
    }
    let categoriesStorage = JSON.parse(sessionStorage.getItem("categories"));
    let idProductStorage = sessionStorage.getItem("idProducto");
    setCategories(categoriesStorage);
    axios
      .get(`http://localhost:3001/api/id/${idProductStorage}`)
      .then((res) => {
        const data = res.data;
        setProductDetail(data);
      });
  }, [idProduct]);
  return (
    <Fragment>
      {productDetail ? (
        <div className="principal-container-products">
          <div className="breadcrumb-item active nav-products">
            {categories &&
              categories.length > 0 &&
              categories[0].values[0].path_from_root.map((c) => (
                <div className="categories">
                  {c.name}
                  <div style={{ margin: "0 5px 0 5px" }}>{">"}</div>
                </div>
              ))}
          </div>

          <div className="container-products">
            <div className="container-details">
              <img
                className="img-details-product"
                src={productDetail.item.picture}
                alt="logo"
              />
              <div className="details-product">
                <div className="product-condition">
                  {productDetail.item.condition === "new" ? "Nuevo" : "Usado"} -{" "}
                  {productDetail.item.soldQuantity + " Vendidos"}
                </div>
                <div className="title-product-detail">
                  {productDetail.item.title}
                </div>
                <div className="price-detail">
                  {Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: productDetail.item.price.currency,
                  }).format(productDetail.item.price.amount)}
                </div>
                <button className="button-buy">Comprar</button>
              </div>
            </div>
            <div className="details-description">
              <div className="description-product-detail">
                Descripcion del Producto
              </div>
              <div className="description-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                quo, quia inventore labore suscipit voluptatibus tempora dolor
                omnis, debitis doloremque ullam quisquam eaque laboriosam? Esse
                ea eaque deleniti minima quo.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner">
          <Spinner animation="border" />
        </div>
      )}
    </Fragment>
  );
};
export default ProductDetail;
