import { CvetniAranzman } from "./cvetniAranzmanModel";
import { LokacijaModel } from "./lokacijaModel";
import { UserModel } from "./userModel";

export class Porudzbina{
  porudzbinaID : number;
  kolicina : number;
  cenaPorudzbine : number;
  datumPorudzbine : Date;
  statusPorudzbine : string;
  cvetniAranzmanID : number;
  cvetniAranzman: CvetniAranzman;
  zaposleniID : number;
  zaposleni: UserModel;
  kupacID: number;
  kupac: UserModel;
  lokacijaID: number;
  lokacija: LokacijaModel;
}
