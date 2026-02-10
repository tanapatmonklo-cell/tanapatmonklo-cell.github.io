export interface FuelRecord {
  id: string;
  date: Date;
  vehicleName: string;
  fuelType: string;
  mileageBefore: number;
  mileageAfter: number;
  liters: number;
  pricePerLiter: number;
  // คำนวณอัตโนมัติ
  distance: number;
  totalPrice: number;
  fuelEfficiency: number;
}

export interface FuelFormData {
  date: Date;
  vehicleName: string;
  fuelType: string;
  mileageBefore: string;
  mileageAfter: string;
  liters: string;
  pricePerLiter: string;
}

export const FUEL_TYPES = [
  { value: "gasohol95", label: "แก๊สโซฮอล์ 95" },
  { value: "gasohol91", label: "แก๊สโซฮอล์ 91" },
  { value: "e20", label: "แก๊สโซฮอล์ E20" },
  { value: "e85", label: "แก๊สโซฮอล์ E85" },
  { value: "diesel", label: "ดีเซล" },
  { value: "dieselB7", label: "ดีเซล B7" },
  { value: "premium", label: "เบนซิน 95" },
] as const;

export const SAMPLE_VEHICLES = [
  "Honda City",
  "Toyota Yaris",
  "Mazda 2",
  "Isuzu D-Max",
  "Honda Civic",
] as const;
