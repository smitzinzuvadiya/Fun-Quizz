import { useSettings } from '../context/SettingsContext';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

export function Settings() {
  const { soundEnabled, toggleSound } = useSettings();

  return (
    <div className="pt-8 animate-in fade-in duration-500 flex flex-col h-full bg-[#7A61FE]">
      <header className="mb-6 flex-shrink-0 px-[20px]">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Settings</h1>
      </header>

      <div className="flex-1 min-h-0 bg-[#5b21b6] rounded-t-[32px] pt-6 flex flex-col relative shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.3)]">
        <main className="flex-1 min-h-0 flex flex-col px-[20px] pb-6 overflow-y-auto">
          <div className="bg-[#7A61FE] rounded-[24px] p-2 shadow-sm mb-6">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${soundEnabled ? 'bg-white/20 text-white' : 'bg-black/10 text-white/50'}`}>
                  {soundEnabled ? <SpeakerWaveIcon className="w-6 h-6" /> : <SpeakerXMarkIcon className="w-6 h-6" />}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Sound Effects</p>
                  <p className="text-sm text-white/70">Play sounds during quiz</p>
                </div>
              </div>
              
              <button 
                onClick={toggleSound}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${soundEnabled ? 'bg-white' : 'bg-black/20'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full ${soundEnabled ? 'bg-[#7A61FE]' : 'bg-white/50'} transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
