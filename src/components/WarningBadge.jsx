function WarningBadge({ status }) {

  const statusColor = {
    Aman: "bg-green-500",
    Waspada: "bg-yellow-500",
    Bahaya: "bg-red-500",
    Stabil: "bg-blue-500",
  };

  return (
    <span
      className={`${statusColor[status]} text-white px-3 py-1 rounded-full text-sm font-semibold`}
    >
      {status}
    </span>
  );
}

export default WarningBadge;