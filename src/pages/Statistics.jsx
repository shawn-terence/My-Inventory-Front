import DefaultLayout from "../layouts/default";
import { Tabs, Tab } from "@nextui-org/tabs";
import MonthlySale from "../statistics/MonthlySale";
import HighSale from "../statistics/HighSale";
import CurrentSale from "../statistics/CurrentSale";
import LowSale from "../statistics/LowSale";
import TotalProducts from "../statistics/TotalProducts";
import TopProducts from "../statistics/TopProducts";
import LowStockProducts from "../statistics/LowStockProducts";
import RecentlyAddedProducts from "../statistics/RecentlyAddedProducts";
import ProductValueDistribution from "../statistics/ProductValueDistribution";
import AverageProductPrice from "../statistics/AverageProductPrice";

function Statistics() {
  return (
    <DefaultLayout>
      <div>
        <h1 className="text-center">STATISTICS PAGE</h1>
        <Tabs>
          <Tab key="Sales" title="Sale Statistics" className="p-6">
            <h2 className="text-center">Sales Statistics for last month and this month</h2>
            <div className="flex">
              <MonthlySale />
              <CurrentSale />
            </div>
            <div>
              <h2 className="text-center">Highest and Lowest Sales</h2>
              <div className="flex">
                <HighSale />
                <LowSale />
              </div>
            </div>
          </Tab>
          <Tab key="Product" title="Product Statistics" className="p-6">
            <h2 className="text-center">Product Statistics</h2>
            <div className="grid grid-cols-2 gap-4">

                <TotalProducts />
                <AverageProductPrice />

                <TopProducts />
                <LowStockProducts />
                <RecentlyAddedProducts/>
            </div>
            <div className="w-full">
              <ProductValueDistribution />
              </div>
          </Tab>
          <Tab key="Transaction" title="Transaction Records" className="p-6">
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}

export default Statistics;
