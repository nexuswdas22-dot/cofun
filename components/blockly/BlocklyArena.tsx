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
  initialBlocks?: Record<string, unknown> | null;
};

const BlocklyArena = forwardRef<BlocklyArenaHandle, Props>(function BlocklyArena(
  { allowedBlocks, activeBlockId, initialBlocks },
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
    // Di layar kecil, skala blok dikecilkan supaya kotak pemilihan dan papan
    // tidak terlalu besar relative dengan lebar HP.
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const flyoutScale = isMobile ? 0.7 : 1;
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
        startScale: isMobile ? 0.7 : 0.85,
        maxScale: 1.4,
        minScale: 0.5,
        scaleSpeed: 1.2,
        wheel: true,
      },
      grid: { spacing: 28, length: 3, colour: "#d7e3ef", snap: true },
    });
    workspaceRef.current = workspace;
    // Kunci skala flyout: kotak pemilihan blok tidak ikut membesar/mengecil
    // saat papan di-zoom, dan di mobile lebih kecil dari desktop.
    const flyout = workspace.getFlyout();
    if (flyout) {
      (flyout as { getFlyoutScale?: () => number }).getFlyoutScale = () => flyoutScale;
      flyout.reflow();
    }
    // Soal debugging: awali papan dengan program (yang berisi kesalahan).
    if (initialBlocks) {
      try {
        Blockly.serialization.workspaces.load(initialBlocks as never, workspace);
        workspace.scrollCenter();
      } catch {
        // State rusak: biarkan papan kosong, siswa bisa mulai dari nol.
      }
    }
    const updateEmpty = () => setIsEmpty(workspace.getAllBlocks(false).length === 0);
    workspace.addChangeListener((e: Blockly.Events.Abstract) => {
      if (e.isUiEvent) return;
      updateEmpty();
    });
    updateEmpty();
    return () => {
      workspace.dispose();
      workspaceRef.current = null;
    };
    // allowedBlocks/initialBlocks hanya berubah saat ganti soal — remount via key parent.
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
    <div className="flex flex-col gap-space-xs">
      {isEmpty && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/40 text-on-surface-variant font-label-badge text-label-badge px-space-md py-space-xs rounded-full">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
              drag_indicator
            </span>
            <span>Seret blok dari kotak atas ke papan</span>
          </div>
        </div>
      )}
      <div
        ref={divRef}
        className="w-full h-[420px] sm:h-[460px] lg:h-[560px] rounded-xl overflow-hidden border border-outline-variant/40 bg-[#f9f9ff] shadow-[0_3px_0_0_#c3d2e2]"
      />
    </div>
  );
});

export default BlocklyArena;
