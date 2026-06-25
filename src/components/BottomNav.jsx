import { NavLink } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolid, MagnifyingGlassIcon as MagnifyingGlassSolid, UserIcon as UserSolid, Cog6ToothIcon as CogSolid } from '@heroicons/react/24/solid';

export function BottomNav() {
  const navItems = [
    { name: 'Home', path: '/', iconOutline: HomeIcon, iconSolid: HomeSolid },
    { name: 'Search', path: '/search', iconOutline: MagnifyingGlassIcon, iconSolid: MagnifyingGlassSolid },
    { name: 'Profile', path: '/profile', iconOutline: UserIcon, iconSolid: UserSolid },
    { name: 'Settings', path: '/settings', iconOutline: Cog6ToothIcon, iconSolid: CogSolid },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl flex justify-around items-center py-3 z-40">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 transition-transform ${
              isActive ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-primary/70'
            }`
          }
        >
          {({ isActive }) => {
            const Icon = isActive ? item.iconSolid : item.iconOutline;
            return (
              <>
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
              </>
            );
          }}
        </NavLink>
      ))}
    </div>
  );
}
