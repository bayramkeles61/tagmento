import { DocsSidebarNav } from '@/components/sidebar-nav'
import { Metadata } from 'next'
import { docsConfig } from '@/config/docs-config';

interface DocsLayoutProps {
  children: React.ReactNode
  params: {}
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s | Tagmento Docs',
      default: 'Tagmento Docs',
    },
    description: 'Documentation for Tagmento, a fully-featured tag input component',
  }
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="border-b">
      <main className="relative container mx-auto">
        <div className='flex gap-10 py-8 px-4'>
          <DocsSidebarNav items={docsConfig.sidebarNav} />
          <div
            className='w-full p-6 md:ml-72'
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}