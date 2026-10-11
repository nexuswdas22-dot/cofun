// Definisi blok kustom CoFun (JSON definition, gaya Blockly modern).
// Blok: maju, belok_kanan, belok_kiri, ulangi, jika_rintangan.

import * as Blockly from "blockly/core";
import * as BlocklyMsgEn from "blockly/msg/en";

const cofunBlockJson = [
  {
    type: "cf_maju",
    message0: "Maju 1 Langkah",
    previousStatement: null,
    nextStatement: null,
    style: "movement_blocks",
    tooltip: "Robot melangkah satu sel ke arah hadapnya.",
    helpUrl: "",
  },
  {
    type: "cf_belok_kanan",
    message0: "Belok Kanan",
    previousStatement: null,
    nextStatement: null,
    style: "movement_blocks",
    tooltip: "Robot berputar 90 derajat ke kanan.",
    helpUrl: "",
  },
  {
    type: "cf_belok_kiri",
    message0: "Belok Kiri",
    previousStatement: null,
    nextStatement: null,
    style: "movement_blocks",
    tooltip: "Robot berputar 90 derajat ke kiri.",
    helpUrl: "",
  },
  {
    type: "cf_ulangi",
    message0: "ulangi %1 kali %2",
    args0: [
      { type: "field_number", name: "COUNT", value: 2, min: 1, max: 20 },
      { type: "input_statement", name: "DO" },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "loop_blocks",
    tooltip: "Mengulang isi blok sejumlah kali tertentu.",
    helpUrl: "",
  },
  {
    type: "cf_jika_rintangan",
    message0: "JIKA ada batu di depan, MAKA %1 SELAIN ITU %2",
    args0: [
      { type: "input_statement", name: "DO" },
      { type: "input_statement", name: "ELSE" },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "logic_blocks",
    tooltip:
      "JIKA ada batu di depan robot, jalankan rak MAKA; kalau jalannya aman, jalankan rak SELAIN ITU.",
    helpUrl: "",
  },
];

export const cofunBlockDefinitions =
  Blockly.common.createBlockDefinitionsFromJsonArray(cofunBlockJson);

let registered = false;

export function registerCofunBlocks(): void {
  if (registered) return;
  // Blockly v11+ tidak lagi membawa teks pesan (Msg) bawaan di blockly/core.
  // Tanpa locale, inject() gagal: Msg.WORKSPACE_LABEL_MANY_STACKS undefined.
  Blockly.setLocale(BlocklyMsgEn as unknown as Record<string, string>);
  Blockly.common.defineBlocks(cofunBlockDefinitions);
  registered = true;
}
