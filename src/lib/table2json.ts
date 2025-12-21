import * as cheerio from "cheerio";

export const table2json = ({ table }: { table: string }) => {
  try {
    const $ = cheerio.load(table);
    if ($("table").html()) {
      let headersText: string[] = [];
      let bodyElements: string[][] = [];

      // Extract headers from thead
      $("table thead tr th").each((_, element) => {
        headersText = [
          ...headersText,
          element.children
            .filter((a) => a.type === "text")
            .map((a) =>
              $(a)
                .text()
                .replace(/\[.*?\]/g, "")
                .toLocaleLowerCase()
                .trim()
                .split("\n")
                .join("")
                .split(" ")
                .join("_")
            )[0],
        ];
      });

      // If no headers found in thead, try first row with th elements
      if (headersText.length === 0) {
        $("table tr:first-child th").each((_, element) => {
          headersText = [
            ...headersText,
            element.children
              .filter((a) => a.type === "text")
              .map((a) =>
                $(a)
                  .text()
                  .replace(/\[.*?\]/g, "")
                  .toLocaleLowerCase()
                  .trim()
                  .split("\n")
                  .join("")
                  .split(" ")
                  .join("_")
              )[0],
          ];
        });
      }

      // Determine if first row was used as header
      const hasHeaderRow = headersText.length > 0;

      // If still no headers, generate generic column names based on first row
      let firstRowSkipped = false;
      if (headersText.length === 0) {
        const firstRow = $("table tr:first-child td, table tr:first-child th");
        const colCount = firstRow.length;
        headersText = Array.from({ length: colCount }, (_, i) => `column_${i + 1}`);
      } else {
        firstRowSkipped = true;
      }

      // Extract body rows - try tbody first, then fall back to all tr elements
      const tbodyRows = $("table tbody tr");
      
      if (tbodyRows.length > 0) {
        // Table has tbody
        tbodyRows.each((_, element) => {
          bodyElements = [
            ...bodyElements,
            element.children
              .filter((a) => a.type === "tag")
              .map((a) => $(a).text().split("\n").join("")),
          ];
        });
      } else {
        // No tbody - get all tr elements, skip first if it was headers
        const allRows = $("table tr");
        allRows.each((i, element) => {
          // Skip first row if it contained headers
          if (firstRowSkipped && i === 0) return;
          
          bodyElements = [
            ...bodyElements,
            element.children
              .filter((a) => a.type === "tag")
              .map((a) => $(a).text().split("\n").join("")),
          ];
        });
      }

      const arr = bodyElements.reduce((acc, curr) => {
        let thisOne: { [a: string]: string } = {};
        headersText.map((header, i) => {
          if (header && curr[i] !== undefined) thisOne[header] = curr[i];
        });

        acc.push(thisOne as any);
        return acc;
      }, []);

      return {
        json: arr,
        headers: headersText.filter((e) => e),
      };
    } else {
      return {
        headers: ["error"],
        json: [
          {
            error: "We couldn't parse your table",
          },
        ],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      headers: ["error"],
      json: [
        {
          error: "We couldn't parse your table",
        },
      ],
    };
  }
};