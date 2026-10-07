import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import OrderReviewScreen from './screens/OrderReviewScreen';

const INITIAL_SERVICE_TIMES = [
  { id: 'standard', name: 'Standard Service', price: 0 },
  { id: 'expedited', name: 'Expedited Service', price: 50 },
  { id: 'nextday', name: 'Next Day Service', price: 100 },
];

const INITIAL_SERVICE_OPTIONS = [
  { id: '1', name: 'Basic Tune-Up', price: 50, selected: false },
  { id: '2', name: 'Comprehensive Tune-Up', price: 75, selected: false },
  { id: '3', name: 'Flat Tire Repair', price: 20, selected: false },
  { id: '4', name: 'Brake Servicing', price: 50, selected: false },
  { id: '5', name: 'Gear Servicing', price: 40, selected: false },
  { id: '6', name: 'Chain Servicing', price: 15, selected: false },
  { id: '7', name: 'Frame Repair', price: 35, selected: false },
  { id: '8', name: 'Safety Check', price: 25, selected: false },
  { id: '9', name: 'Accessory Install', price: 10, selected: false },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  // State Management
  const [selectedServiceTime, setSelectedServiceTime] = useState('standard');
  const [serviceOptions, setServiceOptions] = useState(INITIAL_SERVICE_OPTIONS);
  const [newsletter, setNewsletter] = useState(false);
  const [rentalMembership, setRentalMembership] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const toggleServiceOption = (id) => {
    setServiceOptions((prevOptions) =>
      prevOptions.map((opt) =>
        opt.id === id ? { ...opt, selected: !opt.selected } : opt
      )
    );
  };

  const handleCalculateAndSubmit = () => {
    const timeObj = INITIAL_SERVICE_TIMES.find((t) => t.id === selectedServiceTime);
    const selectedOptionsList = serviceOptions.filter((opt) => opt.selected);

    const optionsCost = selectedOptionsList.reduce((acc, curr) => acc + curr.price, 0);
    const timeCost = timeObj ? timeObj.price : 0;
    const rentalCost = rentalMembership ? 100 : 0;

    const subtotal = timeCost + optionsCost + rentalCost;
    const tax = subtotal * 0.06;
    const grandTotal = subtotal + tax;

    setOrderSummary({
      selectedTime: timeObj,
      selectedOptions: selectedOptionsList,
      newsletter,
      rentalMembership,
      subtotal,
      tax,
      grandTotal,
    });

    setCurrentScreen('Review');
  };

  const handleReset = () => {
    setSelectedServiceTime('standard');
    setServiceOptions(INITIAL_SERVICE_OPTIONS.map((opt) => ({ ...opt, selected: false })));
    setNewsletter(false);
    setRentalMembership(false);
    setOrderSummary(null);
    setCurrentScreen('Home');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'Home' ? (
        <HomeScreen
          serviceTimes={INITIAL_SERVICE_TIMES}
          selectedServiceTime={selectedServiceTime}
          setSelectedServiceTime={setSelectedServiceTime}
          serviceOptions={serviceOptions}
          toggleServiceOption={toggleServiceOption}
          newsletter={newsletter}
          setNewsletter={setNewsletter}
          rentalMembership={rentalMembership}
          setRentalMembership={setRentalMembership}
          onSubmitOrder={handleCalculateAndSubmit}
        />
      ) : (
        <OrderReviewScreen
          orderSummary={orderSummary}
          onReturnHome={handleReset}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});