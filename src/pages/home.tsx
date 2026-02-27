import Select from "react-select";
import type { StylesConfig } from "react-select";
import { useState } from "react";

import Navbar from "../components/navbar";
import HeroCarousel from "../components/hero-carousel";

import "./styles.css";

const genreOptions = [
  { value: "fps", label: "FPS" },
  { value: "rpg", label: "RPG" },
  { value: "moba", label: "MOBA" },
  { value: "battle-royale", label: "Battle Royale" },
];

const platformOptions = [
  { value: "pc", label: "PC" },
  { value: "ps5", label: "PS5" },
  { value: "xbox", label: "Xbox" },
  { value: "switch", label: "Nintendo Switch" },
];

type OptionType = {
  value: string;
  label: string;
};

export default function Home() {
  const [ram, setRam] = useState("");

  const customStyles: StylesConfig<OptionType, true> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#111",
      borderColor: state.isFocused ? "#ff00c8" : "#00f0ff",
      boxShadow: "none",
      borderRadius: "8px",
      padding: "4px",
      transition: "0.3s",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#111",
      border: "1px solid #00f0ff",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#1a1a1a" : "#111",
      color: "#fff",
      cursor: "pointer",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#777",
    }),
  };

  return (
    <div className="container">
      <Navbar />
      <HeroCarousel />

      <div className="filters-container">
        <Select
          options={genreOptions}
          placeholder="Gênero"
          className="react-select"
          classNamePrefix="select"
          styles={customStyles}
        />

        <Select
          options={platformOptions}
          placeholder="Plataforma"
          className="react-select"
          classNamePrefix="select"
          styles={customStyles}
        />

        <input
          type="number"
          placeholder="Memória RAM (GB)"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          className="ram-input"
        />
      </div>
    </div>
  );
}
