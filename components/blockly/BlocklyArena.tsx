"use client";

// Area kerja Blockly CoFun: inject workspace, toolbox dari soal,
// sorot blok aktif, dan akses simulator lewat ref (imperative handle).

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import { registerCofunBlocks } from "@/lib/blockly/blocks";
import { cofunTheme } from "@/lib/blockly/theme";
import { buildToolbox } from "@/lib/blockly/toolbox";
import { simulateWorkspace } from "@/lib/blockly/simulate";
import type { SimResult } from "@/lib/blockly/simulate";
import type { MazeData, WinCondition } from "@/lib/types";

export type BlocklyArenaHandle = {
  generateFrames: (maze: MazeData, win: WinCondition) => SimResult;
  clearWorkspace: () => void;
};

type Props = {
  allowedBlocks: string[];
  activeBlockId: string | null;
};

const BlocklyArena = forwardRef<BlocklyArenaHandle, Props>(function BlocklyArena(
  { allowedBlocks, activeBlockId },
  ref,
) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const highlightedRef = useRef<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const container = divRef.current;
    if (!container) return;
    registerCofunBlocks();
    const workspace = Blockly.inject(container, {
      toolbox: buildToolbox(allowedBlocks),
      theme: cofunTheme,
      renderer: "zelos",
      trashcan: true,
      // Tanpa scrollbar: papan digeser dengan menyeret area kosong / wheel,
      // dan Blockly auto-pan saat blok diseret ke tepi papan.
      move: { scrollbars: false, drag: true, wheel: true },
      zoom: {
        controls: true,
        startScale: 0.85,
        maxScale: 1.4,
        minScale: 0.5,
        scaleSpeed: 1.2,
        wheel: true,
      },
      grid: { spacing: 28, length: 3, colour: "#d7e3ef", snap: true },
    });
    workspaceRef.current = workspace;
    const updateEmpty = () => setIsEmpty(workspace.getAllBlocks(false).length === 0);
    workspace.addChangeListener((e: Blockly.Events.Abstract) => {
      if (e.isUiEvent) return;
      updateEmpty();
    });
    return () => {
      workspace.dispose();
      workspaceRef.current = null;
    };
    // allowedBlocks hanya berubah saat ganti soal — remount ditangani parent via key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    if (highlightedRef.current && highlightedRef.current !== activeBlockId) {
      workspace.getBlockById(highlightedRef.current)?.setHighlighted(false);
    }
    if (activeBlockId) {
      workspace.getBlockById(activeBlockId)?.setHighlighted(true);
    }
    highlightedRef.current = activeBlockId;
  }, [activeBlockId]);

  useImperativeHandle(
    ref,
    () => ({
      generateFrames(maze: MazeData, win: WinCondition): SimResult {
        const workspace = workspaceRef.current;
        if (!workspace) return { ok: false, error: "Area blok belum siap. Coba muat ulang halaman." };
        return simulateWorkspace(workspace, maze, win);
      },
      clearWorkspace() {
        workspaceRef.current?.clear();
      },
    }),
    [],
  );

  return (
    <div className="relative">
      <div
        ref={divRef}
        className="w-full h-[420px] sm:h-[460px] lg:h-[560px] rounded-xl overflow-hidden border border-outline-variant/40 bg-[#f9f9ff] shadow-[0_3px_0_0_#c3d2e2]"
      />
      {isEmpty && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none px-4">
          <div className="flex items-center gap-2 bg-surface-container-lowest/92 border border-outline-variant/40 text-on-surface-variant font-label-badge text-label-badge px-space-md py-space-xs rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-primary">
              drag_indicator
            </span>
            <span className="hidden sm:inline">
              Seret blok dari kotak kategori, lalu susun programmu di sini
            </span>
            <span className="sm:hidden">Klik kategori, lalu seret blok ke sini</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default BlocklyArena;
