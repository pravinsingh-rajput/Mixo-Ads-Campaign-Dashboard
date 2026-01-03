import Campaign from "./components/campaign/Campaign";
import HomeHeader from "./components/common/home-header";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeader />
      <Campaign />
    </div>
  );
};

export default Home;
