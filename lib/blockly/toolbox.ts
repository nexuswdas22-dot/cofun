// Toolbox Blockly dibangun dari daftar blok yang diizinkan di soal
// (field challenges.allowed_blocks_json).

import type * as Blockly from "blockly/core";

const FRIENDLY_TO_BLOCK: Record<string, string> = {
  maju: "cf_maju",
  belok_kanan: "cf_belok_kanan",
  belok_kiri: "cf_belok_kiri",
  ulangi: "cf_ulangi",
  jika_rintangan: "cf_jika_rintangan",
};

const GROUPS: { name: string; colour: string; kinds: string[] }[] = [
  { name: "Gerakan", colour: "#0284c7", kinds: ["maju", "belok_kanan", "belok_kiri"] },
  { name: "Perulangan", colour: "#059669", kinds: ["ulangi"] },
  { name: "Kondisi", colour: "#d97706", kinds: ["jika_rintangan"] },
];

export function buildToolbox(allowedBlocks: string[]): Blockly.utils.toolbox.ToolboxDefinition {
  const contents = GROUPS.map((group) => ({
    kind: "category",
    name: group.name,
    colour: group.colour,
    contents: group.kinds
      .filter((kind) => allowedBlocks.includes(kind))
      .map((kind) => ({ kind: "block" as const, type: FRIENDLY_TO_BLOCK[kind] })),
  })).filter((category) => category.contents.length > 0);

  return { kind: "categoryToolbox", contents } as Blockly.utils.toolbox.ToolboxDefinition;
}

export { FRIENDLY_TO_BLOCK };
