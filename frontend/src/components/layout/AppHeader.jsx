import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useCrypto } from "../../context/crypto-context";
import AddAssetForm from "../AddAssetForm";
import CoinInfoModal from "../CoinInfoModal";

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
  const { crypto } = useCrypto();
  const [select, setSelect] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "h" || event.key === "р") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    console.log(value);
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "250px",
        }}
        open={select}
        value="press 'h' to open"
        optionLabelProp="label"
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: "20px" }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button onClick={() => setDrawer(true)} type="primary">
        AddAsset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        title="Add Asset"
        width={600}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  );
}
