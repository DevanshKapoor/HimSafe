import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// --- Mock Data: Simulating reports from the backend ---
const mockReports = [
  {
    id: 1,
    type: 'LANDSLIDE',
    location: {
      latitude: 31.71, // Near Mandi
      longitude: 76.93,
    },
    title: 'Major Landslide',
    description: 'Road completely blocked near Aut.',
  },
  {
    id: 2,
    type: 'SNOW',
    location: {
      latitude: 32.2396, // Near Manali
      longitude: 77.1887,
    },
    title: 'Heavy Snowfall',
    description: 'Atal Tunnel approach has heavy snow.',
  },
];

// --- Main App Component ---
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // --- useEffect hook to request location permissions on app start ---
  useEffect(() => {
    (async () => {
      // Request permission to access the user's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied. Showing default region.');
        // Set a default location if permission is denied
        setLocation({ latitude: 31.71, longitude: 76.93 }); 
        return;
      }

      // Get the user's current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  // --- Helper function to get marker color based on report type ---
  const getMarkerColor = (type) => {
    switch (type) {
      case 'LANDSLIDE':
        return 'brown';
      case 'SNOW':
        return 'white';
      case 'ACCIDENT':
        return 'orange';
      default:
        return 'red';
    }
  };

  // --- Render a loading indicator while fetching location ---
  if (!location) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#c0392b" />
        <Text style={styles.loadingText}>Finding your location...</Text>
      </View>
    );
  }

  // --- Define the map region based on the user's location ---
  const mapRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 2.5, // Zoom level
    longitudeDelta: 2.5,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- Map View --- */}
      <MapView style={styles.map} initialRegion={mapRegion}>
        {/* Add a marker for the user's current location */}
        <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location"
            pinColor="blue"
        />
        
        {/* Loop through the mock reports and display a marker for each one */}
        {mockReports.map(report => (
          <Marker
            key={report.id}
            coordinate={report.location}
            title={report.title}
            description={report.description}
            pinColor={getMarkerColor(report.type)}
          />
        ))}
      </MapView>

      {/* --- UI Overlay --- */}
      <View style={styles.overlay}>
        <Text style={styles.header}>HimPath</Text>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Report Incident</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
      backgroundColor: 'rgba(255, 255, 0, 0.8)',
      color: '#333',
      padding: 8,
      borderRadius: 5,
      marginTop: 10,
      textAlign: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: StatusBar.currentHeight || 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  reportButton: {
    position: 'absolute',
    bottom: -650,
    backgroundColor: '#c0392b',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
