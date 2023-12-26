export interface CLIENTE {
  id?:             string;
  created_at?:     Date;
  name?:           string | null;
  documentType?:   string;
  numberDocument?: string;
  email?:          string;
  phone?:          string;
  vehicleBrand?:   string;
  vehicle?:        string;
  plate?:          string;
}
