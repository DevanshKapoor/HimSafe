import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// --- Mock Data: Simulating reports from the backend ---
// In the future, this data will be fetched from your server.
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
  // Initial map region set to a central point in Himachal Pradesh
  const initialRegion = {
    latitude: 31.71,
    longitude: 76.93,
    latitudeDelta: 2.5, // Zoom level for latitude
    longitudeDelta: 2.5, // Zoom level for longitude
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- Map View --- */}
      {/* This is the main map where all reports will be displayed */}
      <MapView style={styles.map} initialRegion={initialRegion}>
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
        
        {/* This button will eventually trigger the reporting workflow */}
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Report Incident</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Stylesheet ---
// This keeps our styling organized and separate from the component logic.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // This makes the map fill the entire screen
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
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  reportButton: {
    position: 'absolute',
    bottom: -650, // Positioned from the top of the overlay
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