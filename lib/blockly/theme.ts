// Theme Blockly CoFun — warna mengikuti design system aplikasi
// (primary #006194, palet Arena: biru gerakan, amber kondisi, hijau perulangan).

import * as Blockly from "blockly/core";

export const cofunTheme = Blockly.Theme.defineTheme("cofun", {
  name: "cofun",
  base: Blockly.Themes.Classic,
  blockStyles: {
    movement_blocks: {
      colourPrimary: "#0284c7",
      colourSecondary: "#0369a1",
      colourTertiary: "#075985",
    },
    loop_blocks: {
      colourPrimary: "#059669",
      colourSecondary: "#047857",
      colourTertiary: "#064e3b",
    },
    logic_blocks: {
      colourPrimary: "#d97706",
      colourSecondary: "#b45309",
      colourTertiary: "#78350f",
    },
  },
  fontStyle: {
    family: "'Plus Jakarta Sans', system-ui, sans-serif",
    weight: "600",
    size: 13,
  },
  componentStyles: {
    workspaceBackgroundColour: "#f9f9ff",
    toolboxBackgroundColour: "#eef3f9",
    toolboxForegroundColour: "#1c2b3a",
    flyoutBackgroundColour: "#ffffff",
    flyoutForegroundColour: "#1c2b3a",
    flyoutOpacity: 0.97,
    insertionMarkerColour: "#006194",
    insertionMarkerOpacity: 0.5,
    cursorColour: "#006194",
  },
});
