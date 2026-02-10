import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Database, Calculator, CheckCircle } from "lucide-react";

export function ProjectDocumentation() {
  return (
    <div className="space-y-6">
      {/* หลักการทำงาน */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            หลักการทำงานของระบบ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">1</Badge>
              <div>
                <p className="font-medium">รับข้อมูลจากผู้ใช้ (Input)</p>
                <p className="text-sm text-muted-foreground">
                  ผู้ใช้กรอกข้อมูลผ่านฟอร์ม: วันที่, รถ, ประเภทน้ำมัน, เลขไมล์ก่อน-หลัง, จำนวนลิตร, ราคาต่อลิตร
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">2</Badge>
              <div>
                <p className="font-medium">ประมวลผล (Process)</p>
                <p className="text-sm text-muted-foreground">
                  ระบบคำนวณอัตโนมัติแบบ Real-time ด้วย useMemo Hook
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">3</Badge>
              <div>
                <p className="font-medium">แสดงผลลัพธ์ (Output)</p>
                <p className="text-sm text-muted-foreground">
                  แสดงผลการคำนวณทันทีและบันทึกเป็นประวัติ
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* สูตรการคำนวณ */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-secondary" />
            สูตรการคำนวณ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="font-medium mb-2">ระยะทางที่วิ่ง (Distance)</p>
              <code className="text-sm bg-background px-2 py-1 rounded">
                ระยะทาง = เลขไมล์หลังเติม - เลขไมล์ก่อนเติม
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                ตัวอย่าง: 50,450 - 50,000 = 450 กม.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="font-medium mb-2">ราคารวม (Total Price)</p>
              <code className="text-sm bg-background px-2 py-1 rounded">
                ราคารวม = จำนวนลิตร × ราคาต่อลิตร
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                ตัวอย่าง: 35.5 × 35.99 = 1,277.65 บาท
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="font-medium mb-2">อัตราสิ้นเปลือง (Fuel Efficiency)</p>
              <code className="text-sm bg-background px-2 py-1 rounded">
                อัตราสิ้นเปลือง = ระยะทาง ÷ จำนวนลิตร
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                ตัวอย่าง: 450 ÷ 35.5 = 12.68 กม./ลิตร
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ตัวอย่างข้อมูล */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Database className="h-5 w-5 text-accent" />
            ตัวอย่างข้อมูลนำเข้าและผลลัพธ์
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">ข้อมูลนำเข้า</th>
                  <th className="text-left py-2 font-medium">ค่า</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="py-2">วันที่</td><td>3 ก.พ. 2569</td></tr>
                <tr><td className="py-2">รถ</td><td>Honda City</td></tr>
                <tr><td className="py-2">ประเภทน้ำมัน</td><td>แก๊สโซฮอล์ 95</td></tr>
                <tr><td className="py-2">เลขไมล์ก่อนเติม</td><td>50,000 กม.</td></tr>
                <tr><td className="py-2">เลขไมล์หลังเติม</td><td>50,450 กม.</td></tr>
                <tr><td className="py-2">จำนวนลิตร</td><td>35.5 ลิตร</td></tr>
                <tr><td className="py-2">ราคาต่อลิตร</td><td>35.99 บาท</td></tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/30">
            <p className="font-medium text-success mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              ผลลัพธ์จากการคำนวณ
            </p>
            <ul className="text-sm space-y-1">
              <li>• ระยะทางที่วิ่ง: <strong>450 กม.</strong></li>
              <li>• ราคารวม: <strong>1,277.65 บาท</strong></li>
              <li>• อัตราสิ้นเปลือง: <strong>12.68 กม./ลิตร</strong></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* เทคโนโลยีที่ใช้ */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code className="h-5 w-5 text-primary" />
            เทคโนโลยีที่ใช้พัฒนา
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">React 18</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
            <Badge variant="outline">Shadcn/UI</Badge>
            <Badge variant="outline">Vite</Badge>
            <Badge variant="outline">date-fns</Badge>
            <Badge variant="outline">Lucide Icons</Badge>
          </div>
          <div className="mt-4 text-sm text-muted-foreground space-y-2">
            <p><strong>React Hooks ที่ใช้:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><code>useState</code> - จัดการ state ของฟอร์มและข้อมูล</li>
              <li><code>useMemo</code> - คำนวณค่าอัตโนมัติแบบ optimize</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
