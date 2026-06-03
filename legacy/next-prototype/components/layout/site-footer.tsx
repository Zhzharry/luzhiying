export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-10 text-sm text-[var(--muted)]">
      <div className="shell flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-[var(--foreground)]">露之营</div>
          <div>帮助自驾露营新手更快完成营地决策。</div>
        </div>
        <div className="flex gap-4">
          <span>真实点位</span>
          <span>结构化筛选</span>
          <span>信息透明</span>
        </div>
      </div>
    </footer>
  );
}
