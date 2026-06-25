import { useSettings } from '../context/SettingsContext';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

export function Settings() {
  const { soundEnabled, toggleSound } = useSettings();

  return (
    <div className="pb-24 px-[20px] pt-8 animate-in fade-in duration-500 min-h-full">
      <h1 className="text-3xl font-extrabold tracking-tight text-primary mb-8">Settings</h1>

      <div className="bg-surface rounded-[24px] p-2 shadow-sm mb-6">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${soundEnabled ? 'bg-primary/10 text-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
              {soundEnabled ? <SpeakerWaveIcon className="w-6 h-6" /> : <SpeakerXMarkIcon className="w-6 h-6" />}
            </div>
            <div>
              <p className="font-bold text-on-surface text-lg">Sound Effects</p>
              <p className="text-sm text-on-surface-variant">Play sounds during quiz</p>
            </div>
          </div>
          
          <button 
            onClick={toggleSound}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${soundEnabled ? 'bg-primary' : 'bg-surface-variant'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
