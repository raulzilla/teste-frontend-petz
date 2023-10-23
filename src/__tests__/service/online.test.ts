import api from './../../service';

describe("online", () => {
  it("should fetch locations successfully", () => {
    api.online.fetchLocation().then(res => {
      expect(res).toBeDefined();
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(850);
    });
  });

  it("should fetch regions successfully", async () => {
    api.online.fetchRegion().then(res => {
      expect(res).toBeDefined();
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(850);
    });
  });

  it("should fetch pokemons successfully", () => {
    api.online.fetchRegion().then(res => {
      expect(res).toBeDefined();
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(1291);
    });
  });

  it("should fetch pokemon generation successfully", async () => {
    api.online.fetchPokemonGeneration("pikachu").then(res => {
      expect(res).toBeDefined();
      expect(res).toEqual({ name: "generation-i", generation: 1 });
    })
  });
});