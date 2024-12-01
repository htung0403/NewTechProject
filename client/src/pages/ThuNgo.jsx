export default function ThuNgo() {
  document.title = `THÔNG ĐIỆP NĂM HỌC - TRƯỜNG TIỂU HỌC NAM PHƯỚC 1`;

  const quotationMarkImg = "https://firebasestorage.googleapis.com/v0/b/namphuoc1-web.appspot.com/o/quotation-mark-min.png?alt=media&token=c67acbf3-e857-4699-bdd5-d27682427aef";
  return (
    <div className="pt-[70px] mx-auto max-w-[1300px]">
      <div className="flex flex-row justify-start">
        <div className="w-3 h-10 mr-4 bg-cyan-600 border rounded-lg"></div>
        <h1 className="font-semibold text-[1.7rem] text-cyan-600">THÔNG ĐIỆP NĂM HỌC</h1>
      </div>
      <div className="bg-amber-50 flex justify-end mt-4 p-6 rounded-lg text-lg h-[1000px]">
        <img src={quotationMarkImg} alt="quotation" className="top-[180px] w-12 h-12"></img>
      </div>
    </div>
  );
}
