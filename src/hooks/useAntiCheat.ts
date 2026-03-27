import { useEffect, useState } from 'react';

interface AntiCheatOptions {
  onTabSwitch?: () => void;
  onDevToolsDetected?: () => void;
  enabled?: boolean;
}

export function useAntiCheat(options: AntiCheatOptions = {}) {
  const { onTabSwitch, onDevToolsDetected, enabled = true } = options;
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.metaKey && e.altKey && e.key === 'i') ||
        (e.metaKey && e.altKey && e.key === 'j') ||
        (e.metaKey && e.altKey && e.key === 'c')
      ) {
        e.preventDefault();
        if (onDevToolsDetected) {
          onDevToolsDetected();
        }
        return false;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        setTabSwitchCount(prev => prev + 1);
        if (onTabSwitch) {
          onTabSwitch();
        }
      } else {
        setIsTabActive(true);
      }
    };

    const handleBlur = () => {
      setIsTabActive(false);
      setTabSwitchCount(prev => prev + 1);
      if (onTabSwitch) {
        onTabSwitch();
      }
    };

    const handleFocus = () => {
      setIsTabActive(true);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [enabled, onTabSwitch, onDevToolsDetected]);

  return { tabSwitchCount, isTabActive };
}
