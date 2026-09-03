import PDFDocument from "pdfkit";
import { existsSync } from "node:fs";
import { join } from "node:path";

export interface PresupuestoPdfItem {
  codigo: string;
  nombre: string;
  cantidad: number;
}

export interface PresupuestoPdfData {
  items: PresupuestoPdfItem[];
  nombre?: string;
  email?: string;
  telefono?: string;
  notas?: string;
}

export function buildPresupuestoPdf(data: PresupuestoPdfData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const logoPath = join(process.cwd(), "public/images/logo-sumifluid.png");
    if (existsSync(logoPath)) {
      doc.image(logoPath, 50, 45, { width: 130 });
      doc.y = 95;
    }
    doc.x = 50;

    const fechaGeneracion = new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

    doc.fontSize(18).fillColor("#000").text("Solicitud de presupuesto", 50, doc.y);
    doc.fontSize(10).fillColor("#666").text("Sumifluid — sumifluid.es", 50, doc.y);
    doc.fontSize(9).fillColor("#666").text(`Generado el ${fechaGeneracion} (hora de España)`, 50, doc.y);
    doc.moveDown(1.2);

    const tieneContacto = data.nombre || data.email || data.telefono;
    if (tieneContacto) {
      doc.fillColor("#000").fontSize(11);
      if (data.nombre) doc.text(`Nombre y empresa: ${data.nombre}`);
      if (data.email) doc.text(`Email: ${data.email}`);
      if (data.telefono) doc.text(`Teléfono: ${data.telefono}`);
      if (data.notas) doc.text(`Notas: ${data.notas}`);
      doc.moveDown(1);
    }

    doc.fillColor("#000").fontSize(13).text("Productos solicitados", { underline: true });
    doc.moveDown(0.5);

    const colCodigo = 50;
    const colNombre = 170;
    const colCantidad = 480;
    let y = doc.y;

    doc.fontSize(10).fillColor("#fff");
    doc.rect(50, y, 495, 20).fill("#12284c");
    doc
      .fillColor("#fff")
      .text("Código", colCodigo + 5, y + 5)
      .text("Artículo", colNombre + 5, y + 5)
      .text("Cantidad", colCantidad + 5, y + 5);
    y += 20;

    doc.fillColor("#000");
    for (const item of data.items) {
      const rowHeight = 20;
      doc
        .fontSize(10)
        .text(item.codigo, colCodigo + 5, y + 5, { width: 110 })
        .text(item.nombre, colNombre + 5, y + 5, { width: 300 })
        .text(String(item.cantidad), colCantidad + 5, y + 5);
      doc
        .moveTo(50, y + rowHeight)
        .lineTo(545, y + rowHeight)
        .strokeColor("#ddd")
        .stroke();
      y += rowHeight;

      if (y > 750) {
        doc.addPage();
        y = 50;
      }
    }

    doc.x = 50;
    doc.moveDown(2);
    doc
      .fontSize(9)
      .fillColor("#666")
      .text(
        "Este documento es una solicitud de presupuesto, no una factura ni una confirmación de disponibilidad o precio. Nuestro equipo técnico se pondrá en contacto por teléfono con la oferta.",
        50,
        doc.y,
        { width: 495 },
      );

    doc.end();
  });
}
