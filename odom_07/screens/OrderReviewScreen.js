import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';

export default function OrderReviewScreen({ orderSummary, onReturnHome }) {
  const { selectedTime, selectedOptions, newsletter, rentalMembership, subtotal, tax, grandTotal } = orderSummary;

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CustomHeader title="Order Summary" />

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Service Speed</Text>
          <Text style={styles.itemText}>{selectedTime.name} - ${selectedTime.price.toFixed(2)}</Text>

          <Text style={[styles.cardHeader, { marginTop: 15 }]}>Services Chosen</Text>
          {selectedOptions.length === 0 ? (
            <Text style={styles.itemText}>No options selected</Text>
          ) : (
            selectedOptions.map((opt) => (
              <Text key={opt.id} style={styles.itemText}>• {opt.name}: ${opt.price.toFixed(2)}</Text>
            ))
          )}

          <Text style={[styles.cardHeader, { marginTop: 15 }]}>Add-Ons</Text>
          {newsletter && <Text style={styles.itemText}>• Newsletter: Free</Text>}
          {rentalMembership && <Text style={styles.itemText}>• Rental Membership: $100.00</Text>}
          {!newsletter && !rentalMembership && <Text style={styles.itemText}>None</Text>}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal:</Text>
            <Text style={styles.priceVal}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Sales Tax (6%):</Text>
            <Text style={styles.priceVal}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Final Total:</Text>
            <Text style={styles.totalVal}>${grandTotal.toFixed(2)}</Text>
          </View>
        </View>

        <CustomButton title="Return Home" onPress={onReturnHome} color="#FF6347" />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 15,
  },
  cardHeader: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  itemText: { fontSize: 15, color: '#555', marginVertical: 2 },
  divider: { height: 1, backgroundColor: '#CCC', marginVertical: 15 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  priceLabel: { fontSize: 16, color: '#333' },
  priceVal: { fontSize: 16, fontWeight: '600' },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  totalVal: { fontSize: 18, fontWeight: 'bold', color: '#2a5298' },
});