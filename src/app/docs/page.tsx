
import { redirect } from 'next/navigation';
import { docsConfig } from '@/config/docs';

export default function DocsRootPage() {
  const firstDocHref = docsConfig.sidebarNav[0]?.items[0]?.href;

  if (!firstDocHref) {
    console.error("Docs configuration is empty or invalid. Could not determine the first page.");
    redirect('/');
  }

  redirect(firstDocHref);
}
