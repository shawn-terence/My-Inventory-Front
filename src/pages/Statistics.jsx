import DefaultLayout from "../layouts/default";
import {Tabs, Tab} from "@nextui-org/tabs";
import BarChart from "../components/BarChart";
import { useState, useEffect } from "react";
import MonthlySale from "../statistics/MonthlySale";
import HighSale from "../statistics/HighSale";
import CurrentSale from "../statistics/CurrentSale";
import LowSale from "../statistics/LowSale";
function Statistics() {


  return (
    <DefaultLayout>

      <div>
        <h1 className="text-center">STATISTICS PAGE</h1>
        <Tabs>
          <Tab key="Sales" title="Sale Statistics" className="p-6">
            <h2 className="text-center">Sales Statistics for last month and this month</h2>
            <div className="flex">
              <MonthlySale/>
              <CurrentSale/>
            </div>
            <div>
              <h2 className="text-center">Highest and Lowest Sales</h2>
              <div className="flex">
                <HighSale/>
                <LowSale/>
              </div>
            </div>
          </Tab>
          <Tab key="Monthly" title="Product Statistics"></Tab>
          <Tab key="Transaction" title="Transaction records"></Tab>
        </Tabs>
        
      </div>
    </DefaultLayout>
  );
}

export default Statistics;
