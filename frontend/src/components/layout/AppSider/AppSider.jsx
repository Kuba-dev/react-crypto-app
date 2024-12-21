import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import "./AppSider.css";
import { useContext } from "react";
import CryptoContext from "../../../context/crypto-context";

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
  const { assets } = useContext(CryptoContext);


  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} bordered={false} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={asset.symbol}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? "#3f8600" : "#cf1322",
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />

          <List
            size="small"
            bordered
            dataSource={[
              {
                title: "Full name",
                value: asset.name,
                isText: true,
                isPlain: true,
              },
              {
                title: "Total Profit",
                value: asset.totalProfit,
                withTag: true,
              },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item className="list-item">
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.grow ? "+" : "-"}
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && (
                    <Typography.Text>{item.value}</Typography.Text>
                  )}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.isText ? item.value : item.value.toFixed(2) + "$"}
                      {/* (typeof item.value) === "string" */}
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
