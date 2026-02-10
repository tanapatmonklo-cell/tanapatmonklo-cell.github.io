import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Fuel, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FuelRecord, FUEL_TYPES } from "@/types/fuel";

interface FuelHistoryProps {
  records: FuelRecord[];
  onDelete: (id: string) => void;
}

export function FuelHistory({ records, onDelete }: FuelHistoryProps) {
  const getFuelLabel = (value: string) => {
    return FUEL_TYPES.find((f) => f.value === value)?.label || value;
  };

  if (records.length === 0) {
    return (
      <Card className="card-shadow">
        <CardContent className="py-12">
          <div className="text-center text-muted-foreground">
            <Fuel className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>ยังไม่มีข้อมูลการเติมน้ำมัน</p>
            <p className="text-sm">เริ่มกรอกข้อมูลเพื่อบันทึกรายการแรก</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Fuel className="h-5 w-5 text-primary" />
          ประวัติการเติมน้ำมัน ({records.length} รายการ)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>วันที่</TableHead>
                <TableHead>รถ</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead className="text-right">ระยะทาง</TableHead>
                <TableHead className="text-right">ลิตร</TableHead>
                <TableHead className="text-right">ราคารวม</TableHead>
                <TableHead className="text-right">กม./ลิตร</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {format(record.date, "d MMM yy", { locale: th })}
                  </TableCell>
                  <TableCell>{record.vehicleName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {getFuelLabel(record.fuelType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {record.distance.toLocaleString()} กม.
                  </TableCell>
                  <TableCell className="text-right">
                    {record.liters.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-accent">
                    ฿{record.totalPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right font-medium text-success">
                    {record.fuelEfficiency.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(record.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
