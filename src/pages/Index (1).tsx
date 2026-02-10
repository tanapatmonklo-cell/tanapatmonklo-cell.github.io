import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fuel, History, FileText } from "lucide-react";
import { FuelForm } from "@/components/FuelForm";
import { FuelHistory } from "@/components/FuelHistory";
import { ProjectDocumentation } from "@/components/ProjectDocumentation";
import { FuelRecord } from "@/types/fuel";
import { toast } from "sonner";

const Index = () => {
  const [records, setRecords] = useState<FuelRecord[]>([]);

  const handleAddRecord = (record: FuelRecord) => {
    setRecords((prev) => [record, ...prev]);
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: `เติมน้ำมัน ${record.liters.toFixed(2)} ลิตร รวม ${record.totalPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท`,
    });
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    toast.info("ลบข้อมูลแล้ว");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground py-8 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Fuel className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                ระบบบันทึกการใช้น้ำมันรถ
              </h1>
              <p className="text-primary-foreground/80 text-sm md:text-base mt-1">
                คำนวณระยะทาง ราคารวม และอัตราสิ้นเปลืองอัตโนมัติ
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="form" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <Fuel className="h-4 w-4" />
              <span className="hidden sm:inline">กรอกข้อมูล</span>
              <span className="sm:hidden">กรอก</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">ประวัติ</span>
              <span className="sm:hidden">ประวัติ</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">เอกสาร</span>
              <span className="sm:hidden">เอกสาร</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <FuelForm onSubmit={handleAddRecord} />
          </TabsContent>

          <TabsContent value="history">
            <FuelHistory records={records} onDelete={handleDeleteRecord} />
          </TabsContent>

          <TabsContent value="docs">
            <ProjectDocumentation />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>โปรเจกต์สำหรับรายงาน • พัฒนาด้วย React + TypeScript</p>
      </footer>
    </div>
  );
};

export default Index;
