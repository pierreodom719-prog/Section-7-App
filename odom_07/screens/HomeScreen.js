import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Switch,
} from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({
  serviceTimes,
  selectedServiceTime,
  setSelectedServiceTime,
  serviceOptions,
  toggleServiceOption,
  newsletter,
  setNewsletter,
  rentalMembership,
  setRentalMembership,
  onSubmitOrder,
}) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1000' }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <CustomHeader title="Pedal Power Repair" />

        {/* Radio Buttons for Service Times */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service Speed:</Text>
          {serviceTimes.map((item) => (
            <View key={item.id} style={styles.row}>
              <RadioButton
                value={item.id}
                status={selectedServiceTime === item.id ? 'checked' : 'unchecked'}
                onPress={() => setSelectedServiceTime(item.id)}
                color="#1E90FF"
              />
              <Text style={styles.label}>{item.name} (${item.price})</Text>
            </View>
          ))}
        </View>

        {/* Checkboxes for Service Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service Options:</Text>
          {serviceOptions.map((item) => (
            <View key={item.id} style={styles.row}>
              <Checkbox
                status={item.selected ? 'checked' : 'unchecked'}
                onPress={() => toggleServiceOption(item.id)}
                color="#1E90FF"
              />
              <Text style={styles.label}>{item.name} (${item.price})</Text>
            </View>
          ))}
        </View>

        {/* Switches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add-Ons:</Text>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Newsletter Signup ($0)</Text>
            <Switch value={newsletter} onValueChange={setNewsletter} />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Rental Membership ($100)</Text>
            <Switch value={rentalMembership} onValueChange={setRentalMembership} />
          </View>
        </View>

        <CustomButton title="Submit Order" onPress={onSubmitOrder} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
  },
});