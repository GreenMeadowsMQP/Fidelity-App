import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, BackHandler, Platform } from 'react-native';

const Overlay = ({ children, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const { target } = event;
      if (popupRef.current && !popupRef.current.contains(target)) {
        onClose();
      }
    };

    const handleAndroidBackButton = () => {
      onClose();
      return true; // Return true to prevent default behavior (exit the app)
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listeners based on platform
    const addEventListeners = () => {
      if (Platform.OS === 'android') {
        return BackHandler.addEventListener('hardwareBackPress', handleAndroidBackButton);
      } else if (Platform.OS === 'web') {
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleEscapeKey);
      }
      // Add other platform-specific logic if needed
    };

    const outsideClickSubscription = addEventListeners();

    return () => {
      // Remove event listeners based on platform
      if (Platform.OS === 'android') {
        outsideClickSubscription.remove();
      } else if (Platform.OS === 'web') {
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', handleEscapeKey);
      }
    };
  }, [onClose]);

  if (Platform.OS === 'web') {
    return (
      <View style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Darkening Overlay */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />

        {/* Popup Content */}
        <View ref={popupRef} style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: '90%' }}>
          {children}
        </View>
      </View>
    );
  }

  // Default return for mobile platforms
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Darkening Overlay */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />

        {/* Popup Content */}
        <View ref={popupRef} style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: '90%' }}>
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
    </View>
  );
};

export default Overlay;
