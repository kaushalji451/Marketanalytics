import React from "react";

const Fricc = ({ followers, reached, impressions, clicks, conversions }) => {
  return (
    <div className="flex justify-around m-5 gap-5">
      <div className="bg-white w-full py-2 text-2xl text-start ps-4 rounded-sm">
        <h1 className="font-semibold">Followers</h1>
        <p className="text-4xl font-semibold">{followers}</p>
      </div>
      <div className="bg-white w-full py-2 text-2xl text-start ps-4 rounded-sm">
        <h1 className="font-semibold">Reach</h1>
        <p className="text-4xl font-semibold">{reached}</p>
      </div>
      <div className="bg-white w-full py-2 text-2xl text-start ps-4 rounded-sm">
        <h1 className="font-semibold">Impresion</h1>
        <p className="text-4xl font-semibold">{impressions}</p>
      </div>
      <div className="bg-white w-full py-2 text-2xl text-start ps-4 rounded-sm">
        <h1 className="font-semibold">Click</h1>
        <p className="text-4xl font-semibold">{clicks}</p>
      </div>
      <div className="bg-white w-full py-2 text-2xl text-start ps-4 rounded-sm">
        <h1 className="font-semibold">Conversions</h1>
        <p className="text-4xl font-semibold">{conversions}</p>
      </div>
    </div>
  );
};

export default Fricc;
