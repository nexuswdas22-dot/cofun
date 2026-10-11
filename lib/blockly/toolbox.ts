// Toolbox Blockly dibangun dari daftar blok yang diizinkan di soal
// (field challenges.allowed_blocks_json).
// Memakai flyoutToolbox (flat, tanpa kategori): semua blok tampil di strip
// horizontal atas. Ini menghindari bug flyout vertikal + scrollbar yang
// tabrakan dengan papan saat digulir.

import type * as Blockly from "blockly/core";

const FRIENDLY_TO_BLOCK: Record<string, string> = {
  maju: "cf_maju",
  belok_kanan: "cf_belok_kanan",
  belok_kiri: "cf_belok_kiri",
  ulangi: "cf_ulangi",
  jika_rintangan: "cf_jika_rintangan",
};

const ORDER: string[] = ["maju", "belok_kanan", "belok_kiri", "ulangi", "jika_rintangan"];

export function buildToolbox(allowedBlocks: string[]): Blockly.utils.toolbox.ToolboxDefinition {
  const contents = ORDER.filter((kind) => allowedBlocks.includes(kind)).map((kind) => ({
    kind: "block" as const,
    type: FRIENDLY_TO_BLOCK[kind],
  }));

  return { kind: "flyoutToolbox", contents } as Blockly.utils.toolbox.ToolboxDefinition;
}

export { FRIENDLY_TO_BLOCK };
