import React, { Fragment, useEffect } from "react";
import "../App.css";
import MetaData from "./layout/metaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Action/productAction";
import Product from "./product/product";
export const Home = () => {
  const disptach = useDispatch();
  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    disptach(getProducts());
  }, [disptach]);
  return (
    <Fragment>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <Fragment>
          <h1 id="products_heading">Latest Products</h1>
          <MetaData title={"Buy best products"} />
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
