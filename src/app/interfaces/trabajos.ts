export interface Trabajo {
  id?:           string;
  created_at?:   Date;
  numberOrder?:  number;
  price?:        number;
  description?:  string;
  user?:         number;
  vehicle?:      string;
  vehicleBrand?: string;
  plate?:        string;
  date?:         Date;
  nextDate?:     Date;
  typeJobs?:     string;
  name?:         string;
}
