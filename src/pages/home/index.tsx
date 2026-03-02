import { useState } from "react";
import { getGamesUrl, getGameDetailsUrl } from "../../services/api";

import Navbar from "../../components/navbar";
import HeroCarousel from "../../components/hero-carousel";
import CustomSelect from "../../components/custom-select";
import type { SelectOption } from "../../components/custom-select";
import InputNumber from "../../components/input-number";

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
  { value: "browser", label: "Navegador" },
];

type Game = {
  id: number;
  title: string;
  thumbnail: string;
  game_url: string;
};

export default function Home() {
  const [genres, setGenres] = useState<SelectOption[]>([]);
  const [platforms, setPlatforms] = useState<SelectOption[]>([]);
  const [ram, setRam] = useState<number | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
  try {
    setLoading(true);
    setError(null);

    if (!genres.length || !platforms.length || !ram) {
      throw new Error("Selecione pelo menos um gênero, plataforma ou memória RAM.");
    }

    let allGames: Game[] = [];

    const selectedGenres = genres.length ? genres : [{ value: "", label: "" }];
    const selectedPlatforms = platforms.length
      ? platforms
      : [{ value: "", label: "" }];

    for (const genre of selectedGenres) {
      for (const platform of selectedPlatforms) {
        const url = getGamesUrl(
          genre.value || "",
          platform.value || ""
        );

        const response = await fetch(url);

        if (!response.ok) continue;

        const data: Game[] = await response.json();
        allGames = [...allGames, ...data];
      }
    }

    const uniqueGames = Array.from(
      new Map(allGames.map((g) => [g.id, g])).values()
    );

    if (!uniqueGames.length) {
      throw new Error("Nenhum jogo encontrado para gênero ou plataforma selecionada.");
    }

    let filteredGames = uniqueGames;

    if (ram) {
      const gamesWithDetails = await Promise.all(
        uniqueGames.map(async (game) => {
          const res = await fetch(getGameDetailsUrl(game.id));
          if (!res.ok) return null;

          const details = await res.json();

          return {
            ...game,
            minimum_system_requirements:
              details.minimum_system_requirements,
          };
        })
      );

      filteredGames = gamesWithDetails
        .filter((game) => {
          const memoryString =
            game?.minimum_system_requirements?.memory;

          if (!memoryString) return false;

          const memoryNumber = parseInt(
            memoryString.replace(/\D/g, "")
          );

          return memoryNumber <= ram;
        })
        .map((game) => ({
          id: game!.id,
          title: game!.title,
          thumbnail: game!.thumbnail,
          game_url: game!.game_url,
        }));

      if (!filteredGames.length) {
        setGames([]);
        setError("Nenhum jogo compatível com a memória informada.");
        return;
      }
    }

    setGames(filteredGames);
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
          placeholder="Selecione o gênero"
          isMulti
        />
        <CustomSelect
          options={platformOptions}
          value={platforms}
          onChange={setPlatforms}
          placeholder="Selecione a plataforma"
          isMulti
        />
        <InputNumber value={ram} onChange={setRam} />
        <button className="btn btn-blue" onClick={handleSearch}>
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
