import React from "react";
import "./middleSection.css";

function MiddleSection() {
  return (
    <>
      <div className="awardBar">
        <h3>A fresh, honest approach to car rental</h3>
        <nav className="awardLogoBar">
          <ul>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/awards/feefo-platinum-2022.1642773221.svg"
                }
                alt=""
              />
            </li>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/awards/which-recommended-2022.1651130488.svg"
                }
                alt=""
              />
            </li>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/awards/trustpilot-score-omg.1655895904.svg"
                }
                alt=""
              />
            </li>
          </ul>
        </nav>
      </div>
      <div className="awardBar2">
        <h3>Exclusive car hire deals with leading brands</h3>
        <nav className="awardLogoBar">
          <ul>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/supplier-logos/hertz.gif"
                }
                alt=""
              />
            </li>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/supplier-logos/sixt.gif"
                }
                alt=""
              />
            </li>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/supplier-logos/enterprise.gif"
                }
                alt=""
              />
            </li>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/supplier-logos/thrifty.gif"
                }
                alt=""
              />
            </li>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/supplier-logos/alamo.gif"
                }
                alt=""
              />
            </li>
            <li>
              <img
                src={
                  "https://www.zestcarrental.com/images/supplier-logos/europcar.gif"
                }
                alt=""
              />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default MiddleSection;
