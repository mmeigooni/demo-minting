'use client';

import { useEffect, useState } from 'react';

export default function ClientPortalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'modal-root';
    document.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return <>{children}</>;
}
