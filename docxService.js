import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  Header, Footer, PageNumber, NumberFormat,
} from 'docx'

/**
 * Generate a Risk Assessment .docx buffer
 * @param {object} ra - Risk Assessment data
 * @returns {Buffer}
 */
export async function generateRiskAssessmentDocx(ra) {
  const NAVY = '0F2544'
  const FLAME = 'E8571A'
  const BG = 'F8F5EE'

  const titleRun = (text, opts = {}) =>
    new TextRun({ text, bold: true, color: NAVY, font: 'Calibri', size: 28, ...opts })

  const bodyRun = (text, opts = {}) =>
    new TextRun({ text, font: 'Calibri', size: 20, ...opts })

  const metaRows = [
    ['Company', ra.company || ''],
    ['Site / Location', ra.site || ''],
    ['Work Activity', ra.activity || ''],
    ['Assessor', ra.assessor || ''],
    ['Document Reference', ra.documentRef || ''],
    ['Review Date', ra.reviewDate || ''],
    ['Legislation', (ra.legislation || []).join(', ')],
  ]

  const metaTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: metaRows.map(([label, value]) =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.SOLID, color: 'F0EDE6' },
            children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 18, font: 'Calibri', color: '444444' })] })],
          }),
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [bodyRun(value)] })],
          }),
        ],
      })
    ),
  })

  const hazardTableRows = [
    new TableRow({
      tableHeader: true,
      children: ['Activity', 'Hazard', 'S', 'L', 'Initial', 'Controls', 'S', 'L', 'Residual', 'PPE'].map(h =>
        new TableCell({
          shading: { type: ShadingType.SOLID, color: NAVY },
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 16, font: 'Calibri' })] })],
        })
      ),
    }),
    ...(ra.hazards || []).map(h => {
      const initialScore = h.severity * h.likelihood
      const residualScore = h.residualSeverity * h.residualLikelihood
      const getRating = score => score >= 15 ? 'EXTREME' : score >= 8 ? 'HIGH' : score >= 4 ? 'MEDIUM' : 'LOW'
      const ratingColor = r => r === 'EXTREME' ? 'DC2626' : r === 'HIGH' ? 'EF4444' : r === 'MEDIUM' ? 'F59E0B' : '22C55E'

      return new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [bodyRun(h.activity)] })] }),
          new TableCell({ children: [new Paragraph({ children: [bodyRun(h.hazard)] })] }),
          new TableCell({ children: [new Paragraph({ children: [bodyRun(String(h.severity))] })] }),
          new TableCell({ children: [new Paragraph({ children: [bodyRun(String(h.likelihood))] })] }),
          new TableCell({
            shading: { type: ShadingType.SOLID, color: ratingColor(getRating(initialScore)) },
            children: [new Paragraph({ children: [new TextRun({ text: getRating(initialScore), bold: true, size: 16, color: 'FFFFFF', font: 'Calibri' })] })],
          }),
          new TableCell({ children: [new Paragraph({ children: [bodyRun((h.controls || []).join('\n'))] })] }),
          new TableCell({ children: [new Paragraph({ children: [bodyRun(String(h.residualSeverity))] })] }),
          new TableCell({ children: [new Paragraph({ children: [bodyRun(String(h.residualLikelihood))] })] }),
          new TableCell({
            shading: { type: ShadingType.SOLID, color: ratingColor(getRating(residualScore)) },
            children: [new Paragraph({ children: [new TextRun({ text: getRating(residualScore), bold: true, size: 16, color: 'FFFFFF', font: 'Calibri' })] })],
          }),
          new TableCell({ children: [new Paragraph({ children: [bodyRun((h.ppe || []).join(', '))] })] }),
        ],
      })
    }),
  ]

  const doc = new Document({
    sections: [{
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({ text: 'RISK ASSESSMENT — TUSHIYA CONFORM', bold: true, color: NAVY, size: 20, font: 'Calibri' }),
                new TextRun({ text: `\t${ra.documentRef || ''}`, size: 18, color: '888888', font: 'Calibri' }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: 'Tushiya HS Consulting · Walvis Bay & Windhoek, Namibia · oswald@tushiyahs.com · +264 81 260 9767 · tushiyahs.com', size: 14, color: '999999', font: 'Calibri' }),
              ],
            }),
          ],
        }),
      },
      children: [
        // Title
        new Paragraph({
          children: [titleRun('RISK ASSESSMENT', { size: 36 })],
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 240 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Generated by Tushiya Conform · Tushiya HS Consulting · Namibia', italic: true, size: 18, color: '888888', font: 'Calibri' })],
          spacing: { after: 400 },
        }),

        // Meta table
        metaTable,

        new Paragraph({ spacing: { before: 400, after: 200 } }),

        // Section heading
        new Paragraph({
          children: [new TextRun({ text: 'HAZARDS & CONTROL MEASURES', bold: true, color: NAVY, size: 22, font: 'Calibri' })],
          spacing: { before: 200, after: 160 },
        }),

        // Hazard table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: hazardTableRows,
        }),

        // Signature block
        new Paragraph({ spacing: { before: 600 } }),
        new Paragraph({
          children: [new TextRun({ text: 'SIGN-OFF', bold: true, color: NAVY, size: 22, font: 'Calibri' })],
          spacing: { after: 200 },
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: ['Assessor', 'Reviewer', 'Approver'].map(r => new TableCell({
                children: [
                  new Paragraph({ children: [new TextRun({ text: r, bold: true, size: 18, font: 'Calibri' })] }),
                  new Paragraph({ children: [bodyRun('Name: _______________________')] }),
                  new Paragraph({ children: [bodyRun('Signature: ___________________')] }),
                  new Paragraph({ children: [bodyRun('Date: ________________________')] }),
                ],
              })),
            }),
          ],
        }),
      ],
    }],
  })

  return Packer.toBuffer(doc)
}
