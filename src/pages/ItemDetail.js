import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../components/Review";
import { getProductId } from "../api/mainFatch";
import { ItemDetailDiv } from "../style/MainCss";

const ItemDetail = () => {
  // uri 에서 값 읽기
  const { pid } = useParams();

  //상품 상세 페이지
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState([]);

  //상품 상세 페이지 가져오기
  const getProductIdFetch = async () => {
    try {
      const productIdJson = await getProductId(pid);
      setProduct(productIdJson);
      setMainImage(productIdJson.img);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductIdFetch();
    window.scrollTo(0, 0);
  }, []);

  // const subImages = [
  //   { img: "http://fpoimg.com/150x150" },
  //   { img: "http://fpoimg.com/100x100" },
  //   { img: "http://fpoimg.com/200x200" },
  //   { img: "http://fpoimg.com/300x300" },
  // ];

  const handleSubImageClick = image => {
    setMainImage(image);
  };

  const handleScrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  // console.log(mainImage[0]);
  return (
    <ItemDetailDiv>
      <div className="content-wrap" id="content-top">
        <div className="goods">
          <img className="item-img" src={mainImage.img} alt="MainImage" />

          <div className="item-info">
            {mainImage?.map((subImage, index) => (
              <img
                key={index}
                src={subImage[index]}
                alt={`Sub Image ${index + 1}`}
                onClick={() => handleSubImageClick(subImage[index])}
              />
            ))}
          </div>

          <div>
            <ul className="goods-details">
              <li className="goods-title">{product?.name}</li>
              <li className="goods-info">원산지 : 상품정보 참조</li>
              <li className="goods-price">
                판매가 : {parseInt(product?.price).toLocaleString()}원{" "}
              </li>
              <li className="order-total-price">총 합계 금액{product?.price}</li>
            </ul>
          </div>
          <div className="product-tabs">
            <ul>
              <li>
                <a
                  href="#detail-section01"
                  onClick={e => handleScrollToSection("detail-section01", e)}
                >
                  <span>상품 상세정보</span>
                </a>
              </li>
              <li>
                <a
                  href="#detail-section02"
                  onClick={e => handleScrollToSection("detail-section02", e)}
                >
                  <span>기본정보</span>
                </a>
              </li>
              <li>
                <a
                  href="#detail-section03"
                  onClick={e => handleScrollToSection("detail-section03", e)}
                >
                  <span>상품리뷰</span>
                </a>
              </li>
            </ul>

            <div id="detail-section01" className="menu-info">
              <h1>상품 상세정보</h1>
              <div>{product && product.description}</div>
            </div>
            <div id="detail-section02">
              <h1>기본정보</h1>
              <div className="container">
                <div className="item-title">식품의 유형</div>
                <div className="item">상세페이지 참조</div>
                <div className="item-title">생산자 및 소재지</div>
                <div className="item">
                  (주)대구 중구 중앙대로 394, 제일빌딩 5층
                </div>
                <div className="item-title">
                  제조연월일, 유통기한 또는 품질유지기한
                </div>
                <div className="item">상세페이지 참조</div>
                <div className="item-title">포장단위별 용량(중량), 수량</div>
                <div className="item">상세페이지 참조</div>
                <div className="item-title">원재료명 및 함량</div>
                <div className="item">상세페이지 참조</div>
                <div className="item-title">영양성분</div>
                <div className="item">상세페이지 참조</div>
                <div className="item-title">
                  유전자변형식품에 해당하는 경우의 표시
                </div>
                <div className="item">해당없음</div>
                <div className="item-title">
                  표시광고사전심의필 유무 및 부작용 발생 가능성
                </div>
                <div className="item">상세페이지 참조</div>
                <div className="item-title">수입식품문구</div>
                <div className="item">해당없음</div>
                <div className="item-title">소비자상담관련 전화번호</div>
                <div className="item">고객센터 053-572-1005</div>
              </div>
              <img src="/img/iteminfo.png" alt="item" />
            </div>
            <div id="detail-section03" className="menu-info">
              <h1>상품리뷰</h1>
              <Review />
            </div>
          </div>
        </div>
      </div>
    </ItemDetailDiv>
  );
};

export default ItemDetail;
