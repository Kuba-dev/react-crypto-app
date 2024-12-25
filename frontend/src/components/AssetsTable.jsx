import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => b.price - a.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
];


export default function AssetsTable() {
  const { assets } = useCrypto();

    const data = assets.map((a, index) => ({
        key: a.id + index,
        name: a.name,
        price: a.price,
        amount: a.amount,
    }))
    console.log(data);
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
    />
  );
}
