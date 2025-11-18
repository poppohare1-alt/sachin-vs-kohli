'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Shield, LogOut, Database, Plus, Upload } from 'lucide-react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="text-orange-500" size={28} />
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Logged in as: {session.user.email}
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <ActionCard
            title="Add New Match"
            description="Manually enter match statistics"
            icon={Plus}
            color="blue"
            onClick={() => router.push('/admin/matches/add')}
          />
          <ActionCard
            title="Import from Cricsheet"
            description="Bulk import matches"
            icon={Upload}
            color="orange"
            onClick={() => router.push('/admin/import')}
          />
          <ActionCard
            title="View All Matches"
            description="Browse and manage data"
            icon={Database}
            color="purple"
            onClick={() => router.push('/admin/matches')}
          />
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to Admin Panel</h2>
          <p className="text-gray-600">
            Use the cards above to manage your cricket statistics database.
          </p>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, description, icon: Icon, color, onClick }) {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} text-white rounded-xl shadow-lg p-6 text-left transition transform hover:scale-105`}
    >
      <Icon size={32} className="mb-4" />
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
}
