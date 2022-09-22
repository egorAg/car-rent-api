import { ILoad } from "../../load/interfaces/load.interface";

export interface ICar {
  id?: number;
  mark?: string;
  model?: string;
  gov_number?: string;
  vin?: string;
  is_available?: boolean;
  taken_from?: Date;
  taken_for?: Date;
  loadId?: number | null;
  load?: ILoad | null;
}
