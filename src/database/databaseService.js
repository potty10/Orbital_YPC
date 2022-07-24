import firestore from '@react-native-firebase/firestore';

export function addWorkouts(title, workoutPlan) {
    firestore()
        .collection('user_workouts')
        .doc("workouts");
}

export function deleteWorkouts() {

}

export function getWorkouts() {
    const usersCollection = firestore().collection('user_workouts');
}
