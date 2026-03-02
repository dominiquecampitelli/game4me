import { useState } from "react";

import "./styles.css";

export default function RAMMemory() {
  const [ram, setRam] = useState("");

  return (
        <input
          type="number"
          placeholder="Memória RAM (GB)"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          className="ram-input"
        />
  );
}
