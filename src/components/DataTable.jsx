import React from "react";

export default function DataTable({ data }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={th}>Tanggal</th>
            <th style={th}>Komoditas</th>
            <th style={th}>Wilayah</th>
            <th style={th}>Harga Aktual</th>
            <th style={th}>Harga Prediksi</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={td}>
                {new Date(item.Tanggal).toLocaleDateString("id-ID")}
              </td>

              <td style={td}>{item.Komoditas}</td>
              <td style={td}>{item.Wilayah}</td>

              <td style={td}>
                {item.Harga_Aktual
                  ? Number(item.Harga_Aktual).toLocaleString("id-ID")
                  : "-"}
              </td>

              <td style={td}>
                {item.Harga_Prediksi
                  ? Number(item.Harga_Prediksi).toLocaleString("id-ID")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "12px",
  fontSize: "14px",
  fontWeight: "600",
};

const td = {
  padding: "10px 12px",
  fontSize: "14px",
};