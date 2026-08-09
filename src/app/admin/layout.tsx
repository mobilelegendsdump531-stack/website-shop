'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Users, ShoppingCart, Package, Settings, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-gray-800 fixed h-full overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent mb-8">
            Admin Panel
          </h1>

          <nav className="space-y-2">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="md" className="w-full justify-start gap-2 rounded-lg">
                <BarChart3 size={20} />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="ghost" size="md" className="w-full justify-start gap-2 rounded-lg">
                <Package size={20} />
                Products
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="ghost" size="md" className="w-full justify-start gap-2 rounded-lg">
                <ShoppingCart size={20} />
                Orders
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="ghost" size="md" className="w-full justify-start gap-2 rounded-lg">
                <Users size={20} />
                Users
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" size="md" className="w-full justify-start gap-2 rounded-lg">
                <Settings size={20} />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
