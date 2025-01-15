import Pet from "./pet";

export default interface Petshop{
  id: string,
  name: string,
  cnpj: string,
  pets: Pet[],
}