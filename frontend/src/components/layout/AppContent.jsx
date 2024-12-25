import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import AssetsTable from "../AssetsTable";
import PortfolioChart from "../PortfolioChart";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

const balanceTitleStyle = {
  color: "rgb(255, 255, 255)",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  fontWeight: "600",
  fontSize: "24px",
  lineHeight: "1.3",
  marginBottom: "15px"
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      
{      /* <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, cur) => (acc += cur), 0)
          .toFixed(2)}
        $
      </Typography.Title>

      <Typography.Title level={3} style={{ textAlign: "right", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, cur) => (acc += cur), 0)
          .toFixed(2)}
        $
      </Typography.Title> */}

      <div
        style={balanceTitleStyle}
      >
        <h3>
          Portfolio:{" "}
          {assets
            .map((asset) => asset.amount * cryptoPriceMap[asset.id])
            .reduce((acc, cur) => (acc += cur), 0)
            .toFixed(2)}
          $
        </h3>
        <h3>
          Balance:{" "}
          0
          $
        </h3>
      </div>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
