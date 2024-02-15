"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyToClipboard } from "@/components/ui/copyToClipboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Code } from "@/components/ui/syntaxHighlighter";
import { Textarea } from "@/components/ui/textarea";
import { table2json } from "@/lib/table2json";

import { isEqual, pick } from "lodash-es";
import { useEffect, useState } from "react";

export default function Home() {
  const [table, setTable] = useState("");
  const [json, setJson] = useState<any[]>();

  const [selected, setSelected] = useState<string[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [originalJson, setOriginalJSon] = useState<any[]>([]);

  const onSubmit = () => {
    const { json, headers } = table2json({ table });

    setJson(json);
    setOriginalJSon(json);
    setHeaders(headers);
    setSelected(headers);
  };

  useEffect(() => {
    if (json && originalJson) {
      setJson(originalJson.map((l) => pick(l, selected)));
    }
  }, [selected]);

  return (
    <main className="grid grid-cols-2 gap-8 sm:p-24 !pb-8 p-8 container max-h-screen ">
      <div className="h-[75vh]">
        <Button onClick={onSubmit} className="mb-4 w-full ">
          Give me that json
        </Button>
        <Textarea
          className="h-full "
          placeholder="Paste your table here"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
      </div>

      <section className="h-[75vh]">
        <div className="flex gap-2 flex-wrap mb-4 h-[40px] items-center">
          {json && !isEqual(headers, ["error"]) ? (
            headers.map((header) => (
              <div className="items-top flex space-x-2" key={header}>
                <Checkbox
                  id={header}
                  checked={selected.includes(header)}
                  onCheckedChange={(checked) =>
                    !checked
                      ? setSelected((sel) => sel.filter((s) => s !== header))
                      : setSelected((sel) => [...sel, header])
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={header}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                  >
                    {header}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <Skeleton className="h-5 w-full" />
          )}
        </div>
        <div className="relative h-full">
          {json && !isEqual(headers, ["error"]) && (
            <CopyToClipboard json={json} />
          )}
          <Code
            code={JSON.stringify(
              json || [{ mode: "waiting for info" }],
              null,
              2
            )}
          ></Code>
        </div>
      </section>
    </main>
  );
}
