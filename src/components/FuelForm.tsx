import { useState, useMemo } from "react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { CalendarIcon, Fuel, Car, Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FuelFormData, FuelRecord, FUEL_TYPES, SAMPLE_VEHICLES } from "@/types/fuel";

interface FuelFormProps {
  onSubmit: (record: FuelRecord) => void;
}

export function FuelForm({ onSubmit }: FuelFormProps) {
  const [formData, setFormData] = useState<FuelFormData>({
    date: new Date(),
    vehicleName: "",
    fuelType: "",
    mileageBefore: "",
    mileageAfter: "",
    liters: "",
    pricePerLiter: "",
  });

  // คำนวณอัตโนมัติ
  const calculations = useMemo(() => {
    const mileageBefore = parseFloat(formData.mileageBefore) || 0;
    const mileageAfter = parseFloat(formData.mileageAfter) || 0;
    const liters = parseFloat(formData.liters) || 0;
    const pricePerLiter = parseFloat(formData.pricePerLiter) || 0;

    const distance = mileageAfter - mileageBefore;
    const totalPrice = liters * pricePerLiter;
    const fuelEfficiency = liters > 0 ? distance / liters : 0;

    return {
      distance: distance > 0 ? distance : 0,
      totalPrice: totalPrice > 0 ? totalPrice : 0,
      fuelEfficiency: fuelEfficiency > 0 ? fuelEfficiency : 0,
    };
  }, [formData.mileageBefore, formData.mileageAfter, formData.liters, formData.pricePerLiter]);

  const isFormValid = useMemo(() => {
    return (
      formData.vehicleName &&
      formData.fuelType &&
      parseFloat(formData.mileageBefore) > 0 &&
      parseFloat(formData.mileageAfter) > parseFloat(formData.mileageBefore) &&
      parseFloat(formData.liters) > 0 &&
      parseFloat(formData.pricePerLiter) > 0
    );
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const record: FuelRecord = {
      id: Date.now().toString(),
      date: formData.date,
      vehicleName: formData.vehicleName,
      fuelType: formData.fuelType,
      mileageBefore: parseFloat(formData.mileageBefore),
      mileageAfter: parseFloat(formData.mileageAfter),
      liters: parseFloat(formData.liters),
      pricePerLiter: parseFloat(formData.pricePerLiter),
      ...calculations,
    };

    onSubmit(record);
    
    // Reset form
    setFormData({
      date: new Date(),
      vehicleName: "",
      fuelType: "",
      mileageBefore: "",
      mileageAfter: "",
      liters: "",
      pricePerLiter: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ข้อมูลพื้นฐาน */}
      <Card className="card-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-primary" />
            ข้อมูลการเติมน้ำมัน
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* วันที่ */}
          <div className="space-y-2">
            <Label>วันที่เติมน้ำมัน</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(formData.date, "PPP", { locale: th })
                  ) : (
                    <span>เลือกวันที่</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => date && setFormData({ ...formData, date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* รถและประเภทน้ำมัน */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>รถที่เติม</Label>
              <Select
                value={formData.vehicleName}
                onValueChange={(value) => setFormData({ ...formData, vehicleName: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรถ" />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_VEHICLES.map((vehicle) => (
                    <SelectItem key={vehicle} value={vehicle}>
                      {vehicle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>ประเภทน้ำมัน</Label>
              <Select
                value={formData.fuelType}
                onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภทน้ำมัน" />
                </SelectTrigger>
                <SelectContent>
                  {FUEL_TYPES.map((fuel) => (
                    <SelectItem key={fuel.value} value={fuel.value}>
                      {fuel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* เลขไมล์ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>เลขไมล์ก่อนเติม (กม.)</Label>
              <Input
                type="number"
                placeholder="เช่น 50000"
                value={formData.mileageBefore}
                onChange={(e) => setFormData({ ...formData, mileageBefore: e.target.value })}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>เลขไมล์หลังเติม (กม.)</Label>
              <Input
                type="number"
                placeholder="เช่น 50450"
                value={formData.mileageAfter}
                onChange={(e) => setFormData({ ...formData, mileageAfter: e.target.value })}
                min="0"
              />
            </div>
          </div>

          {/* จำนวนลิตรและราคา */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>จำนวนลิตร</Label>
              <Input
                type="number"
                placeholder="เช่น 35.5"
                value={formData.liters}
                onChange={(e) => setFormData({ ...formData, liters: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label>ราคาต่อลิตร (บาท)</Label>
              <Input
                type="number"
                placeholder="เช่น 35.99"
                value={formData.pricePerLiter}
                onChange={(e) => setFormData({ ...formData, pricePerLiter: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ผลการคำนวณ */}
      <Card className="card-shadow border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-secondary" />
            ผลการคำนวณอัตโนมัติ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card border">
              <p className="text-sm text-muted-foreground mb-1">ระยะทางที่วิ่ง</p>
              <p className="text-2xl font-bold text-primary">
                {calculations.distance.toLocaleString()} <span className="text-sm font-normal">กม.</span>
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border">
              <p className="text-sm text-muted-foreground mb-1">ราคารวม</p>
              <p className="text-2xl font-bold text-accent">
                {calculations.totalPrice.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm font-normal">บาท</span>
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border">
              <div className="flex items-center gap-1 mb-1">
                <p className="text-sm text-muted-foreground">อัตราสิ้นเปลือง</p>
                <TrendingUp className="h-3 w-3 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">
                {calculations.fuelEfficiency.toFixed(2)} <span className="text-sm font-normal">กม./ลิตร</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full gradient-primary text-primary-foreground h-12 text-base font-medium"
        disabled={!isFormValid}
      >
        <Fuel className="mr-2 h-5 w-5" />
        บันทึกข้อมูล
      </Button>
    </form>
  );
}
