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
    // tidak terlalu besar relative dengan lebar HP, tapi tetap 0.8 agar target
    // sentuh jari tidak terlalu kecil (PRD §6.2: target sentuh nyaman di HP).
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const flyoutScale = isMobile ? 0.8 : 1;
    const workspace = Blockly.inject(container, {
      toolbox: buildToolbox(allowedBlocks),
      theme: cofunTheme,
      renderer: "zelos",
      // Tanpa tong sampah: blok dihapus dengan menyeretnya kembali ke kotak
      // blok di atas (flyout berfungsi sebagai delete area).
      trashcan: false,
      // Tanpa scrollbar: papan digeser dengan menyeret area kosong / wheel,
      // dan Blockly auto-pan saat blok diseret ke tepi papan.
      move: { scrollbars: false, drag: true, wheel: true },
      zoom: {
        // Tombol +/- disembunyikan (bug di HP); zoom tetap lewat pinch & wheel.
        controls: false,
        startScale: isMobile ? 0.8 : 0.85,
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

    // ===== Safety net sentuh (HP) =====
    // Blockly hanya memproses pointer dengan identifier yang sama sejak
    // pointerdown pertama (Touch.checkTouchIdentifier). Di Android, telapak
    // tangan yang menyentuh layar atau pointerup yang terlewat bisa membuat
    // identifier lama tersangkut, sehingga SEMUA sentuhan berikutnya diabaikan
    // sampai halaman dimuat ulang: blok tidak bisa diseret, papan tidak bisa
    // digeser, dan tombol terasa mati. Kumpulkan pointer aktif di kontainer;
    // setelah semua jari terangkat, bersihkan identifier milik Blockly.
    const activePointers = new Set<number>();
    let pressOrigin: { x: number; y: number } | null = null;
    const onPointerDown = (e: PointerEvent) => {
      activePointers.add(e.pointerId);
      if (!pressOrigin) pressOrigin = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pressOrigin || !activePointers.has(e.pointerId)) return;
      // Jari mulai menyeret: batalkan timer long-press (750ms) milik Blockly
      // supaya drag lambat tidak tiba-tiba memunculkan menu konteks.
      if (Math.hypot(e.clientX - pressOrigin.x, e.clientY - pressOrigin.y) > 8) {
        Blockly.Touch.longStop();
        pressOrigin = null;
      }
    };
    const onPointerEnd = (e: PointerEvent) => {
      activePointers.delete(e.pointerId);
      if (activePointers.size > 0) return;
      pressOrigin = null;
      // Tunda satu tick agar berjalan SETELAH handler pointerup internal
      // Blockly selesai memproses gesture-nya.
      window.setTimeout(() => {
        if (activePointers.size > 0) return;
        Blockly.Touch.clearTouchIdentifier();
      }, 0);
    };
    container.addEventListener("pointerdown", onPointerDown, true);
    container.addEventListener("pointermove", onPointerMove, true);
    container.addEventListener("pointerup", onPointerEnd, true);
    container.addEventListener("pointercancel", onPointerEnd, true);
    // Jika tab disembunyikan di tengah gestur (user buka aplikasi lain),
    // pointerup tidak pernah sampai — reset agar papan tidak macet saat kembali.
    const onVisibilityChange = () => {
      if (!document.hidden) return;
      activePointers.clear();
      pressOrigin = null;
      Blockly.Touch.clearTouchIdentifier();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
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
      container.removeEventListener("pointerdown", onPointerDown, true);
      container.removeEventListener("pointermove", onPointerMove, true);
      container.removeEventListener("pointerup", onPointerEnd, true);
      container.removeEventListener("pointercancel", onPointerEnd, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
            <span>Seret blok dari kotak di atas ke papan, ya!</span>
          </div>
        </div>
      )}
      <div
        ref={divRef}
        // onContextMenu mencegah menu konteks bawaan browser saat tahan jari
        // di HP; menu blok yang sah tetap dikendalikan Blockly sendiri.
        onContextMenu={(e) => e.preventDefault()}
        className="cofun-blockly w-full h-[420px] sm:h-[460px] lg:h-[560px] rounded-xl overflow-hidden border border-outline-variant/40 bg-[#f9f9ff] shadow-[0_3px_0_0_#c3d2e2]"
      />
    </div>
  );
});

export default BlocklyArena;
