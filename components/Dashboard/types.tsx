export interface Starship {
  name: string;
  model: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  films: string[];
  pilots: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Pilot {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
  url: string;
}
