import { Layout, Button, Drawer } from "antd";
import { useState } from "react";
import AddAssetForm from "../AddAssetForm";
import AddBalanceForm from "../AddBalanceForm";
import SelectHeader from "../SelectHeader";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
};

export default function AppHeader() {
  const [drawerAsset, setDrawerAsset] = useState(false);
  const [drawerBalance, setBalanceAsset] = useState(true);

  return (
    <Layout.Header style={headerStyle}>

      <SelectHeader />

      <div className="action-account" style={{display: "flex", gap: "15px"}}>
        <Button onClick={() => setBalanceAsset(true)} type="primary">
          AddBalance
        </Button>

        <Button onClick={() => setDrawerAsset(true)} type="primary">
          AddAsset
        </Button>
      </div>

      <Drawer
        title="Add Asset"
        width={600}
        onClose={() => setDrawerAsset(false)}
        open={drawerAsset}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawerAsset(false)} />
      </Drawer>

      <Drawer
        title="Add Balance"
        width={600}
        onClose={() => setBalanceAsset(false)}
        open={drawerBalance}
        destroyOnClose
      >
        <AddBalanceForm onClose={() => setDrawerAsset(false)} />
      </Drawer>

    </Layout.Header>
  );
}
