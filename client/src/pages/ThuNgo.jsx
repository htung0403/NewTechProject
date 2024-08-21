import React from "react";

export default function ThuNgo() {
  const quotationMarkImg = "https://firebasestorage.googleapis.com/v0/b/namphuoc1-web.appspot.com/o/quotation-mark-min.png?alt=media&token=c67acbf3-e857-4699-bdd5-d27682427aef";
  return (
    <div className="pt-[70px] mx-auto max-w-[1300px]">
      <div className="flex flex-row justify-start">
        <div className="w-3 h-10 mr-4 bg-cyan-600 border rounded-lg"></div>
        <h1 className="font-semibold text-[1.7rem] text-cyan-600">THƯ NGÕ</h1>
      </div>
      <div className="bg-amber-50 mt-4 p-6 rounded-lg text-lg h-[1000px]">
        <img src={quotationMarkImg} alt="quotation" className="top-[180px] end-[20%] w-12 h-12"></img>
        <iframe src="https://docs.google.com/document/d/1sjZ56jN1FyQRmsz6RHVlFhXHgcck2DW1/pub?embedded=true" className="w-full h-full"></iframe>
      </div>
    </div>
  );
}
