import { Select, Space, Modal } from "antd";
import { useCrypto } from "../context/crypto-context";
import { useEffect } from "react";
import { useState } from "react";
import CoinInfoModal from "./CoinInfoModal";


export default function SelectHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);

  const { crypto } = useCrypto();

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
    <>
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
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
    </>
  );
}
