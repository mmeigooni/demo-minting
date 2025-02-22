'use client';

export default function ClientPortalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div id="modal-root" className="relative z-50" />
    </>
  );
}
