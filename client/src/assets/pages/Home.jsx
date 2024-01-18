import Payment from "../components/Payment";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-16 col-span-6 md:col-span-3 md:col-start-3">
      <div className="py-2">
        <span className="leading text-xl">USD 500</span>
      </div>
      <Payment />
    </div>
  );
};

export default Home;
