import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartIn } from "../api/cartaxios";
import { getBestProduct } from "../api/mainFatch";
import Slick from "../components/Slick";
import { MainDiv } from "../style/MainCss";

const Main = () => {
  const [bestProduct, setBestProduct] = useState([]);
  

  //제일 많이 팔린 상품 가져오기
  const getBestProductFetch = async () => {
    try {
      const productIdJson = await getBestProduct();
      setBestProduct(productIdJson);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBestProductFetch();
  }, []);

  const navigate = useNavigate();

  const handleMoveViewClick = _more_view => {
    navigate(`/productlist`);
  };
  const handleShoppingClick = async _item => {
    console.log(_item.productId);
    try {
      const cartItem = {
        productId: _item.productId,
        iuser: 1,
        count: 1,
      };
      const result = await cartIn(cartItem);
      console.log(result);
      navigate(`/cart`);
      return result;
    } catch (err) {
      console.error("주문 처리 중 오류 발생:", err);
    }
  };
  const handleItemClick = _id => {
    navigate(`/product/${_id}`);
  };

  return (
    <MainDiv>
      <div className="wrap">
        <div className="info">
          <Slick />
          <div className=" best-item">
            <h1 className="best-title">요즘, 많이 찾는 상품</h1>
            <button
              type="button"
              className="confirm"
              onClick={() => handleMoveViewClick()}
            >
              더보기
            </button>
          </div>
          <ul className="list-area">
            {bestProduct.map((item, index) => (
              <div key={index}>
                <li className="product-card">
                  <img
                    src="http://fpoimg.com/150x150" // 이미지 파일 경로를 넣으세요.
                    alt="상품 이미지"
                    className="product-image"
                  />
                  <span className="product-description">
                    <span
                      className="item-numbering"
                      onClick={() => handleItemClick(1)}
                    >
                      상품보기
                    </span>
                    <FontAwesomeIcon
                      icon={faBasketShopping}
                      className="shopping-icon"
                      onClick={() => handleShoppingClick(item)}
                    />
                  </span>
                  <div className="item-info">
                    <h2>{item.name}</h2>
                    <p>가격 :{item.price.toLocaleString()}원</p>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </MainDiv>
  );
};

export default Main;
