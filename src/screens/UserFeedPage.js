import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet, View, FlatList, ActivityIndicator, RefreshControl,
} from 'react-native';
import {
  collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Card, { mapDocumentToUi } from '../components/Card';
import { db } from '../../firebase';
import { msToTime } from '../utils/DateTimeUtil';

export default function UserFeedPage() {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const auth = getAuth();

  const loadAllHistory = async () => {
    const q = query(collection(db, 'user_history'), where('userId', '==', auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    const newWorkoutHistory = [];
    querySnapshot.forEach((doc) => {
      const workoutItem = mapDocumentToUi(doc.data());
      newWorkoutHistory.push(workoutItem);
    });
    setWorkoutHistory(newWorkoutHistory);
    setIsLoading(false);
    // setIsRefreshing(false);
  };

  // TODO: Load data from database
  useEffect(() => {
    loadAllHistory();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAllHistory();
    setRefreshing(false);
  });

  const renderItem = ({ item, index }) => (
    <Card style={styles.card} item={item} />
  );

  return (
    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator />
        : (
          <FlatList
            data={workoutHistory}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
    alignItems: 'stretch', // Default value, width of items stretch to fit container width
    justifyContent: 'flex-start', // Default value
  },
});

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    height: 143,
    padding: 22,
    marginVertical: 10,
  },
  card: {
    marginVertical: 10,
  },
});
