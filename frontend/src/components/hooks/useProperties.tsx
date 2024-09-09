export function useProperties(key: string[]): string[][] {
  const propertiesReader = require("properties-reader");
  const properties = propertiesReader("../config/frontend.properties");

  return key.map((k) => properties.get(k).split(","));
}
