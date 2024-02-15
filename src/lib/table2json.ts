import * as cheerio from "cheerio";

export const table2json = ({ table }: { table: string }) => {
  try {
    const $ = cheerio.load(table);
    if ($("table").html()) {
      let headersText: string[] = [];
      $("table tr th").each((_, element) => {
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

      let bodyElements: string[][] = [];
      $("table tbody")
        .find("tr")
        .each((_, element) => {
          bodyElements = [
            ...bodyElements,
            element.children
              .filter((a) => a.type === "tag")
              .map((a) => $(a).text().split("\n").join("")),
          ];
        });
      const arr = bodyElements.reduce((acc, curr) => {
        let thisOne: { [a: string]: string } = {};
        headersText.map((header, i) => {
          if (header && curr[i]) thisOne[header] = curr[i];
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
