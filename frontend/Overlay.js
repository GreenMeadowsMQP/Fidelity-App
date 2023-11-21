import React, { useEffect, useRef } from 'react';
import { Pressable, View, Text } from 'react-native';

const Overlay = ({ children, onClose }) => {

    const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const { target } = event;
      if (popupRef.current && !popupRef.current.contains(target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);


  return (
    <View style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Darkening Overlay */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />

      {/* Popup Content */}
      <View ref={popupRef} style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width:'90%' }}>
        {children}
      </View>
    </View>
  );
};

export default Overlay;
