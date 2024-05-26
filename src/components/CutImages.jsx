import React from "react";
import v_cut_shorts from "../assets/leftcut/v_cut_shorts.png";
import v_cut_top from "../assets/leftcut/v_cut_top.png";
import no_v_cut_short from "../assets/leftcut/no_v_cut_short.png";
import no_v_cut_top from "../assets/leftcut/no_v_cut_top.png";

const CutImages = ({ onImageSelect }) => {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <button className="button" onClick={() => onImageSelect("v")}>
            <img src={v_cut_shorts} height={50} width={50} alt="one" />
            <img src={v_cut_top} height={50} width={50} alt="two" />
          </button>
        </div>

        <div className="col">
          <button className="button" onClick={() => onImageSelect("noV")}>
            <img src={no_v_cut_short} height={50} width={50} alt="one" />
            <img src={no_v_cut_top} height={50} width={50} alt="two" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CutImages;
