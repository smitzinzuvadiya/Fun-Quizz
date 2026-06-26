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
    <div className="w-full bg-[#6D4AFF] flex justify-around items-center py-2 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] shrink-0">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 transition-all duration-300 ${
              isActive ? 'text-white' : 'text-white/60 hover:text-white/90'
            }`
          }
        >
          {({ isActive }) => {
            const Icon = isActive ? item.iconSolid : item.iconOutline;
            return (
              <>
                <Icon className={`w-[26px] h-[26px] mb-1.5 ${isActive ? 'scale-110' : ''} transition-transform`} strokeWidth={isActive ? 2 : 2.5} />
                <span className={`text-[11px] tracking-wide ${isActive ? 'font-black' : 'font-bold'}`}>{item.name}</span>
              </>
            );
          }}
        </NavLink>
      ))}
    </div>
  );
}
