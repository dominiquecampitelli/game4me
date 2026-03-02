import { useState } from "react";
import { getGamesUrl } from "../../services/api";

import Navbar from "../../components/navbar";
import HeroCarousel from "../../components/hero-carousel";
import CustomSelect from "../../components/custom-select";
import type { SelectOption } from "../../components/custom-select";
import RAMMemory from "../../components/filters/ram-memory";

import "./styles.css";

const genreOptions: SelectOption[] = [
  { value: "shooter", label: "Ação" },
  { value: "adventure", label: "Aventura" },
  { value: "battle-royale", label: "Battle Royale" },
  { value: "card", label: "Cartas" },
  { value: "racing", label: "Corrida" },
  { value: "sports", label: "Esporte" },
  { value: "estrategia", label: "Estratégia" },
  { value: "fantasy", label: "Fantasia" },
  { value: "fighting", label: "Luta" },
  { value: "puzzle", label: "Puzzle" },
  { value: "rpg", label: "RPG" },
  { value: "simulation", label: "Simulação" },
  { value: "surviver", label: "Sobrevivência" },
  { value: "terror", label: "Terror" },
];

const platformOptions: SelectOption[] = [
  { value: "pc", label: "PC" },
  { value: "browser", label: "Browser" },
];

type Game = {
  id: number;
  title: string;
  thumbnail: string;
  game_url: string;
};

export default function Home() {
  const [genres, setGenres] = useState<SelectOption[]>([]);
  const [platform, setPlatform] = useState<SelectOption | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    try {
      setLoading(true);
      setError(null);

      let allGames: Game[] = [];

      for (const genre of genres) {
        const platformValue = platform?.value;

        const url = getGamesUrl(genre.value, platformValue);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Erro ao buscar jogos");
        }

        const data: Game[] = await response.json();
        allGames = [...allGames, ...data];
      }

      const uniqueGames = Array.from(
        new Map(allGames.map((g) => [g.id, g])).values(),
      );

      if (!uniqueGames.length) {
        throw new Error("Nenhum jogo encontrado.");
      }
      setGames(uniqueGames);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado.");
      }
      setGames([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Navbar />
      <HeroCarousel />

      <div className="filters-container">
        <CustomSelect
          options={genreOptions}
          value={genres}
          onChange={setGenres}
          placeholder="Selecione os gêneros"
          isMulti
        />
        <CustomSelect
          options={platformOptions}
          value={platform}
          onChange={setPlatform}
          placeholder="Selecione a plataforma"
        />
        <RAMMemory />
        <button onClick={handleSearch}>
          {loading ? "Buscando..." : "Buscar recomendação"}
        </button>
      </div>

      {error && <p style={{ color: "hotpink" }}>{error}</p>}

      {games.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2>Resultados encontrados: {games.length}</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "20px",
            }}
          >
            {games.map((game) => (
              <div key={game.id} style={{ background: "#111", padding: 12 }}>
                <h3>{game.title}</h3>
                <img src={game.thumbnail} width="100%" />
                <a href={game.game_url} target="_blank">
                  Jogar agora
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
